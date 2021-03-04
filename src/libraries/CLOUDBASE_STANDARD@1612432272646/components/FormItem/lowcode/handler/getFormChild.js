import { app } from 'app/global-api'
      
/*
* 可通过 this.$WEAPPS_COMP.handler.xxx 访问这里定义的方法
* 
* 如果需要 async-await，请修改成 export default async function() {}
*/

export default function () {
    if (!this.$WEAPPS_COMP.node) return
    // 查找作为容器子元素
    const formChild = this.$WEAPPS_COMP.node.findWidgets(w => isFormControl(w))

    if (!formChild.length || formChild.length > 1) {
        console.error(`FormItem ${this.$WEAPPS_COMP.node.id} 中必须有且只有一个 表单元素`)
    }
    // console.log("formChild>>>>>>", this.$WEAPPS_COMP.node, formChild)
    return formChild.length ? formChild[0] : undefined
}


function isFormControl (w) {
    return w && w.getConfig && w.getConfig().componentType === 'formControl'
}
;