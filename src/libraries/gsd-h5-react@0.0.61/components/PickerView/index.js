import * as React from 'react';
import { PickerView } from '@govcloud/gsd-h5-react';
import '@govcloud/gsd-h5-react/lib/components/PickerView/style/index.less';
import { WeAppsComp } from '../../lib/utils/weapp-comp';
import { handleFormEvent } from "../../lib/utils/handleEvent";

export default WeAppsComp(PickerView,
  {
    events: ['onPickStart', 'onPickEnd'],
    getProps: ({ emit }) => ({
      onChange: v => emit('change', handleFormEvent('change', v)),
    })
  })
