/**
 * @desc Button EditorComponent
 */

/**
 * @desc component dataForm
 * @type {JsonSchemaProperties}
 */
const dataForm = {
  type: {
    title: 'canvas 类型',
    type: 'string',
    default: '2d',
    enum: [
      {
        label: '2d',
        value: '2d',
      },
      {
        label: 'webgl',
        value: 'webgl',
      },
    ],
  },
  // canvasId: {
  //   title: 'canvas 组件的唯一标识符',
  //   type: 'string',
  // },
  disableScroll: {
    title: '当在 canvas 中移动时且有绑定手势事件时，禁止屏幕滚动以及下拉刷新',
    type: 'boolean',
    default: false,
    description: '只在微信小程序起作用'
  },
  width: {
    title: '宽度',
    type: 'number',
    default: 200,
    description: '兼容H5'
  },
  height: {
    title: '高度',
    type: 'number',
    default: 200,
    description: '兼容H5'
  },
  // showChildren: {
  //   title: '是否显示子节点',
  //   type: 'boolean',
  //   default: false
  // },
};

export default {
  dataForm,
  emitEvents: [
    { eventName: "attached", name: "canvas挂载" },
    { eventName: "detached", name: "canvas卸载" },
    { eventName: "touchstart", name: "手指触摸动作开始" },
    { eventName: "touchmove", name: "手指触摸后移动" },
    { eventName: "touchend", name: "手指触摸动作结束" },
    { eventName: "touchcancel", name: "手指触摸动作被打断，如来电提醒，弹窗" },
    { eventName: "longtap", name: "手指长按 500ms 之后触发，触发了长按事件后进行移动不会触发屏幕的滚动" },
    { eventName: "error", name: "发生错误" },
  ],
  isContainer: true,
};
