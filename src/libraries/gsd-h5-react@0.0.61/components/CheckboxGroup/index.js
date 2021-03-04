import * as React from 'react';
import { CheckboxGroup } from '@govcloud/gsd-h5-react';
import { handleFormEvent } from "../../lib/utils/handleEvent";
import { WeAppsComp } from '../../lib/utils/weapp-comp';

export default WeAppsComp(CheckboxGroup, { getProps: ({ emit }) => ({ onChange: (v) => emit('change', handleFormEvent('change', v)) }) })
