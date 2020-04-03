import React, { Component } from 'react'
export default class Layout extends Component {
  render() {

    return <html>
      <head>
        <title>{this.props.title}</title>
        <meta charSet="utf-8"></meta>
        <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1"></meta>
        <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui"></meta>
        <meta name="keywords" content={this.props.keywords}></meta>
        <meta name="description" content={this.props.description}></meta>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"></link>
        <script type='application/javascript' src="/public/asset/js/polyfill.js"></script>
        <script src="https://cdn.bootcss.com/babel-polyfill/6.23.0/polyfill.min.js"></script>
      </head >
      <body style={{ height:'100%' }}><div id="app" style={{ height:'100%'}}>{this.props.children}</div></body>
    </html>
  }
}
