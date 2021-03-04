import { app } from 'app/global-api'
      
/*
* 可通过 this.$WEAPPS_COMP.computed.xxx 访问这里定义的计算状态
* 
*/

export default {
  columnList() { 
    let columnList = []
    let {columnRatio} = this.$WEAPPS_COMP.props.data
    try {
      columnList = columnRatio.split(':').map(str=>{
        try {
          let num = Number(str.trim())
          return isNaN(num)? 1: Math.min(num, 12); 
        }catch(e){
          return 1
        }
      })
    }catch(e){
      columnList=[12]
    }
    let list = columnList.map((num,index)=>{
      return {
        value: num,
        index: index
      }
    })
    return list
  }
};