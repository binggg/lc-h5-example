import { app } from 'app/global-api'
      
/*
* 可通过 this.$WEAPPS_COMP.computed.xxx 访问这里定义的计算状态
* 
*/

export default {
  tipsShow() {
    const { tipsShow = false } = this.$WEAPPS_COMP.props.data
    const { _tipsShow } = this.$WEAPPS_COMP.state
    // //console.log("tipsShow", tipsShow, _tipsShow)
    return tipsShow && _tipsShow
  }
};