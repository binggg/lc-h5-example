/**
 * @desc Button EditorComponent
 */

/**
 * @desc component dataForm
 * @type {JsonSchemaProperties}
 */
const dataForm = {
  itemId: {
    type: 'string',
    title: 'swiper-item 的标识符'
  },
  skipHiddenItemLayout: {
    type: 'boolean',
    title: '是否跳过未显示的滑块布局',
    default: false
  },
};


export default {
  dataForm,
  isContainer: true,
};
