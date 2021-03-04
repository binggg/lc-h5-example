/**
 * @desc Button EditorComponent
 */

/**
 * @desc component dataForm
 * @type {JsonSchemaProperties}
 */


const dataForm = {
  src: {
    title: '图片地址',
    type: 'image',
    description: 'H5请设置z-index',
    default: 'https://impage.fudao.qq.com/prod/image/static/static_1564109910612.png'
  },
};




export default {
  dataForm,
  emitEvents: [
    { name: 'load', eventName: '图片加载成功' },
    { name: 'error', eventName: '图片加载失败' },
  ]
};
