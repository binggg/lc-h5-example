/**
 * @desc Button EditorComponent
 */

/**
 * @desc component dataForm
 * @type {JsonSchemaProperties}
 */

import { autoFillConfig, formName, keyboardConfig } from '../../lib/utils/config'

const dataForm = {
  name: {
    ...formName,
    default: 'thisIsInputKey',
  },
  value: {
    title: '初始值',
    type: 'string'
  },
  password: {
    title: '密码',
    type: 'boolean',
    default: false
  },
  placeholder: {
    title: '占位符',
    type: 'string',
    default: '请输入'
  },
  type: {
    title: 'input的类型',
    type: 'string',
    default: 'text',
    enum: [{
      label: '文本输入键盘',
      value: 'text',
    }, {
      label: '数字输入键盘',
      value: 'number',
    }, {
      label: '身份证输入键盘',
      value: 'idcard',
    }, {
      label: '带小数点的数字键盘',
      value: 'digit',
    }]
  },
  maxlength: {
    title: '最大输入长度',
    type: 'number',
    default: 140,
    description: '最大输入长度，设置为 -1 的时候不限制最大长度'
  },
  "disabled": {
    "title": "是否禁用",
    "type": "boolean",
    "default": false
  },
  focus: {
    title: '获取焦点',
    type: 'boolean',
    default: false,
  },
  divider: {
    'x-component': 'divider',
    'x-component-props': {
      children: '以下配置仅在 微信小程序 起作用'
    },
  },
  confirmType: {
    title: '设置键盘右下角按钮的文字',
    type: 'string',
    default: 'done',
    enum: [{
      label: '发送',
      value: 'send',
    }, {
      label: '搜索',
      value: 'search',
    }, {
      label: '下一个',
      value: 'next',
    }, {
      label: '前往',
      value: 'go',
    }, {
      label: '完成',
      value: 'done',
    }]
  },
  ...keyboardConfig,
  alwaysEmbed: {
    title: '强制 input 处于同层状态(仅在 iOS 下生效)',
    type: 'boolean',
    default: false
  },
  ...autoFillConfig
};


export default {
  dataForm,
  emitEvents: [
    { eventName: 'input', name: '键盘输入' },
    { eventName: "focus", name: "输入框聚焦" },
    { eventName: "blur", name: "失去焦点" },
    { eventName: "confirm", name: "点击完成按钮" },
    { eventName: "keyboardheightchange", name: "键盘高度发生变化" }
  ],
};
