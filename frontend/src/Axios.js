import axios from 'axios'
import  store  from './REDUX/store';

const baseURL ='http://localhost:8080'
// const baseURL ='https://blog-test-1-april.herokuapp.com/'

axios.interceptors.request.use(
    config => {
        config.headers['authtoken'] = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null
        config.headers['Content-Type'] = 'application/json';
        config.withCredentials = true;
        config.baseURL = baseURL;
        return config;
    },
    error => {
        Promise.reject(error)
    });



axios.interceptors.response.use(
    response=>response,
    error=>{
        const originalRequest = error.config;

        // Prevent infinite loops
        if (error.response.status === 401 && originalRequest.url === `${baseURL}/api/user/refresh`) {
            window.location.href = '/';
            return Promise.reject(error);
        }

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            return axios.get(`${baseURL}/api/user/refresh`).then(res=>{
                if(res.status === 200){
                    localStorage.setItem('accessToken',res.data);
                    console.log(res.data)
                    axios.defaults.headers.common['authtoken'] = res.data
                    return axios(originalRequest)
                }
            })
        }
        return Promise.reject(error);
    }
)

