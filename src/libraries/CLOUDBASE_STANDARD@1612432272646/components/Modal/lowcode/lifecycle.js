import { app } from 'app/global-api'
      export default {
  onAttached() {
    this.$WEAPPS_COMP.state._lastVisible = this.$WEAPPS_COMP.props.data.visible
    this.$WEAPPS_COMP.state.contentIn = this.$WEAPPS_COMP.props.data.visible
    //console.log('---------> LifeCycle onAttached')
  },
  onDetached() {
    //console.log('---------> LifeCycle onDetached')
  },
};