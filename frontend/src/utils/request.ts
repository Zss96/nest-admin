import { message } from 'ant-design-vue';
import axios, { type InternalAxiosRequestConfig, type AxiosResponse } from 'axios'


//创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

//请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (!config.headers) {
      throw new Error(
        `请求头不能为空`
      );
    }
    return config;
  },
  error=>{
    return Promise.reject(error)
  }
)

//响应拦截器
service.interceptors.response.use(
  (response:AxiosResponse)=>{
    const {code,message} = response.data
    if(code===0){
      return response.data
    }else {
      message.error(message);
      return Promise.reject(new Error(message||'系统出错'))
    }
  },
  error =>{
    const {message} = error.response.data
    message.error(message);
    return Promise.reject(new Error(message || 'Error'))
  }
)

// 导出 axios 实例
export default service;