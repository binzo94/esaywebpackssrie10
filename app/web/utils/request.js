import {encrypt, decrypt, commonDecrypt,isEncrypt} from '../../utils'
import { extreme } from './extreme'
import { message } from 'antd';
import { showMessage } from '../component/notification/index'
import { removeToken,isCookiesEnabled } from './tokenHelper'
import 'isomorphic-fetch'
import cookie from 'js-cookie'
import _ from 'lodash'
import {getMyStorage} from "./userHelper";
const request =(api,params,method,headers,noToken,host)=>{



  // const Host = host?host:HOST

  
  const url = `${api}`
  // const ipAdress = cookie.get('ipAdressame')
    let javaS,phpS,keys,ivs
  if(isEncrypt){
      javaS = commonDecrypt(cookie.get('javaSession'))
      phpS = commonDecrypt(cookie.get('phpSession'))
      keys = javaS.split('')
      ivs = phpS.split('')
  }
  let header =''
  if(noToken){
    header={
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }else{
    let token = ''
    token = getMyStorage('token')
    header={
      Accept: 'application/json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'mytoken':token?token:''
      // 'address' : ipAdress

    }
  }
  let options={}
  if (method === 'GET') {
      console.log('GET请求',url)
    options = {credentials: "include",
      method,
      redirect: 'follow',
      headers:{...header}
    }
  } else {
    options = {
        credentials: "include",
      method,
      redirect: 'follow',
      headers:{...header},
      body: JSON.stringify(params)
      // body: params
    }
  }

  return new Promise((resolve, reject) => {
    try {

      fetch(url, options).then((res) => {
        console.log('Request:', res)

        if (res.redirected) {
          window.location.href = res.url
          return { code:'0',message:'请求完成',data:{
            code:'0',message:'请求完成'
          }}
        }
        return res.json()
      }).then(res => {
        console.log('Request Body JSON:', res)
        const code = _.get(res, 'code')
        if (code && code !== '0') {
          reject({message: _.get(res, 'message')})
        }
        // console.log('123fetch',JSON.stringify(res.res.requestUrls[0],res).indexOf('/user/add'))
        if(noToken){
          // if(JSON.stringify(res.res.requestUrls[0],res).indexOf('/user/add')!= -1){
          //   let tempParams = decrypt(res.data,keys,ivs)
          //   let resp = {data:JSON.parse(tempParams)}
          //   console.log('fetch',res.res.requestUrls,resp)
          //   resolve(resp)
          // }else{
            resolve(res)
          // }
        }else{
          // if(res.status == '500'&&res.code == 'ERR_SOCKET_TIMEOUT'){
          //   window.location.href = '/timeout.html'
          // }
          //捕获异常,如果cookie加密参数失效可能导致的异常
            let tempParams,resp
            try {
                if(isEncrypt){
                    tempParams = decrypt(res.data,keys,ivs)
                }else{
                    tempParams = res.data
                }

                resp = {data:isEncrypt?JSON.parse(tempParams):tempParams}
            }catch (e) {


            }

          console.log('返回的数据',resp)

          if(resp.data.code == '3'){
            showMessage(resp.data.message);
          }
          if(resp.data.code == '5'){
            message.warning({content:'登陆时间过期，请重新登陆',key:'unique'});
            setTimeout(()=>{
                removeToken()
            },1500)
            // ctx.redirect('/auth/login')
            // window.location.href = '/auth/login'
            // message.warning('token失效，请重新登陆');
            // console.log('token失效，请重新登陆')
          }
          if(resp.data.code == '8'){
            removeToken()
            message.warning({content:'该账号已在其他设备登陆，请重新登陆',key:'uniques'});
          }
          if(resp.data.code == 7){
            extreme()
          }
          resolve(resp)
        }
      })
    } catch (e) {
      console.log('Request Error:', e)
      reject(e)
    }


  })


}
export const NoTokenGet = (api, params, headers, domain) => {
  return request(api, params, 'GET', headers, true, domain)
}
export const NoTokenPost = (api, params, headers, domain) => {
  // if(api == '/auth/register'){
  //   const cookie = new Cookies()
  //   const keys = (cookie.get('javaSession')).split('')
  //   const ivs = (cookie.get('phpSession')).split('')
  //   console.log(1000000000,keys,ivs)
  //   let tempParams = {params:encrypt(JSON.stringify(params),keys,ivs)}
  //   console.log(7788965447788,params,tempParams)
  //   return request(api, tempParams, 'POST', headers, true, domain)
  // }else{
    return request(api, params, 'POST', headers, true, domain)
  // }
}
export const Get = (api, params, headers) => {
  // let tempParams = encrypt(params)
    if(!isEncrypt){
        return request(api, params, 'GET', headers)
    }else{
        const javaS = commonDecrypt(cookie.get('javaSession'))
        const phpS = commonDecrypt(cookie.get('phpSession'))
        const keys = javaS.split('')
        const ivs = phpS.split('')
        let fullApi = ''
        const tempApi = (api.split('')).map( (item) => {
            if(item === ':'){
                fullApi = api.split(':')[0]+':'+encrypt(api.split(':')[1],keys,ivs)
            }
        })
        console.log('ooooooot',fullApi)
        // console.log(104,tempApi)
        if(fullApi === ''){
            return request(api, params, 'GET', headers)
        }else{
            return request(fullApi, params, 'GET', headers)
        }
    }

}
export const Post = (api, params, headers) => {
  let tempParams
    console.log('请求参数',params)
  if(isEncrypt){
      const javaS = commonDecrypt(cookie.get('javaSession'))
      const phpS = commonDecrypt(cookie.get('phpSession'))
      const keys = javaS.split('')
      const ivs = phpS.split('')
    tempParams = {params:encrypt(JSON.stringify(params),keys,ivs)}
  }else{
    tempParams=params
  }
  return request(api, tempParams, 'POST', headers)
}
export const Put = (api, params, headers) => {
  return request(api, params, 'PUT', headers)
}
export const Delete = (api, params, headers) => {
  return request(api, params, 'DELETE', headers)
}
