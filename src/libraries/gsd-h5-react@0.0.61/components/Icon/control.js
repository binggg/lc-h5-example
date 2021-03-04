/**
 * @desc Button EditorComponent
 */

/**
 * @desc component dataForm
 * @type {JsonSchemaProperties}
 */


import { iconConfig } from '../../lib/utils/config'


const dataForm = {
  type: {
    title: 'icon的类型',
    default: 'success',
    ...iconConfig,
  },
  size: {
    title: 'icon的大小',
    default: 23,
    type: 'number'
  },
  color: {
    title: 'icon的颜色',
    default: '#09BB07',
    type: 'color'
  },
};


export default {
  dataForm,
  emitEvents: [
    { name: '点击', eventName: 'tap' },
  ]
};
