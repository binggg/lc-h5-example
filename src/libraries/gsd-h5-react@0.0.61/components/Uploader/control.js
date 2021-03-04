/**
 * @desc Button EditorComponent
 */

/**
 * @desc component dataForm
 * @type {JsonSchemaProperties}
 */
import { formName } from "../../lib/utils/config";

const dataForm = {
  name: {
    ...formName,
    default: 'thisIsUploadKey',
  },
  type: {
    title: '上传文件类型',
    type: 'string',
    default: 'media',
    'x-component': 'radio',
    enum: [
      {
        label: 'media',
        value: 'media',
      },
      {
        label: 'file',
        value: 'file',
      },
      {
        label: 'all',
        value: 'all',
      },
    ],
    "x-linkages": [
      {
        "type": "value:visible",
        "target": '*(mediaType,sourceType)',
        "condition": "{{ $self.value === 'media' }}"
      },
      {
        "type": "value:visible",
        "target": '*(extension)',
        "condition": "{{ $self.value === 'file'}}"
      },
    ],
  },
  mediaType:{
    title: '媒体类型',
    type: 'array',
    default: ['image'],
    'x-component': 'checkbox',
    enum: [
      {
        label: 'image',
        value: 'image',
      },
      {
        label: 'video',
        value: 'video',
      },
    ],
  },
  sourceType: {
    title: "图片和视频选择的来源",
    type: 'array',
    default: ['album', 'camera'],
    'x-component': 'checkbox',
    enum: [
      {
        label: 'album',
        value: 'album',
      },
      {
        label: 'camera',
        value: 'camera',
      },
    ],
  },
  extension: {
    title: "文件拓展名",
    type: 'array',
    default: [
      'doc'
    ],
    items: {
      type: 'string',
    },
  },
  useRequest: {
    "title": "使用内部上传接口",
    "type": "boolean",
    default: false,
    "x-linkages": [
      {
        "type": "value:visible",
        "target": '*(action,maxSize,filename,header,formData)',
        "condition": "{{ $self.value }}"
      },
    ],
  },
  "action": {
    "title": "上传地址",
    "type": "string"
  },
  "maxSize": {
    "title": "文件最大空间",
    "type": "number",
    "description": "单位:Kb",
    "default": 500
  },
  "filename": {
    "title": "文件名称",
    "type": "string",
    default: 'file'
  },
  "header": {
    "title": "请求头",
    "type": "object",
  },
  "formData": {
    "title": "额外数据",
    "type": "object",
  },
};


export default {
  dataForm,
  emitEvents: [
    { eventName: "change", name: "文件上传" },
    { eventName: "success", name: "文件上传成功" },
    { eventName: "error", name: "文件上传失败" },
  ]
};
