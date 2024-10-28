import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  owner: {},
  ownerAuthorized:false
}

export const ownerSlice = createSlice({
  name: 'owner',
  initialState,
  reducers: {
    saveOwner: (state,action) => {
      state.owner=action.payload;
      state.ownerAuthorized=true
    },
    clearOwner: (state) => {
      state.owner={};
      state.ownerAuthorized=false
    },

  },
})

// Action creators are generated for each case reducer function
export const { saveOwner,clearOwner } = ownerSlice.actions

export default ownerSlice.reducer