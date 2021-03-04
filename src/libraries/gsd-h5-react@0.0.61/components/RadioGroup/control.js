/**
 * @desc Button EditorComponent
 */

/**
 * @desc component dataForm
 * @type {JsonSchemaProperties}
 */

import { formName } from '../../lib/utils/config'

const dataForm = {
  name: {
    ...formName,
    default: 'thisIsRadioGroupKey',
  },
};


export default {
  dataForm,
  emitEvents: [
    { eventName: 'change', name: '选中项发生改变' }
  ],
  isContainer: true,
};
