import axios from 'axios'
import {commonDecrypt, decrypt, encrypt,isEncrypt} from "../../../utils";
import { Cookies } from 'react-cookie'
import myconfig from '../../../../config/config.project'
import {getMyStorage, removeMyStorage} from "../../utils/userHelper";
function https(url, data, method = 'post') {
  return new Promise((resolve, reject) => {
    axios[method](url, data)
      .then(res => {
        res && resolve(res)
      })
      .catch(error => reject(error))
  })
}

axios.interceptors.request.use(function (config) {
  let token = getMyStorage('token')||''
  config.timeout = 100000

  // config.baseURL = 'https://yapi.z023.cn/mock/53'
  config.baseURL = myconfig.BaseHost
  // config.baseURL = 'http://192.168.4.59:8083'
  // config.baseURL = 'http://192.168.4.40:8083/api'
  // config.baseURL = 'http://xcr.ngrok2.xiaomiqiu.cn/api/'

  config.withCredentials = true
  if(config.url.indexOf('/login') === -1) {
    config.headers.token = token || ''
  }
  if (config.url.indexOf('/combination/comparisonExport') !== -1 || config.url.indexOf('/combination/searchExport')!==-1) {
    config.responseType = 'blob'
  }
  // if (config.url === '/behavior/upload') {
  //   config.headers['Content-Type'] = 'multipart/form-data '
  // }
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (res) {
  // if (config.url.indexOf('/combination/comparisonExport') !== -1) {
  //   response.type['Content-Type'] = 'blob'
  // }
  return res
}, function (error) {
  console.log('请求出错',error)
  if(error.response && error.response.status === 401) {
    location.reload()
    Object.keys(localStorage).forEach((item, i, store) => {
      if(i === store.length - 1) alert('token过期或失效,请重新登录')
      removeMyStorage('token')
    })
    return false
  }
  return Promise.reject(error)
})
var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};
function ObjToStr(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return Object.keys(obj).map(function(k) {
      var ks =stringifyPrimitive(k) + eq;
      if (Array.isArray(obj[k])) {
        return obj[k].map(function(v) {
          return ks + stringifyPrimitive(v);
        }).join(sep);
      } else {
        return ks + stringifyPrimitive(obj[k]);
      }
    }).join(sep);

  }

  if (!name) return '';
  return stringifyPrimitive(name) + eq +
      stringifyPrimitive(obj);
};
export const Https = {
  get: (url, params) => {

    if(isEncrypt){
      const cookie = new Cookies()
      const javaS = commonDecrypt(cookie.get('javaSession'))
      const phpS = commonDecrypt(cookie.get('phpSession'))
      const keys = javaS.split('')
      const ivs = phpS.split('')
      console.log(params)
      let str= ObjToStr(params)
      console.log(str)
      str=encrypt(str,keys,ivs)
      url+='?'+str
      return https(url, null, 'get')
    }else{
      let str= ObjToStr(params)
      url+='?'+str
      return https(url, null, 'get')
    }

  },
  post: (url, data) =>{
    let params = data
    if(isEncrypt){
      const cookie = new Cookies()
      const javaS = commonDecrypt(cookie.get('javaSession'))
      const phpS = commonDecrypt(cookie.get('phpSession'))
      const keys = javaS.split('')
      const ivs = phpS.split('')
      params = {params:encrypt(JSON.stringify(data),keys,ivs)}
    }
    return https(url, {...params})
  }
}
