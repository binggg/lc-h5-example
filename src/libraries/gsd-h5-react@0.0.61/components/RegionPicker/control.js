/**
 * @desc Button EditorComponent
 */
import { autoFillConfig, formName } from "../../lib/utils/config";

/**
 * @desc component dataForm
 * @type {JsonSchemaProperties}
 */
const dataForm = {
  name: {
    ...formName,
    default: "thisIsRegionsKey"
  },
  mode: {
    title: '选择器类型',
    default: 'region',
    type: 'string',
    readOnly: true,
  },
  value: {
    title: '选中的省市区',
    type: 'array',
    items: {
      title: 'value',
      type: 'string'
    },
    length: 3
  },
  customItem: {
    "title": "地区顶部自定义项",
    "type": "string"
  },
  disabled: {
    title: '是否禁用',
    type: 'boolean',
    default: false,
  },
  ...autoFillConfig
};
export default {
  isContainer: true,
  dataForm,
  // styleForm,
  emitEvents: [
    { eventName: "change", name: "value 改变" },
    { eventName: "cancel", name: "取消选择" }
  ]
};
