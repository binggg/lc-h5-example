/**
 * @desc Button EditorComponent
 */

/**
 * @desc component dataForm
 * @type {JsonSchemaProperties}
 */
const dataForm = {
  title: {
    title: '导航条标题',
    type: 'string'
  },
  loading: {
    title: '是否在导航条显示 loading 加载提示',
    type: 'boolean',
    default: false
  },
  frontColor: {
    title: '导航条前景颜色值',
    type: 'color',
  },
  backgroundColor: {
    title: '导航条背景颜色值',
    type: 'color',
  },
  rootBackgroundColor: {
    title: '页面内容的背景色',
    type: 'color'
  },
  colorAnimationDuration: {
    title: '改变导航栏颜色时的动画时长',
    type: 'number',
    default: 0
  },
  colorAnimationTimingFunc: {
    title: '改变导航栏颜色时的动画方式',
    type: 'string',
    default: 'linear',
    'x-component': 'radio',
    enum: [
      {
        label: 'linear',
        value: 'linear',
      },
      {
        label: 'easeIn',
        value: 'easeIn',
      },
      {
        label: 'easeOut',
        value: 'easeOut',
      },
      {
        label: 'easeInOut',
        value: 'easeInOut',
      },
    ],
  }
};


export default {
  dataForm,
  emitEvents: [],
};
