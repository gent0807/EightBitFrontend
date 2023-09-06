import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: "user",
    initialState: {
        data: "",
        access_token: null,
        refresh_token: null,
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
        accessToken: (state, action)=>{
            state.access_token=action.payload.access_token;
            return state;
        },
        refreshToken: (state, action)=>{
            state.refresh_token=action.payload.refresh_token;
            return state;
        }
    },
});

export const { loginUser, clearUser, accessToken, refreshToken } = userSlice.actions;
export default userSlice.reducer;