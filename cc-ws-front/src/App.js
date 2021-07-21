/* eslint-disable no-restricted-globals */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { WidgetContainer } from './components/widgets/widgetContainer.component';
import { connect, disconnect, setUrl } from './socket.slice';

function App() {
  const dispatch = useDispatch();
  const socketUrl = useSelector((state) => state.socket.url);

  useEffect(() => {
    if (!socketUrl) {
      const host = location.hostname;
      const protocol = location.protocol === 'http:' ? 'ws' : 'wss'
      fetch('/socketport').then(r => r.json()).then(port => dispatch(setUrl(`${protocol}://${host}:${port}`)))
    }
  }, [dispatch, socketUrl])

  const socket = useSelector((state) => state.socket);

  function toggleConnect() {
    if (socket.connected) {
      dispatch(disconnect());
    } else {
      dispatch(connect(socketUrl));
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        Websocket Controller
        <button onClick={() => toggleConnect()}>{socket.connected ? 'disconnect' : 'connect'}</button>
      </header>
      <WidgetContainer></WidgetContainer>
    </div>
  );
}

export default App;
