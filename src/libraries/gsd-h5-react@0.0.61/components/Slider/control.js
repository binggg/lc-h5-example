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
    default: 'thisIsSliderKey',
  },
  min: {
    title: '最小值',
    type: 'number',
    default: 0
  },
  max: {
    title: '最大值',
    type: 'number',
    default: 100
  },
  step: {
    title: '步长',
    type: 'number',
    default: 1,
  },
  showValue: {
    title: '在进度条右侧显示数值',
    type: 'boolean',
    default: false
  },
  activeColor: {
    title: '已选择的颜色',
    default: '#1aad19',
    type: 'color',
  },
  backgroundColor: {
    title: '未选择的颜色',
    default: '#e9e9e9',
    type: 'color',
  },
  blockSize: {
    title: '滑块的大小',
    default: '28',
    type: 'number',
  },
  blockColor: {
    title: '滑块的颜色',
    default: '#ffffff',
    type: 'color',
  },
  value: {
    title: '初始值',
    type: 'number'
  },
  disabled: {
    title: '是否禁用',
    type: 'boolean',
    default: false,
  }
};

/**
 * @desc component styleSchema
 * @type {StyleGroup | '*'}
 */



export default {
  dataForm,
  emitEvents: [
    { name: '拖动过程', eventName: 'changing' },
    { name: '完成一次拖动', eventName: 'change' },
  ],
};
