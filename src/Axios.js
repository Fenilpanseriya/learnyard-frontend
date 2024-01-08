import axios from "axios"



console.log(process.env.BASE_URL);
export const Axios=axios.create({
    baseURL:process.env.REACT_APP_BASE_URL ||"http://localhost:6060/api/v1",
    withCredentials:true
})
