import { app } from 'app/global-api'
      
/*
* 可通过 this.$WEAPPS_COMP.computed.xxx 访问这里定义的计算状态
* 
*/

export default {
  getIndexFromValue() {
    const { range, value } = this.$WEAPPS_COMP.props.data
    if (!range.length) return
    const index = range.findIndex(item => item.value === value)
    return index < 0 ? 0 : index
  },
  getDisplayNameFromValue() {
    const { range, value } = this.$WEAPPS_COMP.props.data
    const rangeKey = 'label'
    if (!range.length) return ''
    const index = range.findIndex(item => item.value === value)
    return index < 0 ? '' : range[index][rangeKey] || range[index]
  }
};