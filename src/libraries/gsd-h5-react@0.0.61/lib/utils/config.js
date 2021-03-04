const icons = [
  {
    label: 'success',
    value: 'success',
  },
  {
    label: 'success_no_circle',
    value: 'success_no_circle',
  },
  {
    label: 'info',
    value: 'info',
  },
  {
    label: 'warn',
    value: 'warn',
  },
  {
    label: 'waiting',
    value: 'waiting',
  },
  {
    label: 'circle',
    value: 'circle',
  },
  {
    label: 'cancel',
    value: 'cancel',
  },
  {
    label: 'download',
    value: 'download',
  },
  {
    label: 'search',
    value: 'search',
  },
  {
    label: 'clear',
    value: 'clear',
  },
  {
    label: 'info_circle',
    value: 'info_circle',
  },

]

const iconConfig = {
  type: 'string',
  enum: icons,
  "x-component-props": {
    showSearch: true
  }
}

const formName = {
  title: '字段名',
  type: 'string',
  required: true,
  description: '表单提交数据的 Key，页面内需保证唯一，低代码中可根据该字段，控制当前组件的赋值、校验等操作',
  'x-rules': [
    {
      required: true,
      message: '该字段必填',
    },
    {
      pattern: /^[a-zA-Z][0-9a-zA-Z_]*$/,
      message: '必须以字母开头，仅能输入字母或下划线或数字',
    }
  ]
}

const formItemConfig = {
  label: {
    title: '标题',
    default: '标题',
    type: 'string',
    isReactNode: true,
  },
  placeholder: {
    title: '占位符',
    type: 'string',
    default: '请输入'
  },
  layout: {
    title: '布局方式',
    type: 'string',
    default: 'horizontal',
    enum: [{
      label: 'horizontal',
      value: 'horizontal',
    }, {
      label: 'vertical',
      value: 'vertical',
    }]
  },
  required: {
    title: '必填',
    type: 'boolean',
    default: false,
    "x-linkages": [
      {
        "type": "value:visible",
        "target": 'requiredText',
        "condition": "{{$self.value}}"
      },
      {
        "type": "value:visible",
        "target": '*(disabled)',
        "condition": "{{!$self.value}}"
      }
    ],
  },
  requiredText: {
    title: '必填校验错误提示',
    type: 'string',
    default: '该项为必填项',
  },
  disabled: {
    title: '是否禁用',
    type: 'boolean',
    default: false,
    "x-linkages": [
      {
        "type": "value:visible",
        "target": '*(required,focus)',
        "condition": "{{!$self.value}}"
      },
    ],
  },
  desc: {
    title: '描述',
    type: 'string',
    isReactNode: true,
  }
}

const formCell = {
  needAction: {
    title: '是否需要尾部操作样式',
    type: 'boolean',
    default: true,
    "x-linkages": [
      {
        "type": "value:visible",
        "target": '*(actionType)',
        "condition": "{{ $self.value }}"
      },
    ],
  },
  actionType: {
    title: '操作尾部样式类型',
    type: 'string',
    default: 'arrow',
    'x-component': 'radio',
    enum: [
      {
        label: '箭头',
        value: 'arrow',
      }, {
        label: '文案',
        value: 'actionText',
      },
      {
        label: '三角下拉方式',
        value: 'dropdown',
      }
    ],
    "x-linkages": [
      {
        "type": "value:visible",
        "target": '*(actionText)',
        "condition": "{{ $self.value === 'actionText' }}"
      },
      {
        "type": "value:visible",
        "target": '*(width)',
        "condition": "{{ $self.value === 'dropdown' }}"
      },
    ],
  },
  actionText: {
    title: '操作文案',
    type: 'string',
    default: '选择',
  },
  width: {
    title: '宽度',
    default: 60,
    type: 'number',
  }
}

const agreeConfig = {
  isCustom: {
    title: '是否自定义协议内容',
    type: 'boolean',
    default: false,
    "x-linkages": [
      {
        "type": "value:visible",
        "target": 'custom',
        "condition": "{{$self.value}}"
      },
      {
        "type": "value:visible",
        "target": '*(text,link)',
        "condition": "{{$self.value === false}}"
      }
    ],
  },
  text: {
    title: '协议描述',
    default: '我已认真阅读并同意',
    type: 'string',
  },
  link: {
    title: '协议内容',
    default: [{
      title: "《安全协议》",
      key: 'link'
    }],
    type: 'array',
    items: {
      type: 'object',
      properties: {
        title: {
          title: '名称',
          type: 'string',
        },
        key: {
          title: 'key',
          type: 'string',
        },
      }
    }
  },
  custom: {
    title: '自定义协议内容',
    type: 'string',
    default: '自定义协议内容',
    isReactNode: true,
  },
  checkedIcon: {
    title: '选中Icon',
    type: 'string',
    isReactNode: true,
  },
  uncheckedIcon: {
    title: '未选中Icon',
    type: 'string',
    isReactNode: true,
  },
  defaultValue: {
    title: '协议是否默认选中',
    type: 'boolean',
    default: false,
  },
}

