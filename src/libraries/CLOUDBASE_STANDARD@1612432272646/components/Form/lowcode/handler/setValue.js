import { app } from 'app/global-api'
      
/*
* 可通过 this.$WEAPPS_COMP.handler.xxx 访问这里定义的方法
* 
* 如果需要 async-await，请修改成 export default async function() {}
*/

export default function (data) {
    const formItems = this.$WEAPPS_COMP.node.formItems
    if (!formItems || !data) return
    formItems.forEach(item => {
        if (!item || !item.getField) {
            console.error('表单组件缺少getField方法:', item)
            return
        }
        const { name } = item.getField();
        if (!item.setValue) {
            console.error('表单组件缺少setValue方法:', item)
            return
        }
        if (data.hasOwnProperty(name)) {
            const value = data[name]
            item.setValue(value);
        }
    })
};