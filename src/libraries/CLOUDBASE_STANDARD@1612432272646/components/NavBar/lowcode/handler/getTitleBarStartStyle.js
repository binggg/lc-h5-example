import { app } from 'app/global-api'
      
/*
* 可通过 this.$WEAPPS_COMP.handler.xxx 访问这里定义的方法
* 
* 如果需要 async-await，请修改成 export default async function() {}
*/

export default function() {
    let {back,home,title} = this.$WEAPPS_COMP.props.data
    let {capsuleRectInfo} = this.$WEAPPS_COMP.state
    let style = {
        height: `${ this.$WEAPPS_COMP.state.capsuleRectInfo.height}px`
    }

    if(!home && !back && !title){
        style.width = 'auto'
    }else {
        style.width = `${capsuleRectInfo.width + 750 - capsuleRectInfo.right}px`
    }
    return style
};