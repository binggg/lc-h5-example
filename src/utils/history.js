import { createHashHistory, createBrowserHistory } from 'history'
let history
window._WEAPPS_HISTORY = history

function removeS(path) {
  if (path && path[0] === '/') {
    return path.slice(1)
  }
  return path
}

if (!process.env.isMiniprogram) {
  const createHistory =
    process.env.isApp || process.env.historyType === 'HASH'
      ? createHashHistory
      : createBrowserHistory
  history = createHistory({
    basename: '', // The base URL of the app (see below)
    forceRefresh: false, // Set true to force full page refreshes
    keyLength: 6, // The length of location.key
  })
} else {
  history = {
    push(path) {
      wx.navigateTo({
        url: '/pages/' + removeS(path) + '/index'
      })
    },
    replace(path) {
      wx.redirectTo({
        url: '/pages/' + removeS(path) + '/index'
      })
    },
    reLaunch(path) {
      wx.reLaunch({
        url: '/pages/' + removeS(path) + '/index'
      })
    },
    navigateBack(delta = 1) {
      wx.navigateBack({
        delta
      })
    }
  }
}

function generateBrowserHistory(param) {
  history = createBrowserHistory(param)
  window._WEAPPS_HISTORY = history
  return history
}

function generateHashHistory(param) {
  history = createHashHistory(param)
  window._WEAPPS_HISTORY = history
  return history
}

const createHistory = (basename) => {
  if (process.env.isApp) {
    return createHashHistory({
      basename: '', // The base URL of the app (see below)
    })
  }
  return createBrowserHistory({
    basename,
  })
}

export { history, createHistory, generateBrowserHistory, generateHashHistory };
