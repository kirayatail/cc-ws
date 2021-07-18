const WebSocket = require('ws');

const clientToSend = (c) => {
  return {
    id: c.id,
    type: c.type,
    methods: c.methods,
    info: c.info
  };
}

const clients = []

module.exports = () => {
  const wss = new WebSocket.Server({ noServer: true });

  wss.on('connection', (ws) =>  {
    console.log('Connected to new socket')
    ws.on('message', (msg) => {
      const data = JSON.parse(msg)
      console.log('Message received:', data);
      if (data.type === 'handshake') {
        const id = clients.map(c => c.id).reduce((cand, c) => cand > c ? cand : c + 1, 0);
        clients.push({
          type: data.payload,
          id,
          sock: ws
        });
        ws.on('close', (ws) => {
          clients.splice(clients.findIndex(c => c.id === id), 1);
          clients.filter(c => c.type === 'controller').forEach(c => {
            c.sock.send(JSON.stringify({
              type: 'delete',
              payload: id
            }))
          })
        })
        ws.send(JSON.stringify({
          type: 'handshake',
          id
        }));
        if (data.payload === 'controller') {
          clients.filter(c => c.type !== 'controller').forEach(c => {
            ws.send(JSON.stringify({
              type: 'create',
              payload: clientToSend(c)
            }));
          })
        } else {
          clients.filter(c => c.type === 'controller').forEach(c => {
            c.sock.send(JSON.stringify({
              type: 'create',
              payload: {id, type: data.payload}
            }));
          })
        }
      }
      if (data.type === 'info') {
  
        clients[clients.findIndex(c => c.id === data.id)].info = data.payload
        clients.filter(c => c.type === 'controller').forEach(c => c.sock.send(JSON.stringify({
          type: 'info',
          id: data.id,
          payload: clientToSend(clients[clients.findIndex(c => c.id === data.id)])
        })))
      }
      if (data.type === 'methods') {
        clients[clients.findIndex(c => c.id === data.id)].methods = data.payload
        clients.filter(c => c.type === 'controller').forEach(c => c.sock.send(JSON.stringify({
          type: 'info',
          id: data.id,
          payload: clientToSend(clients[clients.findIndex(c => c.id === data.id)])
        })));
        console.log('Clients:', clients.map(clientToSend));
      }
      if (data.type === 'command') {
        clients.find(c => c.id === data.id)?.sock.send(msg);
      }
    });
  });

  return wss;
}


