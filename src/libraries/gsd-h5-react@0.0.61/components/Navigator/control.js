/**
 * @desc Button EditorComponent
 */

/**
 * @desc component dataForm
 * @type {JsonSchemaProperties}
 */

import { hoverConfig } from '../../lib/utils/config'

const dataForm = {
  target: {
    title: '在哪个目标上发生跳转，默认当前小程序',
    description: '仅用于小程序',
    type: 'string',
    'x-component': 'radio',
    default: 'self',
    enum: [
      {
        label: 'self',
        value: 'self',
      },
      {
        label: 'miniProgram(仅支持微信小程序)',
        value: 'miniProgram',
      },
      {
        label: 'url(仅支持H5)',
        value: 'url',
      },
    ],
    "x-linkages": [
      {
        "type": "value:visible",
        "target": '*(pageId,packageName,params,openType)',
        "condition": "{{ $self.value === 'self'}}"
      },
      {
        "type": "value:visible",
        "target": '*(appId,path,extraData,version)',
        "condition": "{{ $self.value === 'miniProgram'}}"
      },
      {
        "type": "value:visible",
        "target": '*(url,download)',
        "condition": "{{ $self.value === 'url'}}"
      },
    ],
  },
  pageId: {
    title: '页面id',
    type: 'string',
  },
  packageName: {
    title: '子应用名称',
    type: 'string',
  },
  params: {
    title: 'query object对象',
    type: 'object',
  },
  url: {
    title: '跳转链接',
    type: 'string',
  },
  openType: {
    title: '跳转方式',
    type: 'string',
    default: 'navigate',
    enum: [
      {
        label: 'navigate',
        value: 'navigate',
      },
      {
        label: 'redirect',
        value: 'redirect',
      },
      {
        label: 'navigateBack',
        value: 'navigateBack',
      },
      {
        label: 'reLaunch(仅支持微信小程序)',
        value: 'reLaunch',
      },
      {
        label: 'switchTab(仅支持微信小程序)',
        value: 'switchTab',
      },
      {
        label: 'exit(仅支持微信小程序)',
        value: 'exit',
      }
    ],
    "x-linkages": [
      {
        "type": "value:visible",
        "target": '*(delta)',
        "condition": "{{ $self.value === 'navigateBack'}}"
      },
    ],
  },
  delta: {
    title: '回退的层数',
    type: 'number',
    default: 1,
  },
  appId: {
    title: '要打开的小程序 appId',
    type: 'string'
  },
  path: {
    title: '打开的页面路径',
    description: '如果为空则打开首页',
    type: 'string'
  },
  extraData: {
    title: '需要传递给目标小程序的数据',
    description: '目标小程序可在 App.onLaunch()，App.onShow() 中获取到这份数据',
    type: 'object'
  },
  version: {
    title: '要打开的小程序版本',
    type: 'string',
    default: 'release',
    'x-component': 'radio',
    enum: [
      {
        label: 'release',
        value: 'release',
      },
      {
        label: 'develop',
        value: 'develop',
      },
      {
        label: 'trial',
        value: 'trial',
      },
    ],
  },
  download: {
    title: '下载文件名',
    description: '仅支持H5',
    type: 'string'
  },
  ...hoverConfig
};


export default {
  dataForm,
  isContainer: true,
  emitEvents: [
    { eventName: "success", name: "跳转小程序成功" },
    { eventName: "fail", name: "跳转小程序失败" },
    { eventName: "complete", name: "跳转小程序完成" }
  ]
};
