import { app } from 'app/global-api'
      function ensureRadioGroup(comp) {
    if (!comp) {
        return true
    }

    return comp.getConfig().formControlType === "radio"
}

export default function getRadioGroup() {
    // 父节点为CheckboxGroup,受父节点控制,否则,使用自己props控制
    let cur = this.$WEAPPS_COMP.node
    while (!ensureRadioGroup(cur)) {
        cur = cur && cur.parent
    }
    if (!cur) {
        console.error("RadioItem 需要嵌套在 Radio 组件中使用")
    }
    return cur
};