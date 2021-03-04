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
    default: "thisIsDateKey"
  },
  mode: {
    title: '选择器类型',
    default: 'date',
    type: 'string',
    readOnly: true,
  },
  fields: {
    "title": "时间模式",
    "default": "day",
    "type": "string",
    "enum": [
      {
        "label": "年月",
        "value": "month"
      },
      {
        "label": "年",
        "value": "year"
      },
      {
        "label": "天",
        "value": "day"
      },
    ],
  },
  "start": {
    "title": "开始时间",
    "type": "date"
  },
  "end": {
    "title": "结束时间",
    "type": "date"
  },
  "value": {
    "title": "value",
    "type": "date"
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
  ]
};
