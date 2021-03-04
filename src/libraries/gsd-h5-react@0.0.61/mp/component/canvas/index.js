"use strict";
Component({
  options: {
    virtualHost: true
  },
  // externalClasses: ['class'],
  properties: {
    style: {
      type: String
    },
    className: {
      type: String,
    },
    type: {
      type: String,
      default: '2d'
    },
    width: {
      type: Number,
      default: 200,
    },
    height: {
      type: Number,
      default: 200
    }
  },
  data: {},
  lifetimes: {
    ready () {
      const { type } = this.properties
      const query = wx.createSelectorQuery().in(this)
      query.select(`#canvas`).fields({ node: true, size: true }).exec((res) => {
        const canvas = res[0].node
        const ctx = canvas.getContext(type)
        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        ctx.scale(dpr, dpr)
        this.triggerEvent('attached', { ctx, canvas })
        this.triggerEvent('render', { ctx, canvas })
      })

    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
      this.triggerEvent('detached')
      this.triggerEvent('renderStop')
    },
  },
  methods: {
    triggerTouchStart (e) {
      this.triggerEvent('touchstart', e)
    },
    triggerTouchMove (e) {
      this.triggerEvent('touchmove', e)
    },
    triggerTouchEnd (e) {
      this.triggerEvent('touchend', e)
    },
    triggerTouchCancel (e) {
      this.triggerEvent('touchcancel', e)
    },
    triggerLongTap (e) {
      this.triggerEvent('longtap', e)
    },
    triggerError (e) {
      this.triggerEvent('error', e)
    },
  }
});
