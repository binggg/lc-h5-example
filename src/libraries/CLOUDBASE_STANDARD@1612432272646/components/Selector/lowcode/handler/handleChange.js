import { app } from 'app/global-api'
      
/*
* 可通过 this.$WEAPPS_COMP.handler.xxx 访问这里定义的方法
* 
* 如果需要 async-await，请修改成 export default async function() {}
*/

export default function ({ event }) {
    // //console.log("change----", event)
    const index = event.detail.value
    const { range } = this.$WEAPPS_COMP.props.data
    const item = range[parseInt(index)]
    // //console.log("item----", item)
    const { change } = this.$WEAPPS_COMP.props.events
    change({ value: item.value })
    this.$WEAPPS_COMP.node.onChange && this.$WEAPPS_COMP.node.onChange()
};