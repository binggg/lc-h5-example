import { app } from 'app/global-api'
      /*
* 可通过 this.$WEAPPS_COMP.computed.xxx 访问这里定义的计算状态
* 
*/

export default {
  value() { 
    let value = this.$WEAPPS_COMP.props.data.value
    if(typeof value === 'number'){
      let date = new Date(value)
      let hour = date.getUTCHours()
      let minute = date.getUTCMinutes()
      if(hour<10){
        hour = '0'+hour
      }
      if(minute<10){
        minute = '0'+minute
      }
      return `${hour}:${minute}`
    } else {
      return value
    } 
  }
};