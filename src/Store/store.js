import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "./Feature/CartSlice.js";
import inventorySlice from "./Feature/inventorySlice.js";
import auth from "./Feature/authSlice.js";
import cartdetails from "./Feature/Cartdetails.js";
import toPay from "./Feature/toPay.js";
import checkOutDetails from "./Feature/checkOutSlice.js";

export const store = configureStore({
  reducer: {
    cartItems: itemReducer,
    ineventory: inventorySlice,
    auth: auth,
    cartdetails: cartdetails,
    toPay: toPay,
    checkOutDetails: checkOutDetails,
  },
});
