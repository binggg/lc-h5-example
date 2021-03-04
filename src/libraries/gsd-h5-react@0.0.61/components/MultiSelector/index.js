import * as React from "react";
import { MultiSelector } from '@govcloud/gsd-h5-react';
import '@govcloud/gsd-h5-react/lib/components/Picker/style/index.less';
import { handleFormEvent } from "../../lib/utils/handleEvent";


export default props => {
  const { id, data, style, className, emit, children } = props;

  const { name, mode = 'multiSelector', value, range, rangeKey, disabled } = data;

  // console.log("multiSelector-----", data)

  return <MultiSelector
    id={id}
    mode={mode}
    className={className}
    name={name}
    style={style}
    disabled={disabled}
    value={value || []}
    range={range || []}
    rangeKey={rangeKey}
    onChange={v => emit('change', handleFormEvent('change', v))}
    onCancel={v => emit('cancel', v)}
    onColumnChange={(column, value) => emit('columnchange', { type: 'columnchange', column, value })}
  >
    {children}
  </MultiSelector>
}

