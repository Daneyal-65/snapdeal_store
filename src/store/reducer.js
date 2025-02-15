import { createSlice } from "@reduxjs/toolkit";
// initial state of product details
const initialState = {
  value: {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: {
      rate: 3.9,
      count: 120,
    },
  },
};
// reducers
export const productDetailsSlice = createSlice({
  name: "ProductDetails",
  initialState,
  reducers: {
    updateDetails: (state, action) => {
      state.value = action.payload;
    },
    updateSize: (state, action) => {
      state.value.size = action.payload;
    },
  },
});

export const { updateDetails, updateSize } = productDetailsSlice.actions;

export default productDetailsSlice.reducer;
