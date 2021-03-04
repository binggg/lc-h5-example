import { app } from 'app/global-api'
      export default {
  onAttached() {
    this.$WEAPPS_COMP._defaultValue = this.$WEAPPS_COMP.props.data.value
    //console.log('---------> LifeCycle onAttached')
  },
  onDetached() {
    //console.log('---------> LifeCycle onDetached')
  },
  onReady() {

  }
};