import { app } from 'app/global-api'
      export default {
  // 在此定义需要暴露给外部调用的API，此处定义的API可通过this.$WEAPPS_COMP直接调用
  publicMethods: {
  },
  //类似VUE的watchEffect, https://composition-api.vuejs.org/api.html#watcheffect
  watchEffects: {
    /* 在组件onReady会首次执行以下函数，在effect函数中用到的状态(this.$WEAPPS_COMP.widgets, this.$WEAPPS_COMP.state, this.$WEAPPS_COMP.props.data)发变化会重跑
    effectName() {
      // 传入该组件的text属性发生变化时，该函数重跑
      console.log(this.$WEAPPS_COMP.props.data.text)
    },*/
  }
};