"use strict";
Component({
  options: {
    virtualHost: true
  },
  // externalClasses: ['class'],
  properties: {
    target: {
      type: String,
      default: 'self'
    },
    pageId: {
      type: String,
      observer (newValue, oldValue) {
        if (newValue && newValue !== oldValue) {
            this.getUrl()
        }
      }
    },
    className:{
      type: String,
    },
    packageName: {
      type: String,
    },
    params: {
      type: String,
    },
    openType: {
      type: String,
      default: 'navigate'
    },
    delta: {
      type: Number,
      default: 1
    },
    appId: {
      type: String,
    },
    path: {
      type: String,
    },
    extraData: {
      type: Object,
    },
    version: {
      type: String,
    },
    hoverClass: {
      type: String,
      default: 'navigator-hover',
    },
    hoverStopPropagation: {
      type: Boolean,
      default: false,
    },
    hoverStartTime: {
      type: Number,
      default: 50,
    },
    hoverStayTime: {
      type: Number,
      default: 400,
    }
  },
  data: {
    url: ''
  },
  lifetimes: {
    ready () {
    },
    detached: function () {
    },
  },
  methods: {
    getUrl () {
      const { pageId, packageName, params } = this.properties
      const url = packageName
        ? `/${packageName}/pages/${pageId}/index`
        : `/pages/${pageId}/index`
      this.setData({
        url: this.urlJoinParams(url, params)
      })
    },
    // 处理url链接，加入params参数
    urlJoinParams (url, params) {
      if (!url || !params || typeof params !== 'object') {
        return url
      }
      const separate = url.indexOf('?') === -1 ? '?' : '&'
      const tempStr = Object.keys(params).map(key => {
        let value = params[key]
        if (typeof value === 'object') {
          value = JSON.stringify(value)
        }
        if (value != undefined) {
          return `${key}=${encodeURIComponent(value)}`
        }
        return ''
      }).filter(value => value).join('&')
      return `${url}${separate}${tempStr}`
    },
    triggerSuccess (e) {
      this.triggerEvent('success', e)
    },
    triggerFail (e) {
      this.triggerEvent('fail', e)
    },
    triggerComplete (e) {
      this.triggerEvent('complete', e)
    }
  }
});
