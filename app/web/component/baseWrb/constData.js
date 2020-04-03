import React, { Component } from 'react';
import { Tooltip } from 'antd'
import _ from 'lodash'
import {decrypt, encrypt,hanldeTime} from "../../../utils";
export default {

    subAccount: {
        userName: {
            title: '姓名', width: 110, className: 'center', align: "center",
            render: (t, r, i) =>
                <div>
                    <Tooltip title={_.get(r, "userName")}>
                        <div style={{ userSelect: "none", cursor: "pointer", fontSize: 13, width: "100%", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                            {_.get(r, "userName")}
                        </div>
                    </Tooltip>
                </div>
        },
        nickName: {
            title: '昵称', width: 160, className: 'center', align: "center",
            render: (t, r, i) => {
                return (
                    <Tooltip title={_.get(r, "nickName")}>
                        <div style={{ userSelect: "none", cursor: "pointer", fontSize: 13, width: "100%", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>

                            {_.get(r, "nickName")}

                        </div>
                    </Tooltip>
                )
            }
        },
        tel: {
            title: '手机号码', width: 160, className: 'center', align: "center",
            render: (t, r, i) => {
                return (
                    <Tooltip title={_.get(r, "tel")}>
                        <div style={{ userSelect: "none", cursor: "pointer", fontSize: 13, width: "100%", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>

                            {_.get(r, "tel")}

                        </div>
                    </Tooltip>
                )
            }
        },
        email: {
            title: '邮箱', width: 160, className: 'center', align: "center",
            render: (t, r, i) => {
                return (
                    <Tooltip title={_.get(r, "email")}>
                        <div style={{ userSelect: "none", cursor: "pointer", fontSize: 13, width: "100%", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>

                            {_.get(r, "email")}

                        </div>
                    </Tooltip>
                )
            }
        },
        child: {
            title: '角色', width: 150, className: 'center', align: "center",
            render: (t, r, i) => {
                return (
                    <div style={{ userSelect: "none", cursor: "pointer", fontSize: 13, width: "150px", }}>
                        {_.get(r, "child") == "0" ? <div style={{ color: "#4598d5" }}>企业账号（主账号）</div> :
                            _.get(r, "child") == "1" ? <div>员工账号（子账号）</div>
                                : ""}
                    </div>
                )
            }
        },

    },


    qualifications: {
        index: {
            title: '序号', width: 40, className: 'center1', align: "center",
            isIndex:true,
            render: (t, r, i) => {

            }
        },
        aptitudeName: {
            title: '资质名称', width: 80, className: 'center1', align: "center",
            render: (t, r, i) => {
                return (
                    <Tooltip title={_.get(r, "aptitudeName")}>
                        <div style={{ userSelect: "none", cursor: "pointer", fontSize: "16px", width: "100%", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>

                            {_.get(r, "aptitudeName")}

                        </div>
                    </Tooltip>
                )
            }
        },
        aptitudeId: {
            title: '资质编号', width: 40, className: 'center1', align: "center",
            render: (t, r, i) => {
                return (
                    <Tooltip title={_.get(r, "aptitudeId")}>
                        <div style={{ userSelect: "none", cursor: "pointer", fontSize: "16px", width: "100%", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>

                            {_.get(r, "aptitudeId")}

                        </div>
                    </Tooltip>
                )
            }
        },
        aptitudeStarttime: {
            title: '发证日期', width: 40, className: 'center1', align: "center",
            render: (t, r, i) => {
                let newAptitudeStarttime =hanldeTime(_.get(r, "aptitudeStarttime"))
                return (
                    <Tooltip title={newAptitudeStarttime}>
                        <div style={{ userSelect: "none", cursor: "pointer", fontSize: "16px", width: "100%", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>

                            {newAptitudeStarttime}

                        </div>
                    </Tooltip>
                )
            }
        },
        aptitudeEndtime: {
            title: '有效期', width: 40, className: 'center1', align: "center",
            render: (t, r, i) => {
                let newAptitudeEndtime =hanldeTime(_.get(r, "aptitudeEndtime"))
                return (
                    <Tooltip title={newAptitudeEndtime}>
                        <div style={{ userSelect: "none", cursor: "pointer", fontSize: "16px" }}>

                            {newAptitudeEndtime}

                        </div>
                    </Tooltip>
                )
            }
        }
    },

    achievement: {
        index: {
            title: '序号', width: 60, className: 'center1', align: "center",
            isIndex:true,
            render: (t, r, i) => {

            }
        },
        name: {
            title: '项目名称', width: 240, className: 'center1', align: "center",
            render: (t, r, i) => {
                return (
                    <Tooltip title={_.get(r, "projectName")}>
                        <div className="hover" style={{ color: "#2B64F1", userSelect: "none", cursor: "pointer", fontSize: 16, width: "100%", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>

                            {_.get(r, "projectName")}

                        </div>
                    </Tooltip>
                )
            }
        },
        Zmoney: {
            title: '中标金额（万元）', width: 120, className: 'center1', align: "center",
            render: (t, r, i) => {
                return (
                    <Tooltip title={_.get(r, "bidMoney")}>
                        <div style={{ userSelect: "none", cursor: "pointer", fontSize: 16, width: "100%", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>

                            {_.get(r, "bidMoney")}

                        </div>

                    </Tooltip>
                )
            }
        },
        Hmoney: {
            title: '实际造价（万元）', width: 120, className: 'center1', align: "center",
            render: (t, r, i) => {
                return (
                    <Tooltip title={_.get(r, "completeActualCost")}>
                        <div style={{ userSelect: "none", cursor: "pointer", fontSize: 16, width: "100%", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>

                            {_.get(r, "completeActualCost")}

                        </div>
                    </Tooltip>
                )
            }
        },
        Zdate: {
            title: '中标时间', width: 120, className: 'center1', align: "center",
            render: (t, r, i) => {
                return (
                    <Tooltip title={_.get(r, "bidDate")}>
                        <div style={{ userSelect: "none", cursor: "pointer", fontSize: 16 }}>

                            {_.get(r, "bidDate")}

                        </div>
                    </Tooltip>
                )
            }
        },
        startDate: {
            title: '开工时间', width: 120, className: 'center1', align: "center",
            render: (t, r, i) => {
                return (
                    <Tooltip title={_.get(r, "completeActualStartDate")}>
                        <div style={{ userSelect: "none", cursor: "pointer", fontSize: 16 }}>

                            {_.get(r, "completeActualStartDate")}

                        </div>
                    </Tooltip>
                )
            }
        },
        Sdate: {
            title: '竣工时间', width: 120, className: 'center1', align: "center",
            render: (t, r, i) => {
                return (
                    <Tooltip title={_.get(r, "completeActualCompleteDate")}>
                        <div style={{ userSelect: "none", cursor: "pointer", fontSize: 16 }}>

                            {_.get(r, "completeActualCompleteDate")}

                        </div>
                    </Tooltip>
                )
            }
        },
        person: {
            title: '项目经理', width: 80, className: 'center1', align: "center",
            render: (t, r, i) => {
                return (
                    <Tooltip title={_.get(r, "personName")}>
                        <div style={{ userSelect: "none", cursor: "pointer", fontSize: 16 }}>

                            {_.get(r, "personName")}

                        </div>
                    </Tooltip>
                )
            }
        }
    },

    honor: {
        index: {
            title: '序号', width: 40, className: 'center1', align: "center",
            isIndex:true,
            render: (t, r, i) => {

            }
        },
        relativeProject: {
            title: '相关工程', width: 150, className: 'center1', align: "center",
            render: (t, r, i) => {
                return (
                    <Tooltip title={_.get(r, "relevantProjectName")}>
                        <div style={{ userSelect: "none", cursor: "pointer", fontSize: 16, width: "100%", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>

                            {_.get(r, "relevantProjectName")}

                        </div>
                    </Tooltip>
                )
            }
        },
        relativePerson: {
            title: '相关人员', width: 100, className: 'center1', align: "center",
            render: (t, r, i) => {
                return (
                    <Tooltip title={_.get(r, "relevantPersonName")}>
                        <div style={{ userSelect: "none", cursor: "pointer", fontSize: 16, width: "100%", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>

                            {_.get(r, "relevantPersonName")}

                        </div>
                    </Tooltip>
                )
            }
        },
        area: {
            title: '所在地区', width: 100, className: 'center1', align: "center",
            render: (t, r, i) => {
                return (
                    <Tooltip title={_.get(r, "provinceName")}>
                        <div style={{ userSelect: "none", cursor: "pointer", fontSize: 16, width: "100%", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>

                            {_.get(r, "provinceName")}

                        </div>
                    </Tooltip>
                )
            }
        },
        infoTime: {
            title: '公告时间', width: 120, className: 'center1', align: "center",
            render: (t, r, i) => {
                let newPublishDate = hanldeTime(_.get(r, "publishDate"))
                // let newPublishDate =_.get(r, "publishDate").substring(0,10)
                return (
                    <Tooltip title={newPublishDate}>
                        <div style={{ userSelect: "none", cursor: "pointer", fontSize: 16, width: "100%", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>

                            {newPublishDate}

                        </div>
                    </Tooltip>
                )
            }
        }
    },

    bad: {
        index: {
            title: '序号', width: 40, className: 'center1', align: "center",
            isIndex:true,
            render: (t, r, i) => {

            }
        },

        relativeProject: {
            title: '相关工程', width: 150, className: 'center1', align: "center",
            render: (t, r, i) => {
                return (
                    <Tooltip title={_.get(r, "relevantProjectName")}>
                        <div style={{ userSelect: "none", cursor: "pointer", fontSize: 16, width: "100%", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>

                            {_.get(r, "relevantProjectName")}

                        </div>
                    </Tooltip>
                )
            }
        },
        Indate:{
            title: '公告时间', width: 100, className: 'center1', align: "center",
            render: (t, r, i) => {
                let newInDate = hanldeTime(_.get(r, "inDate"))
                return (
                    <Tooltip title={newInDate}>
                        <div style={{ userSelect: "none", cursor: "pointer", fontSize: 16, width: "100%", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>

                            {newInDate}

                        </div>
                    </Tooltip>
                )
            }
        },
        relativePerson: {
            title: '相关人员', width: 100, className: 'center1', align: "center",
            render: (t, r, i) => {
                return (
                    <Tooltip title={_.get(r, "relevantPersonName")}>
                        <div style={{ userSelect: "none", cursor: "pointer", fontSize: 16, width: "100%", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>

                            {_.get(r, "relevantPersonName")}

                        </div>
                    </Tooltip>
                )
            }
        },
        area: {
            title: '所在地区', width: 60, className: 'center1', align: "center",
            render: (t, r, i) => {
                return (
                    <Tooltip title={_.get(r, "provinceName")}>
                        <div style={{ userSelect: "none", cursor: "pointer", fontSize: 16, width: "100%", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>

                            {_.get(r, "provinceName")}

                        </div>
                    </Tooltip>
                )
            }
        },

        status: {
            title: '处罚状态', width: 80, className: 'center1', align: "center",
            render: (t, r, i) => {
                return (
                    <Tooltip title={_.get(r, "effective")}>
                        <div style={{ userSelect: "none", cursor: "pointer", fontSize: 16, width: "100%", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>

                            {_.get(r, "effective")}
                        </div>

                    </Tooltip>
                )
            }
        }
    }
};

