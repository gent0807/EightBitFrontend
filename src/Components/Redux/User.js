import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: "user",
    initialState: {
        login_state:null,
        role:null,
        access_token: null,
        refresh_token: null,
        nickname:null,
        profile_img_path:null
    },
    reducers: {
        clearLoginState: (state) => {
            state.login_state = null;
            state.role=null;
            state.access_token = null;
            state.refresh_token = null;
            state.temp_token = null;
            state.nickname=null;
            state.profile_img_path=null;
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
            state.role=action.payload.role;
            state.access_token=action.payload.accessToken;
            state.refresh_token=action.payload.refreshToken;
            state.nickname=action.payload.nickName;
            state.profile_img_path=action.payload.profileImgPath;
            return state;
        }
        
    },
});

export const { clearLoginState, accessToken, refreshToken, loginState} = userSlice.actions;
export default userSlice.reducer;