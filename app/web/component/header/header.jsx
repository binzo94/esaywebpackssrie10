import React, { Component } from 'react'
import _ from 'lodash'

import './hd.css'
import logo from '../../asset/images/WechatIMG4.png'
import { getUser, removeToken } from '../../utils/tokenHelper'
import { getNickName } from '../../utils/tokenHelper'
import { isSafeObj } from '../../utils/objectHelper'
import {isVip} from '../../utils/userHelper';
import Vip from '../../asset/images/auth/vipMemberIn.png'
import noVip from '../../asset/images/auth/member.png'
import { Tooltip } from 'antd'
import Icon from '../../component/icon/icon';
import Icons from '../../asset/images/auth/quitIn.png'
import { Http } from '../../component/baseWrb/http';
import axios from 'axios'

export const Headers = ({
  // isLogin,
  // user,
  pageList,
  nickName = {}
}) => {
  let [visible, setVisible] = React.useState(false)
  // let [logo, setLogo] = React.useState('')
  const [login, setlogin] = React.useState(false)
  const [user, setuser] = React.useState({})
  const [names, setNames] = React.useState('')
  const [isvip,setIsvip]=React.useState(false)
  let dropdown = React.useRef(null)
  let listenEnter, listenLeave
  React.useEffect(() => {
    let { current } = dropdown
    if (current) {
      current.addEventListener('mouseenter', listenEnter = () => {
        setVisible(true)
      })
      current.addEventListener('mouseleave', listenLeave = () => {
        setVisible(false)
      })
      return () => {
        current.removeEventListener('mouseenter', listenEnter)
        current.removeEventListener('mouseleave', listenLeave)
      }
    }
  }, [dropdown.current])

  React.useEffect(() => {
    const user = getUser();
    setuser(user);
    setlogin(!isSafeObj(user));
    setNames(getNickName())
    setIsvip(isVip())
  }, [])

  const toHome = () => {
    window.location = '/'
  }    


  const logout = ()=>{
    removeToken()
  }
  var imgs = isvip?Vip:noVip
  return (
    <div className="header">
      <div className="header-fixed">
        <div className="header-ct">
          <p className="logo"><img style={{ cursor: 'pointer',width:'104px' }} onClick={toHome} src={logo} /></p>
          <div className="dropdown-ct" ref={dropdown}>
            <div className="dropdown"

            >
              快速查询
            {
                visible&&<p className="drop-menu" style={{background:'rgba(255,255,255,1)'}}>
                  <a href="/search/company">查企业</a>
                  <a href="/search/qualification">查资质</a>
                  <a href="/search/performance">查业绩</a>
                  <a href="/search/constructing">查在建</a>
                  <a href="/search/person">查人员</a>
                  {/*<a href="/search/tendering">查招标</a>*/}
                  <a href="/search/honor">查荣誉</a>
                  <a href="/search/bad">查不良</a>
                  <a href="/search/combination">组合搜索</a>
                </p>
              }
            </div>
          </div>
          {
            login ?
            <React.Fragment>
                <p className="account-ct">
                  <a href={'/auth/login?'+'redirectUrl='+encodeURIComponent(window.location.href)}>登录</a>
                  <span>|</span>
                  <a href="/auth/register">注册</a>
                </p>
                <div className="right">
                 <p>
                   <a href="#" className={'a-hov'} href={'/service'}>服务介绍</a>
                   <span>|</span>
                   <span href="#" className={'a-hov'}>客服热线: 4006662221</span>
                 </p>
                </div> 
              </React.Fragment>
              : 
                <p className="user">
                  {
                    isvip?
                    <div style={{display:'flex',flexFlow:'row'}}>
                      <img src={Vip} style={{ height:'1.25rem',width:'1.25rem',marginRight:10 }}/>
                      <a href={'/users'} style={{color:'#2b64f1'}}>{nickName.nickName || names || _.get(user, 'username', '')}</a>
                      <a onClick={logout} style={{color:'#2B64F1',marginLeft:'5px'}}> 
                        <Tooltip title="退出">
                          <img src={Icons} style={{ fontSize:'1.25rem',color:'#fff'}}></img>
                        </Tooltip>
                      </a>
                      <p style={{marginLeft:'20px',marginBottom:'0px'}}>
                        <a href="#" className={'a-hov'} href={'/service'}>服务介绍</a>
                        <span style={{margin:'0 12px'}}>|</span>
                        <span href="#" className={'a-hov'}>客服热线: 4006662221</span>
                      </p>
                    </div>:
                    <div style={{display:'flex',flexFlow:'row'}}>
                      <img src={noVip} style={{ height:'1.25rem',width:'1.25rem',marginRight:10 }}/> 
                      <a href={'/users'} style={{color:'#2b64f1'}}>{nickName.nickName || names || _.get(user, 'username', '')}</a>
                      <a onClick={logout} style={{color:'#2B64F1',marginLeft:'5px'}}> 
                        <Tooltip title="退出">
                          <img src={Icons} style={{ fontSize:'1.25rem',color:'#fff'}}></img>
                        </Tooltip>
                      </a>
                      <p style={{marginLeft:'20px',marginBottom:'0px'}}>
                        <a href="#" className={'a-hov'} href={'/service'}>服务介绍</a>
                        <span style={{margin:'0 12px'}}>|</span>
                        <span href="#" className={'a-hov'}>客服热线: 4006662221</span>
                      </p>
                    </div>
                  }
                </p>
          }

          {/* <div className="right">
            <p>
              <a href="#" className={'a-hov'}>服务介绍</a>
              <span>|</span>
              <a href="#" className={'a-hov'}>客服热线: 4006662221</a>
            </p>
          </div> */}
        </div>
      </div>
    </div>
  )
}
