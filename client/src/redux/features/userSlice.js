import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  userAuthorized:false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state,action) => {
      state.user=action.payload;
      state.userAuthorized=true
    },
    clearUser: (state) => {
      state.user={};
      state.userAuthorized=false
    },

  },
})

// Action creators are generated for each case reducer function
export const { saveUser,clearUser } = userSlice.actions

export default userSlice.reducer