import React, { useState,useEffect,useContext }  from 'react'
import { Tag,Row,Col,Skeleton } from 'antd'
import _ from 'lodash'
import { Post,Get } from '../../utils/request'
import './index.css'
// import { showErrorMsg } from '../notification/index'


const { CheckableTag  } = Tag
const municipality = [ '110000', '120000','310000','500000']
export default (props)=>{

        const { label='地区',id=0, isAbb, defaultArea,onChange=()=>{},defaultValue=0 } = props
        const [ areaData,setAreaData ] = useState([])
        const [ checkedKey,setCheckedKey ] = useState(defaultValue)
        const [ loading, setLoading] = useState(true)

        const getAreasData = async (subId)=>{
            // const api = '/area'
            try{
                // const queryId = municipality.includes(id)?parseInt(id)+100:id
                // setLoading(true)
                const queryId = municipality.includes(id)?id:id
                const res = await Get(`/area:${subId||queryId}`)

                const { data={} } = res
                let { content=[]} = data
                const extraData = defaultArea||[{id: 0, name: '全部', parentId: '0', shortName: '全部'}]
                 content=[...extraData,...content]
                const sortedData = _.sortBy(content,'id')
                setCheckedKey(defaultValue)
                setAreaData(sortedData)
                setLoading(false)
            }catch (e) {
                // showErrorMsg('请求地区数据错误！')
            }
        }

        useEffect(()=>{
             getAreasData()
        },[id])


        const checkedKeyChange = (key,current)=>{
            setCheckedKey(key)
            onChange(key,current)
        }

        const getAreas =  ()=>{
            if(isAbb){
                const comps= defaultArea.map(s=>{
                    const { shortName='' ,id='', name='' } = s
                    const checked  = checkedKey === id
                    const areaName = shortName||name
                    return <CheckableTag
                        key={id}
                        checked={checked}
                        onChange={()=>{checkedKeyChange(id,s)}}
                        className={'area-style'}
                        style={{ fontSize:'1rem',marginBottom:'10px',padding:"5px 10px", backgroundColor:`${checked?'#2B64F1':'#fff'}`}}
                    >{ areaName }</CheckableTag>
                })
                return comps
            }
            const comps= areaData.map(s=>{
                const { shortName='' ,id='', name='',abbreviation='' } = s
                const checked  = checkedKey === id
                const areaName = isAbb?abbreviation:shortName||name
                return <CheckableTag
                key={id}
                checked={checked}
                onChange={()=>{checkedKeyChange(id,s)}}
                className={'area-style'}
                style={{ fontSize:'1rem',marginBottom:'10px',backgroundColor:`${checked?'#2B64F1':'#fff'}`,padding:"5px 12px"}}
                 >{ areaName }</CheckableTag>
            })
            return comps
        }



        return (
            <Row className={'area-wrapper'}>
                <Col span={2} >
                    <div className={'area-label'}>{label}</div></Col>
                <Col span={22}>
                    <div className={'area-content'}>
                        <Skeleton active={true} loading={loading}>
                            {getAreas()}
                        </Skeleton>
                    </div>
               </Col>
            </Row>
        )
}

export const AreaContext =  React.createContext({
    areaKey:0
})
