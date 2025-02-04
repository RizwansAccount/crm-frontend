import { configureStore } from '@reduxjs/toolkit';
import SnackbarReducer from "./SnackbarReducer";
import { crmApi } from './storeApis';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    SnackbarReducer,
    [crmApi.reducerPath] : crmApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(crmApi.middleware),
});

setupListeners(store.dispatch);