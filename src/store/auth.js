import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogout: (state) => {
      localStorage.clear("token");
      state.isAuthenticated = false;
    },
    userLoggedIn: (state) => {
      state.isAuthenticated = true;
    },
  },
});

export const { userLoggedIn, userLogout } = authSlice.actions;

export default authSlice.reducer;
