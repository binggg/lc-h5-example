import { app } from 'app/global-api'
      
/*
* 可通过 this.$WEAPPS_COMP.handler.xxx 访问这里定义的方法
* 
* 如果需要 async-await，请修改成 export default async function() {}
*/

function ensureForm(comp) {
    if (!comp) {
        return true
    }
    return comp.getConfig && comp.getConfig().componentType === 'form'
}

export default function () {
    let cur = this.$WEAPPS_COMP.node
    while (!ensureForm(cur)) {
        if (!cur) return null
        if (cur.parent) {
            cur = cur.parent
        } else {
            cur = cur.getOwnerWidget()
        }
    }
    return cur
};