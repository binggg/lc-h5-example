/**
 * @desc Button EditorComponent
 */
import { autoFillConfig, formName } from "../../lib/utils/config";

/**
 * @desc component dataForm
 * @type {JsonSchemaProperties}
 */
const dataForm = {
  mode: {
    title: '选择器类型',
    default: 'multiSelector',
    type: 'string',
    readOnly: true,
  },
  name: {
    ...formName,
    default: "thisIsMultiSelectorKey"
  },
  range: {
    title: '多列--列表内容',
    default: [

      [
        '选项一', '选项二'
      ],
      [
        '选项1.1', '选项1.2'
      ],
    ],
    type: 'array',
    items: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
  value: {
    title: '多列默认选中值',
    type: 'array',
    items: {
      title: 'value',
      type: 'number'
    }
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
  // styleForm,
  emitEvents: [
    { eventName: "change", name: "value 改变" },
    { eventName: "cancel", name: "取消选择" },
    { eventName: "columnchange", name: "列改变" },
  ]
};
