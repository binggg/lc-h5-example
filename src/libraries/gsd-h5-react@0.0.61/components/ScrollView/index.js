import * as React from "react";
import { ScrollView } from '@govcloud/gsd-h5-react';
import { WeAppsComp } from "../../lib/utils/weapp-comp";

export default WeAppsComp(ScrollView, {
  getProps: ({ emit }) => ({
    onLower: (e) => emit('scrolltolower', e),
    onScroll: (e) => emit('scroll', e.detail),
    onUpper: (e) => emit('scrolltoupper', e)
  })
})
