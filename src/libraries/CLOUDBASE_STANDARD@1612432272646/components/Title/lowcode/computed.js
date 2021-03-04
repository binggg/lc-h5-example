import { app } from 'app/global-api'
      
/*
* 可通过 this.$WEAPPS_COMP.computed.xxx 访问这里定义的计算状态
* 
*/

export default {
  // css 样式 level
  level() { return `level_${this.$WEAPPS_COMP.props.data.level}` }
};