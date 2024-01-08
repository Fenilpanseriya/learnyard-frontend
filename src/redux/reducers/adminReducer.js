import {  createSlice } from "@reduxjs/toolkit";

const initialState={
    loading:false,
    message:null,
    error:null,
    users:null,
    role:"",
    stats:[],
    usercnt:0,
    subscriptioncnt:0,
    viewscnt:0,
    subscriptionPer:0,
    userPer:0,
    viewPer:0,
    userProfit:0,
    viewsProfit:0,
    subscriptionProfit:0
    
}
const adminReducer=createSlice({
    name:"admin",
    initialState,
    reducers:{
    getDashboardStatsRequest:(state)=>{
        state.loading=true
    },
    getDashboardStatsSuccess:(state,action)=>{
        state.loading=false;
        state.stats=action.payload.stats;
        state.usercnt=action.payload.usercnt;
        state.subscriptioncnt=action.payload.subscriptioncnt;
        state.viewscnt=action.payload.viewscnt;
        state.subscriptionPer=action.payload.subscriptionPer;
        state.userPer=action.payload.userPer;
        state.viewPer=action.payload.viewPer;
        state.userProfit=action.payload.userProfit;
        state.viewsProfit=action.payload.viewsProfit;
        state.subscriptionProfit=action.payload.subscriptionProfit;
        state.message=action.payload.message;
    },
    getDashboardStatsFail:(state,action)=>{
        state.loading=false;
        state.error=action.payload
    },
    deleteLectureRequest:(state)=>{
        state.loading=true
    },
    deleteLectureSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload.message;
    },
    deleteLectureFail:(state,action)=>{
        state.loading=false;
        state.error=action.payload
    },
    changeRoleRequest:(state)=>{
        state.loading=true;
    },
    changeRolesuccess:(state,action)=>{
        state.loading=false;
        state.role=action.payload.role;
        state.message=action.payload.message;
    },
    changeRoleFail:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    deleteUserRequest:(state)=>{
        state.loading=true;
    },
    deleteUserSuccess:(state,action)=>{
        state.loading=false;
        state.role="";
        state.message=action.payload.message;
    },
    deleteUserFail:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    setUsers:(state,action)=>{
        
        state.users=action.payload.users
    },
    
    clearError:(state)=>{
        state.error=null
    },
    clearMessage:(state)=>{
        state.message=null
    }
}})
export const {clearError,clearMessage,deleteLectureFail,deleteLectureRequest,deleteLectureSuccess,changeRoleFail,
    changeRoleRequest,changeRolesuccess,deleteUserFail,deleteUserRequest,deleteUserSuccess,getDashboardStatsFail
    ,getDashboardStatsRequest,getDashboardStatsSuccess,setUsers}=adminReducer.actions;
export default adminReducer.reducer;