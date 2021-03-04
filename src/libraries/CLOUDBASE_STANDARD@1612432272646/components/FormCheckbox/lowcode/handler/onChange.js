import { app } from 'app/global-api'
      
/*
* 可通过 this.$WEAPPS_COMP.handler.xxx 访问这里定义的方法
* 
* 如果需要 async-await，请修改成 export default async function() {}
*/

export default function(evt) {
    const { change } = this.$WEAPPS_COMP.props.events
    change && change(evt.event.detail)
    this.$WEAPPS_COMP.node.onChange && this.$WEAPPS_COMP.node.onChange()
};