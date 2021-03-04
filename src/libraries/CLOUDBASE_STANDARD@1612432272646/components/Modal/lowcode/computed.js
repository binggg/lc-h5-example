import { app } from 'app/global-api'
      
/*
* 可通过 this.$WEAPPS_COMP.computed.xxx 访问这里定义的计算状态
* 
*/

export default {
    contentIn() {
        let visible = this.$WEAPPS_COMP.props.data.visible
        if (this.$WEAPPS_COMP.state._lastVisible !== visible) {
            this.$WEAPPS_COMP.state._lastVisible = visible
            if (visible) {
                setTimeout(()=>{
                    this.$WEAPPS_COMP.state.contentIn = visible
                })
            }
            else if(!visible){
                setTimeout(()=>{
                    this.$WEAPPS_COMP.state.contentIn = false
                }, 300)
            }
        }

        return this.$WEAPPS_COMP.state.contentIn
    }
};