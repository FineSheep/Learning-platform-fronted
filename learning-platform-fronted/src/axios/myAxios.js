import axios from "axios";
import router from "@/router/routes";
import {message} from 'ant-design-vue'
// Set config defaults when creating the instance
const isDev = process.env.NODE_ENV === 'development';
//todo 更换地址
const myAxios = axios.create({
    baseURL: isDev ? 'http://127.0.0.1:9001' : '',

});
myAxios.defaults.withCredentials = true; // 允许携带 cookie
// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
    config.headers.token = localStorage.getItem('token')

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    // 对响应数据做点什么

    if (response.headers.token != undefined) {
        localStorage.setItem("token", response.headers.token);
    }
    if (response.data.code == 40001) {
        message.error("登录信息过期，请重新登录")
        router.replace("/LoginRegister")
    }
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default myAxios;