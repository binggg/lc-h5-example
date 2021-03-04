import * as React from "react";
import { TimePicker } from '@govcloud/gsd-h5-react';
import '@govcloud/gsd-h5-react/lib/components/Picker/style/index.less';
import { handleFormEvent } from "../../lib/utils/handleEvent";
import { WeAppsComp } from "../../lib/utils/weapp-comp";

export default WeAppsComp(TimePicker, {
  getProps: ({ emit, data: { mode = 'time' } }) => ({
    onChange: v => emit('change', handleFormEvent('change', v)),
    onCancel: v => emit('cancel', v),
    mode
  })
})
