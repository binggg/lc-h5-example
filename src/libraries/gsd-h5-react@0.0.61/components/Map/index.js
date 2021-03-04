import * as React from "react";
import { Map } from '@govcloud/gsd-h5-react';
import { WeAppsComp } from "../../lib/utils/weapp-comp";

export default WeAppsComp(Map, {
  events: ['onMarkerTap', 'onLabelTap'],
  getProps: ({ data, emit }) => ({
    render: (e) => emit('updated', e)
  })
})

