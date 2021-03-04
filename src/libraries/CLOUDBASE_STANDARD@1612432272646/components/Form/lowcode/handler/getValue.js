import { app } from 'app/global-api'
      
/*
* 可通过 this.$WEAPPS_COMP.handler.xxx 访问这里定义的方法
* 
* 如果需要 async-await，请修改成 export default async function() {}
*/

export default function () {
    const formItems = this.$WEAPPS_COMP.node.formItems
    const formData = {}
    if (!formItems) return formData
    formItems.forEach(item => {
        if (!item || !item.getField) {
            console.error('表单组件缺少getField方法:', item)
            return 
        }
        const { name, value } = item.getField();
        formData[name] = value
    })
    return formData
}

;