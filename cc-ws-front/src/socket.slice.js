import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  connected: false,
  connecting: false,
  url: '',
  id: null
}

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setUrl: (state, {payload}) => {
      return {
        ...state,
        url: payload
      };
    },
    connected: (state, {payload}) => {
      return {
        ...state,
        connected: true,
        connecting: false,
        id: payload
      }
    },
    disconnected: (state) => {
      return {
        ...state,
        connected: false,
        connecting: false,
        id: null
      };
    }
  }
});

export const sendMessage = createAction('socket/sendmessage');
export const connect = createAction('socket/connect');
export const disconnect = createAction('socket/disconnect');
export const {connected, disconnected, setUrl} = socketSlice.actions;
export default socketSlice.reducer;