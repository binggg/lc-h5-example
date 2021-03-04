import * as React from 'react';
import { Progress } from '@govcloud/gsd-h5-react';
import '@govcloud/gsd-h5-react/lib/components/Progress/style/index.less';
import { WeAppsComp } from '../../lib/utils/weapp-comp';

export default WeAppsComp(Progress, { events: ['onActiveEnd'] })
