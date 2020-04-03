import React, { useState } from 'react'
import { Col, Row, Tag, Modal, InputNumber, DatePicker } from 'antd'
import moment from 'moment'
import _ from 'lodash'

const TenderType = [
    { value: 0, name: '全部类型' },
    { value: 1, name: '勘察设计' },
    { value: 2, name: '施工监理' }
]

const { CheckableTag } = Tag

export default (props) => {

    const { label = '招标类型', onChange, defaultValue = {} } = props

    const { status = 'bid', project = '', scale = 0, scaleStartVal = null, scaleEndVal = null, date = 0, dateStartVal = 0, dateEndVal = 0 } = defaultValue

    //资金来源
    const [currentTenderType, setCurrentTenderType] = useState(scale)

    const onTenderType = (val) => {
        setCurrentTenderType(val)
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

    return (

        <React.Fragment>
            <Row className={'achieve_wrapper'}>
                <Col span={2}>
                    <div className={'achieve-label'} >{label}</div>
                </Col>
                <Col span={22} className={'achieve-content'}>
                    {getTenderType()}
                </Col>
            </Row>
        </React.Fragment>
    )
}
