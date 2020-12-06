/*
  封装axios拦截器
*/
import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Message } from "element-ui";
import getUserTempId from "./getUserTempId";

const instance = axios.create({
  baseURL: "/api",
  headers: {}
});
// 在内存中缓存一份localStorage数据，让性能更好
const userTempId = getUserTempId();
// 设置请求拦截器
instance.interceptors.request.use(config => {
  NProgress.start();
  // 设置请求头
  config.headers.userTempId = userTempId;
  return config;
});
// 设置响应拦截器
instance.interceptors.response.use(
  response => {
    NProgress.done();
    if (response.data.code === 200) {
      return response.data.data;
    }
    const { message } = response.data;
    Message.error(message);
    return Promise.reject(message, "这里错误");
  },
  error => {
    NProgress.done();
    const message = error.message || "网络错误";
    return Promise.reject(message);
  }
);

export default instance;
