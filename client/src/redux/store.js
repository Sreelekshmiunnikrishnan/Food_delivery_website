import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./features/userSlice";
import adminReducer from "./features/adminSlice;
export const store = configureStore({
  reducer: {
    user: userReducer,
},
   reducer: {
    admin: adminReducer,
},
})
