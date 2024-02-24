import axios from "axios"



console.log(process.env.BASE_URL);
export const Axios=axios.create({
    baseURL: "https://learnyard121.onrender.com" || "http://localhost:6060/api/v1",
    withCredentials:true
})
