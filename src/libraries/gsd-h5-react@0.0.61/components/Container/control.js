const dataForm = {
  title: {
    type: 'string',
    default: '',
    title: '容器备注',
    description: 'Tips: 可在 [样式] 栏目编辑容器样式'
  }
};

export default {
  dataForm,
  isContainer: true,
  emitEvents: [
    { eventName: 'tap', name: '点击' },
    { eventName: "longpress", name: "长按" },
    { eventName: "touchstart", name: "手指触摸动作开始" },
    { eventName: "touchmove", name: "手指触摸后移动" },
    { eventName: "touchcancel", name: "手指触摸动作被打断" },
    { eventName: "touchend", name: "手指触摸动作结束" },
  ],
};
