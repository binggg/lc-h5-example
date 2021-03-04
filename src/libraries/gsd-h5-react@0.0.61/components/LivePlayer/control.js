/**
 * @desc Button EditorComponent
 */

/**
 * @desc component dataForm
 * @type {JsonSchemaProperties}
 */


const dataForm = {
    src: {
        title: '音视频地址',
        description: '目前仅支持flv,rtmp格式',
        type: 'string'
    },
    mode: {
        title: '模式',
        description: '模式',
        type: 'string',
        default: 'live',
        'x-component': 'radio',
        enum: [
          {
            label: 'live',
            value: 'live',
          },
          {
            label: 'RTC',
            value: 'RTC',
          },
        ],
    },
    autoplay: {
        title: '自动播放',
        description: '',
        type: 'boolean',
        default: false
    },
    muted: {
        title: '是否静音',
        description: '',
        type: 'boolean',
        default: false
    },
    orientation: {
        title: '画面方向',
        description: '',
        type: 'string',
        default: 'vertical',
        'x-component': 'radio',
        enum: [
          {
            label: 'vertical',
            value: 'vertical',
          },
          {
            label: 'horizontal',
            value: 'horizontal',
          },
        ],
    },
    objectFit: {
        title: '填充模式',
        description: '可选值有contain,fillCrop',
        type: 'string',
        default: 'contain',
        'x-component': 'radio',
        enum: [
          {
            label: 'contain',
            value: 'contain',
          },
          {
            label: 'fillCrop',
            value: 'fillCrop',
          },
        ],
    },
    minCache: {
        title: '最小缓冲区',
        description: '单位s（RTC 模式推荐 0.2s）',
        type: 'number',
        default: 1
    },
    maxCache: {
        title: '最大缓冲区',
        description: '单位s（RTC 模式推荐 0.8s）。缓冲区用来抵抗网络波动，缓冲数据越多，网络抗性越好，但时延越大',
        type: 'number',
        default: 3
    },
    soundMode: {
        title: '声音输出方式',
        description: '声音输出方式',
        default: 'speaker',
        'x-component': 'radio',
        enum: [
          {
            label: 'speaker',
            value: 'speaker',
          },
          {
            label: 'ear',
            value: 'ear',
          },
        ],
    },
    autoPauseIfNavigate: {
        title: '跳转本小程序其他页面暂停播放',
        description: '当跳转到本小程序的其他页面时，是否自动暂停本页面的实时音视频播放',
        type: 'boolean',
        default: true
    },
    autoPauseIfOpenNative: {
        title: '跳转其他微信原生页面暂停播放',
        description: '当跳转到其它微信原生页面时，是否自动暂停本页面的实时音视频播放',
        type: 'boolean',
        default: true
    },
    pictureInPictureMode: {
        title: '小窗模式',
        description: '设置小窗模式： push, pop，空字符串或通过数组形式设置多种模式（如： ["push", "pop"]）',
        default: [],
        'x-component': 'checkbox',
        enum: [
          {
            label: 'push',
            value: 'push',
          },
          {
            label: 'pop',
            value: 'pop',
          },
        ],
    }
}

export default {
  dataForm,
  emitEvents: [
    { eventName: "statechange", name: "播放状态变化事件，detail = {code}" },
    { eventName: "fullscreenchange", name: "全屏变化事件，detail = {direction, fullScreen}" },
    { eventName: "netstatus", name: "网络状态通知，detail = {info}" },
    { eventName: "audiovolumenotify", name: "播放音量大小通知，detail = {}" },
    { eventName: "enterpictureinpicture", name: "播放器进入小窗" },
    { eventName: "leavepictureinpicture", name: "播放器退出小窗" },
  ]
};
