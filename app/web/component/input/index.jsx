import React, { useState } from 'react';
import { Row, Col, Input } from 'antd';
import './index.css';
export default function (props) {
    const { field = '', label = '', placeholder = '', ButtonGroup, antInputProps = {}, defaultValue, limit } = props;
    const [errorMessage, seterrorMessage] = useState('');
    const [value, setvalue] = useState(defaultValue);
    function inputChange(e) {
        if (limit && e.target.value.length > 20) {
            seterrorMessage('最多输入20个字符');
            e.preventDefault();
            return;
        } else {
            seterrorMessage(undefined);
        }
        setvalue(e.target.value);
        props.onFilterChange({
            ...props.combinationParams,
            [field]: e.target.value
        })
    }
    return (
        <Row style={{ marginTop: 32 }} className='normal-input-container'>
            <Col span={2}>
                <span style={{ fontSize: '1rem', color: '#333' }}>{label}</span>

            </Col>
            <Col span={22}>
                <div className='normal-input-message'>
                    <Input placeholder={placeholder} value={value} {...antInputProps} onChange={inputChange} style={{width:'230px'}}/>
                    {errorMessage && <span>{errorMessage}</span>}
                </div>
                {ButtonGroup && <ButtonGroup />}
            </Col>
        </Row>
    )
}
