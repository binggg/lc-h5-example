import * as React from 'react';
import { Button } from '@govcloud/gsd-h5-react';
import { WeAppsComp } from '../../lib/utils/weapp-comp'
import '@govcloud/gsd-h5-react/lib/components/Button/style/index.less';

export default WeAppsComp(Button, { getChildren: ({ text }) => text })
