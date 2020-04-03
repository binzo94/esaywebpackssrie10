const path = require('path')
const fs = require('fs')
module.exports = app => {
  const exports = {}

  exports.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(app.baseDir, 'app/web/asset/images/favicon.ico'))
  }

  exports.logger = {
    consoleLevel: 'DEBUG',
    dir: path.join(app.baseDir, 'logs')
  }

  exports.static = {
    prefix: '/public/',
    dir: path.join(app.baseDir, 'public')
  }

  exports.keys = '123456'

  exports.middleware = [

  ]

  exports.session = {
    key: 'EGG_SESS',
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: false,
    encrypt: true
  };
  
  exports.reactssr = {
    layout: path.resolve(app.baseDir, 'app/web/view/layout.html')
  }

  exports.logger = {
    disableConsoleAfterReady: false
  };

  exports.proxy = true;
  exports.maxIpsCount = 1;
  exports.ipHeaders = 'X-Real-IP, X-Forwarded-For,Real-IP';

  exports.security = {
    csrf: {
      enable:false
    } };

  return exports
}
