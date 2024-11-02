/* import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/features/authSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'auth',
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
});

export const persistor = persistStore(store);
export default store; */

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/authSlice";
import userReducer from "../redux/features/userSlice";
import adminReducer from "../redux/features/adminSlice";
import ownerReducer from "../redux/features/ownerSlice";
export const store = configureStore({
  reducer: {
   user : userReducer,
   admin : adminReducer,
   owner : ownerReducer,
  },
  
}); 

