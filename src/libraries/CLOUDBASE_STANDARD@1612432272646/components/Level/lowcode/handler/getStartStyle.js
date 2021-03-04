import { app } from 'app/global-api'
      
/*
* 可通过 this.$WEAPPS_COMP.handler.xxx 访问这里定义的方法
* 
* 如果需要 async-await，请修改成 export default async function() {}
*/

export default function() {
    const { startFlex, startWidth } = this.$WEAPPS_COMP.props.data;
    const startSlotStyle = {};

    if (
        startFlex && Object.prototype.toString.call(startFlex) === '[object String]'
    ) {
        startSlotStyle.flex =startFlex 
    }

    if (startWidth !== 'auto') {
        startSlotStyle['flex-basis'] = startWidth
    }
    return startSlotStyle
};