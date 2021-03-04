/**
 * @desc Button EditorComponent
 */

/**
 * @desc component dataForm
 * @type {JsonSchemaProperties}
 */
const dataForm = {
  src: {
    title: 'webview 指向网页的链接',
    type: 'string'
  }
};


export default {
  dataForm,
  emitEvents: [
    { eventName: "message", name: "网页向小程序 postMessage 时，会在特定时机触发并收到消息" },
    { eventName: "error", name: "网页加载成功" },
    { eventName: "close", name: "网页加载失败" },
  ]
};
