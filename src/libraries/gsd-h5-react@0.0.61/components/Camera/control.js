/**
 * @desc Button EditorComponent
 */

/**
 * @desc component dataForm
 * @type {JsonSchemaProperties}
 */

const dataForm = {
  mode: {
    title: '应用模式',
    type: 'string',
    default: 'normal',
    description: '只在初始化时有效，不能动态变更',
    'x-component': 'radio',
    enum: [
      {
        label: '相机模式',
        value: 'normal',
      },
      {
        label: '扫码模式',
        value: 'scanCode',
      }
    ],
  },
  resolution: {
    title: '分辨率',
    type: 'string',
    default: 'medium',
    description: '不能动态变更',
    'x-component': 'radio',
    enum: [
      {
        label: '低',
        value: 'low',
      },
      {
        label: '中',
        value: 'medium',
      },
      {
        label: '高',
        value: 'high',
      }
    ],
  },
  devicePosition: {
    title: '摄像头朝向',
    type: 'string',
    default: 'back',
    'x-component': 'radio',
    enum: [
      {
        label: '前置',
        value: 'front',
      },
      {
        label: '后置',
        value: 'back',
      }
    ],
  },
  flash: {
    title: '闪光灯',
    type: 'string',
    default: 'auto',
    'x-component': 'radio',
    enum: [
      {
        label: '自动',
        value: 'auto',
      },
      {
        label: '打开',
        value: 'on',
      },
      {
        label: '关闭',
        value: 'off',
      },
      {
        label: '常亮',
        value: 'torch',
      }
    ],
  },
  frameSize: {
    title: '指定期望的相机帧数据尺寸',
    type: 'string',
    default: 'medium',
    'x-component': 'radio',
    enum: [
      {
        label: '小尺寸帧数据',
        value: 'small',
      },
      {
        label: '中尺寸帧数据',
        value: 'medium',
      },
      {
        label: '大尺寸帧数据',
        value: 'large',
      }
    ],
  }
};

/**
 * @desc component styleSchema
 * @type {StyleGroup | '*'}
 */
const defaultStyles = {
  size: { width: '100%', height: 400 }
}


export default {
  dataForm,
  defaultStyles,
  emitEvents: [
    { eventName: 'stop', name: '摄像头在非正常终止时触发' },
    { eventName: "error", name: "用户不允许使用摄像头时触发" },
    { eventName: "initdone", name: "相机初始化完成时触发" },
    { eventName: "scancode", name: "在扫码识别成功时触发，仅在 mode=\"scanCode\" 时生效" },
  ],
};
