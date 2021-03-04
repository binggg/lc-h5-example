/**
 * @desc Button EditorComponent
 */

/**
 * @desc component dataForm
 * @type {JsonSchemaProperties}
 */
const dataForm = {
  indicatorDots: {
    title: '是否显示面板指示点',
    default: true,
    type: 'boolean',
  },
  autoplay: {
    title: '是否自动切换',
    default: false,
    type: 'boolean',
  },
  current: {
    title: '当前所在滑块的 index',
    default: 0,
    type: 'number',
  },
  interval: {
    title: '自动切换时间间隔',
    default: 5000,
    type: 'number',
  },
  duration: {
    title: '滑动动画时长',
    default: 500,
    type: 'number',
  },
  circular: {
    title: '是否采用衔接滑动',
    default: false,
    type: 'boolean',
  },
  vertical: {
    title: '滑动方向是否为纵向',
    default: false,
    type: 'boolean',
  },
  previousMargin: {
    title: '前边距',
    default: 0,
    type: 'number',
  },
  nextMargin: {
    title: '后边距',
    default: 0,
    type: 'number',
  },
  indicatorColor: {
    title: '指示点颜色',
    type: 'color',
  },
  indicatorActiveColor: {
    title: '当前选中的指示点颜色',
    type: 'color',
  },
  displayMultipleItems: {
    title: '同时显示的滑块数量',
    type: 'number',
    default: 1
  },
  updated: {
    title: '强制刷新',
    default: 0,
    description: '使用循环列表绑定动态数据时使用,推荐绑定数据的长度',
    type: 'number',
  },
};


export default {
  dataForm,
  isContainer: true,
  emitEvents: [
    { eventName: "change", name: "swiper切换" },
    { eventName: "transition", name: "swiper-item 的位置发生改变" },
    { eventName: "animationfinish", name: "动画结束" },
  ],
};
