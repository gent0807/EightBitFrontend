import { createSlice } from '@reduxjs/toolkit';

export const reCommentSlice = createSlice({
    name: "registerReCommentText",
    initialState: {
        reComment_text:""
    },
    reducers: {
        reCommentText: (state, action) => {
            state.reply_text = action.payload.replyText;
            return state;
        }
    },
});

export const {reCommentText} = reCommentSlice.actions;
export default reCommentSlice.reducer;