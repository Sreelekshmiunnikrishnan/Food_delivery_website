import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  admin: {},
  adminAuthorized:false
}

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    saveAdmin: (state,action) => {
      state.admin=action.payload;
      state.adminAuthorized=true
    },
    clearAdmin: (state) => {
      state.admin={};
      state.adminAuthorized=false
    },

  },
})

// Action creators are generated for each case reducer function
export const { saveAdmin,clearAdmin } = adminSlice.actions

export default adminSlice.reducer