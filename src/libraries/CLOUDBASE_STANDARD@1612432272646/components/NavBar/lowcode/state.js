import { app } from 'app/global-api'
      
/*
* 可通过 this.$WEAPPS_COMP.state.xxx 访问这里定义的状态
* 
* 修改状态时，直接赋值即可。如：this.$WEAPPS_COMP.state.xxx = 'xxx'
* 请注意：避免在页面处于后台状态时state，页面在后台时对全局state的修改会丢失！
*/



export default function() {
  return {
    ios: false,
    capsuleRectInfo:{
      width: 0,
      height: 0,
      right: 750
    },
    navBarHeight: 0,
    statusBarHeight: 0,
    titleBarHeight: 0,
    capsuleWidth: 0,
    capsuleHeight: 0,
  }
}

;