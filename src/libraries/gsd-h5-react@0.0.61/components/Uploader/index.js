import * as React from "react";
import { Uploader } from '@govcloud/gsd-h5-react';
import { handleCommonEvent, handleFormEvent } from '../../lib/utils/handleEvent'
import { WeAppsComp } from "../../lib/utils/weapp-comp";

export default WeAppsComp(Uploader, {
  getProps: ({ emit }) => ({
    onChange: files => emit('change', handleCommonEvent('change', files)),
    onSuccess: (res, file) => emit('success', { res, file }),
    onError: (res, file) => emit('error', { res, file })
  })
})
