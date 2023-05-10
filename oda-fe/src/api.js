import axios from 'axios'
const url = 'http://localhost:8000'

const OdaApiService = axios.create({
    baseURL:url,
    headers:{
        'Content-Type':'application/json'
    }
});

OdaApiService.interceptors.request.use(
    config=>{
        let token = sessionStorage.getItem('token')
        if(token)
        config.headers.Authorization =`Bearer ${token}`
        return config
    },
    error=>Promise.reject(error)
)
export default OdaApiService