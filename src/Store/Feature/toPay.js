import { createSlice } from "@reduxjs/toolkit";

const toPaySlice = createSlice({
  name: "toPaySlice",
  initialState: 0,
  reducers: {
    addInTotal: (state, action) => {
      console.log(action.payload);

      return state + action.payload;
    },
    reduceFromTotal: (state, action) => state - action.payload,
    resetToPay: (state, action) => {
      console.log(state);
      return action.payload;
    },
  },
});

export const { addInTotal, reduceFromTotal, resetToPay } = toPaySlice.actions;

export default toPaySlice.reducer;
