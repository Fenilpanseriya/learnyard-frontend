import { CourseFail, CourseRequest, CourseSuccess, addLectureFail, addLectureRequest, addLectureSuccess, getAllCoursesFail, getAllCoursesRequest, getAllCoursesSuccess, getCoursesFail, getCoursesRequest, getCoursesSuccess } from "../reducers/courseReducer";
import { Axios } from "../../Axios";

export const getAllCourses=(category,keyword)=>async(dispatch)=>{
    try{
        dispatch(getAllCoursesRequest());
        const {data}=await Axios.get(`/courses?category=${category}&keyword=${keyword}`,{
            headers:{
                "token":localStorage.getItem("token"),
            },
            withCredentials:true,
        })
        console.log(data?.courses);
        dispatch(getAllCoursesSuccess(data))
    }
    catch(e){
        dispatch(getAllCoursesFail("something went wrong"))
        

    }

}
export const getCourses=(id)=>async(dispatch)=>{
    try{
        dispatch(getCoursesRequest());
        const response=await Axios.get(`/course/${id}`,{
            headers:{
                "token":localStorage.getItem("token"),
            },
            withCredentials:true,
        })
        console.log(JSON.stringify(response.data));
        dispatch(getCoursesSuccess(response.data))
    }
    catch(e){
        dispatch(getCoursesFail("something went wrong"))
        

    }

}
export const addLecture=(id,public_id,secure_url,text,title)=>async(dispatch)=>{
    try{
        dispatch(addLectureRequest());
        const response=await Axios.post(`/course/${id}`,{public_id,secure_url,text,title},{
            headers:{
                "Content-Type":"application/json",
                "token":localStorage.getItem("token"),
            },
            withCredentials:true,
        })
        //console.log(data);
        dispatch(addLectureSuccess(response.data))
    }
    catch(e){
        dispatch(addLectureFail("something went wrong"))
        

    }

}

export const courseRequest=(email,name,course)=>async(dispatch)=>{
    try{
        dispatch(CourseRequest())
        const response=await Axios.post("/courserequest",{email,name,course},{
            headers:{
                "Content-Type":"application/json",
                "token":localStorage.getItem("token")
            },
            withCredentials:true
        })
        if(response.data.success){
            dispatch(CourseSuccess(response.data))
        }
    }
    catch(e){
            dispatch(CourseFail("some thing went wrong"));
    }
}