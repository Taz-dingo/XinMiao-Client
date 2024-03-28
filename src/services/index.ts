// 请求封装文件

import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

// 项目配置文件

// 基础URL
// export const baseURL : string = "http://localhost:3000";
// Apifox 云端Mock
// export const baseURL : string = "https://mock.apifox.com/m1/4022001-0-default";

// 本地URL
// const IP = "192.168.31.64";
// export const IP = "10.201.14.52";
// export const IP = "10.201.12.137";
export const IP = "localhost";

export const baseURL: string = `http://${IP}:8888`;
// 阿里云OSS配置
export const OSSBaseURL: string = `https://newgoodwork.oss-cn-hangzhou.aliyuncs.com`;

// 请求超时时间
export const timeout: number = 10000;

// 创建一个自定义的 Axios 实例
const instance: AxiosInstance = axios.create({
  baseURL: baseURL, // 设置基本的请求地址
  timeout: timeout, // 设置请求超时时间
});

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在发送请求之前做一些处理，例如添加请求头信息
    // config.headers.Authorization = 'Bearer token123';
    console.log("请求配置", JSON.stringify(config));
    return config;
  },
  (error: AxiosError) => {
    // 请求错误时做一些处理
    console.error("请求错误：" + error);
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 如果有Authorization直接返回response
    if (response.headers['authorization']) {
      console.log("响应拦截|Authorization: " + response.headers['authorization']);
      return response
    }

    // 对响应数据进行处理，例如解析返回的数据
    const data = response.data;
    const status = response.status;
    console.log("响应拦截|status: " + status);
    console.log("响应拦截|data: " + JSON.stringify(data));
    // 处理自己的业务逻辑，比如判断 token 是否过期等等
    // 返回response.data 
    return data;
  },
  (error: AxiosError) => {
    // 响应错误时做一些处理
    let message = "";
    if (error && error.response) {
      switch (error.response.status) {
        case 302:
          message = "接口重定向了！";
          break;
        case 400:
          message = "参数不正确！";
          break;
        case 401:
          message = "您未登录，或者登录已经超时，请先登录！";
          break;
        case 403:
          message = "您没有权限操作！";
          break;
        case 404:
          message = `请求地址出错: ${error.response.config.url}`;
          break;
        case 408:
          message = "请求超时！";
          break;
        case 409:
          message = "系统已存在相同数据！";
          break;
        case 500:
          message = "服务器内部错误！";
          break;
        case 501:
          message = "服务未实现！";
          break;
        case 502:
          message = "网关错误！";
          break;
        case 503:
          message = "服务不可用！";
          break;
        case 504:
          message = "服务暂时无法访问，请稍后再试！";
          break;
        case 505:
          message = "HTTP 版本不受支持！";
          break;
        default:
          message = "异常问题，请联系管理员！";
          break;
      }
    }
    console.log(error);
    return Promise.reject(message);
  }
);

export default instance;