/**
 * @desc Button EditorComponent
 */

/**
 * @desc component dataForm
 * @type {JsonSchemaProperties}
 */
const dataForm = {
  percent: {
    title: '百分比',
    default: 20,
    type: 'number',
  },
  showInfo: {
    title: '在进度条右侧显示百分比',
    type: 'boolean',
    default: false
  },
  borderRadius: {
    title: '圆角大小',
    default: 0,
    type: 'number',
  },
  FontSize: {
    title: '右侧百分比字体大小',
    default: 16,
    type: 'number',
  },
  strokeWidth: {
    title: '进度条线的宽度',
    default: 6,
    type: 'number',
  },
  activeColor: {
    title: '已选择的进度条的颜色',
    default: '#09BB07',
    type: 'color',
  },
  backgroundColor: {
    title: '未选择的进度条的颜色',
    default: '#EBEBEB',
    type: 'color',
  },
  active: {
    title: '进度条从左往右的动画',
    default: false,
    type: 'boolean',
  },
  activeMode: {
    title: '进度条从左往右的动画',
    default: 'backwards',
    type: 'string',
    enum: [
      {
        label: '动画从头播',
        value: 'backwards',
      }, {
        label: '动画从上次结束点接着播',
        value: 'forwards',
      }
    ]
  },
  duration: {
    title: '进度增加1%所需毫秒数',
    default: 30,
    type: 'number',
  }
};

/**
 * @desc component styleSchema
 * @type {StyleGroup | '*'}
 */
// const enableStyleGroup = {
//   text: {},
//   size: {},
//   transform: {},
//   border: {},
//   background: {},
//   margin: {},
//   padding: {},
//   zIndex: true,
//   position: true,
// };

export default {
  dataForm,
  // enableStyleGroup,
  emitEvents: [
    { name: '动画完成事件', eventName: 'activeend' },
  ],
};
