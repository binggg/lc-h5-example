import * as React from 'react'
import './index.scss'
import { Swiper } from '@govcloud/gsd-h5-react'
import '@govcloud/gsd-h5-react/lib/components/Swiper/style/index.less';
import { WeAppsComp } from '../../lib/utils/weapp-comp';

export default WeAppsComp(Swiper, { events: ['onChange'] })

