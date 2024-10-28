/* import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./features/userSlice";
import adminReducer from "../redux/features/adminSlice"
export const store = configureStore({
  reducer: {
    user: userReducer,
},
 
}) */

// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

