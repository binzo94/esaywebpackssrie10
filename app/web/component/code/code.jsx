import React,{ useState } from 'react'
import { Input,Form,Button } from 'antd';
import _ from 'lodash'

import { showMsg,showErrorMsg } from '../notification/index'
import { NoTokenPost,Post } from '../../utils/request'
import './code.css'

export default (props)=>{

  const [text,setText] = useState('获取验证码')
  const [isSending,setIsSending] = useState(false)
  const [count,setCount] = useState(89)
  const [loading,setLoading] = useState(false)


  const countDown = async (tCount)=>{
    await setTimeout(()=>{
      if(tCount>1){
        setText(tCount-1)
        setCount(tCount)
        countDown(tCount-1)
      }else{
        setText('获取验证码')
        setCount(89)
        setIsSending(false)
        setLoading(false)
      }

    },1000)

  }
  const sendCode = async ()=>{
    if(isSending) {
      showErrorMsg('距离上次发送未超过1分')
      return null
    }
    setIsSending(true)
    setLoading(true)
    const { getTel,type=0, validate } = props

    const tel = getTel()

      try {
        const validateRes = await validate()
        try {
          const res = await Post('/auth/sendMsg', {tel, type})
          const {data} = res
          if (_.get(data, 'code') !== '0') {
            showErrorMsg(_.get(data, 'message', '发送失败，请稍后再试！'))
          } else {
            showMsg('发送成功！')
          }
        } catch (e) {
          setIsSending(false)
          setLoading(false)
          showErrorMsg(_.get(e, 'message', '发送失败，请稍后再试！'))
        }


        setText(count)
        countDown(count)
      } catch (e) {
        setIsSending(false)
        setLoading(false)
      }



  }

  return (
    <Input {...props} placeholder={'请输入短信验证码'} className={'mobileInput'} addonAfter={<Button onClick={sendCode} type={'link'} loading={loading} className={'code-btn'}> {`${text}${text<90?'s':''}`}</Button>}/>
  )
}
