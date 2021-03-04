/**
 * @desc Button EditorComponent
 */

/**
 * @desc component dataForm
 * @type {JsonSchemaProperties}
 */


const dataForm = {
    url: {
        title: '推流地址',
        description: '目前仅支持rtmp格式',
        type: 'string'
    },
    mode: {
        title: '模式',
        description: 'SD（标清）, HD（高清）, FHD（超清）, RTC（实时通话）',
        type: 'string',
        default: 'live',
        'x-component': 'radio',
        enum: [
          {
            label: 'SD（标清）',
            value: 'SD',
          },
          {
            label: 'HD（高清）',
            value: 'HD',
          },
          {
            label: 'FHD（超清）',
            value: 'FHD',
          },
          {
            label: 'RTC（实时通话）',
            value: 'RTC',
          }
        ],
    },
    autopush: {
        title: '自动推流',
        description: '',
        type: 'boolean',
        default: false
    },
    muted: {
        title: '是否静音',
        description: '即将废弃，可用enableMic替代',
        type: 'boolean',
        default: false
    },
    enableMic: {
        title: '开启麦克风',
        description: '开启或关闭麦克风',
        type: 'boolean',
        default: true
    },
    enableCamera: {
        title: '开启摄像头',
        description: '开启或关闭摄像头',
        type: 'boolean',
        default: true
    },
    autoFocus: {
        title: '自动聚焦',
        description: '',
        type: 'boolean',
        default: true
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
    beauty: {
        title: '美颜',
        description: '取值范围 0-9 ，0 表示关闭',
        type: 'number',
        default: 0,
    },
    whiteness: {
        title: '美白',
        description: '取值范围 0-9 ，0 表示关闭',
        type: 'number',
        default: 0,
    },
    aspect: {
        title: '宽高比',
        description: '',
        type: 'string',
        default: '9:16',
        'x-component': 'radio',
        enum: [
          {
            label: '9:16',
            value: '9:16',
          },
          {
            label: '3:4',
            value: '3:4',
          },
        ],
    },
    minBitrate: {
        title: '最小码率',
        description: '',
        type: 'number',
        default: 200
    },
    maxBitrate: {
        title: '最大码率',
        description: '',
        type: 'number',
        default: 1000
    },
    audioQuality: {
        title: '音质',
        description: '高音质(48KHz)或低音质(16KHz)，值为high, low',
        type: 'string',
        default: 'high',
        // 'x-component': 'radio',
        enum: [
          {
            label: '高音质(48KHz)',
            value: 'high',
          },
          {
            label: '低音质(16KHz)',
            value: 'low',
          },
        ],
    },
    waitingImage: {
        title: '推流等待画面',
        description: '进入后台时推流的等待画面',
        type: 'string'
    },
    waitingImageHash: {
        title: '推流等待画面MD5值',
        description: '进入后台时推流等待画面MD5值',
        type: 'string'
    },
    zoom: {
        title: '调整焦距',
        description: '',
        type: 'boolean',
        default: false
    },
    devicePosition: {
        title: '设备位置',
        description: '前置或后置，值为front, back',
        type: 'string',
        default: 'front',
        // 'x-component': 'radio',
        enum: [
          {
            label: '前置',
            value: 'front',
          },
          {
            label: '后置',
            value: 'back',
          },
        ],
    },
    // backgroundMute: {},
    mirror: {
        title: '推流画面是否镜像',
        description: '设置推流画面是否镜像，产生的效果在 live-player 反应到',
        type: 'boolean',
        default: false
    },
    remoteMirror: {
        title: '推流画面是否镜像',
        description: '同 mirror 属性，后续 mirror 将废弃',
        type: 'boolean',
        default: false
    },
    localMirror: {
        title: '本地预览画面是否镜像',
        description: '控制本地预览画面是否镜像',
        type: 'string',
        default: 'auto',
        // 'x-component': 'radio',
        enum: [
          {
            label: '前置摄像头镜像，后置摄像头不镜像',
            value: 'auto',
          },
          {
            label: '前后置摄像头均镜像',
            value: 'enable',
          },
          {
            label: '前后置摄像头均不镜像',
            value: 'disable',
          },
        ],
    },
    audioReverbType: {
        title: '音频混响类型',
        description: '',
        type: 'string',
        default: 0,
        // 'x-component': 'radio',
        enum: [
          {
            label: '关闭',
            value: 0,
          },
          {
            label: 'KTV',
            value: 1,
          },
          {
            label: '小房间',
            value: 2,
          },
          {
            label: '大会堂',
            value: 3,
          },
          {
            label: '低沉',
            value: 4,
          },
          {
            label: '洪亮',
            value: 5,
          },
          {
            label: '金属声',
            value: 6,
          },
          {
            label: '磁性',
            value: 7,
          },
        ],
    },
    audioVolumeType: {
        title: '音量类型',
        description: '',
        type: 'string',
        default: 'auto',
        // 'x-component': 'radio',
        enum: [
          {
            label: '自动',
            value: 'auto',
          },
          {
            label: '媒体音量',
            value: 'media',
          },
          {
            label: '通话音量',
            value: 'voicecall',
          }
        ],
    },
    enableAgc: {
        title: '是否开启音频自动增益',
        description: '',
        type: 'boolean',
        default: false
    },
    enableAns: {
        title: '是否开启音频噪声抑制',
        description: '',
        type: 'boolean',
        default: false
    },
    videoWidth: {
        title: '上推的视频流的分辨率宽度',
        description: '',
        type: 'number',
        default: 360
    },
    videoHeight: {
        title: '上推的视频流的分辨率高度',
        description: '',
        type: 'number',
        default: 640
    },
    beautyStyle: {
        title: '美颜类型',
        description: '',
        type: 'string',
        default: 'smooth',
        // 'x-component': 'radio',
        enum: [
          {
            label: '光滑美颜',
            value: 'smooth',
          },
          {
            label: '自然美颜',
            value: 'nature',
          }
        ],
    },
    filter: {
        title: '滤镜',
        description: '',
        type: 'string',
        default: 'standard',
        // 'x-component': 'radio',
        enum: [
          {
            label: '标准',
            value: 'standard',
          },
          {
            label: '粉嫩',
            value: 'pink',
          },
          {
            label: '怀旧',
            value: 'nostalgia',
          },
          {
            label: '蓝调',
            value: 'blues',
          },
          {
            label: '浪漫',
            value: 'romantic',
          },
          {
            label: '清凉',
            value: 'cool',
          },
          {
            label: '清新',
            value: 'fresher',
          },
          {
            label: '日系',
            value: 'solor',
          },
          {
            label: '唯美',
            value: 'aestheticism',
          },
          {
            label: '美白',
            value: 'whitening',
          },
          {
            label: '樱红',
            value: 'cerisered',
          }
        ],
    }
}

export default {
  dataForm,
  emitEvents: [
    { eventName: "statechange", name: "播放状态变化事件，detail = {code}" },
    { eventName: "netstatus", name: "网络状态通知，detail = {info}" },
    { eventName: "error", name: "渲染错误事件，detail = {errMsg, errCode}" },
    { eventName: "bgmstart", name: "背景音乐开始播放时触发" },
    { eventName: "bgmprogress", name: "背景音进度变化时触发，detail = {progress, duration}" },
    { eventName: "bgmcomplete", name: "背景音播放完成时触发" },
    { eventName: "audiovolumenotify	", name: "返回麦克风采集的音量大小" },
  ]
};
