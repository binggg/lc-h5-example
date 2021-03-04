import { app } from 'app/global-api'
      
/*
* 可通过 this.$WEAPPS_COMP.computed.xxx 访问这里定义的计算状态
* 
*/

export default {
  getContainerCls() {
    const { underline } = this.$WEAPPS_COMP.props.data
    return `${underline ? 'g-checkbox-container-line' : ''} ${this.$WEAPPS_COMP.computed.getDisabled? 'g-checkbox_disabled' : '' }`
  },
  getChecked() {
    return this.$WEAPPS_COMP.handler.getChecked()
  },
  getUnChecked() {
    return !this.$WEAPPS_COMP.handler.getChecked()
  },
  getDisabled() {
    const { disabled } = this.$WEAPPS_COMP.props.data
    const checkboxGroup = this.$WEAPPS_COMP.handler.getCheckboxGroup()
    return (checkboxGroup && checkboxGroup.disabled)|| disabled || false
  }
};