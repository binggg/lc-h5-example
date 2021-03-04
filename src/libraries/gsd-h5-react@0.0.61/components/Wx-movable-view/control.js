/**
 * @desc Button EditorComponent
 */

/**
 * @desc component dataForm
 * @type {JsonSchemaProperties}
 */


const dataForm = {
  direction: {
    title: '移动方向',
    type: 'string',
    default: 'none',
    enum: [
      {
        label: 'all',
        value: 'all',
      },
      {
        label: 'horizontal',
        value: 'horizontal',
      },
      {
        label: 'vertical',
        value: 'vertical',
      },
      {
        label: 'none',
        value: 'none',
      },
    ]
  },
  inertia: {
    title: '是否带有惯性',
    type: 'boolean',
    default: false,
  },
  outOfBounds: {
    title: '超过可移动区域后,是否可以移动',
    type: 'boolean',
    default: false,
  },
  x: {
    title: 'x轴方向的偏移',
    type: 'number'
  },
  y: {
    title: 'y轴方向的偏移',
    type: 'number'
  },
  damping: {
    title: '阻尼系数',
    type: 'number',
    default: 20
  },
  friction: {
    title: '摩擦系数',
    type: 'number',
    default: 2
  },
  disabled: {
    title: '是否禁用',
    type: 'boolean',
    default: false,
  },
  scale: {
    title: '是否支持双指缩放',
    type: 'boolean',
    default: false,
  },
  scaleMin: {
    title: '缩放倍数最小值',
    type: 'number',
    default: 0.5
  },
  scaleMax: {
    title: '缩放倍数最大值',
    type: 'number',
    default: 10
  },
  scaleValue: {
    title: '缩放倍数',
    type: 'number',
    default: 1
  },
  animation: {
    title: '是否使用动画',
    type: 'boolean',
    default: false,
  },
}


export default {
  dataForm,
  emitEvents: [
    { eventName: "change", name: "拖动事件" },
    { eventName: "scale", name: "缩放事件" },
  ],
  isContainer: true
};
