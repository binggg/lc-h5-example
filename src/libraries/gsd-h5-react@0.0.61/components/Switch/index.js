import * as React from 'react';
import { Switch } from '@govcloud/gsd-h5-react';
import '@govcloud/gsd-h5-react/lib/components/Switch/style/index.less';
import { handleFormEvent } from "../../lib/utils/handleEvent";
import { WeAppsComp } from '../../lib/utils/weapp-comp';

export default WeAppsComp(Switch, {
  getProps: ({ emit }) => ({
    onChange: v => emit('change', handleFormEvent('change', v))
  })
})
