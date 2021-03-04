/**
 * @desc Button EditorComponent
 */

/**
 * @desc component dataForm
 * @type {JsonSchemaProperties}
 */

const dataForm = {
};


export default {
  dataForm,
  emitEvents: [
    { eventName: 'submit', name: '表单提交' },
    { eventName: 'reset', name: '表单重置' },
  ],
  isContainer: true,
};
