/**
 * @desc Button EditorComponent
 */

import { formName } from "../../lib/utils/config";

/**
 * @desc component dataForm
 * @type {JsonSchemaProperties}
 */
const dataForm = {
  name: {
    ...formName,
    default: 'thisIsCheckboxGroupKey',
  },
};


export default {
  dataForm,
  emitEvents: [
    { eventName: 'change', name: '选中项发生改变' }
  ],
  isContainer: true,
};
