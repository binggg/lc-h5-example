import { app } from 'app/global-api'
      
/*
* 可通过 this.$WEAPPS_COMP.handler.xxx 访问这里定义的方法
* 
* 如果需要 async-await，请修改成 export default async function() {}
*/

export default function () {
    const { value } = this.$WEAPPS_COMP.props.data
    const disabled = this.$WEAPPS_COMP.computed.getDisabled
    if (!disabled) {
        const radioGroup = this.$WEAPPS_COMP.handler.getRadioGroup()
        radioGroup && radioGroup.toggleOption(value)
    }
};