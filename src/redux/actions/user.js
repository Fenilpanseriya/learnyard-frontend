import { useEffect } from "react";
import { loginFail, loginSuccess,loadUserRequest,loadUserSuccess,loadUserFail, logoutSuccess, logoutFail, logoutRequest, registerRequest, registerSuccess, registerFail, subscribeRequest, subscribeSuccess, subscribeFail, canclesubscribeRequest, canclesubscribeSuccess, canclesubscribeFail } from "../reducers/userReducer";
import { server } from "../store";
import axios from "axios"

import { Axios } from "../../Axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const login=(email,password)=>async(dispatch)=>{
    
    try{
        dispatch({type:"loginRequest"})
        
        const response=await Axios.post("/login",{
            email,password,
            headers:{
                "Content-Type":"application/json",
                "token":localStorage.getItem("token"),
                
            },
            withCredentials:true,
        })
        console.log("data "+JSON.stringify(response.data.user1));
        window.localStorage.setItem("token",response.data.user1.token)
        dispatch(loginSuccess(response.data.user1))
        
        //console.log(data);
    }

    catch(e){

        dispatch(loginFail(e.response.data.message))
        

    }

}
export const getMyProfile=()=>async(dispatch)=>{
    
    try{
        dispatch(loadUserRequest());
        console.log("token "+localStorage.getItem("token"))
        const response=await Axios.get(`/me`,{
            // headers:{
            //     'Authorization':localStorage.getItem("token"),

            // },
            withCredentials:true,
            headers:{
                "token":localStorage.getItem("token"),
            },
            
        })
        //console.log("data is"+data);
       dispatch(loadUserSuccess(response.data.user))
        //console.log(data);
    }

    catch(e){
        
        dispatch(loadUserFail(e.response.data.message))
        

    }

}

export const logout=()=>async(dispatch)=>{
    try{
        dispatch(logoutRequest());
        const {data}=await Axios.get(`/logoutuser`,{
            headers:{
                "token":localStorage.getItem("token"),
            },
            withCredentials:true,
        })
        //console.log(data);
        dispatch(logoutSuccess(data.message))
        //console.log(data);
    }

    catch(e){
        dispatch(logoutFail(e.response.data.message))
        

    }

}

export const register=(formData)=>async(dispatch)=>{
    
    try{
        dispatch(registerRequest())
        console.log(formData);
        const {data}=await Axios.post("/register",formData,{
           
            headers:{
                "Content-Type":"multipart/form-data"
                
            },
            withCredentials:true,
        })
        if(data.success){
            console.log("user 1 "+data.user1);
            window.localStorage.setItem("token",data.token)
            dispatch(registerSuccess(data.user1))
            return true;
        }
        
        
        //console.log(data);
    }

    catch(e){
        dispatch(registerFail(e.response.data.message))
        

    }
}

export const buyScubscription=(email,password)=>async(dispatch)=>{
    
    try{
        dispatch(subscribeRequest())
        
        const response=await Axios.get("/subscribe",{
            email,password,
            headers:{
               
                "token":localStorage.getItem("token"),
                
            },
            withCredentials:true,
        })
        console.log("data "+JSON.stringify(response.data));
        dispatch(subscribeSuccess(response.data))
        
        //console.log(data);
    }

    catch(e){
        console.log("eroor "+e)
        dispatch(subscribeFail("some thing went wrong please try again"))
        

    }

}
export const cancleSubscription=()=>async(dispatch)=>{
    
    try{
        dispatch(canclesubscribeRequest())
        
        const response=await Axios.get("/subscribe/cancle",{
            
            headers:{
               
                "token":localStorage.getItem("token"),
                
            },
            withCredentials:true,
        })
        console.log("data "+JSON.stringify(response.data));
        dispatch(canclesubscribeSuccess(response.data))
        
        //console.log(data);
    }

    catch(e){
        console.log("eroor "+e)
        dispatch(canclesubscribeFail("some thing went wrong please try again"))
        

    }

}