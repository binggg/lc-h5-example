import { app } from 'app/global-api'
      
/*
* 可通过 this.$WEAPPS_COMP.handler.xxx 访问这里定义的方法
* 
* 如果需要 async-await，请修改成 export default async function() {}
*/

export default function() {
    const {gutter,reverse,flexWrap,alignItems,justifyContent} = this.$WEAPPS_COMP.props.data
    let classList = []

    if(flexWrap){
        classList.push('lcap-flex-wrap-nowrap')
    }

    if(alignItems) {
        classList.push(`lcap-align-items-${alignItems}`)
    }

    if (justifyContent) {
        classList.push(`lcap-justify-content-${justifyContent}`);
    }

    if (reverse) {
        classList.push('lcap-flex-row-reverse');
    }
    return classList
};