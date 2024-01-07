import {  createSlice } from "@reduxjs/toolkit";

const initialState={
    loading:false,
    message:null,
    error:null,
    user:null
}
const profileReducer=createSlice({
    name:"profile",
    initialState,
    reducers:{
    changePasswordRequest:(state)=>{
        state.loading=true
    },
    changePasswordSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload.message;
    },
    changePasswordFail:(state,action)=>{
        state.loading=false;
        state.message=action.payload.message
    },
    changeProfileRequest:(state)=>{
        state.loading=true
    },
    changeProfileSuccess:(state,action)=>{
        state.loading=false;
        state.user=action.payload.user;
        state.message=action.payload.message;
    },
    changeProfileFail:(state,action)=>{
        state.loading=false;
        state.message=action.payload
    },
    changeProfilePictureRequest:(state)=>{
        state.loading=true
    },
    changeProfilePictureSuccess:(state,action)=>{
        state.loading=false;
        state.user=action.payload.user
        state.message=action.payload.message
    },
    changeProfilePictureFail:(state,action)=>{
        state.loading=false;
        state.message=action.payload
    },
    clearError:(state)=>{
        state.error=null
    },
    clearMessage:(state)=>{
        state.message=null
    }
}})
export const {changePasswordFail,changePasswordRequest,changePasswordSuccess,
                changeProfileFail,changeProfilePictureFail,changeProfileRequest,changeProfileSuccess,
                changeProfilePictureRequest,changeProfilePictureSuccess,clearError,clearMessage}=profileReducer.actions;
export default profileReducer.reducer;