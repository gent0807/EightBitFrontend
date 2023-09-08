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
        clearLoginState: (state) => {
            state.login_state = "";
            state.access_token = null;
            state.refresh_token = null;
            state.temp_token = null;
            state.nickname=null;
            return state;
        },
        accessToken: (state, action)=>{
            state.access_token=action.payload.accessToken;
            return state;
        },
        refreshToken: (state, action)=>{
            state.refresh_token=action.payload.refreshToken;
            return state;
        },
        loginState:(state,action)=>{
            state.login_state=action.payload.loginState;
            state.access_token=action.payload.access_token;
            state.refresh_token=action.payload.refresh_token;
            state.nickname=action.payload.nickName;
            return state;
        }
        
    },
});

export const { clearLoginState, accessToken, refreshToken, loginState} = userSlice.actions;
export default userSlice.reducer;