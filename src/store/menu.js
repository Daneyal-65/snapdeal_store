import { createSlice } from "@reduxjs/toolkit";
// initial state
const initialState = {
  value: false,
};
// reducers
export const toggleMenuSlice = createSlice({
  name: "toggleMenu",
  initialState,
  reducers: {
    toggleMenu: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { toggleMenu } = toggleMenuSlice.actions;

export default toggleMenuSlice.reducer;
