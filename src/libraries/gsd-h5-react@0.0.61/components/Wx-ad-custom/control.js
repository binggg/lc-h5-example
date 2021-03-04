/**
 * @desc Button EditorComponent
 */

/**
 * @desc component dataForm
 * @type {JsonSchemaProperties}
 */


const dataForm = {
  unitId: {
    title: '广告单元id',
    description: '可在小程序管理后台的流量主模块新建',
    type: 'string'
  },
  adIntervals: {
    title: '广告自动刷新的间隔时间',
    description: '单位为秒，参数值必须大于等于30（该参数不传入时 Banner 广告不会自动刷新）',
    type: 'number'
  }
};


export default {
  dataForm,
  emitEvents: [
    { eventName: "load", name: "广告加载成功的回调" },
    { eventName: "error", name: "广告加载失败的回调" }
  ]
};