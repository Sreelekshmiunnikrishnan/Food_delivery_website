// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userAuthorized: false, // Represents if the user is logged in
  role: null,            // Can be "user", "restaurantOwner", "admin", etc.
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userAuthorized = true;
      state.role = action.payload.role; // role is passed from login action payload
    },
    logout: (state) => {
      state.userAuthorized = false;
      state.role = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
