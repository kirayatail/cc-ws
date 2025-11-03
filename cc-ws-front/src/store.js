import { configureStore } from '@reduxjs/toolkit';
import widgetReducer from './components/widgets/widgets.slice';
import socketReducer from './socket.slice';
import socketMiddleware from './middleware/socketMiddleware';

export default configureStore({
  reducer: {
    widgets: widgetReducer,
    socket: socketReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(socketMiddleware);
  }
});