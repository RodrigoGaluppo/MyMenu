import axios from "axios"
import { parseCookies } from "nookies"

const api = axios.create({
    //https://my--menu.herokuapp.com/
    baseURL:"https://paraisodapenha.herokuapp.com/" ,
})

const cookies = parseCookies()

api.interceptors.request.use((config) => {

    if(!!cookies["@paraisoMenu:token"])
    {
        const token = cookies["@paraisoMenu:token"]
        if(!!config.headers)
        {
            config.headers.Authorization = `Bearer ${token}`
        }
    }
    
    return config;
})



export default api