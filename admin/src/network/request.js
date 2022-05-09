
import axios from 'axios'
import { MessageBox } from 'element-ui'
import { logout } from '@/network/api/account'

const instance = axios.create({
  // baseURL: 'http://127.0.0.1:8081',
  baseURL: 'http://43.138.40.155',
  withCredentials: true,
  crossDomain: true,
  timeout: 10000
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么

  const res = response.data

  if (res.resultCode !== '100000' && res) {
    if(res.resultCode === '900102'){
      MessageBox.alert(res.resultMessage, '提示', {
        type: 'warning'
      }).then(async() => {
      })
    }else if(res.resultCode === '999997'){
      console.log("我没登录")
      logout().then(() => {
        window.location.href = '/'
      }).catch(() => {
      })
      return res
    }else{
      MessageBox.alert(res.resultMessage, '提示', {
        type: 'error'
      }).then(async() => {
      })
      return res
    }
  } else {
    return res
  }

  return res;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default instance
