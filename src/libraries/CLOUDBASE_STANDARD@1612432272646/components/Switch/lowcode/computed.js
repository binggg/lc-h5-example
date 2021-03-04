import { app } from 'app/global-api'
      
/*
* 可通过 this.$WEAPPS_COMP.computed.xxx 访问这里定义的计算状态
* 
*/

export default {
  getClass() {
    const { value } = this.$WEAPPS_COMP.props.data
    // return `g-comp-switch  ${value ? 'g-comp-switch_checked' : ''}`
    return `${value ? 'g-comp-switch_checked' : ''}`
  },
  isSwitch() {
    const { type = 'switch' } = this.$WEAPPS_COMP.props.data
    return type === 'switch'
  }
};