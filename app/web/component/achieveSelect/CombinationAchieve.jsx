import React, { useState,useEffect} from 'react'
import { Col, Row, Tag, Modal, Radio,InputNumber,Input, DatePicker } from 'antd'
import moment from 'moment'
import _ from 'lodash'

import './index.css'
import {Get} from "../../utils/request";
import {hanldeTime} from "../../../utils";
const ProjectTimeRange = [
    { value: '0', name: '全部' },
    { value: '1', name: '中标时间' },
    { value: '2', name: '合同时间' },
    { value: '3', name: '发证时间' },
    { value: '4', name: '竣工时间' }
]

const { CheckableTag } = Tag
const { RangePicker } = DatePicker

export default (props) => {

    const { label = '业绩条件', projectLabel = '项目类型', scaleLabel = '业绩规模', dateLabel = '时间范围', defaultValue = undefined,initKeyWords,getFieldDecorator,onChange,combinationSearchShow=false} = props
    //工程用途
    const [projectPurposeDict,setProjectPurposeDict] = useState([])
    const [projectPurpose,setProjectPurpose] = useState('')
    //建设性质
    const [projectPropertiesDict,setProjectPropertiesDict] = useState([])
    const [projectProperties,setProjectProperties] = useState('')
    //业绩类型
    const [projectType,setProjectType] = useState([])
    const [currentsStatus, setCurrentsStatus] = useState('')
    //业绩子项
    const [projectStatusDict,setProjectStatusDict] = useState([])
    const [projectStatus,setProjectStatus] = useState([])
    //业绩子项匹配规则
    const [stageRelation,setStageRelation] = useState('and')
    //金额要求
    const [moneyTypeDict,setMoneyTypeDict] = useState([])
    const [moneyType,setMoneyType] = useState([])
    // 时间
    const [timeTypeDict,setTimeTypeDict] = useState([])
    const [timeType,setTimeType] = useState([])
    const [timeRange,setTimeRange] =useState([])
    const [timeStart, setTimeStart] = useState('')
    const [timeEnd, setTimeEnd] = useState('')
    //业绩数量
    const [projectNums,setProjectNums] = useState(1)
    //面积开始
    const [areaStart,setAreaStart] = useState('')
    //面积结束
    const [areaEnd,setAreaEnd] = useState('')
    //金额开始
    const [moneyStart,setMoneyStart] = useState('')
    //金额结束
    const [moneyEnd,setMoneyEnd] = useState('')
    //关键字
    const [keywords,setKeywords] = useState('')
    //关键字类别
    const [keywordTypeDict,setKeywordTypeDict] = useState([])
    const [keywordType,setKeywordType] = useState('')
    //所有数据搜集
    const [projectList,setProjectList] = useState({})
    const [allProjectPurposeDict,setAllProjectPurposeDict]=useState([])
    //默认时间
    let time1 = !!_.get(defaultValue,'timeStart')?moment(_.get(defaultValue,'timeStart'),'YYYY-MM-DD HH:mm:ss'):''
    let time2 = !!_.get(defaultValue,'timeEnd')?moment(_.get(defaultValue,'timeEnd'),'YYYY-MM-DD HH:mm:ss'):''
    let defaultTime=[time1,time2]
    //业绩类型变化
    const onProjectChange = (val) => {
        setCurrentsStatus(val)
        console.log('业绩变化了')
        let newProjectPurposeDict=filterProjectPurposeFromProjectType(val,allProjectPurposeDict)
        if(newProjectPurposeDict&&newProjectPurposeDict.length==0){
            //删除类型条件
            setProjectPurpose('')
            let {projectPurpose,...rest}=projectList
            setProjectList({...rest,projectType:val})
        }else{
            //重置工程性质字段
            let newProjectPurpose=newProjectPurposeDict[0]['dictCode']
            setProjectPurpose(newProjectPurpose)
            setProjectList({...projectList,projectType:val,projectPurpose:newProjectPurpose})
        }
        setProjectPurposeDict(newProjectPurposeDict)

    }
    //工程性质变化
    const onProjectPurposeChange = (val) =>{
        setProjectPurpose(val)
        setProjectList({...projectList,projectPurpose:val})

    }
    // 建设性质变化
    const onProjectPropertiesChange= (val)=>{
        setProjectProperties(val)
        setProjectList({...projectList,projectNature:val})

    }
    //业绩子项变化
    const onStatusChange = (val) => {
        let tempProjectStatus=filterCheck(projectStatus,val,projectStatusDict,'projectStatus')
        setProjectStatus(tempProjectStatus)
        setProjectList({...projectList,projectStage:tempProjectStatus.join(',')})
    }
    //建筑面积开始变化
    const onAreaStartChange = (val) =>{
        setAreaStart(val)
        setProjectList({...projectList,areaStart:val})

    }
    //金额开始变化
    const onMoneyStartChange = (val) =>{
        setMoneyStart(val)
        setProjectList({...projectList,moneyStart:val})

    }
    //金额结束变化
    const onMoneyEndChange = (val) =>{
        setMoneyEnd(val)
        setProjectList({...projectList,moneyEnd:val})

    }
    //建筑面积结束变化
    const onAreaEndChange = (val) =>{
        setAreaEnd(val)
        setProjectList({...projectList,areaEnd:val})

    }
    //金额类型变化

    const onMoneyTypeChange = (val) => {
        let tempMoneyType=filterCheck(moneyType,val,moneyTypeDict)
        setMoneyType(tempMoneyType)
        setProjectList({...projectList,moneyType:tempMoneyType.join(',')})
    }
    //多选筛选
    const filterCheck=(arr,val,dict,type)=>{
        let tempArr = arr.concat([])
        if(_.indexOf(tempArr,val) != -1){
            _.pull(tempArr,val)
        }else{
            tempArr = [...tempArr,val]
        }
        if(val.indexOf('unlimited')!=-1){
            tempArr = [val]
            if(type=='projectStatus'){
                setStageRelation('and')
            }
        }else{
            let isFind = false
            tempArr.filter((i)=>{
                if(i.indexOf('unlimited')!=-1){
                    isFind=true
                }
            })
            if(isFind){
                tempArr = tempArr.filter((i)=>{
                    return i.indexOf('unlimited') ==-1
                })
            }
        }
        if(tempArr.length==0){
            let unlimitedStr = ''
            dict.filter((item)=>{
                if(_.get(item,'dictCode').indexOf('unlimited')!=-1){
                    unlimitedStr = _.get(item,'dictCode')
                }
            })
            tempArr.push(unlimitedStr)
            if(type=='projectStatus'){
                setStageRelation('and')
            }
        }
        return tempArr
    }
    //时间类型
    const onDateChange = (val) => {
        //判断是否在里面
        let tempTimeType=filterCheck(timeType,val,timeTypeDict)
        setTimeType(tempTimeType)
        setProjectList({...projectList,timeType:tempTimeType.join(',')})
    }
    //业绩数量变化
    const onAchieveCountChange = (val)=>{
        setProjectNums(val)
        setProjectList({...projectList,projectNums:val})
    }
    //关键字类型变化
    const onKeywordTypeChange=(e)=> {
        setKeywordType(e.target.value)
        setProjectList({...projectList, keywordType: e.target.value})
    }

    //关键字变化
    const onKeywordsChange =(e)=>{
        setKeywords(e.target.value)
        setProjectList({...projectList,keywords:e.target.value})
    }
    //业绩子项匹配规则
    const onStageRelationChange = (e)=>{
        setStageRelation(e.target.value)
        setProjectList({...projectList,stageRelation:e.target.value})
    }
    const filterProjectPurposeFromProjectType=(dictCode,dictArr)=>{
        console.log('筛选',dictCode,dictArr)
        return dictArr.filter((item)=>{
            return item['dictDesc']==dictCode
        })
    }
    const fetchDict = async ()=>{
        const res = await Get(`/combination/dict`)
        if(res.data.code == '0'){
            let dicts = res.data.content
            //业绩类型
            setProjectType(_.get(dicts,'projectType'))
            setCurrentsStatus(_.get(dicts,'projectType[0].dictCode',''))
            //工程用途,根据业绩类型筛选
            setAllProjectPurposeDict(_.get(dicts,'projectPurpose'))
            setProjectPurposeDict(filterProjectPurposeFromProjectType(_.get(dicts,'projectType[0].dictCode',''),_.get(dicts,'projectPurpose')))
            setProjectPurpose(_.get(dicts,'projectPurpose[0].dictCode',''))
            //建筑性质
            setProjectPropertiesDict(_.get(dicts,'projectNature'))
            setProjectProperties(_.get(dicts,'projectNature[0].dictCode',''))
            //业绩子项
            setProjectStatusDict(_.get(dicts,'projectStage'))
            setProjectStatus([_.get(dicts,'projectStage[0].dictCode','')])
            //金额要求
            setMoneyTypeDict(_.get(dicts,'moneyType'))
            setMoneyType([_.get(dicts,'moneyType[0].dictCode','')])
            //时间要求
            setTimeTypeDict(_.get(dicts,'timeType'))
            setTimeType([_.get(dicts,'timeType[0].dictCode','')])
            //关键字类型
            setKeywordTypeDict(_.get(dicts,'keywordType'))
            setKeywordType(_.get(dicts,'keywordType[0].dictCode',''))
            let newProject = {...projectList,
                projectType:_.get(dicts,'projectType[0].dictCode',''),
                projectPurpose:_.get(dicts,'projectPurpose[0].dictCode',''),
                projectNature:_.get(dicts,'projectNature[0].dictCode',''),
                projectStage:_.get(dicts,'projectStage[0].dictCode',''),
                moneyType:_.get(dicts,'moneyType[0].dictCode',''),
                timeType:_.get(dicts,'timeType[0].dictCode',''),
                keywordType:_.get(dicts,'keywordType[0].dictCode',''),
                projectNums:1,
                stageRelation:'and'
            }
            setProjectList(newProject)
            if(_.isFunction(onChange)&&defaultValue==undefined){
                onChange(newProject)
            }
            if(defaultValue!=undefined){
                if(_.isFunction(onChange)){
                    onChange({...defaultValue,timeStart:hanldeTime(_.get(defaultValue,'timeStart')),timeEnd:hanldeTime(_.get(defaultValue,'timeEnd'))})
                }
                console.log('默认值',defaultValue)
                setCurrentsStatus(_.get(defaultValue,'projectType'))
                setProjectPurpose(_.get(defaultValue,'projectPurpose'))
                setProjectProperties(_.get(defaultValue,'projectNature'))
                setProjectStatus(_.get(defaultValue,'projectStage',[]).split(','))
                setMoneyType(_.get(defaultValue,'moneyType',[]).split(','))
                setTimeType(_.get(defaultValue,'timeType',[]).split(','))
                setKeywordType(_.get(defaultValue,'keywordType'))
                setKeywords(_.get(defaultValue,'keywords'))
                setAreaStart(_.get(defaultValue,'areaStart',''))
                setAreaEnd(_.get(defaultValue,'areaEnd',''))
                setMoneyStart(_.get(defaultValue,'moneyStart',''))
                setMoneyEnd(_.get(defaultValue,'moneyEnd',''))
                setProjectNums(_.get(defaultValue,'projectNums',''))
                setStageRelation(_.get(defaultValue,'stageRelation','and'))
                let time1 = !!_.get(defaultValue,'timeStart')?moment(_.get(defaultValue,'timeStart'),'YYYY-MM-DD'):''
                let time2 = !!_.get(defaultValue,'timeEnd')?moment(_.get(defaultValue,'timeEnd'),'YYYY-MM-DD'):''
                setTimeStart(time1)
                setTimeEnd(time2)
                setProjectPurposeDict(filterProjectPurposeFromProjectType(_.get(defaultValue,'projectType'),_.get(dicts,'projectPurpose')))
                setProjectList({...defaultValue,timeStart:hanldeTime(_.get(defaultValue,'timeStart')),timeEnd:hanldeTime(_.get(defaultValue,'timeEnd'))})
            }
        }else{

        }

    }
    useEffect(()=>{
        if(_.isFunction(onChange)){
            onChange(projectList)
        }
    },[projectList])
    useEffect(()=>{
        fetchDict()
    },[ ])
    const getProjectStatus = () => {
        const comps = []
        projectStatusDict.map((p) => {
            const { dictCode:value, dictName:name } = p
            const checked = (_.indexOf(projectStatus,value) != -1)
            comps.push(
                <CheckableTag className={'tag','area-style'} style={{ fontSize: '1rem',backgroundColor:`${checked?'#2B64F1':'#fff'}`, padding:'5px 12px' }} key={value} checked={checked} onChange={() => onStatusChange(value)}>{name}</CheckableTag>
            )
        })
        return comps
    }

    const getProjectProperties=() => {
        const comps = []
        projectPropertiesDict.map((p) => {
            const { dictCode:value, dictName:name } = p
            const checked = projectProperties === value
            comps.push(
                <CheckableTag className={'tag','area-style'} style={{ fontSize: '1rem',backgroundColor:`${checked?'#2B64F1':'#fff'}`, padding:'5px 12px' }} key={value} checked={checked} onChange={() => onProjectPropertiesChange(value)}>{name}</CheckableTag>
            )
        })
        return comps
    }

    const getProjectPurpose=() => {
        const comps = []
        projectPurposeDict.map((p) => {
            const { dictCode:value, dictName:name } = p
            const checked = projectPurpose === value
            comps.push(
                <CheckableTag className={'tag','area-style'} style={{ fontSize: '1rem',backgroundColor:`${checked?'#2B64F1':'#fff'}`, padding:'5px 12px' }} key={value} checked={checked} onChange={() => onProjectPurposeChange(value)}>{name}</CheckableTag>
            )
        })
        return comps
    }
    const stageRelationDict = [{
        value:"and",name:"同时具备"},{
        value:"or",name:"任意均可"
    }]
    const getStageRelation = () => {
        const comps = []

        stageRelationDict.map(p => {
            const { value, name } = p
            const checked = stageRelation === value
            comps.push(
                <Radio value={value}>{name}</Radio>
            )
        })

        return comps
    }
    const getMoneyTypeDict = () => {
        const comps = []

        moneyTypeDict.map(p => {
            const { dictCode:value, dictName:name } = p
            const checked = (_.indexOf(moneyType,value) != -1)
            comps.push(
                <CheckableTag className={'tag','area-style'} style={{ fontSize: '1rem',backgroundColor:`${checked?'#2B64F1':'#fff'}`, padding:'5px 12px' }} key={value} checked={checked} onChange={() => onMoneyTypeChange(value)}>{name}</CheckableTag>
            )
        })

        return comps
    }
    const getProjectType = () => {
        const comps = []
        projectType.map((p) => {
            const { dictCode:value, dictName:name } = p
            const checked = currentsStatus === value
            comps.push(
                <CheckableTag className={'tag','area-style'} style={{ fontSize: '1rem',backgroundColor:`${checked?'#2B64F1':'#fff'}`,padding:'5px 12px' }} key={value} checked={checked} onChange={() => onProjectChange(value)}>{name}</CheckableTag>
            )
        })
        return comps
    }
    const getDateComps = () => {
        const comps = []

        timeTypeDict.map(p => {
            const { dictCode:value, dictName:name } = p

            const checked = (_.indexOf(timeType,value) != -1)
            comps.push(
                <CheckableTag className={'tag','area-style'} style={{ fontSize: '1rem',backgroundColor:`${checked?'#2B64F1':'#fff'}`, padding:'5px 12px'}} key={value} checked={checked} onChange={() => onDateChange(value)}>{name}</CheckableTag>
            )
        })

        return comps
    }
    const timeMinChange=(mo,mostr)=>{
        setTimeStart(mo)
        console.log('最小值发生变化',mo,mostr)
        setProjectList({...projectList, timeStart:mostr})
    }
    const timeMaxChange=(mo,mostr)=>{
        setTimeEnd(mo)
        setProjectList({...projectList,timeEnd:mostr})

    }
    const getKeywordType=()=>{
        const comps = []

        keywordTypeDict.map(p => {
            const { dictCode:value, dictName:name } = p
            const checked = keywordType === value
            comps.push(
                <Radio value={value}>{name}</Radio>
            )
        })

        return comps

    }

    return (

        <React.Fragment>
            <div style={{display:combinationSearchShow?'block':'none'}}>
                <Row className={'achieve_wrapper'}>
                    <Col span={2}>
                        <div className={'achieve-label'} >业绩类型</div>
                    </Col>

                    <Col span={22} className={'achieve-content'}>
                        {getProjectType()}
                    </Col>
                </Row>
                {projectPurposeDict&&projectPurposeDict.length!=0?  <Row className={'achieve_wrapper'}>
                    <Col span={2}>
                        <div className={'achieve-label'} >工程用途</div>
                    </Col>
                    <Col span={22} className={'achieve-content'}>
                        {getProjectPurpose()}
                    </Col>
                </Row>:null}

                <Row className={'achieve_wrapper'}>
                    <Col span={2}>
                        <div className={'achieve-label'} >建设性质</div>
                    </Col>
                    <Col span={22} className={'achieve-content'}>
                        {getProjectProperties()}
                    </Col>
                </Row>
                <Row className={'achieve_wrapper'}>
                    <Col span={2}>
                        <div className={'achieve-label'} >{'业绩子项'}</div>
                    </Col>
                    <Col span={22} className={'achieve-content'}>
                        {getProjectStatus()}
                    </Col>
                </Row>
                <Row className={'achieve_wrapper'}>
                    <Col span={2}>
                        <div className={'achieve-label'} >{''}</div>
                    </Col>
                    <Col span={22} className={'achieve-content'}>
                        <Radio.Group onChange={onStageRelationChange} value={stageRelation}>
                            {getStageRelation()}
                        </Radio.Group>

                    </Col>
                </Row>
                <Row className={'achieve_wrapper'}>
                    <Col span={2}>
                        <div className={'achieve-label'} >{'建筑面积'}</div>
                    </Col>
                    <Col span={22} className={'achieve-content'}>
                        <InputNumber placeholder="" min={0} style={{width:'80px'}} value={areaStart} onChange={onAreaStartChange}/>&nbsp;&nbsp;-&nbsp;&nbsp;<InputNumber placeholder="" value={areaEnd} style={{width:'80px'}} min={0} onChange={onAreaEndChange}/>&nbsp;&nbsp;m<sup>2</sup>
                    </Col>
                </Row>
                <Row className={'achieve_wrapper'}>
                    <Col span={2}>
                        <div className={'achieve-label'} >{'金额要求'}</div>
                    </Col>

                    <Col span={22} className={'achieve-content'} style={{display:'block',height:'82px'}}>
                        <div> {getMoneyTypeDict()}</div>
                        <div style={{marginTop:'25px'}}>
                            <InputNumber placeholder="" style={{width:'80px'}} min={0} value={moneyStart} onChange={onMoneyStartChange}/>&nbsp;&nbsp;-&nbsp;&nbsp;<InputNumber placeholder="" min={0} value={moneyEnd} onChange={onMoneyEndChange} style={{width:'80px'}}/>&nbsp;&nbsp;万

                        </div>


                    </Col>
                </Row>
                <Row className={'achieve_wrapper'}>
                    <Col span={2}>
                        <div className={'achieve-label'} >{'时间要求'}</div>
                    </Col>
                    <Col span={22} className={'achieve-content'} style={{display:'block',height:'82px'}}>
                        <div> {getDateComps()}</div>
                        <div style={{marginTop:'25px'}}>
                            <Input.Group compact>
                                <DatePicker onChange={timeMinChange} value={timeStart}/>
                                <Input
                                    style={{
                                        width: 30,
                                        backgroundColor:"white",
                                        borderLeft: '1px solid rgb(217, 217, 217)',
                                        borderRight: 'none',
                                        pointerEvents: 'none',
                                    }}
                                    placeholder="~"
                                    disabled
                                />
                                <DatePicker onChange={timeMaxChange} value={timeEnd}/>
                            </Input.Group>
                        </div>


                    </Col>
                </Row>
                <Row style={{marginBottom:'25px',marginTop:'25px'}} >
                    <Col span={2}><div className={'area-label'}>项目关键字</div></Col>
                    <Col span={22}>
                        <Input  value={keywords} onChange={onKeywordsChange} placeholder={'请输入项目关键字'} style={{ width: 230 }} />
                        <Radio.Group onChange={onKeywordTypeChange} value={keywordType} style={{marginLeft:'20px'}}>
                            {getKeywordType()}
                        </Radio.Group></Col>
                </Row>
                <Row>
                    <Col span={2}><div className={'area-label'}>业绩个数</div></Col>
                    <Col span={22}> <InputNumber value={projectNums} onChange={onAchieveCountChange} min={1}/></Col>
                </Row>
            </div>


        </React.Fragment>
    )
}
