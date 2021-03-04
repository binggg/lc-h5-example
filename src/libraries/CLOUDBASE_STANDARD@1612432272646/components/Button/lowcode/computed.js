import { app } from 'app/global-api'
      
/*
* 可通过 this.$WEAPPS_COMP.computed.xxx 访问这里定义的计算状态
* 
*/

export default {
  classnames() {
    const prefixClass = 'g-btn'
    const { type, size, plain, disabled, loading } = this.$WEAPPS_COMP.props.data
    const classList = [`${prefixClass}-${size}`]
    if (plain) {
      classList.push(`${prefixClass}-plain`)
      classList.push(`${prefixClass}-type-${type}-plain`)
    }
    if (type) {
      classList.push(`${prefixClass}-type-${type}`)
    }
    disabled && classList.push(`${prefixClass}-disabled`)
    loading && classList.push(`${prefixClass}-${type}-loading`)
    return classList
  }
};