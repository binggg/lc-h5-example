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
    let validatePromise = []
    let validateKey = []
    let formData = {}
    formItems.forEach(item => {
      if (!item) return
      if (item.validate) {
         const validate = item.validate()
         const { name, value } = item.getField();
         if (validate) {
               validatePromise.push(validate)
               validateKey.push(name)
         }
         formData[name] = value
      }
    })
    // //console.log("result---", formData, validatePromise)
    return Promise.all(validatePromise).then(errorArr => {
      const errObj = {}
      errorArr = errorArr.filter((item, index) => {
         if (item.length) {
            errObj[validateKey[index]] = item
         }
         return item.length
      })
      if (Object.keys(errObj).length) {
         console.error(errObj)
         // //console.log(">>>>>>", errorArr)
         this.$WEAPPS_COMP.handler.showTips(errorArr[0][0].message)
         throw errObj
      }
   })
};