/**
 * @desc Button EditorComponent
 */

/**
 * @desc component dataForm
 * @type {JsonSchemaProperties}
 */
import { formName } from "../../lib/utils/config";

const dataForm = {
  name: {
    ...formName,
    default: 'thisIsSwitchKey',
  },
  checked: {
    title: '是否选中',
    type: 'boolean',
    default: true
  },
  disabled: {
    title: '是否禁用',
    type: 'boolean',
    default: false,
  },
  color:{
    title: 'switch 的颜色',
    type: 'color',
    default: '#4293f4',
  },
  type: {
    title: '样式',
    type: 'string',
    default: 'switch',
    enum: [
      {
        label: 'switch',
        value: 'switch',
      },
      {
        label: 'checkbox',
        value: 'checkbox',
      }
    ]
  }
};


export default {
  dataForm,
  emitEvents: [
    { name: 'checked 改变', eventName: 'change' },
  ],
};
