import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
 name: 'user',
 initialState: {
  user: {},
  token: '',
  cart: [],
 },
 reducers: {
  getUser: (state, action) => {
   state.user = action.payload;
  },
  getUserById: (state, action) => {
   state.user = action.payload;
  },
 },
});

export const { getUser, getUserById, setNumbersToCart } = userSlice.actions;

export default userSlice.reducer;
