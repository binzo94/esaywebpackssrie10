import axios from 'axios'
import myconfig from '../../../../config/config.project'
import { Cookies } from 'react-cookie'
import {getMyStorage, removeMyStorage} from "../../utils/userHelper";
function http(url, data, method = 'post') {
  return new Promise((resolve, reject) => {
    axios[method](url, data)
      .then(res => {
        res && resolve(res)
      })
      .catch(error => reject(error))
  })
}

axios.interceptors.request.use(function (config) {
  // let token = getCookie("token")
  let token = getMyStorage('token')
  config.timeout = 20000

  // config.baseURL = 'https://yapi.z023.cn/mock/53'
  // config.baseURL = 'http://192.168.4.87:8083/api'

  config.baseURL = myconfig.BaseHost
  // config.baseURL = 'http://192.168.4.59:8083'
  // config.baseURL = 'http://192.168.4.75:8083'

  // config.baseURL = 'http://192.168.4.51:8083/api'
  // config.baseURL = 'http://192.168.4.60:8083/api'
  // config.baseURL = "192.168.4.63:8083/api"
  // config.baseURL = 'http://xcr.ngrok2.xiaomiqiu.cn/api/'
  
  // config.baseURL = "http://cic-cloud-api.z023.cn/api/"

  config.withCredentials = true
  if(config.url.indexOf('/login') === -1) {
    config.headers.token = token || ''
  }
  // if (config.url.indexOf('/company/selectByName') !== -1) {
  //   config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  // }
  // if (config.url === '/behavior/upload') {
  //   config.headers['Content-Type'] = 'multipart/form-data '
  // }
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (res) {
  return res
}, function (error) {
  if(error.response && error.response.status === 401) {

    location.reload()

    removeMyStorage('token')

    return false
  }
  return Promise.reject(error)
})

export const Http = {
  get: (url, params) => http(url, params ? {params: {...params}} : null, 'get'),
  post: (url, data) => http(url, {...data})
}
