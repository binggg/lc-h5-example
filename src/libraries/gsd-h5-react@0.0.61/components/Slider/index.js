import * as React from 'react';
import { Slider } from '@govcloud/gsd-h5-react';
import '@govcloud/gsd-h5-react/lib/components/Slider/style/index.less';
import { handleFormEvent } from "../../lib/utils/handleEvent";

export default function ({ id, data, style, className, emit, domRef }) {
  return <Slider id={id}
                 domRef={domRef}
                 style={style}
                 className={className}
                 {...data}
                 onChange={(v) => emit('change', handleFormEvent('change', v))}
                 onChanging={(v) => emit('changing', handleFormEvent('changing', v))}/>
}

