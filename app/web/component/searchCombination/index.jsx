import React, { useEffect, useState ,useRef} from 'react'
import { Form, Button,Input, Divider,Radio, Col,InputNumber,Tag, Row,AutoComplete} from 'antd'
import Area from '../areaSelect'
import UnionSelect from '../uninoSelect'
import { Post,Get } from '../../utils/request'
import CombinationAchieve from '../achieveSelect/CombinationAchieve'
import ProjectApproval from '../tender/projectApproval'
import Notice from '../tender/notice'
import Winning from '../tender/winning'
import KeyWords from '../keyWords'
import AchieveCount from '../achieveCount'
import { isSafeObj } from '../../utils/objectHelper';
import AchieveType from '../achieveType';
import TimeRange from '../timeRange/index';
import NormalInput from '../input/index';
import _ from 'lodash'
import './index.css'
import {Http} from "../baseWrb/http";
import Icons from "../icon/icon";
const { Option } = AutoComplete;
const {CheckableTag} = Tag
export default (props) => {

    const { ispage= false,tab = '', onFilterChange = () => { }, form = {}, defaultCount = 1, defaultFiling = 0, defaultAchieve = '', defaultPerson = '',
        provinceDefault = 0, pChange = false, pName = '', regDefault = 0, rChange = false, rName = '', defaultReg = 0,
        filingDefault = 0, fChange = false, initKeyWords = '', projectDefault=undefined,abbreviationDefault='',defaultHasBad=null} = props
    const { getFieldDecorator = () => { }, getFieldValue } = form
    const [provinceChange, setProvinceChange] = useState(pChange)
    const [province, setProvince] = useState(provinceDefault)
    const [provinceName, setProvinceName] = useState(pName)
    const [regChange, setRegChange] = useState(rChange)
    const [reg, setReg] = useState(regDefault)
    const [regName, setRegname] = useState(rName)
    const [hasBad,setHasBad] = useState(defaultHasBad)
    const [regArea, setRegArea] = useState('')
    const [filing, setFiling] = useState(filingDefault)
    const [filingChange, setFilingChange] = useState(fChange)
    const [filingArea, setFilingArea] = useState('')
    const [abbreviationName, setAbbreviation] = useState(abbreviationDefault)
    const [aptitudeList, setAptitudeList] = useState([])
    const [personList, setPersonList] = useState([])
    const [projectList, setProjectList] = useState({ projectNums: 1, keywords: initKeyWords || '' })
    const [extraParams, setExtraParams] = useState({ aptitude: 'xx', project: 'xx', person: 'xxx' })
    const [qcDataSource,setQcDataSource] = useState([])
    const [qcsearchstr,setQcsearchstr] = useState('')
    const [qcvalue,setQcvalue] = useState('')
    const [qcdata,setQcdata] = useState([])
    const [combinationSearchShow,setCombinationSearchShow] = useState(projectDefault==undefined?false:true)

    //资金来源
    const [currentTenderType, setCurrentTenderType] = useState(null)
    const TenderType = [
        { value: null, name: '全部类型' },
        { value: '勘察设计', name: '勘察设计' },
        { value: '施工监理', name: '施工监理' }
    ]
    //项目阶段
    const [currentsProject, setCurrentsProject] = useState(null)
    const projectStage = [
        { value: null, name: '全部阶段' },
        { value: '1', name: '立项审批' },
        { value: '2', name: '招标公告' },
        { value: '3', name: '流标废标' },
        { value: '4', name: '中标公告' }
    ]
    //项目类型
    const [currentsTenderProjectType, setCurrentsTenderProjectType] = useState('')
    const [tenderProjectType, setTenderProjectType] = useState([])
    const getTenderProjectType = async ()=>{
        const res = await Get('/users/bidsType')
        if(res.data.code == '0'){
            setTenderProjectType(res.data.content)
        }
    }
    //中标类型
    const [currentsBidType, setCurrentsBidType] = useState(null)
    //中标时间
    const [currentsTime, setCurrentsTime] = useState(0)
    const [currentsBidTimeStart, setCurrentsBidTimeStart] = useState(0)
    const [currentsBidTimeEnd, setCurrentsBidTimeEnd] = useState(0)
    //中标金额
    const [currentsCount, setCurrentsCount] = useState(0)
    const [currentsBidFundsStart, setCurrentsBidFundsStart] = useState(0)
    const [currentsBidFundsEnd, setCurrentsBidFundsEnd] = useState(0)
    //资金来源
    const [currentsFundsSource, setCurrentsFundsSource] = useState(null)
    //投资金额
    const [currentsInvestmentFundsType, setCurrentsInvestmentFundsType] = useState(0)
    const [currentsInvestmentFundsStart, setCurrentsInvestmentFundsStart] = useState(0)
    const [currentsInvestmentFundsEnd, setCurrentsInvestmentFundsEnd] = useState(0)

    useEffect(()=>{
        getTenderProjectType()
    },[])

    const searchRef = useRef()
    const callFilterChange = (data) => {
        const initParams = {
            beian: 0,
            city: 0,
            province: 0
        }
        // const keywords = getFieldValue('keywords')
        let payload = {
            ...initParams,
            province: provinceName==='全部'?'':provinceName,
            city: regName==='全部'?'':regName,
            beian: filing,
            hasBad:hasBad,
            aptitudeList,
            personList,
            projectList,
            // keywords,
            ...data
        }
        if (_.isFunction(onFilterChange)) {
            onFilterChange(payload, extraParams)
        }

    }
    const winningFilterChange = (data) => {
        let payload = {
            projectStage: currentsProject,
            projectType: currentsTenderProjectType,
            tenderType: currentTenderType,
            province: provinceName==='全部'?'':provinceName,
            city: regName==='全部'?'':regName,
            bidType:currentsBidType,
            bidTimeType:currentsTime,
            bidTimeStart:currentsBidTimeStart,
            bidTimeEnd:currentsBidTimeEnd,
            bidFundsType:currentsCount,
            bidFundsStart:currentsBidFundsStart,
            bidFundsEnd:currentsBidFundsEnd,
            fundsSource:currentsFundsSource,
            investmentFundsType:currentsInvestmentFundsType,
            investmentFundsStart:currentsInvestmentFundsStart,
            investmentFundsEnd:currentsInvestmentFundsEnd,
            ...data
        }
        console.log(99999999,payload)
        if (_.isFunction(onFilterChange)) {
            onFilterChange(payload)
        }
    }

    const conditionChange = (data = {}) => {
        console.log(108888888,data)
        const { type = '', start = 0, end = 0, value } = data
        if(type == 'project'){
            setCurrentsBidType(value)
            winningFilterChange({bidType:value})
        }
        if(type == 'date'){
            if(value == -1){
                setCurrentsTime(value)
                setCurrentsBidTimeStart(start)
                setCurrentsBidTimeEnd(end)
                winningFilterChange({bidTimeType:value,bidTimeStart:start,bidTimeEnd:end})
            }else{
                setCurrentsTime(value)
                setCurrentsBidTimeStart(start)
                setCurrentsBidTimeEnd(end)
                winningFilterChange({bidTimeType:value,bidTimeStart:start,bidTimeEnd:end})
            }
        }
        if(type == 'scale'){
            setCurrentsCount(value)
            setCurrentsBidFundsStart(start)
            setCurrentsBidFundsEnd(end)
            winningFilterChange({bidFundsType:value,bidFundsStart:start,bidFundsEnd:end})  
        }
    }
    const approvalChange = (data = {}) => {
        console.log(1888673736,data)
        const { type = '', start = 0, end = 0, value } = data
        if(type == 'source'){
            setCurrentsFundsSource(value)
            winningFilterChange({fundsSource:value})
        }
        if(type == 'scale'){
            setCurrentsInvestmentFundsType(value)
            setCurrentsInvestmentFundsStart(start)
            setCurrentsInvestmentFundsEnd(end)
            winningFilterChange({investmentFundsType:value,investmentFundsStart:start,investmentFundsEnd:end})
        }
    }

    const onProvinceChange = async (province, data) => {
        console.log('省份省份省份')

        setProvince(province)
        const { name = '' } = data
        setProvinceName(name)
        const extraParamsNew = _.cloneDeep(extraParams)
        if (province !== 0) {
            setProvinceChange(true)  // 省份不是全部 则显示下面的
            const { abbreviation = '' } = data
            setAbbreviation(abbreviation)

            extraParamsNew['province'] = { id: province, name }

        } else {
            setProvinceChange(false) // 否则不显示
            setAbbreviation('')
            extraParamsNew['province'] = { id: 0, name: '' }

        }
        setFiling(0)
        setReg(0)
        setRegname('')
        extraParamsNew['city'] = { id: 0, name: '' }
        setExtraParams(extraParamsNew)
        //人员选择需要重置
        console.log('重置人员数据')
        setPersonList([])
        callFilterChange({ personList: [] })
    }

    const onRegChange = (reg, value) => {
        setReg(reg)
        const { name = '' } = value
        const extraParamsNew = _.cloneDeep(extraParams)
        setRegname(name)
        if (reg !== 0) {
            // setRegChange(true)  // 注册地区不是全部 则显示下面的
            // setFiling(0)
            extraParamsNew['city'] = { id: reg, name }
        } else {
            // setRegChange(false) // 否则不显示
            extraParamsNew['city'] = { id: 0, name: '' }
        }
        setExtraParams(extraParamsNew)
    }

    const onFilingChange = (filing) => {
        setFiling(filing)

        setFilingChange(true)

    }

    useEffect(() => {
        console.log('变化了')
        callFilterChange()
        // if(tab!='combination'){
        //     winningFilterChange()
        // }

        if (provinceChange) {
            const defaultArea = [
                { id: 0, shortName: `入${abbreviationName}和${abbreviationName}内` },
                { id: 1, shortName: `${abbreviationName}内` },
                { id: 2, shortName: `入${abbreviationName}` }
            ]

            setFilingArea(<Area label={'备案地区'} id={province} isAbb defaultValue={filingDefault} defaultArea={defaultArea} onChange={onFilingChange} />)
        } else {
            setFilingArea('')
        }
        // if (provinceChange) {
        //     setRegArea(<Area label={'注册区域'} id={province} defaultReg={defaultReg} onChange={onRegChange} />)
        // } else {
        //     setRegArea('')
        //     setReg(0)
        //     setRegChange(false)
        //     setFilingArea('')
        //     setFiling(0)
        // }

        if (filingChange && filing === 1) {
            setRegArea(<Area label={'注册区域'} id={province} defaultValue={regDefault} onChange={onRegChange} />)
        } else {
            setRegArea('')
            setReg(0)
            setRegname('')
            const extraParamsNew = _.cloneDeep(extraParams)
            extraParamsNew['city'] = { id: 0, name: '' }
            setExtraParams(extraParamsNew)
        }

    }, [provinceName, provinceChange, regChange, regName, filingChange, filing])

    const getAchieveData = async (id) => {
        return await Get(`/search/getQualification/:${id}`)
    }

    const getPersonData = async (id) => {
        return await Post('/search/getPersonSearch', { pid:id,source:provinceName })
    }
    const onAchieveChange1 = (val)=>{
        setProjectList(val)
        console.log('组合组件',val)
        callFilterChange({ projectList: val })
    }
    const onAchieveChange = (payload = {}) => {
        let data = {}
        const { type = '', start = 0, end = 0, value } = payload
        const projectListParams = {
            'status': 'projectStatus',
            'scale': 'projectScaleType',
            'date': 'bidTimeType',
            'project': 'projectType'
        }
        const key = projectListParams[type]
        if (key) {
            const newProjectList = _.cloneDeep(projectList)
            newProjectList[key] = value

            if (value === -1) {
                switch (type) {
                    case 'scale':
                        newProjectList['projectScaleStart'] = start
                        newProjectList['projectScaleEnd'] = end
                        break
                    case 'date':
                        newProjectList['bidTimeStart'] = start
                        newProjectList['bidTimeEnd'] = end
                        break
                    case 'project':
                        newProjectList['projectType'] = value
                }
            }
            setProjectList(newProjectList)
            callFilterChange({ projectList: newProjectList })
        }




    }

    const onPersonChange = ({ type = '', value = [] }) => {

        console.log('人员条件')
        console.log(value.concat([]))
        if (type === 'person' && value && value.length) {
            let newAptitudeList = _.cloneDeep(personList)
            value.map((rowData, rowIndex) => {
                if (rowData && rowData.length) {
                    let itemobj ={}
                    rowData.map((colData, colIndex) => {
                        if (isSafeObj(colData)) {
                            const { id = '', level = -1, value = 1, last = false } = colData
                            const levelMap = ['aptitudeTypeId', 'aptitudeNameId', 'levelId', 'aptitudeMajorId', 'nums']

                            if (level > -1) {

                                    itemobj[levelMap[level]] = id
                                    itemobj['nums'] = value
                                    if (id != 0) {
                                        itemobj['last'] = last
                                    } else {
                                        itemobj['last'] = false
                                    }
                            }
                        }
                    })
                    newAptitudeList[rowIndex] = itemobj
                }
            })

            newAptitudeList.map((rowData, rowIndex) => {
                const keyMap = { 'aptitudeTypeId': 0, 'aptitudeLargeId': 1, 'aptitudeSmallId': 2, 'aptitudeMajorId': 3, 'num': 4 }
                const { aptitudeTypeId, aptitudeLargeId, aptitudeSmallId, aptitudeMajorId, levelId } = rowData
                Object.keys(rowData).map((key) => {
                    if (keyMap[key]) {
                        const levelSearch = keyMap[key]
                        if (value[rowIndex]) {
                            value[rowIndex].every((v, colIndex) => {
                                const { level, id } = v
                                if (levelSearch === level) {
                                    if (level !== 4) {
                                        newAptitudeList[rowIndex][key] = id
                                    } else {
                                        newAptitudeList[rowIndex][key] = value
                                    }

                                    return false;
                                } else {

                                    newAptitudeList[rowIndex][key] = 0
                                    return true
                                }
                            })

                        }
                    }
                })

            })
            newAptitudeList=newAptitudeList.filter((item)=>{
                return item['aptitudeTypeId']!= '0'
            })
            setPersonList(newAptitudeList)
            console.log('新的人员数据',newAptitudeList.concat([]))
            callFilterChange({ personList: newAptitudeList })

            const origRow = newAptitudeList.length
            const currentRow = value.length
            if (origRow > currentRow) {
                const frontArr = newAptitudeList.slice(0, currentRow)
                // const afterArr = newAptitudeList.slice(currentRow)
                const newState = [...frontArr]
                setPersonList(newState)
                callFilterChange({ personList: newState })
            }
        }
    }

    const onQualificationsChange = ({ type = '', value }) => {
        console.log('11111',value)

        if (value && value.length) {
            const row = value.length - 1
            let newAptitudeList = _.cloneDeep(aptitudeList)
            value.map((rowData, rowIndex) => {

                if (rowData && rowData.length) {
                    let itemobj ={}

                    rowData.map((colData, colIndex) => {

                        if (isSafeObj(colData)) {
                            const { id = '', level = -1, disabled = false } = colData
                            const levelMap = ['aptitudeTypeId', 'aptitudeLargeId', 'aptitudeSmallId', 'aptitudeMajorId', 'levelId']
                            if (level > -1) {
                                   itemobj[levelMap[level]]=id
                            }
                        }
                    })
                    newAptitudeList[rowIndex] = itemobj


                }
            })

            console.log('新的资质数据',newAptitudeList.concat([]))
            newAptitudeList.map((rowData, rowIndex) => {
                const keyMap = { 'aptitudeTypeId': 0, 'aptitudeLargeId': 1, 'aptitudeSmallId': 2, 'aptitudeMajorId': 3, 'levelId': 4 }
                const { aptitudeTypeId, aptitudeLargeId, aptitudeSmallId, aptitudeMajorId, levelId } = rowData
                Object.keys(rowData).map((key) => {
                    if (keyMap[key]) {
                        const levelSearch = keyMap[key]
                        if (value[rowIndex]) {
                            let hasNode = true

                            value[rowIndex].every((v, colIndex) => {
                                const { level, id } = v
                                if (levelSearch === level) {
                                    newAptitudeList[rowIndex][key] = id
                                    return false;
                                } else {
                                    newAptitudeList[rowIndex][key] = 0
                                    return true
                                }
                            })

                        }
                    }
                })

            })
            newAptitudeList=newAptitudeList.filter((item)=>{
                return item['aptitudeTypeId']!= '0'
            })
            setAptitudeList(newAptitudeList)
            console.log('新的资质数据',newAptitudeList.concat([]))
            callFilterChange({ aptitudeList: newAptitudeList })
            const origRow = newAptitudeList.length
            const currentRow = value.length
            if (origRow > currentRow) {
                const frontArr = newAptitudeList.slice(0, currentRow)
                // const afterArr = newAptitudeList.slice(currentRow)
                const newState = [...frontArr]
                setAptitudeList(newState)
                callFilterChange({ aptitudeList: newState })
            }
        }
    }

    const onAchieveCountChange = ({ type = '', value = '' }) => {
        if (type = 'count') {
            const newProjectList = _.cloneDeep(projectList)
            newProjectList['projectNums'] = value
            setProjectList(newProjectList)
            callFilterChange({ projectList: newProjectList })
        }
    }
    const onAchieveBadtypeChange = (value) => {
        setHasBad(value)
        callFilterChange({ hasBad: value })
    }

    const onAchieveTypeChange = ({ value }) => {
        const newProjectList = _.cloneDeep(projectList)
        newProjectList['projectType'] = value
        if (!value) {
            newProjectList.bidTimeType = undefined;
            newProjectList.projectStatus = 'bid';
            newProjectList.projectScaleType = undefined;
        }
        setProjectList(newProjectList)
        callFilterChange({ projectList: newProjectList })
    }

    const onAchieveTimeChange = ({ value, start = '', end = '' }) => {
        if (value === -1) {
            onFilterChange({
                timeType: value,
                timeStart: start,
                timeEnd: end
            })
        } else {
            onFilterChange({
                timeType: value
            })
        }
    }
    const onQcSelect = async (value,op)=>{
        setQcvalue('')
        let current = qcDataSource[op.key]
        computeQcdefault(current)

        setQcsearchstr('')
        setQcDataSource([])
        }
    const computeQcdefault = (aptobj)=>{
        let initData = [
            { disabled: false, optData:[{ name:'请选择',id:0,last:false }],id:0,level:-1,data:{}, defaultValue:0, last:false},
            { disabled: true, optData:[{name:'请选择',id:0,last:false }],id:0,level:-1,data:{}, defaultValue:0, last:false },
            { disabled: true, optData:[{name:'请选择',id:0,last:false }],id:0,level:-1,data:{}, defaultValue:0, last:false },
            { disabled: true, optData:[{name:'请选择',id:0,last:false }],id:0,level:-1,data:{}, defaultValue:0, last:false },
            { disabled: true, optData:[{name:'请选择',id:0,last:false }],id:0,level:-1,data:{}, defaultValue:0,last:false }
        ]
        let aptitudePromise = []
        for( let k in initData ){
            if(k === "0"){
                aptitudePromise.push(new Promise((resolve, reject) => {
                    Get(`/search/getQualification/:${0}`).then(
                        res => {
                            console.log('/qualification/getCQByPid/2222',res)
                            initData[k].optData.push(...res.data.content)
                            resolve('成功了')
                        }
                    )
                }))

                initData[k].disabled = false
                initData[k].id = aptobj.aptitudeTypeId
                initData[k].defaultValue = aptobj.aptitudeTypeId
                initData[k].level = 0
            }
            if(k === "1"){
                if(aptobj.aptitudeTypeId === undefined){
                    initData[k].disabled = true
                    initData[k].defaultValue = 0
                }else{
                    aptitudePromise.push(new Promise((resolve, reject) => {
                        Get(`/search/getQualification/:${aptobj.aptitudeTypeId}`).then(
                            res => {

                                console.log('/qualification/getCQByPid/1111',aptobj.aptitudeTypeId)
                                console.log('/qualification/getCQByPid/2222',res)
                                initData[k].optData.push(...res.data.content)
                                resolve('成功了')
                            }
                        )
                    }))

                    if(aptobj.aptitudeLargeId){
                        initData[k].id = aptobj.aptitudeLargeId
                        initData[k].defaultValue = aptobj.aptitudeLargeId
                        initData[k].level = 1
                    }else{
                        if(aptobj.aptitudeSmallId){
                            initData[k].id = aptobj.aptitudeSmallId
                            initData[k].defaultValue = aptobj.aptitudeSmallId

                            initData[k].level = 2
                        }else{
                            if(aptobj.aptitudeMajorId){
                                initData[k].id = aptobj.aptitudeMajorId
                                initData[k].defaultValue = aptobj.aptitudeMajorId

                                initData[k].level = 3
                            }else{
                                initData[k].id = aptobj.levelId
                                initData[k].defaultValue = aptobj.levelId

                                initData[k].level = 4
                            }
                        }

                    }
                    initData[k].disabled = false
                }
            }
            if(k === "2"){
                if(initData[1].id === aptobj.levelId ||
                    initData[1].id === 0 ){
                    initData[k].disabled = true
                    initData[k].defaultValue = 0
                }else{
                    aptitudePromise.push(new Promise((resolve, reject) => {
                        Get(`/search/getQualification/:${initData[1].id}`).then(
                            res => {
                                console.log('/qualification/getCQByPid/2222',res.data.content)
                                initData[k].optData.push(...res.data.content)
                                resolve('成功了')
                            }
                        )
                    }))

                    if( aptobj.aptitudeSmallId &&
                        initData[1].id !== aptobj.aptitudeSmallId){
                        initData[k].id = aptobj.aptitudeSmallId
                        initData[k].defaultValue = aptobj.aptitudeSmallId
                        initData[k].level = 2
                    }else{
                        if( aptobj.aptitudeMajorId  ){
                            initData[k].id = aptobj.aptitudeMajorId
                            initData[k].defaultValue = aptobj.aptitudeMajorId

                            initData[k].level = 3
                        }else{
                            initData[k].id = aptobj.levelId
                            initData[k].defaultValue = aptobj.levelId

                            initData[k].level = 4
                        }
                    }
                    initData[k].disabled = false

                }
            }
            if(k === "3"){
                if(initData[2].id === aptobj.levelId ||
                    initData[2].id === 0 ){
                    initData[k].disabled = true
                    initData[k].defaultValue = 0
                    console.log(303333333,initData[k].defaultValue,initData[2].id)
                }else{
                    aptitudePromise.push(new Promise((resolve, reject) => {
                        Get(`/search/getQualification/:${initData[2].id}`).then(
                            res => {
                                console.log('/qualification/getCQByPid/2222',res.data.content)
                                initData[k].optData.push(...res.data.content)
                                resolve('成功了')
                            }
                        )
                    }))

                    if( aptobj.aptitudeMajorId &&
                        initData[2].id !== aptobj.aptitudeMajorId){
                        initData[k].id = aptobj.aptitudeMajorId
                        initData[k].defaultValue = aptobj.aptitudeMajorId

                        initData[k].level = 3
                    }else{
                        initData[k].id = aptobj.levelId
                        initData[k].defaultValue = aptobj.levelId

                        initData[k].level = 4
                    }
                    initData[k].disabled = false
                }
            }
            if(k === "4"){
                if(initData[3].id === aptobj.levelId ||
                    initData[3].id === 0 ){
                    initData[k].disabled = true
                    initData[k].defaultValue = 0
                    console.log(325555555555,initData[k].defaultValue,initData[3].id)
                }else{
                    aptitudePromise.push(new Promise((resolve, reject) => {
                        Get(`/search/getQualification/:${aptobj.aptitudeMajorId}`).then(
                            res => {
                                console.log('/qualification/getCQByPid/2222',res.data.content)
                                initData[k].optData.push(...res.data.content)
                                resolve('成功了')
                            }
                        )
                    }))

                    initData[k].disabled = false
                    initData[k].id = aptobj.levelId
                    initData[k].defaultValue = aptobj.levelId
                    initData[k].level = 4

                }
            }
        }
        Promise.all(aptitudePromise).then((res)=>{
            setQcdata(initData)


        })
    }
    const onQcSearch=(searchText)=>{
        setQcsearchstr(searchText)

        if(searchRef.current){
            clearTimeout(searchRef.current)
        }
        searchRef.current = setTimeout(()=>{
            Post('/search/QualificationByAptitude',{aptitude:searchText}).then(res=>{

                console.log('返回搜索数据')
                let suggestion = res.data.content
                setQcDataSource(suggestion)
            })
        },500)
    }

    const onProjectStage = (val) => {
        setCurrentsProject(val)

        setCurrentTenderType(null)
        // setCurrentsTenderProjectType('冶金')
        // const [tenderProjectType, setTenderProjectType] = useState([])
        // const getTenderProjectType = async ()=>{
        //     const res = await Get('/users/bidsType')
        //     if(res.data.code == '0'){
        //         setTenderProjectType(res.data.content)
        //     }
        // }
        setCurrentsBidType(null)
        setCurrentsTime(0)
        setCurrentsBidTimeStart(0)
        setCurrentsBidTimeEnd(0)
        setCurrentsCount(0)
        setCurrentsBidFundsStart(0)
        setCurrentsBidFundsEnd(0)
        setCurrentsFundsSource(null)
        setCurrentsInvestmentFundsType(0)
        setCurrentsInvestmentFundsStart(0)
        setCurrentsInvestmentFundsEnd(0)
        winningFilterChange(
            {
                projectStage:val,
                tenderType: null,
                province: provinceName==='全部'?'':provinceName,
                city: regName==='全部'?'':regName,
                bidType:null,
                bidTimeType:0,
                bidTimeStart:0,
                bidTimeEnd:0,
                bidFundsType:0,
                bidFundsStart:0,
                bidFundsEnd:0,
                fundsSource:null,
                investmentFundsType:0,
                investmentFundsStart:0,
                investmentFundsEnd:0
            }
        )
    }

    const onProjectType = (val) => {
        setCurrentsTenderProjectType(val)
        winningFilterChange({projectType:val})
    }

    const getProjectStage = () => {
        const comps = []
        projectStage.map((p) => {
            const { value, name } = p
            const checked = currentsProject === value
            comps.push(
                <CheckableTag className={'tag','area-style'} style={{ fontSize: '1rem',backgroundColor:`${checked?'#2B64F1':'#fff'}`, padding:'5px 12px' }} key={value} checked={checked} onChange={() => onProjectStage(value)}>{name}</CheckableTag>
            )
        })
        return comps
    }

    const getProjectType = () =>{
        const comps = []
        comps.push(
            <CheckableTag className={'tag','area-style'} style={{ fontSize: '1rem',backgroundColor:`${currentsTenderProjectType==''?'#2B64F1':'#fff'}`, padding:'5px 12px' }} key={''} checked={currentsTenderProjectType==''} onChange={() => onProjectType('')}>全部</CheckableTag>
        )
        tenderProjectType.map((p) => {
            const { dictCode, dictName } = p
            const checked = currentsTenderProjectType === dictCode
            comps.push(
                <CheckableTag className={'tag','area-style'} style={{ fontSize: '1rem',backgroundColor:`${checked?'#2B64F1':'#fff'}`, padding:'5px 12px' }} key={dictCode} checked={checked} onChange={() => onProjectType(dictCode)}>{dictName}</CheckableTag>
            )
        })
        return comps
    }

    const onTenderType = (val) => {
        setCurrentTenderType(val)
        winningFilterChange({tenderType:val})
    }

    const getTenderType = () => {
        const comps = []
        TenderType.map((p) => {
            const { value, name } = p
            const checked = currentTenderType === value
            comps.push(
                <CheckableTag className={'tag','area-style'} style={{ fontSize: '1rem',backgroundColor:`${checked?'#2B64F1':'#fff'}`, padding:'5px 12px' }} key={value} checked={checked} onChange={() => onTenderType(value)}>{name}</CheckableTag>
            )
        })
        return comps
    }

    const getSearchComps = () => {
        let { combinationParams } = props;
        switch (tab) {
            case 'combination':
                var qcsearchstrarr = qcsearchstr.split('')
                var children=qcDataSource.map((v,i)=>{
                    let ap = v.aptitude.split('')
                    let res = []
                    for(let a in ap){
                        let isfind = false
                        for(let b in qcsearchstrarr){
                            if(ap[a]==qcsearchstrarr[b]){
                                isfind = true
                            }
                        }
                        if(isfind == true){
                            res.push(<span style={{color:'red'}}>{ap[a]}</span>)
                        }
                        else{
                            res.push(<span>{ap[a]}</span>)
                        }

                    }
                    return <Option key={i} title={v.aptitude} value={v.aptitude}>{res}</Option>
                })
                return <React.Fragment>
                    <Area label={'所在地区'} onChange={onProvinceChange} defaultValue={provinceDefault} />
                    {filingArea}
                    {regArea}
                    <Row>
                        <Col span={2}><div className={'area-label'}>资质条件</div></Col>
                        <Col span={22}><AutoComplete
                            value={qcvalue}
                            onChange={(v)=>setQcvalue(v)}
                            optionLabelProp={'value'}
                            style={{ width: 400 }}
                            onSelect={onQcSelect}
                            onSearch={onQcSearch}
                            placeholder="请输入资质关键字查询"
                        >
                            {children}
                        </AutoComplete></Col>
                    </Row>

                    <UnionSelect label={''} addLabel={'增加资质'} rmLabel={'删除资质'} func={getAchieveData} defaultData={defaultAchieve}  onValueChange={onQualificationsChange} qcdata={qcdata}/>

                    <UnionSelect label={'人员条件'} defaultData={defaultPerson} addLabel={'增加人员'} rmLabel={'删除人员'} func={getPersonData} type={'person'} onValueChange={onPersonChange} provinceName={provinceName} defaultPName={props.pName}/>
                    {/* 所有input需要用form*/}
                    <Row style={{marginTop:'25px',display:combinationSearchShow?'none':'block'}}>
                        <Col span={2}><div className={'area-label'}>业绩条件</div></Col>
                        <Col span={22}>
                            <Button onClick={()=>{setCombinationSearchShow(true)}} type={'primary'} style={{ width:'152px'}} ghost > <Icons className={'icon_plus'} type={'icon-iconset0186'} /> {'增加业绩条件'}</Button>
                        </Col>
                    </Row>
                    <CombinationAchieve combinationSearchShow={combinationSearchShow} onChange={onAchieveChange1} defaultValue={projectDefault} getFieldDecorator={getFieldDecorator} initKeyWords={initKeyWords}/>
                    <Row style={{marginTop:'25px'}}>
                        <Col span={2}><div className={'area-label'}>有无不良</div></Col>
                        <Col span={22}>
                            <CheckableTag className={'tag area-style'} style={{ fontSize: '1rem',backgroundColor:`${hasBad===null?'#2B64F1':'#fff'}`, padding:'5px 12px' }} key={0} checked={hasBad===null} onChange={() => onAchieveBadtypeChange(null)}>不限</CheckableTag>
                            <CheckableTag className={'tag area-style'} style={{ fontSize: '1rem',backgroundColor:`${hasBad===false?'#2B64F1':'#fff'}`, padding:'5px 12px' }} key={1} checked={hasBad===false} onChange={() => onAchieveBadtypeChange(false)}>无不良</CheckableTag>
                        </Col>
                    </Row>
                  </React.Fragment>
                break
            case 'company':
                return <React.Fragment>
                    <Area label={'所在地区'} onChange={onProvinceChange} />
                    {filingArea}
                    {regArea}

                    {/* 所有input需要用form*/}
                    {getFieldDecorator('companyName', { initialValue: initKeyWords })(
                        <KeyWords label={'企业名称'} span={10} placeholder={'请输入企业名称'} {...props} />
                    )}
                    <Row style={{marginTop:'30px'}}>
                        <Divider style={{margin:'0 auto'}}/>
                    </Row> 
                    <Row className={'keyWords_wrapper'} style={{display:'grid'}}>
                        <Button onClick={props.onSubmit} className={'button_style'} style={{ margin: '0 auto'}} type='primary'>查询</Button>
                    </Row>
                </React.Fragment>
                break
            case 'constructing':
                return <React.Fragment>
                    <Area label={'所在地区'} onChange={onProvinceChange} />

                    {/* 所有input需要用form*/}
                    {getFieldDecorator('companyName', { initialValue: '' })(
                        <KeyWords label={'企业名称'} span={10} placeholder={'请输入企业名称'} {...props} />
                    )}
                    {getFieldDecorator('personName', { initialValue:initKeyWords })(
                        <KeyWords label={'人员名称'} span={10} placeholder={'请输入人员名称'} {...props} />
                    )}
                    {getFieldDecorator('projectName', { initialValue: '' })(
                        <KeyWords label={'项目名称'} span={10} placeholder={'请输入项目名称'} {...props} />
                    )}
                    <Row style={{marginTop:'30px'}}>
                        <Divider style={{margin:'0 auto'}}/>
                    </Row>
                    <Row className={'keyWords_wrapper'} style={{display:'grid'}}>
                        <Button onClick={props.onSubmit} className={'button_style'} style={{ margin: '0 auto'}} type='primary'>查询</Button>
                    </Row>
                </React.Fragment>
                break
            case 'qualification':
                var  qcsearchstrarr = qcsearchstr.split('')
                var  children=qcDataSource.map((v,i)=>{
                    let ap = v.aptitude.split('')
                    let res = []
                    for(let a in ap){
                        let isfind = false
                        for(let b in qcsearchstrarr){
                            if(ap[a]==qcsearchstrarr[b]){
                                isfind = true
                            }
                        }
                        if(isfind == true){
                            res.push(<span style={{color:'red'}}>{ap[a]}</span>)
                        }
                        else{
                            res.push(<span>{ap[a]}</span>)
                        }

                    }
                    return <Option key={i} title={v.aptitude} value={v.aptitude}>{res}</Option>
                })
                return <React.Fragment>
                    <Area label={'所在地区'} onChange={onProvinceChange} />
                    {filingArea}
                    {regArea}
                    <Row>
                        <Col span={2}><div className={'area-label'}>资质条件</div></Col>
                        <Col span={22}><AutoComplete
                            value={qcvalue}
                            onChange={(v)=>setQcvalue(v)}
                            optionLabelProp={'value'}
                            style={{ width: 400 }}
                            onSelect={onQcSelect}
                            onSearch={onQcSearch}
                            placeholder="请输入资质关键字查询"
                        >
                            {children}
                        </AutoComplete></Col>
                    </Row>

                    <UnionSelect label={''} addLabel={'增加资质'} rmLabel={'删除资质'} func={getAchieveData} onValueChange={onQualificationsChange} qcdata={qcdata}/>

                    <Row style={{marginTop:'30px'}}>
                        <Divider style={{margin:'0 auto'}}/>
                    </Row>
                    <Row className={'keyWords_wrapper'} style={{display:'grid'}}>
                        {/* <Col span={2}>
                            <div className={'keyWords_label'} > </div>
                        </Col> */}
                        {/* <Col span={10} className={'keyWords_content'}> */}
                            <Button onClick={props.onSubmit} type='primary' className={'button_style'} style={{justifySelf:'center',alignSelf:'center'}}>查询</Button>
                        {/* </Col> */}
                    </Row>
                </React.Fragment>
                break
            case 'person':
                return <React.Fragment>
                    <Area label={'所在地区'} onChange={onProvinceChange} />
                    <UnionSelect label={'人员条件'} addLabel={'增加人员'} rmLabel={'删除人员'} func={getPersonData} type={'person'} hideNumberInput={true} onValueChange={onPersonChange} provinceName={provinceName}/>
                    {getFieldDecorator('personName', { initialValue: initKeyWords })(
                        <KeyWords label={'人员姓名'} span={10} placeholder={'请输入人员姓名'} {...props} />
                    )}
                    {getFieldDecorator('companyName')(
                        <KeyWords label={'注册单位'} span={10} placeholder={'请输入注册单位'} {...props} />
                    )}
                    <Row style={{marginTop:'30px'}}>
                        <Divider style={{margin:'0 auto'}}/>
                    </Row> 
                    <Row className={'keyWords_wrapper'} style={{display:'grid'}}>
                        <Button onClick={props.onSubmit} type='primary' className={'button_style'} style={{justifySelf:'center',alignSelf:'center'}}>查询</Button>
                    </Row>
                </React.Fragment>
                break
            case 'tendering':
                return <React.Fragment>
                    <Row style={{marginTop:'25px'}}>
                        <Col span={2}><div className={'area-label'}>项目阶段</div></Col>
                        <Col span={22}>
                            {getProjectStage()} 
                        </Col>
                    </Row>
                    {
                        currentsProject === '2' ?     
                        <Row className={'achieve_wrapper'}>
                            <Col span={2}>
                                <div className={'achieve-label'} >招标类型</div>
                            </Col>
                            <Col span={22} className={'achieve-content'}>
                                {getTenderType()}
                            </Col>
                        </Row>: ''
                    }
                    <Area label={'所在地区'} onChange={onProvinceChange} />
                    {
                        currentsProject === '4' ? filingArea : ''
                    }
                    {
                        currentsProject === '4' ? regArea : ''
                    }
                    {
                        currentsProject == null || currentsProject === '4' ? '' :
                        <Row style={{marginTop:'10px'}}>
                            <Col span={2}><div className={'area-label'}>项目类型</div></Col>
                            <Col span={22}>
                                {getProjectType()} 
                            </Col>
                        </Row>
                    }
                    {
                        currentsProject === '1' ? <ProjectApproval onChange={approvalChange}/> : currentsProject === '4' ? <Winning onChange={conditionChange}/> : ''
                    }
                    {
                        currentsProject === '4' ? getFieldDecorator('bidCompanyName')(
                            <KeyWords label={'企业名称'} span={10} placeholder={'请输入企业名称'} {...props} />
                        ) : ''
                    }
                    {getFieldDecorator('projectName', { initialValue: initKeyWords })(
                        <KeyWords label={'项目名称'} span={10} placeholder={'请输入项目名称'} {...props} />
                    )}

                    <Row style={{marginTop:'30px'}}>
                        <Divider style={{margin:'0 auto'}}/>
                    </Row> 
                    <Row className={'keyWords_wrapper'} style={{display:'grid'}}>
                        <Button onClick={props.onSubmit} type='primary' className={'button_style'} style={{justifySelf:'center',alignSelf:'center'}}>查询</Button>
                    </Row>
                </React.Fragment>
                break
        }
    }

    return (
        <div className={'combination_wrapper'}>
            {getSearchComps()}
        </div>
    )
}


// payload:{ key:'', value:''}
const getFilters = (payload) => {

}
