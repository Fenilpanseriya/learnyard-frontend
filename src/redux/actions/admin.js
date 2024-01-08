import { Axios } from "../../Axios";
import { changeRoleFail, changeRoleRequest, changeRolesuccess, deleteLectureFail, deleteLectureRequest, deleteLectureSuccess, deleteUserRequest, deleteUserSuccess, getDashboardStatsRequest, getDashboardStatsSuccess, setUsers } from "../reducers/adminReducer";
import { createCourseFail, createCourseRequest, createCourseSuccess, getCoursesSuccess } from "../reducers/courseReducer";

export const lectureDelete=(lactureId,courseId)=>async(dispatch)=>{
    try{
        dispatch(deleteLectureRequest());
        const response=await Axios.get(`/lecture?lectureId=${lactureId}&courseId=${courseId}`,{
            headers:{
                "token":localStorage.getItem("token"),
               
            },
            withCredentials:true,
        })
        //console.log(data);
        dispatch(deleteLectureSuccess(response.data))
        dispatch(getCoursesSuccess(response.data))
    }
    catch(e){
        dispatch(deleteLectureFail("something went wrong!!!!"))
        

    }
}
export const courseCreate=(formData)=>async(dispatch)=>{
    
    try{
        dispatch(createCourseRequest())
        console.log(formData);
        const response=await Axios.post("/createcourses",formData,{
           
            headers:{
                "Content-Type":"multipart/form-data"
                
            },
            withCredentials:true,
        })
        if(response.data.success){
            
            dispatch(createCourseSuccess(response.data))
            return true;
        }
        
        
        //console.log(data);
    }

    catch(e){
        dispatch(createCourseFail(e))
        

    }
}

export const roleUpdate=(id,token)=>async(dispatch)=>{
    try{
        dispatch(changeRoleRequest());
        console.log(token);
        const response=await Axios.put(`/admin/user/${id}/${token}`,{
            headers:{
                "token":localStorage.getItem("token"),
            },
            withCredentials:true,
        })
        if(response.data.success){
            dispatch(changeRolesuccess(response.data));

        }
    }

    catch(e){
        dispatch(changeRoleFail(e));
        

    }

}
export const getAllUsers=(token)=>async(dispatch)=>{
    try{
        
        const response=await Axios.get("/admin/users",{
            headers:{
                "token":await localStorage.getItem("token")
            },
            withCredentials:true
        })
        if(response.data.success){
            dispatch(setUsers(response.data?.users))
            return response.data.users;
            
        }

    }
    catch(e){
        console.log(e);
    }
}
export const userDelete=(id)=>async(dispatch)=>{
    try{
        dispatch(deleteUserRequest());
        const response=await Axios.delete(`/admin/user/${id}`,{
            headers:{
                "token":localStorage.getItem("token")
            },
            withCredentials:true
        })
        if(response.data.success){
            dispatch(deleteUserSuccess(response.data));
            
        }

    }
    catch(e){
        dispatch(deleteLectureFail(e));
    }
}

export const getAdminDashboardStats=()=>async(dispatch)=>{
    try{
        dispatch(getDashboardStatsRequest());
        const response=await Axios.get("/admin/stats",{
            headers:{
                "token":localStorage.getItem("token")
            },
            withCredentials:true
        })
        if(response.data.success){
            dispatch(getDashboardStatsSuccess(response.data));
            
        }

    }
    catch(e){
        dispatch(getDashboardStatsSuccess(e));
    }
}

