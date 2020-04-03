import React, { useState,useEffect } from 'react'
import { Col, Row, Tag, Modal, DatePicker,LocaleProvider,Input} from 'antd'
import moment from 'moment'
import _ from 'lodash'
import zhCN from 'antd/es/locale/zh_CN';
import './index.css'


const TimeRange = [
    { value: 0, name: '全部' },
    { value: 3, name: '近三年' },
    { value: 5, name: '近五年' },
    { value: 10, name: '近十年' },
    { value: -1, name: '自定义' }
]

const { CheckableTag } = Tag
const { RangePicker } = DatePicker

export default (props) => {

    const { dateLabel = '时间范围', onChange, defaultValue = {} } = props

    const { date = 0, dateStartVal = 0, dateEndVal = 0 } = defaultValue
    // 时间
    const [currentDate, setCurrentDate] = useState(date)
    const [dateModalVisible, setDateModalVisible] = useState(false)
    const [dateStart, setDateStart] = useState(dateStartVal)
    const [dateEnd, setDateEnd] = useState(dateEndVal)
    const [ localeEN, setLocaleEN] = useState('')
    useEffect(()=>{
        setLocaleEN(zhCN)
    },[])
    const callOnChange = (payload) => {
        if (_.isFunction(onChange)) {
            onChange(payload)
        }
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

        TimeRange.map(ps => {
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
                    <CheckableTag className={'tag','area-style'} style={{ fontSize: '1rem',backgroundColor:`${checked?'#2B64F1':'#fff'}`,padding:'5px 12px' }} key={value} checked={checked} onChange={() => onDateChange(value)}>{name}</CheckableTag>
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
        setDateStart(0)
        setDateEnd(0)
        setDateModalVisible(false)
    }

    const onDateRangeChange = (dates) => {
        if (dates && dates.length === 2) {
            setDateStart(moment(dates[0]).format('YYYY-MM-DD'))
            setDateEnd(moment(dates[1]).format('YYYY-MM-DD'))
        }
    }
    const timeMinChange=(mo,datestr)=>{
        setDateStart(datestr)
    }
    const timeMaxChange=(mo,datestr)=>{
        setDateEnd(datestr)
    }
    return (

        <React.Fragment>

            <Row className={'achieve_wrapper'}>
                <Col span={2}>
                    <div className={'achieve-label'} >{dateLabel}</div>
                </Col>
                <Col span={22} className={'achieve-content'}>
                    {getDateComps()}
                </Col>
            </Row>

            <Modal width={640} centered visible={dateModalVisible} onOk={onDateModalOK} onCancel={onDateModalCancel}>
                <div style={{padding:"50px 0px 0px  0px"}}>
                    <Input.Group compact style={{display:"flex",justifyContent: 'center'}}>
                        <div style={{height:"28px",lineHeight:'32px',marginRight:"10px"}}>时间范围:</div>
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
                    </Input.Group>
                </div>

            </Modal>

        </React.Fragment>
    )
}
