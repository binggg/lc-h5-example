import * as sdk from '@govcloud/weapps-sdk'
import { createComputed } from 'utils'
import { createDataVar, dataSources, createDataset } from '../datasources'
import store, { subPackageName } from '../store'
import computed from '../store/computed'
import common from './common'
import { init, auth as tcbAuth } from '../datasources/tcb'

const mainAppKey = '__weappsMainApp'
const appGlobal = process.env.isMiniprogram ? getApp() : window

export const app = createGlboalApi()
export const $page = createPageApi()

export function setCurrentPage(pageCtx) {
  Object.assign($page, pageCtx)
}

function createGlboalApi() {
  const globalAPI = {
    platform: 'WEB',
    formActions: {},
    dataSources: {},
    pages: {},
    session: {
      configure: sdk.configure,
      request: sdk.request,
      getSessionId: sdk.getSessionId,
    },
    state: store,
    // 全局数据源变量存储位置
    dataVar: createDataVar('$global'),
    computed: createComputed(computed.global),
    common,
    dataSources,
    auth: tcbAuth,
    // ... other sdk apis & apis from mp
  } // The global api exposed to lowcode

  let dataset = createDataset('$global')
  globalAPI.dataset = dataset
  globalAPI.state.dataset = dataset

  if (subPackageName) {
    // is sub app
    globalAPI.mainApp = appGlobal[mainAppKey]
  } else {
    // is mainApp
    appGlobal[mainAppKey] = globalAPI
  }

  // 挂运营平台上报对象到app里
  globalAPI.yyptReport = appGlobal.yyptReport

  // # expose some sdk modules
  const sdkModsIncluded = ['flow', 'getPageOptions', 'getLaunchOptions']
  sdkModsIncluded.forEach((key) => {
    globalAPI[key] = sdk[key]
  })
  return globalAPI
}

function createPageApi() {
  const $page = {
    state: {},
    computed: {},
    handler: {},
    props: {},
    widgets: {},
    // 页面数据源变量存储位置
    dataVar: {},
  }
  return $page
}

// 分app 和 wx 挂载app
export const mountAPIs = (sdks) => {
  Object.keys(sdks).forEach((item) => {
    app[item] = sdks[item]
  })
  return app
}
