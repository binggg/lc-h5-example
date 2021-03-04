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
    default: "thisIsSelectorKey"
  },
  mode: {
    title: '选择器类型',
    default: 'selector',
    type: 'string',
    readOnly: true,
  },
  range: {
    title: '单列--列表内容',
    default: [
      '选项一', '选项二'
    ],
    type: 'array',
    items: {
      type: 'string',
    },
    "description": "range可绑定array/object array, 如果绑定为object array,必须包含value字段,必须配置rangeKey指定要显示的字段,例如[{name:'要显示的值',value:'aaa'}],rangeKey为name"
  },
  value: {
    title: '选中值',
    type: 'number',
    default: 0
  },
  rangeKey: {
    title: '显示的key',
    type: 'string',
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
  emitEvents: [
    { eventName: "change", name: "value 改变" },
    { eventName: "cancel", name: "取消选择" }
  ]
};
