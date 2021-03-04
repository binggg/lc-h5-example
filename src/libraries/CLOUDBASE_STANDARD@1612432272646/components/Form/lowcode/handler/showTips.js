import { app } from 'app/global-api'
      
/*
* 可通过 this.$WEAPPS_COMP.handler.xxx 访问这里定义的方法
* 
* 如果需要 async-await，请修改成 export default async function() {}
*/

export default function (message) {
    this.$WEAPPS_COMP.state._tipsShow = true
    this.$WEAPPS_COMP.state._tipsInfo = message
    setTimeout(() => {
        this.$WEAPPS_COMP.state._tipsShow = false
        this.$WEAPPS_COMP.state._tipsInfo = ''
    }, 3000);
};