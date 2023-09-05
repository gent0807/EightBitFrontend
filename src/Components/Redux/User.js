import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: "user",
    initialState: {
        data: "",
        temp_token: null,
        access_token: null,
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
        tempToken:(state, action)=>{
            state.temp_token=action.payload.temp_token;
            return state;
        },
        accessToken: (state, action)=>{
            state.access_token=action.payload.access_token;
            return state;
        },
    },
});

export const { loginUser, clearUser, tempToken } = userSlice.actions;
export default userSlice.reducer;