import { createSlice } from "@reduxjs/toolkit";

const inventorySlice = createSlice({
  name: "inventorySlice",
  initialState: {},
  reducers: {
    pushInventory: (state, action) => {
      return action.payload;
    },
  },
});

export const { pushInventory } = inventorySlice.actions;

export default inventorySlice.reducer;
