import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  admin: {},
  isAdminAuthorized:false
}

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    saveAdmin: (state,action) => {
      state.admin=action.payload;
      state.isAdminAuthorized=true
    },
    clearAdmin: (state) => {
      state.admin={};
      state.isAdminAuthorized=false
    },

  },
})

// Action creators are generated for each case reducer function
export const { saveAdmin,clearAdmin } = adminSlice.actions

export default adminSlice.reducer