import { createSlice } from "@reduxjs/toolkit";
// initial state for Cart or cart
const initialState = {
  items: [],
  toggle: false,
};
// defination of reducers
const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    isOpen: (state, action) => {
      state.toggle = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, isOpen } =
  CartSlice.actions;
export default CartSlice.reducer;
