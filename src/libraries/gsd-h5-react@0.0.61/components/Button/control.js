/**
 * @desc Button EditorComponent
 */

/**
 * @desc component dataForm
 * @type {JsonSchemaProperties}
 */

import { hoverConfig, openType } from '../../lib/utils/config'

const dataForm = {
  text: {
    title: '按钮文字',
    default: '',
    type: 'string',
    isReactNode: true,
  },
  size: {
    title: '按钮大小',
    type: 'string',
    default: 'default',
    'x-component': 'radio',
    enum: [
      {
        label: 'default',
        value: 'default',
      },
      {
        label: 'mini',
        value: 'mini',
      },
    ],
  },
  type: {
    title: '按钮类型',
    type: 'string',
    default: 'primary',
    'x-component': 'radio',
    enum: [
      {
        label: 'default',
        value: 'default',
      },
      {
        label: 'primary',
        value: 'primary',
      },
      {
        label: 'warn',
        value: 'warn',
      },
    ],
  },
  loading: {
    title: '加载中',
    type: 'boolean',
    default: false,
  },
  disabled: {
    title: '是否禁用',
    type: 'boolean',
    default: false,
  },
  plain: {
    title: '镂空',
    type: 'boolean',
    default: false,
  },
  formType: {
    title: '用于 form 组件',
    type: 'string',
    default: 'button',
    enum: [
      {
        label: '默认',
        value: 'button',
      }, {
        label: '提交',
        value: 'submit',
      },
      {
        label: '重置',
        value: 'reset',
      }
    ],
  },
  divider: {
    'x-component': 'divider',
    'x-component-props': {
      children: '以下配置仅在 微信小程序 起作用'
    },
  },
  openType: {
    title: '微信开放能力',
    type: 'string',
    "x-linkages": [
      {
        "type": "value:visible",
        "target": '*(sessionFrom,sendMessageTitle,sendMessageImg,sendMessagePath,showMessageCard)',
        "condition": "{{ $self.value === 'contact' }}"
      },
      {
        "type": "value:visible",
        "target": 'appParameter',
        "condition": "{{ $self.value === 'launchApp' }}"
      },
      {
        "type": "value:visible",
        "target": 'categoryId',
        "condition": "{{ $self.value === 'getRealnameAuthInfo' }}"
      },
    ],
    enum: openType
  },
  categoryId: {
    title: '类目ID',
    type: 'array',
    items: {
      title: 'value',
      type: 'number'
    },
    maxLength: 2,
    minLength: 2,
  },
  sessionFrom: {
    title: '会话来源',
    default: '',
    type: 'string',
  },
  sendMessageTitle: {
    title: '会话内消息卡片标题',
    default: '',
    type: 'string',
  },
  sendMessagePath: {
    title: '会话内消息卡片点击跳转小程序路径',
    default: '',
    type: 'string',
  },
  sendMessageImg: {
    title: '会话内消息卡片图片',
    default: '',
    type: 'image',
  },
  showMessageCard: {
    title: '是否显示会话内消息卡片',
    type: 'boolean',
    default: false,
  },
  appParameter: {
    title: '打开APP时,向APP传递的参数',
    default: '',
    type: 'string',
  },
  lang: {
    title: '指定返回用户信息的语言',
    default: 'en',
    type: 'string',
    enum: [
      {
        label: '简体中文',
        value: 'zh_CN',
      }, {
        label: '繁体中文',
        value: 'zh_TW',
      },
      {
        label: '英文',
        value: 'en',
      }
    ],
    ...hoverConfig
  },
};

/**
 * @desc component styleSchema
 * @type {StyleGroup | '*'}
 */

export default {
  dataForm,
  emitEvents: [
    { eventName: 'tap', name: '点击' },
    { eventName: "getphonenumber", name: "获取电话号码" },
    { eventName: "contact", name: "客服会话" },
    { eventName: "getuserinfo", name: "获取用户信息" },
    { eventName: "getrealnameauthinfo", name: "获取用户实名信息" },
    { eventName: "launchapp", name: "打开App" },
    { eventName: "opensetting", name: "打开授权设置" },
    { eventName: "error", name: "错误提示" },
  ],
};
