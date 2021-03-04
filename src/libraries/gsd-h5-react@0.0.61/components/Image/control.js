const dataForm = {
  src: {
    title: '图片',
    type: 'image',
    required: true,
    default: 'https://impage.fudao.qq.com/prod/image/static/static_1564109910612.png',
  },
  alt: {
    title: '替代文本',
    type: 'string',
    default: "[图片]"
  },
  mode: {
    title: '图片裁剪、缩放的模式',
    type: 'string',
    default: "scaleToFill",
    enum: [
      {
        label: 'scaleToFill',
        value: 'scaleToFill',
      },
      {
        label: 'aspectFit',
        value: 'aspectFit',
      },
      {
        label: 'aspectFill',
        value: 'aspectFill',
      },
      {
        label: 'widthFix',
        value: 'widthFix',
      },
      {
        label: 'heightFix',
        value: 'heightFix',
      },
      {
        label: 'top',
        value: 'top',
      },
      {
        label: 'bottom',
        value: 'bottom',
      },
      {
        label: 'center',
        value: 'center',
      },
      {
        label: 'left',
        value: 'left',
      },
      {
        label: 'right',
        value: 'right',
      },
      {
        label: 'top left',
        value: 'top left',
      },
      {
        label: 'top right',
        value: 'top right',
      },
      {
        label: 'bottom left',
        value: 'bottom left',
      },
      {
        label: 'bottom right',
        value: 'bottom right',
      }
    ]
  },
  webp: {
    title: '能否解析 webP 格式',
    type: 'boolean',
    default: false
  },
  lazyLoad: {
    title: '图片懒加载',
    type: 'boolean',
    default: false
  },
  showMenuByLongpress:{
    title: '开启长按图片显示识别小程序码菜单',
    type: 'boolean',
    default: false
  }
};


/**
 * @desc component styleSchema
 * @type {StyleGroup | '*'}
 */

/**
 * @desc component styleSchema
 * @type {EditorComponent}
 */
export default {
  dataForm,
  emitEvents: [
    { eventName: 'error', name: '图片加载错误' },
    { eventName: 'load', name: '图片载入完毕' },
  ],
  __isBuildIn: true,
  __implementHotArea: true,
};
