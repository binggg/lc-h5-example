import * as React from "react";
import { GlMap } from '@govcloud/gsd-h5-react';
import { WeAppsComp } from "../../lib/utils/weapp-comp";

export default WeAppsComp(GlMap, {
  events: ['onMarkerTap', 'onLabelTap','onUpdated','onRegionChange'],
})

