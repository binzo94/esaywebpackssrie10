import React, { useState } from 'react'
import { Col, Row, Tag, Modal, InputNumber, DatePicker,Input} from 'antd'
import moment from 'moment'
import _ from 'lodash'

import './index.css'

const ProjectStatus = [
    { value: 'bid', name: '中标业绩' },
    { value: 'working', name: '在建业绩' },
    { value: 'completed', name: '已竣工业绩' }
]

const ProjectScale = [
    { value: 0, name: '全部' },
    { value: 1, name: '1000万以下 ' },
    { value: 2, name: '1000-2000万' },
    { value: 3, name: '2000-5000万' },
    { value: 4, name: '5000-10000万' },
    { value: -1, name: '自定义' }
]

const ProjectTimeRange = [
    { value: 0, name: '全部' },
    { value: 3, name: '近三年' },
    { value: 5, name: '近五年' },
    { value: 10, name: '近十年' },
    { value: -1, name: '自定义' }
]

const ProjectType = [
    { value: '', name: '全部' },
    { value: '房屋建筑工程', name: '房屋建筑工程' },
    { value: '市政公用工程', name: '市政公用工程' },
    { value: '其他', name: '其他' }
]

const { CheckableTag } = Tag
const { RangePicker } = DatePicker

export default (props) => {

    const { label = '业绩条件', projectLabel = '项目类型', scaleLabel = '业绩规模', dateLabel = '时间范围', onChange, defaultValue = {} } = props

    const { status = 'bid', project = '', scale = 0, scaleStartVal = null, scaleEndVal = null, date = 0, dateStartVal = 0, dateEndVal = 0 } = defaultValue
    const [currentStatus, setCurrentStatus] = useState(status)
    // 规模
    const [currentScale, setCurrentScale] = useState(scale)
    const [scaleStart, setScaleStart] = useState(scaleStartVal)
    const [scaleEnd, setScaleEnd] = useState(scaleEndVal)
    const [scaleModalVisible, setScaleModalVisible] = useState(false)
    const [scaleModalErrorMsg, setscaleModalErrorMsg] = useState('')
    const [scaleTempPayloads, setscaleTempPayloads] = useState('')
    // 时间
    const [currentDate, setCurrentDate] = useState(date)
    const [dateModalVisible, setDateModalVisible] = useState(false)
    const [dateStart, setDateStart] = useState(dateStartVal)
    const [dateEnd, setDateEnd] = useState(dateEndVal)

    const [currentsStatus, setCurrentsStatus] = useState(project)

    const onProjectChange = (val) => {
        callOnChange({ type: 'project', value: val })
        setCurrentsStatus(val)
    }

    const onStatusChange = (val) => {
        callOnChange({ type: 'status', value: val })
        setCurrentStatus(val)
    }
    const getProjectStatus = () => {
        const comps = []
        ProjectStatus.map((p) => {
            const { value, name } = p
            const checked = currentStatus === value
            comps.push(
                <CheckableTag className={'tag','area-style'} style={{ fontSize: '1rem',backgroundColor:`${checked?'#2B64F1':'#fff'}`, padding:'5px 12px' }} key={value} checked={checked} onChange={() => onStatusChange(value)}>{name}</CheckableTag>
            )
        })
        return comps
    }


    const onScaleCustomClick = () => {

        setScaleModalVisible(true)

    }

    const onScaleChange = (val) => {
        callOnChange({ type: 'scale', value: val })
        setCurrentScale(val)
    }

    const getScaleComps = () => {
        const comps = []

        ProjectScale.map(ps => {
            const { value, name, startValue, endValue } = ps
            const checked = currentScale === value
            if (value === -1) {
                let nameCustom = name

                if (currentScale === value && scaleStart >= 0 && scaleEnd >= 0) {
                    nameCustom = name + `(${scaleStart}-${scaleEnd} 万元)`
                }
                comps.push(
                    <CheckableTag className={'tag','area-style'} style={{ fontSize: '1rem',backgroundColor:`${checked?'#2B64F1':'#fff'}`, padding:'5px 12px' }} key={value} checked={checked} onChange={() => onScaleCustomClick(value)}>{nameCustom}</CheckableTag>
                )

            } else {
                comps.push(
                    <CheckableTag className={'tag','area-style'} style={{ fontSize: '1rem',backgroundColor:`${checked?'#2B64F1':'#fff'}`, padding:'5px 12px' }} key={value} checked={checked} onChange={() => onScaleChange(value)}>{name}</CheckableTag>
                )
            }
        })

        return comps
    }

    const getProjectType = () => {
        const comps = []
        ProjectType.map((p) => {
            const { value, name } = p
            const checked = currentsStatus === value
            comps.push(
                <CheckableTag className={'tag','area-style'} style={{ fontSize: '1rem',backgroundColor:`${checked?'#2B64F1':'#fff'}`,padding:'5px 12px' }} key={value} checked={checked} onChange={() => onProjectChange(value)}>{name}</CheckableTag>
            )
        })
        return comps
    }

    const callOnChange = (payload) => {
        if (_.isFunction(onChange)) {
            onChange(payload)
        }
        console.log(110,payload)
        setscaleTempPayloads(payload)
    }

    const onScaleModalOK = () => {
        console.log("onScaleModalOK:",scaleStart,scaleEnd)
        if(scaleStart !== null && scaleEnd !== null ) {
            if (scaleStart >= 0 && scaleEnd >= 0 && scaleStart <= scaleEnd) {
                setScaleModalVisible(false)
                setscaleModalErrorMsg('')
                setCurrentScale(-1)
                callOnChange({type: 'scale', value: -1, start: scaleStart, end: scaleEnd})
            } else {
                setscaleModalErrorMsg('上限需大于等于下限且都不能小于0')
            }
        }else{
            setscaleModalErrorMsg('你还没输入范围')
        }
    }

    const onScaleModalCancel = () => {
        if( scaleTempPayloads.start >=0 && scaleTempPayloads.end >= 0 && scaleTempPayloads.start <= scaleTempPayloads.end ){
            callOnChange({type: 'scale', value: -1, start: scaleTempPayloads.start, end: scaleTempPayloads.end})
            // if(scaleStart >= 0 && scaleStart != null){
            //     if(scaleStart !== scaleTempPayloads.start){
            //         setScaleStart(scaleStart)
            //     }else{
            //         setScaleStart(scaleTempPayloads.start)
            //     }
            // }else{
            //     setScaleStart(scaleTempPayloads.start)
            // }
            // if(scaleEnd >= 0 ){
            //     console.log('111')
            // }else{
            //     setScaleEnd(scaleTempPayloads.end)
            // }
            setScaleStart(scaleTempPayloads.start)
            setScaleEnd(scaleTempPayloads.end)
        }
        // setscaleModalErrorMsg('')
        // setScaleStart(0)
        // setScaleEnd(0)
        // callOnChange({ type: 'scale', value: -1, start: 0, end: 0 })
        setScaleModalVisible(false)
    }

    const onDateCustomChange = () => {
        setDateModalVisible(true)
    }

    const onDateChange = (val) => {
        callOnChange({ type: 'date', value: val })
        setCurrentDate(val)
    }

    const getDateComps = () => {
        const comps = []

        ProjectTimeRange.map(ps => {
            const { value, name } = ps
            const checked = currentDate === value
            if (value === -1) {
                let nameCustom = name
                if (currentDate === value && dateStart && dateEnd) {
                    nameCustom = name + `(${dateStart}---${dateEnd} )`
                }
                comps.push(
                    <CheckableTag className={'tag','area-style'} style={{ fontSize: '1rem',backgroundColor:`${checked?'#2B64F1':'#fff'}`,padding:'5px 12px' }} key={value} checked={checked} onChange={() => onDateCustomChange(value)}>{nameCustom}</CheckableTag>
                )

            } else {
                comps.push(
                    <CheckableTag className={'tag','area-style'} style={{ fontSize: '1rem',backgroundColor:`${checked?'#2B64F1':'#fff'}`, padding:'5px 12px'}} key={value} checked={checked} onChange={() => onDateChange(value)}>{name}</CheckableTag>
                )
            }
        })

        return comps
    }

    const onDateModalOK = () => {
        setCurrentDate(-1)
        callOnChange({ type: 'date', value: -1, start: dateStart, end: dateEnd })
        setDateModalVisible(false)
    }

    const onDateModalCancel = () => {
        // setDateStart(0)
        // setDateEnd(0)
        setDateModalVisible(false)
    }

    const onDateRangeChange = (dates) => {
        if (dates && dates.length === 2) {
            setDateStart(moment(dates[0]).format('YYYY-MM-DD'))
            setDateEnd(moment(dates[1]).format('YYYY-MM-DD'))
        }
    }
    const timeMinChange=(moment,momentstr)=>{
        setDateStart(momentstr)
    }
    const timeMaxChange=(moment,momentstr)=>{
        setDateEnd(momentstr)
    }
    return (

        <React.Fragment>
            <Row className={'achieve_wrapper'}>
                <Col span={2}>
                    <div className={'achieve-label'} >{projectLabel}</div>
                </Col>
                <Col span={22} className={'achieve-content'}>
                    {getProjectType()}
                </Col>
            </Row>
            <Row className={'achieve_wrapper'}>
                <Col span={2}>
                    <div className={'achieve-label'} >{label}</div>
                </Col>
                <Col span={22} className={'achieve-content'}>
                    {getProjectStatus()}
                </Col>
            </Row>
            <Row className={'achieve_wrapper'}>
                <Col span={2}>
                    <div className={'achieve-label'} >{scaleLabel}</div>
                </Col>
                <Col span={22} className={'achieve-content'}>
                    {getScaleComps()}
                </Col>
            </Row>
            <Row className={'achieve_wrapper'}>
                <Col span={2}>
                    <div className={'achieve-label'} >{dateLabel}</div>
                </Col>
                <Col span={22} className={'achieve-content'}>
                    {getDateComps()}
                </Col>
            </Row>
            <Modal centered  closable={false} visible={scaleModalVisible} 
                onOk={onScaleModalOK} 
                onCancel={onScaleModalCancel}
                className={'small-modal'}
            >
                <div >
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                        <div style={{ marginRight: 20 }}>
                            <span style={{ marginRight: 10 }}>业绩规模</span>
                            <InputNumber onChange={(val) => { setScaleStart(val) }} placeholder={'最小金额'} style={{ marginRight: 10 }}/>
                             - 
                            <InputNumber onChange={(val) => { setScaleEnd(val) }} placeholder={'最大金额'}style={{ marginLeft: 10 }}/>
                        </div>
                        {/* <div>
                            <span style={{ marginRight: 10 }}> 金额上限(万)</span>
                            <InputNumber onChange={(val) => { setScaleEnd(val) }} />
                        </div> */}
                    </div>
                    {scaleModalErrorMsg ? <div>{scaleModalErrorMsg}</div> : ''}
                </div>

            </Modal>
            <Modal centered 
                visible={dateModalVisible} 
                onOk={onDateModalOK} 
                onCancel={onDateModalCancel} 
                closable={false}
                   width={640}
                className={'small-modal'}>
                <div >
                    <div style={{ display: 'flex',justifyContent: 'center', flexDirection: 'row', width: '100%' }}>
                        <div style={{ marginRight: 20 }}>
                            <Input.Group compact style={{display:"flex",justifyContent: 'center'}}>
                                <div style={{height:"32px",lineHeight:'32px',marginRight:"10px"}}>时间范围:</div>
                                <DatePicker onChange={timeMinChange} />
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
                                <DatePicker onChange={timeMaxChange} />
                            </Input.Group></div>

                    </div>
                    {scaleModalErrorMsg ? <div>{scaleModalErrorMsg}</div> : ''}
                </div>
            </Modal>
        </React.Fragment>
    )
}
