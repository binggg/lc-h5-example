import { app } from 'app/global-api'
      export default {
  onAttached() {
    let info = this.$WEAPPS_COMP.handler.getSystemInfo()
    this.$WEAPPS_COMP.ios = info.ios
    this.$WEAPPS_COMP.state.capsuleRectInfo = info.capsuleRectInfo
    this.$WEAPPS_COMP.state.navBarHeight = info.navBarHeight
    this.$WEAPPS_COMP.state.titleBarHeight = info.titleBarHeight
    this.$WEAPPS_COMP.state.statusBarHeight = info.statusBarHeight

    this.$WEAPPS_COMP.state.capsuleWidth = info.capsuleRectInfo.width
    this.$WEAPPS_COMP.state.capsuleHeight = info.capsuleRectInfo.height
    //console.log('---------> LifeCycle onAttached')
  },
  onDetached() {
    //console.log('---------> LifeCycle onDetached')
  },
};