const { addWidget, removeWidget, updateWidget } = require("../components/widgets/widgets.slice");
const { connect, sendMessage, disconnect, connected, disconnected } = require("../socket.slice");

const socketMiddleware = () => {
  let socket = null;

  const onOpen = store => (event) => {
    store.dispatch(sendMessage({type: 'handshake', payload: 'controller'}));
  }

  const onClose = store => () => {
    store.dispatch(disconnected());
  }

  const onMessage = store => (event) => {
    const payload = JSON.parse(event.data);
    console.log('Message received:', payload)
    switch (payload.type) {
      case 'handshake':
        store.dispatch(connected(payload.id))
        break;
      case 'create':
        store.dispatch(addWidget(payload.payload))
        break;
      case 'delete':
        store.dispatch(removeWidget(payload.payload));
        break;
      case 'info':
        store.dispatch(updateWidget(payload.payload));
        break;
      default:
        break;
    }
  }

  console.log('Running the socket middleware');

  return store => next => action => {
    switch (action.type) {
      case connect.toString():
        if (socket !== null) {
          socket.close();
        }
        socket = new WebSocket(action.payload);
        socket.onclose = onClose(store);
        socket.onmessage = onMessage(store);
        socket.onopen = onOpen(store);
        break;
      case disconnect.toString():
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        break;
      case sendMessage.toString():
        socket.send(JSON.stringify(action.payload))
        break
      default:
        return next(action)
    }
  }
}
export default socketMiddleware();