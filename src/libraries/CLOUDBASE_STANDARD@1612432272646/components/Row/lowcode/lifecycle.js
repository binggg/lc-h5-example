import { app } from 'app/global-api'
      export default {
  onAttached() {
    console.log('===',this.$WEAPPS_COMP.widgets.id3.widgets)
    //console.log('---------> LifeCycle onAttached')
  },
  onDetached() {
    //console.log('---------> LifeCycle onDetached')
  },
};