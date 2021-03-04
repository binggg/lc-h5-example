import { observable, toJS } from 'mobx'
import initState from '../lowcode/state'

export const subPackageName = ''
const appId = 'app-qb9lbymv'
const stateKey = `_weappsGlobalState-` + appId + subPackageName

const globalState = observable(initState)
export default globalState

if (process.env.isMiniprogram) {
  restoreGlobalState()

  window.addEventListener('wxshow', restoreGlobalState)
  window.addEventListener('wxhide', saveGlobalState)
  window.addEventListener('wxunload', saveGlobalState)
}

/**
 * Save global state as plain object on wx.getApp()
 */
function saveGlobalState() {
  if (getApp()[stateKey]) {
    // 返回了多层页面时，中间页面也会执行unload，但不能保存state
    return
  }
  getApp()[stateKey] = toJS(globalState)
}

/**
 * Restore global state from wx.getApp()
 */
function restoreGlobalState() {
  const savedState = getApp()[stateKey]
  if (savedState) {
    Object.assign(globalState, savedState)
    // TODO delete extra props
    getApp()[stateKey] = null
  }
}
