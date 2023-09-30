import { createSlice } from '@reduxjs/toolkit';

export const replySlice = createSlice({
    name: "registerReplyText",
    initialState: {
        reply_text:""
    },
    reducers: {
        replyText: (state, action) => {
            state.reply_text = action.payload.replyText;
            return state;
        }
    },
});

export const { replyText } = replySlice.actions;
export default replySlice.reducer;