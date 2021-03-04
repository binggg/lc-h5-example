/**
 * @desc Button EditorComponent
 */

/**
 * @desc component dataForm
 * @type {JsonSchemaProperties}
 */
const dataForm = {
  type: {
    title: '数据类型',
    type: 'string',
    default: 'userNickName',
    "x-linkages": [
      {
        "type": "value:visible",
        "target": 'lang',
        "condition": "{{$self.value !== 'groupName' }}"
      },
      {
        "type": "value:visible",
        "target": 'openGid',
        "condition": "{{$self.value == 'groupName' }}"
      }
    ],
    enum: [
      { value: 'groupName', label: '拉取群名称' },
      { value: 'userNickName', label: '用户昵称' },
      { value: 'userAvatarUrl', label: '用户头像' },
      { value: 'userGender', label: '用户性别' },
      { value: 'userCity', label: '用户所在城市' },
      { value: 'userProvince', label: '用户所在省份' },
      { value: 'userCountry', label: '用户所在国家' },
      { value: 'userLanguage', label: '用户的语言' },
    ]
  },
  openGid: {
    title: '群id',
    type: 'string',
  },
  lang: {
    title: '语言',
    type: 'string',
    default: 'zh_CN',
    enum: [
      {
        label: '英文',
        value: 'en',
      },
      {
        label: '中文（大陆）',
        value: 'zh_CN',
      },
      {
        label: '中文（台湾）',
        value: 'zh_TW',
      },
    ],
  },
  defaultText: {
    title: '数据为空时的默认文案',
    type: 'string',
  },
  defaultAvatar: {
    title: '用户头像为空时的默认图片',
    type: 'string',
  }
};


export default {
  dataForm,
  emitEvents: [
    { eventName: "error", name: "群名称或用户信息为空时触发" },
  ]
};
