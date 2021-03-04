/**
 * @desc Button EditorComponent
 */

/**
 * @desc component dataForm
 * @type {JsonSchemaProperties}
 */
const dataForm = {
  scrollY: {
    title: '允许纵向滚动',
    type: 'boolean',
    default: true,
    "x-linkages": [
      {
        "type": "value:visible",
        "target": '*(scrollTop)',
        "condition": "{{ $self.value }}"
      },
    ],
  },
  scrollX: {
    title: '允许横向滚动',
    type: 'boolean',
    default: false,
    "x-linkages": [
      {
        "type": "value:visible",
        "target": '*(scrollLeft)',
        "condition": "{{ $self.value }}"
      },
    ],
  },
  upperThreshold: {
    title: '距顶部/左边多远时，触发 scrolltoupper 事件',
    type: 'number',
    default: 50
  },
  lowerThreshold: {
    title: '距底部/右边多远时，触发 scrolltolower 事件',
    type: 'number',
    default: 50
  },
  scrollTop: {
    title: '竖向滚动条位置',
    type: 'number'
  },
  scrollLeft: {
    title: '横向滚动条位置',
    type: 'number'
  },
  scrollIntoView: {
    title: '滚动到的元素Id',
    type: 'string',
  },
  divider: {
    'x-component': 'divider',
    'x-component-props': {
      children: '以下配置仅在 微信小程序 起作用'
    },
  },
  scrollWithAnimation: {
    title: '在设置滚动条位置时使用动画过渡',
    type: 'boolean',
    default: false
  },
  enableBackToTop: {
    title: 'iOS点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只支持竖向',
    type: 'boolean',
    default: false
  },
  enableFlex: {
    title: '启用 flexbox 布局',
    type: 'boolean',
    default: false
  },
  scrollAnchoring: {
    title: '开启 scroll anchoring 特性',
    type: 'boolean',
    default: false
  },
  refresherEnabled: {
    title: '开启自定义下拉刷新',
    type: 'boolean',
    default: false,
    "x-linkages": [
      {
        "type": "value:visible",
        "target": '*(refresherThreshold,refresherDefaultStyle,refresherBackground,refresherTriggered)',
        "condition": "{{ $self.value }}"
      }
    ],
  },
  refresherThreshold: {
    title: '设置自定义下拉刷新阈值',
    type: 'number',
    default: 50
  },
  refresherDefaultStyle: {
    title: '设置自定义下拉刷新默认样式',
    type: 'string',
    default: 'block',
    'x-component': 'radio',
    enum: [
      {
        label: 'black',
        value: 'black',
      },
      {
        label: 'white',
        value: 'white',
      },
      {
        label: 'none',
        value: 'none',
      }
    ],
  },
  refresherBackground: {
    title: '设置自定义下拉刷新区域背景颜色',
    type: 'color',
    default: "#fff"
  },
  refresherTriggered: {
    title: '设置当前下拉刷新状态',
    type: 'boolean',
    default: false
  },
  enhanced: {
    title: '启用 scroll-view 增强特性',
    type: 'boolean',
    default: false,
    "x-linkages": [
      {
        "type": "value:visible",
        "target": '*(bounces,showScrollbar,pagingEnabled,fastDeceleration)',
        "condition": "{{ $self.value }}"
      }
    ],
  },
  bounces: {
    title: 'iOS 下 scroll-view 边界弹性控制',
    type: 'boolean',
    default: true
  },
  showScrollbar: {
    title: '滚动条显隐控制',
    type: 'boolean',
    default: true
  },
  pagingEnabled: {
    title: '分页滑动效果',
    type: 'boolean',
    default: false
  },
  fastDeceleration: {
    title: '滑动减速速率控制',
    type: 'boolean',
    default: false
  }
};


/**
 * @desc component styleSchema
 * @type {StyleGroup | '*'}
 */

export default {
  dataForm,
  // defaultStyles,
  emitEvents: [
    { eventName: "scroll", name: "滚动时触发" },
    { eventName: "scrolltolower", name: "滚动到底部/右边时触发" },
    { eventName: "scrolltoupper", name: "滚动到顶部/左边时触发" },
    { eventName: "dragstart", name: "滑动开始事件(同时开启 enhanced 属性后生效)" },
    { eventName: "dragging", name: "滑动事件(同时开启 enhanced 属性后生效)" },
    { eventName: "dragend", name: "滑动结束事件(同时开启 enhanced 属性后生效)" },
    { eventName: "refresherpulling", name: "自定义下拉刷新控件被下拉" },
    { eventName: "refresherrefresh", name: "自定义下拉刷新被触发" },
    { eventName: "refresherrestore", name: "自定义下拉刷新被复位" },
    { eventName: "refresherabort", name: "自定义下拉刷新被中止" },
  ],
  isContainer: true
};
