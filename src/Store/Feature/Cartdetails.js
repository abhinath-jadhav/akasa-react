// features/items/itemsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartDetails = createSlice({
  name: "items",
  initialState: [], // Initialize with an empty array
  reducers: {
    addCartDetails: (state, action) => {
      //console.log(action.payload);
      return action.payload;
    },
  },
});

export const { addCartDetails } = cartDetails.actions;

export default cartDetails.reducer;
