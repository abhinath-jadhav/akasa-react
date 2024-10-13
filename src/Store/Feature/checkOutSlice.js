import { createSlice } from "@reduxjs/toolkit";

const checkOutSlice = createSlice({
  name: "checkOut",
  initialState: {
    flight: false,
    flightId: "",
    mode: false,
    modeType: "",
  },
  reducers: {
    updateCheckOutDetails: (state, action) => {
      console.log(action.payload);

      if (action.payload.type === "FLIGHT") {
        state.flight = true;
        state.flightId = action.payload.flightId;
        return state;
      } else {
        state.mode = true;
        state.modeType = action.payload.modeType;
        return state;
      }
    },
  },
});

export const { updateCheckOutDetails } = checkOutSlice.actions;
export default checkOutSlice.reducer;
