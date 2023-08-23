import { createSlice } from '@reduxjs/toolkit';

export const rifaSlice = createSlice({
 name: 'rifas',
 initialState: {
  cart: [],
  allRifas: [],
  rifaDetail: {},
 },
 reducers: {
  setRifas: (state, action) => {
   state.allRifas = action.payload;
  },
  setRifaDetail: (state, action) => {
   state.rifaDetail = action.payload;
  },
  setNumbersToCart: (state, action) => {
   state.cart = [...state.cart, ...action.payload];
  },
  delNumbersToCart: (state, action) => {
   state.cart = action.payload;
  },
  clearCart: (state) => {
   state.cart = [];
  },
 },
});

export const {
 setRifas,
 setRifaDetail,
 setNumbersToCart,
 delNumbersToCart,
 clearCart,
} = rifaSlice.actions;

export default rifaSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// export const rifaSlice = createSlice({
//   name: 'rifas',
//   initialState: {
//     cart: [],
//     allRifas: [],
//     rifaDetail: {},
//   },
//   reducers: {
//     setRifas: (state, action) => {
//       state.allRifas = action.payload;
//     },
//     setRifaDetail: (state, action) => {
//       state.rifaDetail = action.payload;
//     },
//     setNumbersToCart: (state, action) => {
//       const newItem = action.payload;
//       const existingItemIndex = state.cart.findIndex(item => item.id === newItem.id);

//       if (existingItemIndex !== -1) {
//         // Si ya existe el objeto con el mismo id, clonamos el objeto existente y agregamos los nuevos números
//         const existingItem = state.cart[existingItemIndex];
//         const updatedItem = { ...existingItem, numeros: [...existingItem.numeros, ...newItem.numeros] };
//         state.cart.splice(existingItemIndex, 1, updatedItem);
//       } else {
//         // Si no existe, simplemente agregamos el nuevo objeto completo al array "cart"
//         state.cart.push(newItem);
//       }
//     },
//     delNumbersToCart: (state, action) => {
//       state.cart = action.payload;
//     },
//     clearCart: (state) => {
//       state.cart = [];
//     },
//   },
// });

// export const {
//   setRifas,
//   setRifaDetail,
//   setNumbersToCart,
//   delNumbersToCart,
//   clearCart,
// } = rifaSlice.actions;

// export default rifaSlice.reducer;