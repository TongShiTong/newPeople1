import axios from "axios";
import { getToken, clearToken } from "@/store/user";

// create an axios instance
const service = axios.create({
  // baseURL: "http://t1.mengdigua.cn/",
  baseURL: "http://192.168.5.98:8087/",
  // baseURL: "https://api-test.mengdigua.cn/",
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    const token = getToken();
    if (token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.data["token"] = token;
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(11,error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data;

    // if the custom code is not 20000, it is judged as an error.
    if (res.errcode !== 0) {
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (
        res.errcode === 50008 ||
        res.errcode === 50012 ||
        res.errcode === 50014 ||
        res.errcode === 10000
      ) {
        // to re-login
        clearToken();
        // location.reload();
      }
      return Promise.reject(new Error(res.errmsg || "Error"));
    } else {
      return res.data;
    }
  },
  (error) => {
    console.log("err" + error); // for debug
    return Promise.reject(error);
  }
);

export default service;
