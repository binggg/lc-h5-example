/**
 * @desc Button EditorComponent
 */

/**
 * @desc component dataForm
 * @type {JsonSchemaProperties}
 */

const dataForm = {
  for: {
    title: '绑定控件的 id',
    type: 'string'
  },
};


export default {
  dataForm,
  emitEvents: [
    { eventName: 'tap', name: '点击' },
  ],
  isContainer: true,
};
