import { configureStore } from "@reduxjs/toolkit";
import productDetailsSlice from "./reducer";
import cartSlice from "./cart";
import toggleMenuSlice from "./menu";
import AuthSlice from "./auth";
// configuring store setup for redux
export const store = configureStore({
  reducer: {
    ProductDetails: productDetailsSlice,
    cart: cartSlice,
    menu: toggleMenuSlice,
    auth: AuthSlice,
  },
});
