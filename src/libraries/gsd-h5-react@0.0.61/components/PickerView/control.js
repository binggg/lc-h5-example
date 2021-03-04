/**
 * @desc Button EditorComponent
 */

/**
 * @desc component dataForm
 * @type {JsonSchemaProperties}
 */


const dataForm = {
  value: {
    title: '选中值',
    default: [],
    type: 'array',
    items: {
      type: 'number'
    }
  },
  // indicatorStyle: {
  //   title: '设置选择器中间选中框的样式',
  //   type: 'object',
  // },
  indicatorClass: {
    title: '设置选择器中间选中框的类名',
    type: 'string',
  },
  // maskStyle: {
  //   title: '设置蒙层的样式',
  //   type: 'object',
  // },
  maskClass: {
    title: '设置蒙层的类名',
    type: 'string',
  },
};


export default {
  dataForm,
  isContainer: true,
  emitEvents: [
    { eventName: "change", name: "滚动选择时触发change事件" },
    { eventName: "pickstart", name: "当滚动选择开始时候触发事件" },
    { eventName: "pickend", name: "当滚动选择结束时候触发事件" },
  ],
};
