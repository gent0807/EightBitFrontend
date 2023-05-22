import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: "user",
    initialState: {
        data: "",
    },
    reducers: {
        loginUser: (state, action) => {
            state.data = action.payload.data;
            return state;
        },
        clearUser: (state) => {
            state.data = "";
            return state;
        },
    },
});

export const { loginUser, clearUser } = userSlice.actions;
export default userSlice.reducer;