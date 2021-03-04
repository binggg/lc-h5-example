import { app } from 'app/global-api'
      /*
* 可通过 this.$WEAPPS_COMP.computed.xxx 访问这里定义的计算状态
* 
*/

export default {
  name() { return 'WeApps' },
  value() {
    let { value, mode } = this.$WEAPPS_COMP.props.data
    if(typeof value === 'number'){
      let date = new Date(Number(value))
      let month = date.getMonth()+1
      let day = date.getDate()
      if(month<10){
        month = '0' + month
      }
      if(day<10){
        day = '0' + day
      }
      switch(mode){
        case 'day':
          return `${date.getFullYear()}-${month}-${day}`
        case 'month':
          return `${date.getFullYear()}-${month}`
        case 'year':
          return date.getFullYear()+''
        default:
          return value
      }
    }else {
      return value
    }
  }
};