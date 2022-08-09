import axios from "axios";
// 创建axios 赋值给常量service
import { ElMessage } from "element-plus";
const service = axios.create({
  headers: {
    "Cache-Control": "no-cache",
  },
});
// 添加请求拦截器（Interceptors）
service.defaults.headers.post["Content-Type"] =
  "application/json;charset=UTF-8";
export const BASE_NAME = "/lzzApis_V2";
export const BASE_FILE_NAME = "/fileApi";

export const LOCAL_STORAGE = "lzz_V2_token_local_storage";

export const ResponseCode = {
  success: 200,
};
service.interceptors.request.use(
  function (config) {
    config.headers["CUSTOMIZE-CLIENT-TYPE"] = "web";
    const token = sessionStorage.getItem(LOCAL_STORAGE);
    if (token) {
      // config.params = { token: token } 如果要求携带在参数中
      config.headers.Authorization = `Bearer ${token}`;
    }
    // 发送请求之前做写什么
    return config;
  },
  function (error) {
    // 请求错误的时候做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    if (error && error.response) {
      // 1.公共错误处理
      // 2.根据响应码具体处理
      switch (error.response.status) {
        case 400:
          error.message = "错误请求";
          break;
        case 401:
          error.message = "token失效，请重新登录";
          sessionStorage.removeItem(LOCAL_STORAGE);
          router.replace({
            path: "/login",
          });
          break;
        case 403:
          error.message = "拒绝访问";
          break;
        case 404:
          error.message = "请求错误,未找到该资源";
          break;
        case 405:
          error.message = "请求方法未允许";
          break;
        case 408:
          error.message = "请求超时";
          break;
        case 500:
          error.message = "服务器端出错!请稍后再试";
          break;
        case 501:
          error.message = "网络未实现";
          break;
        case 502:
          error.message = "网络错误";
          break;
        case 503:
          error.message = "服务不可用";
          break;
        case 504:
          error.message = "网络超时";
          break;
        case 505:
          error.message = "http版本不支持该请求";
          break;
        default:
          error.message = `连接错误${error.response.status}`;
      }
    } else {
      // 超时处理
      if (JSON.stringify(error).includes("timeout")) {
        error.message = "服务器响应超时";
      }
      error.message = "连接服务器失败";
    }
    ElMessage.error(error.message);
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default service;
