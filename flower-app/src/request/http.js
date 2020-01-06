import axios from "axios"; // 引入axios

// 请求超时时间
axios.defaults.timeout = 10000;

//get方法，对应get请求, url （请求的url地址）、params （请求时携带的参数）
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

//post方法，对应post请求,url （请求的url地址）、params （请求时携带的参数）
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, JSON.stringify(params), {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "x-csrf-token": window._csrf
        }
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

//put方法
export function put(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .put(url, JSON.stringify(params), {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "x-csrf-token": window._csrf
        }
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

//delete方法
export function del(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, {
        params: params
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}
