import React, { Component } from 'react';
import './userInfo.css'
import Head from '../../../../asset/headPortrait.png'
import Vip from '../../../../asset/vip.png'
import { Http } from '../../../../component/baseWrb/http';
import { NoTokenPost,Post,Get } from '../../../../utils/request';
import _ from 'lodash'

export default class example extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            datas: []
        }
    }
    queryCompanyName = async(id) =>{
        console.log(231231313131312312312,id)
        const res = await Get(`/users/getCompany:${id}`)
        this.setState({
            datas: res.data.content
        })
    }
    componentDidMount() {
        this.setState({
            data:_.get(this.props,"data")
        })
        setTimeout(()=>{
            if(_.get(this.state,"data.companyId") !== undefined){
                this.queryCompanyName(_.get(this.state,"data.companyId"))
            }
        },200)
    }
    componentWillReceiveProps(nextProps,curProps){
        this.setState({
            data:_.get(nextProps,"data")
        })
        if(_.get(nextProps,"data.companyId") !== undefined){
            this.queryCompanyName(_.get(nextProps,"data.companyId"))
        }
    }


    render() {
        return <div style={{ width: "100%" }}>

        {_.get(this.state,"datas")==[]?<div></div>:    
            <div className="infoTop">
                    <div className="infoBox_base_img">
                        <img src={Head} />
                    </div>
                    <div className="infoBox_base_name">
                        <div>{_.get(this.state,"data.nickName")}</div>
                        <div>用户等级：
                            {
                                _.get(this.state,"data.grade")=='NEED_LOGIN'?"游客":
                                _.get(this.state,"data.grade")=='NEED_AUTH_USER'?"普通用户":
                                _.get(this.state,"data.grade")=='AUTH_USER'?"普通用户（已认证）":
                                _.get(this.state,"data.grade")=='NEED_AUTH_VIP'?"VIP用户":
                                _.get(this.state,"data.grade")=='AUTH_VIP'?"VIP用户":
                                ""
                            }
                            <span>升级账号</span>
                        </div>
                        <div>
                            <p>所属企业：{_.get(this.state,"datas.companyName")}
                                <span>
                                    {
                                        _.get(this.state,"datas.status")=='0'?"未进行认证，认证享更多权益":
                                        _.get(this.state,"datas.status")=='1'?"审核中":
                                        _.get(this.state,"datas.status")=='2'?"审核已通过":
                                        _.get(this.state,"datas.status")=='3'?"审核未通过":
                                        ""
                                    }
                                </span>
                            </p>
                        </div>
                    </div>
            </div>
        }
        </div>;
    }
}