const openType = [
  { label: '无', value: '' },
  { label: '获取手机号', value: 'getPhoneNumber' },
  { label: '打开客服会话', value: 'contact' },
  { label: '转发', value: 'share' },
  { label: '获取用户信息', value: 'getUserInfo' },
  { label: '获取用户实名信息', value: 'getRealnameAuthInfo' },
  { label: '打开App', value: 'launchApp' },
  { label: '打开授权设置', value: 'openSetting' },
  { label: '打开意见反馈', value: 'feedback' },
]

const mapPosition = {
  type: 'object',
  properties: {
    longitude: {
      type: 'number',
      title: '中心经度',
    },
    latitude: {
      type: 'number',
      title: '中心纬度',
    },
  },
}

const autoFillConfig = {
  autoFill: {
    title: '快速填写',
    type: 'string',
    default: '',
    enum: [
      {
        label: '基础信息-姓名',
        value: 'base_info.name',
      },
      {
        label: '基础信息-性别',
        value: 'base_info.sex',
      },
      {
        label: '基础信息-出生日期',
        value: 'base_info.birthday',
      },
      {
        label: '基础信息-身份证号',
        value: 'base_info.id_card_num',
      },
      {
        label: '基础信息-国籍',
        value: 'base_info.nationality',
      },
      {
        label: '电话信息-手机号',
        value: 'phone_info.phone',
      }
    ]
  }
}

function getRequiredRules (required, requiredText) {
  const resultList = [];
  if (required) {
    resultList.push({ required: true, message: requiredText })
  }
  return resultList
}


const keyboardConfig = {
  "placeholderStyle": {
    "title": "指定 placeholder 的样式",
    "type": "string"
  },
  "placeholderClass": {
    "title": "指定 placeholder 的样式类",
    "type": "string",
    "default": 'input-placeholder'
  },
  cursorSpacing: {
    title: '光标与键盘的距离',
    type: 'number',
    default: 0
  },
  cursor: {
    title: '指定focus时的光标位置',
    type: 'number'
  },
  confirmHold: {
    title: '点击键盘右下角按钮时是否保持键盘不收起',
    type: 'boolean',
    default: false
  },
  selectionStart: {
    title: '光标起始位置',
    type: 'number',
    default: -1
  },
  selectionEnd: {
    title: '光标结束位置',
    type: 'number',
    default: -1
  },
  adjustPosition: {
    title: '键盘弹起时，是否自动上推页面',
    type: 'boolean',
    default: false
  },
  holdKeyboard: {
    title: 'focus时，点击页面的时候不收起键盘',
    type: 'boolean',
    default: false
  },
}

const hoverConfig = {
  hoverClass: {
    title: '指定按下去的样式类',
    description: '以下配置仅在微信小程序起作用',
    type: 'string'
  },
  hoverStopPropagation: {
    title: '指定是否阻止本节点的祖先节点出现点击态',
    type: 'boolean',
    default: false
  },
  hoverStartTime: {
    title: '按住后多久出现点击态，单位毫秒',
    type: 'number',
    default: 50
  },
  hoverStayTime: {
    title: '手指松开后点击态保留时间，单位毫秒',
    type: 'number',
    default: 400
  },
}

const requiredConfig = {
  required: true,
  'x-rules': [
    {
      required: true,
      message: '该字段必填',
    }
  ]
}


// 处理url链接，加入params参数
export function urlJoinParams(url, params) {
  if (!url || !params || typeof params !== 'object') {
    return url
  }
  const separate = url.indexOf('?') === -1 ? '?' : '&'
  const tempStr = Object.keys(params)
  .map(key => {
    let value = params[key]
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    if (value != undefined) {
      return `${key}=${encodeURIComponent(value)}`
    }
    return ''
  })
  .filter(value => value)
  .join('&')
  return `${url}${separate}${tempStr}`
}


export {
  icons,
  iconConfig,
  formName,
  formItemConfig,
  formCell,
  agreeConfig,
  openType,
  getRequiredRules,
  mapPosition,
  autoFillConfig,
  keyboardConfig,
  hoverConfig,
  requiredConfig
}
