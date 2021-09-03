import { createSlice } from "@reduxjs/toolkit";
import { disconnected } from "../../socket.slice";

const initialState = [];

export const widgetsSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    addWidget: (state, {payload}) => {
      if (state.find(w => w.id === payload.id)) {
        return state.map(w => w.id === payload.id ? payload : w);  
      } else {
        state.push(payload);
      }
    },
    removeWidget: (state, {payload}) => {
      return state.filter(w => w.id !== payload);
    },
    updateWidget: (state, {payload}) => {
      return state.map(w => w.id === payload.id ? payload : w);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(disconnected, (state, action) => {
      return [];
    })
  }
});

export const { addWidget, removeWidget, updateWidget } = widgetsSlice.actions;
export default widgetsSlice.reducer;