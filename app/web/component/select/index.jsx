import React from 'react'
import { Select, Tooltip } from 'antd'
import _ from 'lodash'
import './index.css'

const { Option } = Select
export default class extends React.Component {





    getOpt = ()=>{
        const { optData } = this.props
        return optData.map((o,index)=>{
            const { id='',name='' } = o
            return <Option value={id} key={_.uniqueId(index)}>  <Tooltip placement="right" title={name}>{ name }</Tooltip></Option>
        })
    }
    render(){

    return (
        <Select {... this.props}  className={'select_styles'}>
            { this.getOpt()}
        </Select>
    )
    }


}
