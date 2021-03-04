import { app } from 'app/global-api'
      
/*
* 可通过 this.$WEAPPS_COMP.computed.xxx 访问这里定义的计算状态
* 
*/

export default {
  getItemCls() {
    const { layout, line = true } = this.$WEAPPS_COMP.props.data
    const form = this.$WEAPPS_COMP.handler.getForm()
    const formLayout = form && form.layout
    const validateStatus = this.$WEAPPS_COMP.computed.getValidateStatus
    // console.log("layout",formLayout,layout)
    return `g-form-item ${line ? 'g-form-item-line' : ''} g-form-item-${layout || formLayout} ${validateStatus !== 'success' ? `g-form-item-${validateStatus}` : ''}`
  },
  getWrapCls() {
    const formChild = this.$WEAPPS_COMP.handler.getFormChild()
    const disabled = formChild && formChild.disabled || false
    return `g-form-item__wrap ${disabled ? 'g-form-item-disabled' : ''}`
  },
  getStatusCls() {
    const validateStatus = this.$WEAPPS_COMP.computed.getValidateStatus
    return `status-message ${validateStatus !== 'success' ? `status-message-${validateStatus}` : ''}`
  },
  getValidateStatus() {
    const { _validateStatus } = this.$WEAPPS_COMP.state
    const { validateStatus } = this.$WEAPPS_COMP.props.data
    // console.log("validateStatus", _validateStatus, validateStatus)
    return validateStatus !== 'success' ? validateStatus : _validateStatus
  },
  getHelp() {
    const { _help } = this.$WEAPPS_COMP.state
    return _help
  },
  requiredFlag() {
    const { required, requiredFlag = true } = this.$WEAPPS_COMP.props.data
    return required && requiredFlag
  },
};