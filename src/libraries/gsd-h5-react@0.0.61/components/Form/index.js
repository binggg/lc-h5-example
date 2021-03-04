import * as React from 'react';
import { Form } from '@govcloud/gsd-h5-react'
import { handleFormEvent } from "../../lib/utils/handleEvent";
import { WeAppsComp } from '../../lib/utils/weapp-comp';

export default WeAppsComp(Form, {
  events: ['onReset'], getProps: ({ emit }) => ({
    onSubmit: (v) => emit('submit', handleFormEvent('submit', v))
  })
})
