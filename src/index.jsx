import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './router'
import './utils/monitor-jssdk.min'
import './index.less'
// 引入并执行数据源本地函数
import './local-functions'
// 引入数据源管理器并进行初始化
import './datasources'
import { initGlobalVar } from './handlers/initWebEnv'
import '@babel/polyfill/noConflict'
import attachFastClick from 'fastclick'
import { initWebConfig } from 'handlers/lifecycle'
const AppConfig = require('../webpack/miniprogram.config')
import { app } from './app/global-api'
// app 中注册配置页面以及app的全局配置miniprogram.config，h5里分app以及web页分别处理，使用process.env.isApp 区分判断
if (process.env.isApp) {
  initWebConfig(app, AppConfig);
}
attachFastClick && attachFastClick.attach && attachFastClick.attach(document.body)

// window.app.yyptReport = window.yyptReport

if (yyptReport && typeof yyptReport.pgvMain == 'function') {
  // report_url,appKey必填
  yyptReport.pgvMain({
    appKey: '', // 填入你申请的运营平台的应用key(必填)
    report_url: '', // 上报url（把后端上报接口需要先挂网关，该url填写网关地址）
    autoReportPv: true, // 单页应用监听页面路径改变自动上报Pv，默认为false
    stopReport: true, // 停止上报
    // 其他参数说明
    // customUserPrams: null, // 用户自定义的额外属性--对于小马的用户属性，比如用户的部门编码(customUserPrams: { deptno: 1100 })需要在小马系统事先配置好
    //userKey: "user_id", // cookie里面用户的唯一标示
    //autoWatchClick: true, // 默认开启自动监听hottag
    //isWxEnv: false// 是否微信环境，微信环境会通过wx.getNetworkType获取网络环境
    // 通过传入函数，可以让业务方写代码传入要上报的属性，比如返回自定义属性，这里主要也是自定义属性，让sdk获取并且进行上报，减少重复编码
    //getCusParams: function () {
    //  return {kv:{money:1}}; //kv:Key-Value,自定义事件Key-Value参数对	map	JSON格式，在报表页面的事件参数分析页和页面参数分析页中可以看到上报的kv值
    //},
  })
}

initGlobalVar()
;(function() {
  function flex() {
    try {
      var htmlDom = document.documentElement
      var width = window.innerWidth || htmlDom.clientWidth
      htmlDom.style.fontSize = width / (375 / 14) + 'px'
    } catch (e) {
      console.error(e)
    }
  }

  flex()
  window.addEventListener('resize', flex)
})()
ReactDOM.render(<App/>, document.getElementById('react-body'))

// 使用HMR
if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept()
  }
}
