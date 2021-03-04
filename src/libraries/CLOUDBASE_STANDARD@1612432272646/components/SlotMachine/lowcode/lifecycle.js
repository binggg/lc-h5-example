import { app } from 'app/global-api'
      export default {
  onAttached() {
    this.$WEAPPS_COMP.state.start = this.$WEAPPS_COMP.props.data.start
    this.$WEAPPS_COMP.state.reset = this.$WEAPPS_COMP.props.data.reset
    this.$WEAPPS_COMP.state.items = this.$WEAPPS_COMP.props.data.items.map(item=>{
      return {
        translate: 0,
        ...item,
      }
    })    
    //console.log('---------> LifeCycle onAttached')
  },
  onDetached() {
    //console.log('---------> LifeCycle onDetached')
  },
};