import { app } from 'app/global-api'
      
/*
* 可通过 this.$WEAPPS_COMP.handler.xxx 访问这里定义的方法
* 
* 如果需要 async-await，请修改成 export default async function() {}
*/

export default function () {
    const formItems = this.$WEAPPS_COMP.node.formItems
    if (!formItems) return
    // //console.log("formItem", formItem)
    let formData = {}
    formItems.forEach(item => {
        if (!item || !item.reset) {
            console.error('表单组件缺少reset方法:', item)
            return
        }
        item.reset();
        const { name, value } = item.getField();
        //console.log("reset:formData", name, value)
        formData[name] = value
    })
    // //console.log("reset:formData", formData)
    return formData
};