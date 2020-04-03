import React, { useState } from 'react'
import { Col, Row, Tag, Modal, InputNumber, DatePicker } from 'antd'
import moment from 'moment'
import _ from 'lodash'

// import './index.css'

const ProjectScale = [
    { value: 0, name: '全部' },
    { value: 1, name: '1000万以下 ' },
    { value: 2, name: '1000-2000万元' },
    { value: 3, name: '2000-10000万' },
    { value: 4, name: '10000万元以上' },
    { value: -1, name: '自定义' }
]
const SourceFunds = [
    { value: null, name: '全部' },
    { value: '国有资金', name: '国有资金' },
    { value: '业主自筹', name: '业主自筹' },
    { value: '银行贷款', name: '银行贷款' }
]

const { CheckableTag } = Tag

export default (props) => {

    const { label = '业绩条件', sourceLabel = '资金来源', scaleLabel = '投资金额', dateLabel = '时间范围', onChange, defaultValue = {} } = props

    const { status = 'bid', sources = null, scale = 0, scaleStartVal = null, scaleEndVal = null, date = 0, dateStartVal = 0, dateEndVal = 0 } = defaultValue
    const [currentStatus, setCurrentStatus] = useState(status)
    // 规模
    const [currentScale, setCurrentScale] = useState(scale)
    const [scaleStart, setScaleStart] = useState(scaleStartVal)
    const [scaleEnd, setScaleEnd] = useState(scaleEndVal)
    const [scaleModalVisible, setScaleModalVisible] = useState(false)
    const [scaleModalErrorMsg, setscaleModalErrorMsg] = useState('')
    const [scaleTempPayloads, setscaleTempPayloads] = useState('')

    //资金来源
    const [currentSourceFunds, setCurrentSourceFunds] = useState(sources)

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

    const onSourceFunds = (val) => {
        callOnChange({type: 'source', value:val})
        setCurrentSourceFunds(val)
    }

    const getSourceFunds = () => {
        const comps = []
        SourceFunds.map((p) => {
            const { value, name } = p
            const checked = currentSourceFunds === value
            comps.push(
                <CheckableTag className={'tag','area-style'} style={{ fontSize: '1rem',backgroundColor:`${checked?'#2B64F1':'#fff'}`, padding:'5px 12px' }} key={value} checked={checked} onChange={() => onSourceFunds(value)}>{name}</CheckableTag>
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

    return (

        <React.Fragment>
            <Row className={'achieve_wrapper'}>
                <Col span={2}>
                    <div className={'achieve-label'} >{sourceLabel}</div>
                </Col>
                <Col span={22} className={'achieve-content'}>
                    {getSourceFunds()}
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
            <Modal centered  closable={false} visible={scaleModalVisible} 
                onOk={onScaleModalOK} 
                onCancel={onScaleModalCancel}
                className={'small-modal'}
            >
                <div >
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                        <div style={{ marginRight: 20 }}>
                            <span style={{ marginRight: 10 }}>业绩范围</span>
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
        </React.Fragment>
    )
}
