/**
 * @desc Button EditorComponent
 */

import { autoFillConfig, formName,keyboardConfig } from "../../lib/utils/config";

/**
 * @desc component dataForm
 * @type {JsonSchemaProperties}
 */
const dataForm = {
  name: {
    ...formName,
    default: 'thisIsTextAreaKey',
  },
  value: {
    title: '默认值',
    type: 'string',
  },
  placeholder: {
    title: '占位符',
    type: 'string',
    default: '请输入'
  },
  autoFocus: {
    title: '自动聚焦',
    type: 'boolean',
    default: false,
  },
  focus: {
    title: '获取焦点',
    type: 'boolean',
    default: true,
  },
  maxlength: {
    title: '最大长度',
    type: 'number',
    default: 140
  },
  disabled: {
    title: "是否禁用",
    type: "boolean",
    default: false
  },
  divider: {
    'x-component': 'divider',
    'x-component-props': {
      children: '以下配置仅在 微信小程序 起作用'
    },
  },
  ...keyboardConfig,
  autoHeight: {
    title: "是否自动增高",
    type: "boolean",
    default: false
  },
  fixed: {
    title: "如果 textarea 是在一个 position:fixed 的区域,需指定为 true",
    type: "boolean",
    default: false
  },
  showConfirmBar: {
    title: "是否显示键盘上方带有”完成“按钮那一栏",
    type: "boolean",
    default: false
  },
  disableDefaultPadding: {
    title: "是否去掉 iOS 下的默认内边距",
    type: "boolean",
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
    { eventName: "linechange", name: "输入框行数变化" },
    { eventName: "keyboardheightchange", name: "键盘高度发生变化" }
  ],
};
