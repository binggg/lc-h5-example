const dataForm = {
  formHost: {
    title: "表单host",
    type: "string",
    description:
      "若给FormRender传入form-host与form-id，则会使用远程schema与globalConfig，忽略本地schema与globalConfig",
  },
  formId: {
    title: "表单id",
    type: "string",
  },
  isAllDisabled: {
    title: "是否全局禁止编辑",
    type: "boolean",
  },
  // action: {
  //   title: "表单action",
  //   type: "object",
  //   description:
  //     "通过@govcloud/formily-react-weui的createFormActions/createAsyncFormActions方法创建actions实例，用于调用 FormAPI ",
  // },
  linkConditions: {
    title: "代码控制联动条件",
    type: "object",
  },
  defaultValue: {
    title: "表单默认值",
    type: "object",
  },
  effects: {
    title: "钩子",
    type: "object",
    description: "若设置了钩子，isAllDisabled属性会失效",
  },
  schema: {
    title: "本地schema",
    type: "object",
  },
  globalConfig: {
    title: "本地globalConfig",
    type: "object",
  },
  globalHead: {
    title: "远程请求时header参数",
    type: "object",
  },
};

export default {
  dataForm,
  // emitEvents: [],
};
