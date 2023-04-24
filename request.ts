/*
 * @Author: zss 1085383404@qq.com
 * @Date: 2022-11-07 09:14:04
 * @LastEditors: zhangshusen 18813622583@163.com
 * @LastEditTime: 2023-02-07 17:17:10
 * @FilePath: \home-school\admin\src\utils\request.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import { localStorage } from '@/utils/storage';
import useStore from '@/store';

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
});

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (!config.headers) {
      throw new Error(
        `Expected 'config' and 'config.headers' not to be undefined`
      );
    }
    const { user } = useStore();
    if (user.token) {
      config.headers['X-Auth-Token'] = `${localStorage.get('token')}`;
      config.headers.SchoolId = `${
        localStorage.get('currentSchools').school_id
      }`;
      config.headers.RoleType = `${localStorage.get('RoleType')}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, message } = response.data;
    if (code === 0 || code === -1000) {
      return response.data;
    } else {
      // 响应数据为二进制流处理(Excel导出)
      if (response.data instanceof ArrayBuffer) {
        return response;
      }

      ElMessage({
        message: message || '系统出错',
        type: 'error'
      });
      return Promise.reject(new Error(message || 'Error'));
    }
  },
  error => {
    const { code, msg } = error.response.data;
    if (code === 'A0230') {
      // token 过期
      localStorage.clear(); // 清除浏览器全部缓存
      window.location.href = '/'; // 跳转登录页
      ElMessageBox.alert('当前页面已失效，请重新登录', '提示', {});
    } else {
      ElMessage({
        message: msg || '系统出错',
        type: 'error'
      });
    }
    return Promise.reject(new Error(msg || 'Error'));
  }
);

// 导出 axios 实例
export default service;
