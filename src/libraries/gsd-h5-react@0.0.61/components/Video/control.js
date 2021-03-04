/**
 * @desc Button EditorComponent
 */

/**
 * @desc component dataForm
 * @type {JsonSchemaProperties}
 */


const dataForm = {
  src: {
    title: '要播放视频的资源地址',
    type: 'string',
    default: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
  },
  duration: {
    title: '指定视频时长',
    type: 'number',
  },
  controls: {
    title: '是否显示默认播放控件',
    type: 'boolean',
    default: true,
  },
  autoplay: {
    title: '自动播放',
    type: 'boolean',
    default: false,
  },
  loop: {
    title: '重复播放',
    type: 'boolean',
    default: false,
  },
  muted: {
    title: '是否静音播放',
    type: 'boolean',
    default: false,
  },
  initialTime: {
    title: '指定视频初始播放位置',
    type: 'number',
    default: 0,
  },
  poster: {
    title: '视频封面的图片网络资源地址或云文件ID',
    type: 'string',
  },
  danmuList: {
    title: '弹幕列表',
    type: 'array',
  },
  danmuBtn: {
    title: '是否显示弹幕按钮',
    type: 'boolean',
    default: false
  },
  enableDanmu: {
    title: '是否展示弹幕',
    type: 'boolean',
    default: false
  },
  direction: {
    title: '设置全屏时视频的方向',
    type: 'number',
    enum: [
      {
        label: '正常竖向',
        value: 0,
      }, {
        label: '屏幕逆时针90度',
        value: 90,
      }, {
        label: '屏幕顺时针90度',
        value: -90,
      }
    ]
  },
  showProgress: {
    title: '若不设置，宽度大于240时才会显示',
    type: 'boolean',
    default: false
  },
  showFullscreenBtn: {
    title: '是否显示全屏按钮',
    type: 'boolean',
    default: true
  },
  showPlayBtn: {
    title: '是否显示视频底部控制栏的播放按钮',
    type: 'boolean',
    default: true
  },
  showCenterPlayBtn: {
    title: '是否显示视频中间的播放按钮',
    type: 'boolean',
    default: true
  },
  enableProgressGesture: {
    title: '是否开启控制进度的手势',
    type: 'boolean',
    default: true
  },
  objectFit: {
    title: '当视频大小与 video 容器大小不一致时，视频的表现形式',
    type: 'string',
    default: 'contain',
    enum: [
      {
        label: '包含',
        value: 'contain',
      }, {
        label: '填充',
        value: 'fill',
      }, {
        label: '覆盖',
        value: 'cover',
      }
    ]
  },
  title: {
    title: '视频的标题，全屏时在顶部展示',
    type: 'string'
  },
  playBtnPosition: {
    title: '播放按钮的位置',
    type: 'string',
    default: 'bottom',
    enum: [
      {
        label: 'controls bar上',
        value: 'bottom',
      },
      {
        label: '视频中间',
        value: 'center',
      }
    ]
  },
  enablePlayGesture: {
    title: '是否开启播放手势，即双击切换播放/暂停',
    type: 'boolean',
    default: false
  },
  autoPauseIfNavigate: {
    title: '当跳转到本小程序的其他页面时，是否自动暂停本页面的视频播放',
    type: 'boolean',
    default: true
  },
  autoPauseIfOpenNative: {
    title: '当跳转到其它微信原生页面时，是否自动暂停本页面的视频',
    type: 'boolean',
    default: true
  },
  vslideGesture: {
    title: '在非全屏模式下，是否开启亮度与音量调节手势',
    type: 'boolean',
    default: false
  },
  vslideGestureInFullscreen: {
    title: '在全屏模式下，是否开启亮度与音量调节手势',
    type: 'boolean',
    default: true
  },
  adUnitId: {
    title: '视频前贴广告单元ID',
    type: 'string'
  },
  posterForCrawler: {
    title: '用于给搜索等场景作为视频封面展示',
    type: 'string'
  },
  showCastingButton: {
    title: '显示投屏按钮',
    type: 'boolean',
    default: false
  },
  pictureInPictureMode: {
    title: '设置小窗模式',
    type: 'string'
  },
  pictureInPictureShowProgress: {
    title: '是否在小窗模式下显示播放进度',
    type: 'boolean',
    default: false
  },
  enableAutoRotation: {
    title: '是否开启手机横屏时自动全屏',
    type: 'boolean',
    default: false
  },
  showScreenLockButton: {
    title: '是否显示锁屏按钮',
    type: 'boolean',
    default: false
  },
  showSnapshotButton: {
    title: '是否显示截屏按钮',
    type: 'boolean',
    default: false
  },
};

export default {
  dataForm,
  emitEvents: [
    { eventName: "error", name: "播放错误" },
    { eventName: "play", name: "开始/继续播放" },
    { eventName: "pause", name: "暂停播放" },
    { eventName: "ended", name: "播放到末尾" },
    { eventName: "timeupdate", name: "播放进度改变" },
    { eventName: "fullscreenchange", name: "视频进入和退出全屏时触发s" },
    { eventName: "waiting", name: "视频出现缓冲" },
    { eventName: "progress", name: "加载进度变化时触" },
    { eventName: "loadedmetadata", name: "视频元数据加载完成时触发" },
    { eventName: "controlstoggle", name: "切换 controls 显示隐藏" },
    { eventName: "enterpictureinpicture", name: "播放器进入小窗" },
    { eventName: "leavepictureinpicture", name: "播放器退出小窗" },
    { eventName: "seekcomplete", name: "seek 完成" }
  ]
};
