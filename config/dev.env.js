'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://192.168.31.45:8090/qgyOnlineSuper"',

  // BASE_API: '"http://api.admin.wxfxz.cn/qgy"',
})
