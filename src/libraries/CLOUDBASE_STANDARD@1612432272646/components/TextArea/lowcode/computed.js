import { app } from 'app/global-api'
      
/*
* 可通过 this.$WEAPPS_COMP.computed.xxx 访问这里定义的计算状态
* 
*/

export default {
  getCount() {
    const { maxLength, value } = this.$WEAPPS_COMP.props.data;
    let len = 0;
    if (value) {
      len = value.replace(/\n/g, "a").length;
    }
    const count = len > maxLength ? maxLength : len;
    return `${count}/${maxLength}`
  }
};