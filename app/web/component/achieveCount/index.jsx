import React from 'react'
import { InputNumber, Row,Col } from 'antd'
import _ from 'lodash'

import './index.css'

export default (props)=>{

    const { label='业绩个数',onChange=()=>{},defaultValue=1 } = props

    const onValChange = (val)=>{
        if(_.isFunction(onChange)){
            onChange({
                type:'count',
                value:val
            })
        }
    }

    return(
        <Row className={'keyWords_wrapper'}>
            <Col span={2}>
                <div  className={'keyWords_label'} >{label}</div>
            </Col>
            <Col span={22} className={'keyWords_content'}>
                <InputNumber defaultValue={defaultValue} min={1} style={{ width:146}} onChange={onValChange}/>
            </Col>
        </Row>

    )
}
