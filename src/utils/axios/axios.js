import axios from "axios";

const http = axios.create({
    baseURL:''
});

// 请求拦截
http.interceptors.request.use(req=>{
    // console.log(req);
    return req
})

// 响应拦截
http.interceptors.response.use(res=>{
    // console.log(res);
    return res
})

export default http