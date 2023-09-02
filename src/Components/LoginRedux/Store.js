import { configureStore } from '@reduxjs/toolkit';
import LoginUser from "./LoginUser";

export default configureStore({
  reducer: {
    user: LoginUser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});