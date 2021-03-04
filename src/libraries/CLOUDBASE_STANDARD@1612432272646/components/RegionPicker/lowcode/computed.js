import { app } from 'app/global-api'
      
/*
* 可通过 this.$WEAPPS_COMP.computed.xxx 访问这里定义的计算状态
* 
*/

export default {
  getDisplayValue() {
    const { separator } = this.$WEAPPS_COMP.props.data
    return this.$WEAPPS_COMP.props.data.value.join(separator)
  }
};