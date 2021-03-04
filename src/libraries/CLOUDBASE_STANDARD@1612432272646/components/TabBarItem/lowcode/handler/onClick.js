import { app } from 'app/global-api'
      
/*
* 可通过 this.$WEAPPS_COMP.handler.xxx 访问这里定义的方法
* 
* 如果需要 async-await，请修改成 export default async function() {}
*/

export default function() {
    let {actived,name,circle} = this.$WEAPPS_COMP.props.data
    if(this.$WEAPPS_COMP.props.data.actived) {
        return
    }

    if(circle){
        this.$WEAPPS_COMP.props.events.click(name)
    }else {
        this.$WEAPPS_COMP.props.events.click(name)
    }

};