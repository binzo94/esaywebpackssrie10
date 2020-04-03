const Service = require('egg').Service
const myconfig = require('../../config/config.project')
const host = myconfig.BaseHost
// const host = 'http://192.168.4.31:8083'
// const host = 'http://192.168.4.75:8083'
// const host = 'http://192.168.43.153:8083'
// const host = 'http://cic-cloud-api.z023.cn/api'

class HttpService extends Service {
  async http(url, options, method = 'GET') {
    let {ctx} = this
    const { logger } = ctx
    let tokens = ''
    tokens =  ctx.header.mytoken
    let config = Object.assign({}, {
      dataType: 'json',
      contentType: 'json',
      timeout: 30000,

      headers: {
        token: tokens,
        'Ip-Address' : ctx.request.ip,
        'new-user-agent' : ctx.get('user-agent')
      },
      ...options
    })
    logger.info(`request ${url}, options:${JSON.stringify(options)}, method:${method}`)

    const result = await ctx.curl(host + url, {...config, method})
    logger.info(`response:${JSON.stringify(result)}`)
    return {data:result.data}
  }

  get(url, options) {
    return this.http(url, options)
  }
  async post(url, options) {
    return await this.http(url, options, 'POST')
  }
  put(url, options) {
    return this.http(url, options, 'PUT')
  }
  delete(url, options) {
    return this.http(url, options, 'DELETE')
  }

}

module.exports = HttpService
