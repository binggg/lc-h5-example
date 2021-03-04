import { mountAPIs } from './global-api'
import sdk from '@govcloud/weapps-sdk/lib/app-h5-sdk'

mountAPIs(sdk)

/**
 * 适配 wx.navigateTo 用法
 */
function navigateTo({ url }) {
  let paths = url.split('?')
  let result = /pages\/([0-9a-zA-z_]+)\/index/.exec(paths[0])
  let hash = ''
  if (result.length > 1) {
    hash = `/${result[0]}`
  }
  let path = `/${hash}`
  location.hash = `${path}${paths[1] ? `?${paths[1]}` : ''}`
}
if (process.env.isApp) {
  window.wx = {
    ...(window.wx || {}),
    ...sdk,
    navigateTo
  }
}

