/**
 * @desc Button EditorComponent
 */

/**
 * @desc component dataForm
 * @type {JsonSchemaProperties}
 */


const dataForm = {
  scrollTop: {
    title: '顶部滚动偏移量',
    type: 'number'
  },
  text:{
    title: '内容文本',
    type: 'string'
  }
};


export default {
  dataForm,
  emitEvents: [],
  isContainer: true
};
