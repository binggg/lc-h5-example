import { app } from 'app/global-api'
      
/*
* 可通过 this.$WEAPPS_COMP.handler.xxx 访问这里定义的方法
* 
* 如果需要 async-await，请修改成 export default async function() {}
*/

export default function({event}) {
    let value = event.detail
    let { route, routeType } = this.$WEAPPS_COMP.props.data
    if(route){
        let action = app[routeType] || app.navigateTo
        action({pageId: value})
    } else {
        this.$WEAPPS_COMP.props.events.change(value)
    }
};