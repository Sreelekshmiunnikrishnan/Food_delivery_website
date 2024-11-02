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
      // Use optional chaining to avoid TypeError if action.payload is undefined
      state.role = action.payload?.role || null; // Default to null if role is undefined
    },
    logout: (state) => {
      state.userAuthorized = false;
      state.role = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
