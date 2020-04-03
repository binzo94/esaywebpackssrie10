import React, { useState, useEffect } from 'react'
import { Row, Col, Button, InputNumber, Modal, Icon} from 'antd'
import _ from 'lodash'
import Icons from '../icon/icon'
import Select from '../select/index'
import './index.css'
import {getUser} from '../../utils/tokenHelper';
import {showErrorMsg} from '../notification';
import { isLogin, isVip, loginShow,vipShow } from '../../utils/userHelper'
import person from "../../page/details/components/person/person";
import {isSafeObj} from "../../utils/objectHelper";

const MAX_COUNT=3
const MAX_COUNT_ACHIEVE= 4
const MAX_COUNT_PERSON= 3
const initData = [[
    { disabled: false, optData:[{ name:'请选择',id:0,last:false }],id:0,level:-1,defaultValue:0,last:false},
    { disabled: true, optData:[{name:'请选择',id:0,last:false }],id:0,level:-1,defaultValue:0,last:false},
    { disabled: true, optData:[{name:'请选择',id:0,last:false }],id:0,level:-1,defaultValue:0,last:false},
    { disabled: true, optData:[{name:'请选择',id:0,last:false }],id:0,level:-1,defaultValue:0,last:false},
    { disabled: true, optData:[{name:'请选择',id:0,last:false }],id:0,level:-1, value:1,defaultValue:0,last:false}
]]
export default (props)=>{

    const { label ='', addLabel='',rmLabel, func=()=>{}, type='', defaultData='', onValueChange,hideNumberInput } = props
    const init = initData
    const initDataArray = _.cloneDeep(init)
    const count = (defaultData&&defaultData.length)||0
    const [ selState, setSelState ] = useState(defaultData||initDataArray)
    const [ currentData , setCurrentData ] = useState([])
    const [ currentCount, setCurrentCount ] = useState(count)
    const [topLevelData ,setTopLevelData ] = useState([])
    const [ selValue, setSelValue ] = useState(0)
    const [ row, setRow ] = useState(0)
    const [ col, setCol ] = useState(0)
    const [ pcount, setPCount ] = useState(0)
    const maxLevel = type === 'person' ?MAX_COUNT_PERSON:MAX_COUNT_ACHIEVE
    const [ canAdd, setCanAdd ] = useState(count>0)
    // const [currentOpt, setCurrentOpt ]= useState([])


    const onRemove=(rIndex)=>{
        if(rIndex&&rIndex>0){
            const frontArr = selState.slice(0,rIndex)
            const afterArr = selState.slice(rIndex+1)
            const newState = [...frontArr,...afterArr]
            setSelState(newState)
            if(_.isFunction(onValueChange)){
                onValueChange({type,value:newState})
            }
            setCurrentCount(currentCount-1)
            setCanAdd(true)
        }
    }

    const getRCData =(r,c)=>_.get(selState,`[${r}][${c}]`,[])
    const max = type === 'person'?MAX_COUNT_ACHIEVE:MAX_COUNT_ACHIEVE
   //第四个参数优化第一个下拉,减少请求次数
    const getData = async (r,c,val, newState,isNeedTop)=>{


        if( c===0 && val ===0 &&isNeedTop){
            const res = await func(val)
            const { data={} } = res
            const { content=[] } =data
            let optData = [{name:'请选择',id:0 }]
            optData=[...optData,...content]
            setTopLevelData(optData)
            // setCurrentOpt(optData)
            return
        }
        let  newData =[]
        if(c<max && _.isFunction(func)){
            const res = await func(val)
            const { data={} } = res
            const { content=[] } =data
            if(newState&&newState.length>-1&&newState[r]&&newState[r][c+1]){
                const rcdata = _.get(newState,`[${r}][${c+1}]`,[])
                let optData= [{name:'请选择',id:0 }]
                optData =[...optData , ...content]
                if(content.length==0){
                    if(type === 'person'&&c==3){
                        newState[r][4]['disabled'] = false

                    }else{
                        newState[r][c+1]['disabled']=true
                    }

                }else{
                    newState[r][c+1]['disabled']=false
                }
                if(type === 'person'){
                    newState[r][4]['disabled'] = false

                }
                newState[r][c+1]['optData']=optData
                // setCurrentOpt(optData)
                await setSelState(newState)
                setSelValue(val)
                // setCurrentData(content)
                console.log(22222222,newState)
            }
        }else if(c===max){
            setSelState(newState)
            // setCurrentData(content)
        }

    }

    const isLoginCheck = ()=>{
        if(isSafeObj(getUser())){
            if(isVip()){
                return true
            }else{
                vipShow()
                return false
            }
        }else{
            loginShow()
            return false
        }
    }
    const onSelect= async(val,optData,r,c)=>{
        console.log('11111111111111',optData)
        let level,last=false
        for(let it in optData){
            if(optData[it]['id']==val){
                level = optData[it]['level']
                last = optData[it]['last']
                let source = optData[it]['source']
                //判断soucre字段是否为空,非空验证权限
                if(type == 'person' && c == 0&&!!source){
                    if(!isLoginCheck()){
                        return
                    }
                }
            }
        }
        if(!level){
            //取第二条数据
            level =_.get(optData,'[1]["level"]',-1)
        }
        const newState = _.cloneDeep(selState)
        // if( ){
        //     const newData = _.cloneDeep(newState)
            newState.map((rdata,rIndex)=>{
                if(r === rIndex){
                    rdata.map((cdata,cIndex)=>{

                        if(cIndex>c){
                            if(type=='person'&&cIndex==4){
                                newState[rIndex][cIndex]['disabled']=false
                            }else{
                                newState[rIndex][cIndex]['disabled']=true
                            }

                            newState[rIndex][cIndex]['id']=0
                            newState[rIndex][cIndex]['level']=-1
                        }
                        if(cIndex===c){
                            newState[rIndex][cIndex]['id']=0
                            newState[rIndex][cIndex]['level']=-1

                        }

                    })
                }
            })

            // setSelState(newState)
            // return
        // }


        if(c<max){
            if(parseInt(level)<maxLevel && val !==0) {

                newState[r][c+1]['disabled'] = false
            }else if(currentCount<MAX_COUNT && val !==0){
                setCanAdd(true)
                if(type === 'person' ){
                    newState[r][4]['disabled'] = false
                }
            }else {
                setCanAdd(false)
            }
        }else {
            if(currentCount<MAX_COUNT && parseInt(level)===maxLevel ) {
                setCanAdd(true)
            }else{
                setCanAdd(false)
            }
            if(type === 'person'){
                newState[r][4]['disabled'] = false

            }
        }
        if(type !=='person'){
            if(parseInt(level)===maxLevel&&val!=0){

                setCanAdd(true)
            }else{
                setCanAdd(false)
            }
        }

        if(type==='person'&&last&&val!=0){
            setCanAdd(true)
        }else if(type==='person'){
            setCanAdd(false)
        }

        newState[r][c]['id']=val
        newState[r][c]['level']= parseInt(level)
        newState[r][c]['last']= last
        if(type==='person' && c===max){
            newState[r][c]['value']=val
            newState[r][c]['level']=4
            newState[r][c]['last']= true
        }
        await setSelState(newState)
        console.log(3333333333333,newState)
        setRow(r)
        setCol(c)
        if(_.isFunction(onValueChange)){
            // let currentName = ''
             // _.get(newState,`[${r}][${c}].optData`,[]).map(o=>{})
            onValueChange({type,value:newState})
        }
        if(val!=0){
            await getData(r,c,val,newState)
        }



    }

    const getSelectComps =()=>{
        const comps = []
        // const max = type ==='person'?MAX_COUNT_PERSON:MAX_COUNT_ACHIEVE
        if(selState){
            selState.map((r,rIndex)=>{
                const selectComp=[]
                if(r&&r.length>0){
                    r.map((c,cIndex)=>{
                        let { disabled=false,optData=[],id, value,defaultValue } = c
                        if(cIndex===0 && topLevelData&&topLevelData.length>0){
                            optData=[...topLevelData]
                        }
                        if(type==='person' && cIndex === max  ){
                            if(!hideNumberInput)
                            selectComp.push(
                                <React.Fragment key={cIndex+rIndex}>
                                    <InputNumber style={{ marginRight:'10px' }} min={1}  onChange={(val)=>onSelect(val,optData,rIndex,cIndex)} key={rIndex+cIndex} defaultValue={1} disabled={disabled} value={value} optData={optData} />
                                </React.Fragment>
                            )
                        }else{
                            selectComp.push(
                                <React.Fragment key={cIndex+rIndex}>
                                    <Select  onSelect={(val)=>onSelect(val,optData,rIndex,cIndex)} key={rIndex+cIndex} defaultValue={defaultValue} disabled={disabled} value={id} optData={optData} />
                                </React.Fragment>
                            )
                        }

                    })
                }
                comps.push(<Row key={rIndex}>
                {selectComp}
                { rIndex>0?<Button  type={'danger'} style={{ width:'14%'}} ghost onClick={()=>onRemove(rIndex)} > <Icon className={'icon_minus'} type={"minus-circle"} /> {rmLabel}</Button>:''}
                </Row>)
            })

        }

        return comps
    }

    useEffect(()=>{
        getData(0,0,0,selState,true)
    },[  ])

    useEffect( ()=>{
        if(type=='person'){

            if(props.defaultPName == props.provinceName&&pcount==0){
                setPCount(count=>count+1)
                return
            }
            //清空数据,重新拉取0级下拉
            getData(0,0,0,initData,true)
            setSelState(initData)
            setCurrentCount(0)
            setCanAdd(false)
        }
    },[props.provinceName])
    useEffect(()=>{
        console.log('加载数据')
        console.log(props.qcdata)
        if(props.qcdata&&props.qcdata.length!=0){
            if(currentCount<=MAX_COUNT){
                const newSelState = _.cloneDeep(selState)
                newSelState.pop()
                newSelState.push(_.cloneDeep(props.qcdata))
                setSelState(newSelState)
                onValueChange({type:'qualification',value:newSelState})
                setCanAdd(true)
            }else{
                showErrorMsg('至多只能增加4条','uni')
            }
        }
    },[props.qcdata])
    const onAddBtn =()=>{
        // const max = type ==='person'?MAX_COUNT_PERSON:MAX_COUNT_ACHIEVE
        const isLogin = !!getUser()
        if(!isLogin){
            // showErrorMsg('尚未登录，登录后才可添加条件！')
            loginShow()
            return
        }
        if(!isVip()){
            vipShow()
            return
        }
        if(currentCount<MAX_COUNT){
            const initDataArray = _.cloneDeep(initData[0])
            const newSelState = _.cloneDeep(selState)
            newSelState.push(initDataArray)
            setSelState(newSelState)
            setCurrentCount(currentCount+1)
            setCanAdd(false)
        }else{
            showErrorMsg('至多只能增加4条','uni')
        }

    }

    const getAddBtn = ()=>{
        // const max = type ==='person'?MAX_COUNT_PERSON:MAX_COUNT_ACHIEVE
        if(currentCount<max){
            return (<Row>
                <Button disabled={!canAdd} onClick={onAddBtn} type={'primary'} style={{ width:'14%'}} ghost > <Icons className={'icon_plus'} type={'icon-iconset0186'} /> { addLabel }</Button>
            </Row>)
        }else{
            return ''
        }
    }

    return (
        <Row className={'union_wrapper'}>
            <Col span={2}>
                <div  className={'area-label'} >{label}</div>
            </Col>
            <Col span={22}>
                { getSelectComps() }
                { getAddBtn() }

            </Col>
        </Row>
    )
}
