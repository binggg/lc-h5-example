import { app } from 'app/global-api'
      
/*
* 可通过 this.$WEAPPS_COMP.handler.xxx 访问这里定义的方法
* 
* 如果需要 async-await，请修改成 export default async function() {}
*/

export default function(e) {
    console.log(e)
    if(!this.$WEAPPS_COMP.handler.isControlled()){
        this.$WEAPPS_COMP.state.selected = e.data.target
    }
    
    return this.$WEAPPS_COMP.props.events.change(e)
};