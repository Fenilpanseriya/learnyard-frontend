import axios from "axios";
import { Axios } from "../../Axios";
import { changePasswordFail, changePasswordRequest, changePasswordSuccess, changeProfileFail, changeProfilePictureFail, 
    changeProfilePictureRequest, changeProfilePictureSuccess, changeProfileRequest, changeProfileSuccess } from "../reducers/profileReducer";
import {  addToPlaylistFail, addToPlaylistRequest, addToPlaylistSuccess, forgetPasswordFail, forgetPasswordRequest, forgetPasswordSuccess, registerSuccess ,removePlaylistFail,removePlaylistRequest,removePlaylistSuccess,resetPasswordFail,resetPasswordRequest,resetPasswordSuccess} from "../reducers/userReducer";
import { getMyProfile } from "./user";

export const changePassword=(newpassword,oldpassword)=>async(dispatch)=>{
    
    try{
        dispatch(changePasswordRequest())
        
        const {data}=await Axios.put("/changePassword",{
            newpassword,oldpassword,
        },{
            headers:{
                "Content-Type":"application/json",
                "token":localStorage.getItem("token"),
                
            },
            withCredentials:true,
        })
        console.log("data "+JSON.stringify(data));
        dispatch(changePasswordSuccess(data.message))
        
        //console.log(data);
    }

    catch(e){
        dispatch(changePasswordFail(e.response.data.message))
        

    }

}

export const changeProfile=(formData)=>async(dispatch)=>{
    
    try{
        dispatch(changeProfileRequest())
        console.log("in change profilr "+ JSON.stringify(formData));
        const {data}=await Axios.put("/updateProfile",formData,{
           
            headers:{
                "Content-Type":"multipart/form-data",
                "token":localStorage.getItem("token"),
            },
            withCredentials:true,
        })
        if(data.success){
            console.log("user 1 "+JSON.stringify(data.user));
            dispatch(changeProfileSuccess("Update profile"))
            dispatch(registerSuccess(data))
            dispatch(changeProfileSuccess(data))
            return true;
        }
        
        
        //console.log(data);
    }

    catch(e){
        dispatch(changeProfileFail(e.response.data.message))
        

    }
}

export const changeProfilePicture=(formData)=>async(dispatch)=>{
    
    try{
        dispatch(changeProfilePictureRequest())
        
        const {data}=await Axios.put("/updateProfilePicture",formData
        ,{
            headers:{
                "Content-Type":"multipart/form-data",
                "token":localStorage.getItem("token"),
                
            },
            withCredentials:true,
        })
        console.log("data "+JSON.stringify(data));
        dispatch(registerSuccess(data))
        dispatch(changeProfilePictureSuccess(data));
        
        //console.log(data);
    }

    catch(e){
        dispatch(changeProfilePictureFail("some thing went wrong"))
        

    }

}
export const forgetPassword=(email)=>async(dispatch)=>{
    
    try{
        dispatch(forgetPasswordRequest())
        
        const {data}=await Axios.post("/forgetPassword",{
            email
        },{
            headers:{
                "Content-Type":"application/json",
                "token":localStorage.getItem("token"),
                
            },
            withCredentials:true,
        })
        console.log("data "+JSON.stringify(data));
        dispatch(forgetPasswordSuccess(data.message))
        
        //console.log(data);
    }

    catch(e){
        dispatch(forgetPasswordFail(e.response.data.message))
        

    }

}

export const resetPassword=(password,token)=>async(dispatch)=>{
    
    try{
        dispatch(resetPasswordRequest())
        
        const {data}=await Axios.put(`/resetPassword/${token}`,{
            password
        },{
            headers:{
                "Content-Type":"application/json",
                "token":localStorage.getItem("token"),
                
            },
            withCredentials:true,
        })
        console.log("data "+JSON.stringify(data));
        dispatch(resetPasswordSuccess(data.message))
        return true;
        //console.log(data);
    }

    catch(e){
        dispatch(resetPasswordFail("invalid token for Reset password"))
        

    }

}


export const removePlaylist=(id)=>async(dispatch)=>{
    
    try{
        dispatch(removePlaylistRequest())
        
        const {data}=await Axios.post(`/removefromplaylist`,{id},{
            headers:{
                "Content-Type":"application/json",
                "token":localStorage.getItem("token")
            },
            withCredentials:true,
        })
        console.log("data "+JSON.stringify(data));
        dispatch(removePlaylistSuccess(data))
        dispatch(getMyProfile());

        
        return true;
        //console.log(data);
    }

    catch(e){
        dispatch(removePlaylistFail("some thing went wrong, Please try again"))
        

    }

}

export const addToPlaylist=(id)=>async(dispatch)=>{
    
    try{
        dispatch(addToPlaylistRequest())
        
        const {data}=await Axios.post("/playlist",{id},{
            headers:{
                "Content-Type":"application/json",
                "token":localStorage.getItem("token")
            },
            withCredentials:true,
        })
        console.log("data "+JSON.stringify(data));
        dispatch(addToPlaylistSuccess(data))
        
        return true;
        //console.log(data);
    }

    catch(e){
        dispatch(addToPlaylistFail("some thing went wrong, Please try again"))
        

    }

}
