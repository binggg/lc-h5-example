/* eslint-disable @typescript-eslint/no-empty-function */
/**
 * 生命周期处理函数
 */
import * as throttle from 'lodash/throttle'
import { wx } from '@govcloud/weapps-sdk'
import * as querystring from 'querystring'
// 小程序 端使用lifeCycle

export function initLifeCycle(
  {
    onAppLaunch = () => {},
    onAppShow = () => {},
    onAppHide = () => {},
    onAppError = () => {},
    onAppPageNotFound = () => {},
    onAppUnhandledRejection = () => {},
    beforeCustomLaunch = (query) => {},

    onPageLoad = () => {},
    onPageShow = () => {},
    onPageReady = () => {},
    onPageHide = () => {},
    onPageUnload = () => {},
    beforePageCustomLaunch = (query) => {},
    onPullDownRefresh,
    onReachBottom,
    onShareAppMessage,
    onPageScroll,
    onResize,
    onAddToFavorites,
    onShareTimeline,
    onTabItemTap,
  },
  app,
  mainApp
) {
  if (!process.env.isMiniprogram) {
    window.$$global = window.$$global || {}
  }
  // 包装应用显示回掉, 增加取数据变量值逻辑
  const onAppLaunchCb = (...args) => {
    beforeCustomLaunch(...args)
    onAppLaunch(...args)
  }

  // 包装页面加载回掉, 增加取数据变量值逻辑
  const onPageLoadCb = (...args) => {
    beforePageCustomLaunch(...args)
    onPageLoad(...args)
  }

  // 应用级别事件监听
  if (!window.$$global.alreadyInitAppLifeCycle) {
    if (!window.$$global.isOnLaunchRunned) {
      onAppLaunchCb(wx.getLaunchOptionsSync())
      window.$$global.isOnLaunchRunned = true
    }

    mainApp.onAppShow && mainApp.onAppShow(onAppShow)
    mainApp.onAppHide && mainApp.onAppHide(onAppHide)
    mainApp.onError && mainApp.onError(onAppError)
    mainApp.onPageNotFound && mainApp.onPageNotFound(onAppPageNotFound)
    mainApp.onUnhandledRejection &&
      mainApp.onUnhandledRejection(onAppUnhandledRejection)

    // 预留等客户端来触发
    window.addEventListener('appLaunch', (...args) => onAppLaunchCb(...args))
    window.addEventListener('appShow', (...args) => onAppShow(...args))
    window.addEventListener('appHide', (...args) => onAppHide(...args))
    window.addEventListener('error', (...args) => onAppError(...args))
    window.addEventListener('unhandledRejection', (...args) =>
      onAppUnhandledRejection(...args)
    )
    window.$$global.alreadyInitAppLifeCycle = true
  }

  // wx兼容的页面级别事件监听
  if (process.env.isMiniprogram) {
    window.addEventListener('wxload', (...args) => onPageLoadCb(...args))
    window.addEventListener('wxshow', (...args) => onPageShow(...args))
    window.addEventListener('wxready', (...args) => onPageReady(...args))
    window.addEventListener('wxhide', (...args) => onPageHide(...args))
    window.addEventListener('wxunload', (...args) => onPageUnload(...args))
    // 页面级别特殊事件
    if (typeof onPullDownRefresh === 'function') {
      window.addEventListener('pulldownrefresh', (...args) =>
        onPullDownRefresh(...args)
      )
    }

    if (typeof onPageScroll === 'function') {
      window.addEventListener('scroll', () => {
        onPageScroll({
          scrollTop: document.documentElement.scrollTop,
        })
      })
    }

    if (typeof onReachBottom === 'function') {
      window.addEventListener('reachbottom', onReachBottom)
    }

    if (typeof onShareAppMessage === 'function') {
      window.onShareAppMessage = onShareAppMessage
    }

    if (typeof onShareTimeline === 'function') {
      window.onShareTimeline = onShareTimeline
    }

    if (typeof onAddToFavorites === 'function') {
      window.onAddToFavorites = onAddToFavorites
    }

    if (typeof onResize === 'function') {
      window.addEventListener('resize', onResize)
    }

    if (typeof onTabItemTap === 'function') {
      window.onTabItemTap = onTabItemTap
    }
  }
}

let isReachBottom = false
// web 端使用lifeCycle
export function pageLifeCycleMount(
  useEffect,
  {
    onPageLoad,
    beforePageCustomLaunch,
    onPageShow,
    onPageReady,
    onPageHide,
    onPageUnload,
    onPullDownRefresh,
    onReachBottom,
    onShareAppMessage,
    onPageScroll,
    onResize,
    onAddToFavorites,
    onShareTimeline,
    onTabItemTap,
  },
  app = {}
) {
  let queryText = location.href.split('?')[1]
  let query = querystring.parse(queryText)
  // 页面挂载时加载数据源变量值
  typeof fetchPageDataVar === 'function' && fetchPageDataVar()
  // 包装页面加载回掉, 增加取数据变量值逻辑
  const onPageLoadCallback = (...args) => {
    beforePageCustomLaunch(...args)
    onPageLoad && onPageLoad(...args)
  }
  useEffect(() => {
    onPageLoadCallback(query)
    typeof onPageReady === 'function' && onPageReady()
    typeof onPageShow === 'function' && onPageShow()

    if (typeof onPullDownRefresh === 'function') {
      app.onPullDownRefresh(onPullDownRefresh)
    }
    if (
      typeof onPageScroll === 'function' ||
      typeof onReachBottom === 'function'
    ) {
      window.onscroll = throttle(() => {
        //变量scrollTop是滚动条滚动时，滚动条上端距离顶部的距离
        let scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop

        //变量windowHeight是可视区的高度
        let windowHeight =
          document.documentElement.clientHeight || document.body.clientHeight

        //变量scrollHeight是滚动条的总高度（当前可滚动的页面的总高度）
        let scrollHeight =
          document.documentElement.scrollHeight || document.body.scrollHeight
        if (typeof onPageScroll === 'function') {
          onPageScroll({
            scrollTop: window.pageYOffset,
          })
        }

        // console.log(scrollTop, windowHeight, scrollTop + windowHeight, scrollHeight, isReachBottom)
        //滚动条到底部
        if (scrollTop + windowHeight >= scrollHeight && !isReachBottom) {
          //要进行的操作
          isReachBottom = true
          if (typeof onReachBottom === 'function') {
            onReachBottom()
          }
        }
        // 容许用户回弹50然后执行ReachBottom， 50为测试最佳值
        if (scrollTop + windowHeight < scrollHeight - 50) {
          isReachBottom = false
        }
      }, 300)
    }
    // todo
    if (typeof onShareAppMessage === 'function') {
      window.onShareAppMessage = onShareAppMessage
    }

    if (typeof onResize === 'function') {
      window.onresize = () => {
        onResize({
          size: {
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
          },
        })
      }
    }
    return () => {
      typeof onPageHide === 'function' && onPageHide({})
      typeof onPageUnload === 'function' && onPageUnload({})
      if (typeof onPullDownRefresh === 'function') {
        app.offPullDownRefresh(onPullDownRefresh)
      }

      window.onscroll = null
      window.onresize = null
    }
  }, [])
}
export function initWebConfig(app, appConfig) {
  // miniprogram.config 配置截取
  app.setConfig(appConfig)
}
