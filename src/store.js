import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./reducer/authReducer.js";
import { authApi } from './services/auth/authService.js'

export default configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
  devTools: true
})