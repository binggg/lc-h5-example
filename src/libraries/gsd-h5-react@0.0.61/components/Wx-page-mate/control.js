/**
 * @desc Button EditorComponent
 */

/**
 * @desc component dataForm
 * @type {JsonSchemaProperties}
 */
const dataForm = {
  backgroundTextStyle: {
    title: '下拉背景字体、loading 图的样式',
    type: 'string',
    'x-component': 'radio',
    enum: [
      {
        label: 'dark',
        value: 'dark',
      },
      {
        label: 'light',
        value: 'light',
      },
    ],
  },
  backgroundColor: {
    title: '窗口的背景色',
    type: 'color',
  },
  backgroundColorTop: {
    title: '顶部窗口的背景色',
    type: 'color',
    description: "仅 iOS 支持"
  },
  backgroundColorBottom: {
    title: '底部窗口的背景色',
    type: 'color',
    description: "仅 iOS 支持"
  },
  rootBackgroundColor: {
    title: '页面内容的背景色',
    type: 'color'
  },
  scrollTop: {
    title: '滚动位置',
    type: 'string',
    description: "可以使用 px 或者 rpx 为单位"
  },
  scrollDuration: {
    title: '滚动动画时长',
    type: 'number',
    default: 300
  },
  pageStyle: {
    title: '页面根节点样式',
    type: 'string'
  },
  bodyFontSize: {
    title: '页面 page 的字体大小',
    type: 'string'
  },
  rootFontSize: {
    title: '页面的根字体大小',
    type: 'string'
  },
  pageOrientation: {
    title: '页面的方向',
    type: 'string',
    'x-component': 'radio',
    enum: [
      {
        label: 'auto',
        value: 'auto',
      },
      {
        label: 'portrait',
        value: 'portrait',
      },
      {
        label: 'landscape',
        value: 'landscape',
      },
    ],
  }
};


export default {
  dataForm,
  isContainer: true,
  emitEvents: [
    { eventName: 'resize', name: '页面尺寸变化' },
    { eventName: "scroll", name: "页面滚动" },
    { eventName: "scrolldone", name: "页面滚动结束" },
  ],
};
