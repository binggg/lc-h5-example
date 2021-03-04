import { app } from 'app/global-api'
      
/*
* 可通过 this.$WEAPPS_COMP.handler.xxx 访问这里定义的方法
* 
* 如果需要 async-await，请修改成 export default async function() {}
*/

export default function () {
    // const { value, checked } = this.$WEAPPS_COMP.props.data
    // const checkboxGroup = this.$WEAPPS_COMP.handler.getCheckboxGroup()
    // if (checkboxGroup) {
    //     const checkedValues = checkboxGroup.value || []
    //     return checkedValues.includes(value);
    // }
    // return checked
    const { value } = this.$WEAPPS_COMP.props.data
    const checkboxGroup = this.$WEAPPS_COMP.handler.getCheckboxGroup()
    const checkedValues = checkboxGroup.value ? checkboxGroup.value : []
    return checkedValues.includes(value);
};