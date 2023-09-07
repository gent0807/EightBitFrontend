import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: "user",
    initialState: {
        login_state:"",
        access_token: null,
        refresh_token: null,
        nickname:null
    },
    reducers: {
        loginState: (state, action) => {
            state.login_state = action.payload.data;
            return state;
        },
        clearLoginState: (state) => {
            state.login_state = "";
            return state;
        },
        accessToken: (state, action)=>{
            state.access_token=action.payload.access_token;
            return state;
        },
        refreshToken: (state, action)=>{
            state.refresh_token=action.payload.refresh_token;
            return state;
        },
        nickName: (state,action)=>{
            state.nickname=action.payload.nickname;
            return state;
        }
    },
});

export const { loginState, clearState, accessToken, refreshToken,nickName } = userSlice.actions;
export default userSlice.reducer;