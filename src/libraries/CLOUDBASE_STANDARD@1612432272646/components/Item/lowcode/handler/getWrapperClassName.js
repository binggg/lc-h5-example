import { app } from 'app/global-api'
      
/*
* 可通过 this.$WEAPPS_COMP.handler.xxx 访问这里定义的方法
* 
* 如果需要 async-await，请修改成 export default async function() {}
*/

export default function() {
    let classList = []
    let {title,description,bordered,'is-clickable': isClickable} = this.$WEAPPS_COMP.props.data
    if(title && description){
        classList.push('size-lg');
    }else {
        classList.push('size-auto')
    }
    if(bordered){
        classList.push('lcap-hairline--bottom')
    }

    if(isClickable) {
        classList.push('is-clickable')
    }

    return classList

};