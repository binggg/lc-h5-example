import { app } from 'app/global-api'
      
/*
* 可通过 this.$WEAPPS_COMP.handler.xxx 访问这里定义的方法
* 
* 如果需要 async-await，请修改成 export default async function() {}
*/

function ensureCheckboxGroup(comp) {
    if (!comp) {
        return true
    }

    return comp.getConfig().formControlType === "checkbox"
}

export default function getCheckboxGroup() {
    // 父节点为CheckboxGroup,受父节点控制,否则,使用自己props控制
    let cur = this.$WEAPPS_COMP.node
    while (!ensureCheckboxGroup(cur)) {
        cur = cur && cur.parent
    }
    if (!cur) {
        console.error("CheckboxItem 需要嵌套在 Checkbox 组件中使用")
    }
    return cur
};