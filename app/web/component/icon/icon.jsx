import React,{ Component } from 'react'
import { Icon } from 'antd'


const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_456118_okbihcj30q.js'
});


export default class IconComp extends Component{

  render(){

    return <IconFont {...this.props}/>
  }
}


