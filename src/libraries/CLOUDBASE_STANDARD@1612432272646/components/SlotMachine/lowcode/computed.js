import { app } from 'app/global-api'
      
/*
* 可通过 this.$WEAPPS_COMP.computed.xxx 访问这里定义的计算状态
* 
*/

export default {
  start() { 
    if(this.$WEAPPS_COMP.state.start!== undefined && this.$WEAPPS_COMP.state.start !== this.$WEAPPS_COMP.props.data.start){

      this.$WEAPPS_COMP.state.start = this.$WEAPPS_COMP.props.data.start
      if(this.$WEAPPS_COMP.props.data.start){
        this.$WEAPPS_COMP.state.items = this.$WEAPPS_COMP.state.items.map((item,index)=>{
          item.value = this.$WEAPPS_COMP.props.data.items[index].value
          return item
        })

        this.$WEAPPS_COMP.handler.start()
      }
    }
    return this.$WEAPPS_COMP.props.data.start
  },
  reset() {
    if(this.$WEAPPS_COMP.state.reset !== undefined && this.$WEAPPS_COMP.state.reset !== this.$WEAPPS_COMP.props.data.reset) {
      this.$WEAPPS_COMP.state.reset = this.$WEAPPS_COMP.props.data.reset
      if(this.$WEAPPS_COMP.props.data.reset) {
        this.$WEAPPS_COMP.handler.reset()
      }
    }
    console.log( this.$WEAPPS_COMP.props.data.reset)
    return this.$WEAPPS_COMP.props.data.reset
  }
};