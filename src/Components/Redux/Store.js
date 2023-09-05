import { configureStore } from '@reduxjs/toolkit';
import LoginUser from "./User";

export default configureStore({
  reducer: {
    user: LoginUser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});