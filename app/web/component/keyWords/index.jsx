import React, { useState } from 'react'
import { Input, Row, Col, Divider } from 'antd'

import './index.css'

export default (props) => {

    const { label = '关键字', defaultValue = '', placeholder = '20个字符，用逗号分割', span = 22, ButtonGroup } = props;
    const [value, setvalue] = useState(props.value);
    function inputChange(e) {
        // setvalue(e.target.value);
        // props.onFilterChange({
        //     ...props.combinationParams,
        //     keywords: e.target.value
        // })
    }

    return (
        <Row className={'keyWords_wrapper'}>
            <Col span={2}>
                <div className={'keyWords_label'} >{label}</div>
            </Col>
            <Col span={span} className={'keyWords_content'}>
                <Input  {...props} defaultValue={defaultValue} placeholder={placeholder} style={{ width: 330 }} />
                {ButtonGroup && <ButtonGroup />}
            </Col>
        </Row>
    )
}
