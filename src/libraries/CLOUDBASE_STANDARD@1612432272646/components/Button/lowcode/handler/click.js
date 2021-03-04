import { app } from 'app/global-api'
      
/*
* 可通过 this.$WEAPPS_COMP.handler.xxx 访问这里定义的方法
* 
* 如果需要 async-await，请修改成 export default async function() {}
*/

export default function () {
  const { formType = 'button' } = this.$WEAPPS_COMP.props.data
  const { tap } = this.$WEAPPS_COMP.props.events
  // //console.log("click", formType, event)
  let formEle;
  switch (formType) {
    case 'submit':
      formEle = this.$WEAPPS_COMP.handler.getForm()
      formEle && formEle.submit()
      break;
    case 'reset':
      formEle = this.$WEAPPS_COMP.handler.getForm()
      formEle && formEle.reset()
      break
    default:
      tap()
  }
};