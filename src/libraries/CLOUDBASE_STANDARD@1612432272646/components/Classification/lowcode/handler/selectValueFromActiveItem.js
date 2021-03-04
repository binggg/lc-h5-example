import { app } from 'app/global-api'
      
/*
* 可通过 this.$WEAPPS_COMP.handler.xxx 访问这里定义的方法
* 
* 如果需要 async-await，请修改成 export default async function() {}
*/

export default function (key) {
    let item = this.$WEAPPS_COMP.handler.findActiveItem()
    let path = key.split('.')
    let obj = item
    try {
        for (let key of path) {
            obj = obj[key]
        }
    }
    catch (e) {
        return undefined
    }

    return obj
};