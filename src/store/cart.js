import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToCartAsync as _add,
  getCartAsync as _get,
  removeFromCartAsync as _remove,
  updateCartQuantityAsync as _update,
} from "../api/cart";

const initialState = {
  items: [],
  toggle: false,
  status: "idle",
  error: null,
};

export const addToCartAsync = createAsyncThunk("add/cartItems", _add);
export const getCartAsync = createAsyncThunk("get/cartItems", _get);
export const removeFromCartAsync = createAsyncThunk(
  "remove/cartItems",
  _remove
);
export const updateCartQuantityAsync = createAsyncThunk(
  "update/cartItems",
  _update
);

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Local reducers remain the same
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
  extraReducers: (builder) => {
    builder
      // Get cart cases remain the same
      .addCase(getCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCartAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { cart } = action.payload;
        // console.log(action.payload);
        state.items = cart;
      })
      .addCase(getCartAsync.rejected, (state, action) => {
        state.status = "failed";
        console.log(action.payload);
        state.error = action.payload;
      })
      // Add to cart case remains the same
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { cart } = action.payload;
        // console.log(action.payload);
        state.items = cart;
      })
      // FIXED: Updated to properly handle the remove response
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { cart } = action.payload;
        // console.log(action.payload);
        state.items = cart;
      })
      // FIXED: Updated to properly handle the update quantity response
      .addCase(updateCartQuantityAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { cart } = action.payload;
        // console.log(action.payload);
        state.items = cart;
      });
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, isOpen } =
  CartSlice.actions;

export default CartSlice.reducer;
