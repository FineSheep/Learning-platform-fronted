import axios from "axios";
import router from "@/router/routes";
import {message} from 'ant-design-vue'
// Set config defaults when creating the instance
const myAxios = axios.create({
    baseURL: 'http://127.0.0.1:8080',

});
myAxios.defaults.withCredentials = true; // 允许携带 cookie
// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
    config.headers.token = localStorage.getItem('token')
    console.log("我要发送请求了,", config)
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    console.log("我收到你的响应了,", response)
    if (response.headers.token != undefined) {
        localStorage.setItem("token", response.headers.token);
    }
    if (response.data.code == 40001) {
        // alert("ssss")
        message.error("登录信息过期，请重新登录")
        router.replace("/LoginRegister")
    }
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default myAxios;