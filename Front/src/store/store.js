import { configureStore } from '@reduxjs/toolkit';
import {
 persistReducer,
 FLUSH,
 REHYDRATE,
 PAUSE,
 PERSIST,
 PURGE,
 REGISTER,
} from 'redux-persist';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import user from './state/slices/userSlice';
// import admin from './state/slices/adminSlice';
import mode from './state/slices/modeSlice';
import rifas from './state/slices/rifaSlice';

// Todos los  (Slices)

const rootReducer = combineReducers({
 mode: mode,
 user: user,
 rifas: rifas,
 //  admin: admin,
});

const localStorageConfig = {
 key: 'root',
 storage: storage,
 whitelist: ['mode', 'rifas'], // especifica aquí los reductores que quieres persistir en Local Storage
};

const sessionConfig = {
 key: 'session',
 storage: sessionStorage,
 whitelist: ['user'], // especifica aquí los reductores que quieres persistir en Session Storage
};

const localStorageReducer = persistReducer(
 localStorageConfig,
 combineReducers({
  mode: mode,
  rifas: rifas,
 }),
);

const sessionReducer = persistReducer(
 sessionConfig,
 combineReducers({
  user: user,
 }),
);

export const store = configureStore({
 reducer: persistReducer(localStorageConfig, rootReducer),
 middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
   serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
   },
  }),
});

export const sessionStore = configureStore({
 reducer: sessionReducer,
 middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
   serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
   },
  }),
});
