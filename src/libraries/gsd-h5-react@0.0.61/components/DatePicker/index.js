import * as React from "react";
import { DatePicker } from '@govcloud/gsd-h5-react';
import '@govcloud/gsd-h5-react/lib/components/Picker/style/index.less';
import { handleFormEvent } from "../../lib/utils/handleEvent";
import { WeAppsComp } from "../../lib/utils/weapp-comp";

export default WeAppsComp(DatePicker, {
  events: ['onCancel'], getProps: ({ emit }) => ({
    onChange: v => emit('change', handleFormEvent('change', v))
  })
})
