/**
 * @desc component dataForm
 * @type {JsonSchemaProperties | OverrideFormType}
 */
const dataForm = {
  text: {
    title: '文本内容',
    type: 'textarea',
    default: '输入文本内容...',
  },
  selectable: {
    title: '文本是否可选',
    type: 'boolean',
    default: false,
  },
  decode: {
    title: '是否解码',
    type: 'boolean',
    default: false,
  }
};

/**
 * @desc component styleSchema
 * @type {StyleGroup | '*'}
 */


/**
 * @desc component styleSchema
 * @type {EditorComponent}
 */
export default {
  dataForm,
  emitEvents: [
    { name: '点击', eventName: 'tap' },
  ]
};
