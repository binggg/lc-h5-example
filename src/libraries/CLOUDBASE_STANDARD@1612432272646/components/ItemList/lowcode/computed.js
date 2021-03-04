import { app } from 'app/global-api'
      
/*
* 可通过 this.$WEAPPS_COMP.computed.xxx 访问这里定义的计算状态
* 
*/

export default {
  list() { 
    return (this.$WEAPPS_COMP.props.data.list||[]).map((item, index)=>{
      return {
        index,
        item
      }
    })
  }
};