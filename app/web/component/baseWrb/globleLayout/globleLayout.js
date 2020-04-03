import React, { Component } from 'react';
import { Headers } from '../../header/header'
import { Footers } from '../../footer/footer'


export default class globleLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount() {
  }

  render() {
    return <div style={{ width: '100%', background: '#FAFAFA' }}>
      <Headers nickName={this.props.nickName} />
      {this.props.children}
      <Footers />
    </div>;
  }
}