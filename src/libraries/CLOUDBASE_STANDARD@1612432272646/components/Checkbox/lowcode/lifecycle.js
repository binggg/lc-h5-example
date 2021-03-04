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

    this.$WEAPPS_COMP.node.toggleOption = (itemValue) => {
      const { value } = this.$WEAPPS_COMP.props.data
      const index = value.findIndex(item => item === itemValue)
      const _values = [...value]
      if (index === -1) {
        _values.push(itemValue)
      }
      if (index > -1) _values.splice(index, 1)
      // //console.log("checkboxGroup---", _values)
      const { change } = this.$WEAPPS_COMP.props.events
      change && change({
        value: _values
      })
      this.$WEAPPS_COMP.node.onChange && this.$WEAPPS_COMP.node.onChange()
    }
  }
};