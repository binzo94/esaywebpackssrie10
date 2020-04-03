import React, { useState } from 'react'
import { Col, Row, Tag } from 'antd'
import _ from 'lodash'
import './index.css'


const ProjectType = [
    { value: '', name: '全部' },
    { value: '房屋建筑工程', name: '房屋建筑工程' },
    { value: '市政公用工程', name: '市政公用工程' },
    { value: '其他', name: '其他' }
]


const { CheckableTag } = Tag

export default (props) => {

    const { label = '项目类型', onChange, defaultValue = {} } = props
    const { status = '' } = defaultValue
    const [currentStatus, setCurrentStatus] = useState(status)

    const onStatusChange = (val) => {
        callOnChange({ type: 'type', value: val })
        setCurrentStatus(val)
    }

    const callOnChange = (payload) => {
        if (_.isFunction(onChange)) {
            onChange(payload)
        }
    }

    const getProjectStatus = () => {
        const comps = []
        ProjectType.map((p) => {
            const { value, name } = p
            const checked = currentStatus === value
            comps.push(
                <CheckableTag className={'tag','area-style'} style={{ fontSize: '1rem',backgroundColor:`${checked?'#2B64F1':'#fff'}`,padding:'5px 12px' }} key={value} checked={checked} onChange={() => onStatusChange(value)}>{name}</CheckableTag>
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
                    {getProjectStatus()}
                </Col>
            </Row>
        </React.Fragment>
    )
}
