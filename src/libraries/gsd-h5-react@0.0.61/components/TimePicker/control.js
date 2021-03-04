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
    default: "thisIsTimeKey"
  },
  mode: {
    title: '选择器类型',
    default: 'time',
    type: 'string',
    visible: false,
  },
  "start": {
    "title": "开始时间",
    "type": "time"
  },
  "end": {
    "title": "结束时间",
    "type": "time"
  },
  "value": {
    "title": "value",
    "type": "time"
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
