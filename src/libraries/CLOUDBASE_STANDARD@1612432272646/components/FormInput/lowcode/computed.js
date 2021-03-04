import { app } from 'app/global-api'
      
/*
* 可通过 this.$WEAPPS_COMP.computed.xxx 访问这里定义的计算状态
* 
*/

export default {
  formLayout() {
    const { layout } = this.$WEAPPS_COMP.props.data
    if (layout) {
      return
    }
    // 自动为空，去 form 的
    const form = this.$WEAPPS_COMP.handler.getForm()
    return form && form.layout
  }
};