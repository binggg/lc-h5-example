import * as React from "react";
import { Region } from '@govcloud/gsd-h5-react';
import '@govcloud/gsd-h5-react/lib/components/Picker/style/index.less';
import { handleFormEvent }  from "../../lib/utils/handleEvent";


export default props => {
  const { id, data, style, className, emit, children } = props;

  const { name, mode = 'region', value, disabled } = data;

  return <Region
    id={id}
    className={className}
    mode={mode}
    name={name}
    style={style}
    disabled={disabled}
    value={value}
    onChange={v => emit('change', handleFormEvent('change', v))}
    onCancel={v => emit('cancel', v)}
  >
    {children}
  </Region>
}

