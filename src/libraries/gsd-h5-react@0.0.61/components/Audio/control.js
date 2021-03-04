/**
 * @desc Button EditorComponent
 */

/**
 * @desc component dataForm
 * @type {JsonSchemaProperties}
 */


const dataForm = {
  src: {
    title: '要播放音频的资源地址',
    type: 'string',
    default: 'https://www.runoob.com/try/demo_source/horse.ogg'
  },
  loop: {
    title: '重复播放',
    type: 'boolean',
    default: false,
  },
  controls: {
    title: '是否显示默认控件',
    type: 'boolean',
    default: true,
    "x-linkages": [
      {
        "type": "value:visible",
        "target": '*(poster,name,author)',
        "condition": "{{ $self.value}}"
      },
    ],
  },
  poster: {
    title: '默认控件上的音频封面的图片资源地址',
    type: 'string',
    description: '只在微信小程序起作用'
  },
  name: {
    title: '默认控件上的音频名字',
    type: 'string',
    default: '未知音频',
    description: '只在微信小程序起作用'
  },
  author: {
    title: '默认控件上的作者名字',
    type: 'string',
    default: '未知作者',
    description: '只在微信小程序起作用'
  },
};


export default {
  dataForm,
  emitEvents: [
    { eventName: "error", name: "播放错误" },
    { eventName: "play", name: "开始/继续播放" },
    { eventName: "pause", name: "暂停播放" },
    { eventName: "timeupdate", name: "播放进度改变" },
    { eventName: "ended", name: "播放到末尾" },
  ]
};
