import { app } from 'app/global-api'
      
/*
* 可通过 this.$WEAPPS_COMP.handler.xxx 访问这里定义的方法
* 
* 如果需要 async-await，请修改成 export default async function() {}
*/

export default function() {
    let {textSize, color, activeColor,actived} = this.$WEAPPS_COMP.props.data
    let style = {}
    if(textSize!=undefined){
        style['font-size'] = `${textSize}px`
    }
    style['color'] = actived?activeColor:color
    return style
};