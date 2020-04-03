import React, { Component } from 'react';
import './userLayout.css'
import Head from '../../../asset/head.png'
import Vip from '../../../asset/vip.png'
import SideMenu from '../../users/sideMenu';
import _ from 'lodash'
import { Http } from '../../../component/baseWrb/http';
import UserInfo from './components/userInfo'
import { LocaleProvider } from 'antd'
import moment from 'moment';
import 'moment/locale/zh-cn';
import zh_CN from 'antd/es/locale-provider/zh_CN';

import EnterpriseCertification from '../../../page/enterpriseCertification/enterpriseCertification'
import SubAccount from '../../../page/subAccount/subAccount'
import ChangePassword from '../../../page/users/changePassword'

import Information from '../../../page/users/information'
import Collection from '../../../page/collection/collection'
import Customized from '../../../page/users/customized'
import { Get,Post } from '../../../utils/request';



moment.locale('zh-cn');

export default class example extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: '',
      index:2
    }
  }

  componentDidMount() {
    this.getInfo()
  }

  getInfo = async() => {
    var that = this
    const res = await Post('/users/subInforGet')
    that.setState({
      data: _.get(res, 'data.content')
    })
  }

  ChangeIndex=(val)=>{
    this.setState({
      index:val
    })
  }

  render() {
    return <LocaleProvider locale={zh_CN}><div style={{ width: "100%", minHeight: "500px" }}>
      {
        _.get(this.state, "data") == '' ? <div></div> :
          <div style={{ width: "1200px", margin: "auto", marginTop: "20px", minHeight: "450px" }}>
            <div style={{ width: "1200px", height: "170px", marginBottom: '20px' }}>
              <UserInfo data={_.get(this.state, "data")} />
            </div>
            <div>
              <div style={{ width: "200px", float: "left", minHeight: "300px", height: "auto", marginBottom: "30px" }}>
                <SideMenu data={_.get(this.state, "data")} changeIndex={(val)=>this.ChangeIndex(val)}/>
              </div>
              <div style={{ width: '970px', float: "right", minHeight: '250px', height: "auto" }}>
                {/* {this.props.children} */}
                {
                  _.get(this.state,"index")==1?
                  <ChangePassword />: 
                  _.get(this.state,"index")==2?
                  <Information />:
                  _.get(this.state,"index")==3?
                  <EnterpriseCertification id={_.get(this.state,"data.companyId")||"none"} status={_.get(this.state,"data.status")||"none"}/>:
                  _.get(this.state,"index")==5?
                  <Customized />:
                  _.get(this.state,"index")==6?
                  <SubAccount id={_.get(this.state,"data.companyId")}/>:
                  _.get(this.state,"index")==7?
                  <Collection />:""
                }
              </div>
              <div style={{ clear: 'both' }}></div>
            </div>
          </div>
      }
    </div>
    </LocaleProvider>;
  }
}