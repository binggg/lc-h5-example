import { app } from 'app/global-api'
      
/*
* 可通过 this.$WEAPPS_COMP.computed.xxx 访问这里定义的计算状态
* 
*/

export default {
  getContainerCls() {
    const { underline } = this.$WEAPPS_COMP.props.data
    return `${this.$WEAPPS_COMP.computed.getDisabled? 'zw-radio_disabled' : '' } ${underline ? 'zw-radio-container-line' : ''}`
  },
  getChecked() {
    return this.$WEAPPS_COMP.handler.getChecked()
  },
  getUnChecked() {
    return !this.$WEAPPS_COMP.handler.getChecked()
  },
  getDisabled() {
    const { disabled } = this.$WEAPPS_COMP.props.data
    const radioGroup = this.$WEAPPS_COMP.handler.getRadioGroup()
    return (radioGroup && radioGroup.disabled)|| disabled || false
  }
};