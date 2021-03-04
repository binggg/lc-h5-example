import * as React from 'react';
import { Input } from '@govcloud/gsd-h5-react';
import '@govcloud/gsd-h5-react/lib/components/Input/style/index.less';
import { handleFormEvent } from '../../lib/utils/handleEvent'
import { WeAppsComp } from '../../lib/utils/weapp-comp';

export default WeAppsComp(Input, {
  getProps: ({ emit }) => ({
    onChange: v => emit('input', handleFormEvent('input', v)),
    onBlur: v => emit('blur', handleFormEvent('blur', v)),
    onFocus: v => emit('focus', handleFormEvent('focus', v)),
    onConfirm: v => emit('confirm', handleFormEvent('confirm', v))
  })
})
