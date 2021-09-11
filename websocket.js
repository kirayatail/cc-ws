const WebSocket = require('ws');

const clientToSend = (c) => {
  return {
    id: c.id,
    type: c.type,
    methods: c.methods,
    info: c.info,
    group: c.group,
    hidden: c.hidden
  };
}

const clients = []

const updateClient = (data)  => {
  if (data.type === 'all') {
    clients[clients.findIndex(c => c.id === data.id)] = data.payload
  } else {
    clients[clients.findIndex(c => c.id === data.id)][data.type] = data.payload
  }
  clients.filter(c => c.type === 'controller').forEach(c => c.sock.send(JSON.stringify({
    type: 'info',
    id: data.id,
    payload: clientToSend(clients[clients.findIndex(c => c.id === data.id)])
  })))
}

module.exports = () => {
  const wss = new WebSocket.Server({ noServer: true });

  wss.on('connection', (ws, req) =>  {
    console.log('Connected to new socket')
    console.log(req.socket.address());
    ws.on('message', (msg) => {
      const data = JSON.parse(msg)
      if (data.type === 'handshake') {
        const id = clients.map(c => c.id).reduce((cand, c) => cand > c ? cand : c + 1, 0);
        console.log(`Handshake with ${data.payload} ${id}`);
        clients.push({
          type: data.payload,
          id,
          sock: ws
        });
        ws.on('close', (ws) => {
          console.log(`client ${id} disconnected`);
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
      if (['info', 'methods', 'group', 'hidden', 'all'].includes(data.type)) {
        updateClient(data)
      }
      
      if (data.type === 'command') {
        clients.find(c => c.id === data.id)?.sock.send(msg);
      }
    });
  });

  setInterval(() => {
    clients.forEach(c => c.sock.send(JSON.stringify({
      type: 'ping'
    })));
  }, 10000)

  return wss;
}


