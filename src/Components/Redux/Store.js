import { configureStore } from '@reduxjs/toolkit';
import rootReducer from "./RootReducer";
import User from "./User";
import RegisterReplyText from "./RegisterReplyText";
import RegisterReCommentText from "./RegisterReCommentText";

export default configureStore({
  reducer: {
    user:User
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});