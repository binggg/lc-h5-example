import { app } from 'app/global-api'
      export default {
  onAttached() {
    if(!this.$WEAPPS_COMP.handler.isControlled()){
      this.$WEAPPS_COMP.state.selected = this.$WEAPPS_COMP.props.data.defaultValue
    }
    //console.log('---------> LifeCycle onAttached')
  },
  onDetached() {
    //console.log('---------> LifeCycle onDetached')
  },
};