
const dataForm = {
  title: {
    title: '标题',
    default: '弹窗标题',
    type: 'string'
  },
  content: {
    title: '内容',
    default: '请输入弹窗内容',
    type: 'string',
  },
  showCancel: {
    title: '是否显示取消按钮',
    type: 'boolean',
    default: true
  },
  cancelText: {
    type: 'string',
    title: '取消按钮的文字',
    description: '最多 4 个字符',
    default: '取消'
  },
  cancelColor: {
    title: '取消按钮的文字颜色',
    type: 'color',
    default: '#000000'
  },
  confirmText: {
    type: 'string',
    title: '确认按钮的文字',
    description: '最多 4 个字符',
    default: '确认'
  },
  confirmColor: {
    title: '确认按钮的文字颜色',
    type: 'color',
    default: '#576B95'
  }
}

export default {
  dataForm
}
