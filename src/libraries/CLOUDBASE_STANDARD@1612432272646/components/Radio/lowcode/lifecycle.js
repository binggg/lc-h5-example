import { app } from 'app/global-api'
      export default {
  onAttached() {
    //console.log('---------> LifeCycle onAttached')
  },
  onDetached() {
    //console.log('---------> LifeCycle onDetached')
  },
  onReady() {
    this.$WEAPPS_COMP.node.toggleOption = (checkValue) => {
      const { change } = this.$WEAPPS_COMP.props.events
      change({
        value: checkValue
      })
      this.$WEAPPS_COMP.node.onChange && this.$WEAPPS_COMP.node.onChange()
    }
  }
};