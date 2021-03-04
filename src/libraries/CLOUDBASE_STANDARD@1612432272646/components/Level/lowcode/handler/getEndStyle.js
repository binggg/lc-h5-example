import { app } from 'app/global-api'
      
/*
* 可通过 this.$WEAPPS_COMP.handler.xxx 访问这里定义的方法
* 
* 如果需要 async-await，请修改成 export default async function() {}
*/

export default function() {
    const {  endFlex,  endWidth } = this.$WEAPPS_COMP.props.data
      const endSlotStyle = {};
    if (
        endFlex
				&& Object.prototype.toString.call(endFlex) === '[object String]'
      ) {
        endSlotStyle.flex =endFlex;
      }
      if (endWidth !== 'auto') {
        endSlotStyle[`flex-basis`] = endWidth;
      }
      return endSlotStyle
};