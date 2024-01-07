import {  createSlice } from "@reduxjs/toolkit";

const initialState={
    loading:false,
    message:null,
    error:null,
    courses:[],
    lectures:[]
}
const courseReducer=createSlice({
    name:"profile",
    initialState,
    reducers:{
    getAllCoursesRequest:(state)=>{
        state.loading=true
    },
    getAllCoursesSuccess:(state,action)=>{
        state.loading=false;
        state.courses=action.payload.courses;
    },
    getAllCoursesFail:(state,action)=>{
        state.loading=false;
        state.error=action.payload
    },
    getCoursesRequest:(state)=>{
        state.loading=true
    },
    getCoursesSuccess:(state,action)=>{
        console.log("lecturea "+action.payload.lectures
        )
        state.loading=false;
        state.lectures=action.payload.lectures;
    },
    getCoursesFail:(state,action)=>{
        state.loading=false;
        state.error=action.payload
    },
    addLectureRequest:(state)=>{
        state.loading=true
    },
    addLectureSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload.message;
        state.lectures=action.payload.lectures
    },
    addLectureFail:(state,action)=>{
        state.loading=false;
        state.error=action.payload
    },
    createCourseRequest:(state)=>{
        state.loading=true
    },
    createCourseSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload.message;
    },
    createCourseFail:(state,action)=>{
        state.loading=false;
        state.error=action.payload
    },
    CourseRequest:(state)=>{
        state.loading=true
    },
    CourseSuccess:(state,action)=>{
        state.loading=false;
        state.message=action.payload.message;
    },
    CourseFail:(state,action)=>{
        state.loading=false;
        state.error=action.payload
    },
    clearError:(state)=>{
        state.error=null

    },
    clearMessage:(state)=>{
        state.message=null
    }
}})
export const {getAllCoursesFail,getAllCoursesRequest,getAllCoursesSuccess,clearError,getCoursesFail,getCoursesRequest,
    getCoursesSuccess,addLectureFail,addLectureRequest,addLectureSuccess,createCourseFail,createCourseRequest,createCourseSuccess,
    clearMessage,CourseFail,CourseRequest,CourseSuccess}=courseReducer.actions;
export default courseReducer.reducer;