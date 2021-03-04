import * as React from 'react';
import { WeAppsComp } from '../../lib/utils/weapp-comp';


export default WeAppsComp('label', {
  getProps (props) {
    return { 'htmlFor': props.data.for }
  }
})
