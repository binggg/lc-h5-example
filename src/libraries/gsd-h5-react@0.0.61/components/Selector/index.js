import * as React from "react";
import { Selector } from '@govcloud/gsd-h5-react';
import '@govcloud/gsd-h5-react/lib/components/Picker/style/index.less';
import { handleFormEvent } from "../../lib/utils/handleEvent";


export default props => {
  const { id, data, style, className, emit, children } = props;

  const { name, mode = 'selector', value = 0, range = [], rangeKey, disabled } = data;
  // console.log("selector----", data)

  return <Selector
    id={id}
    mode={mode}
    className={className}
    name={name}
    style={style}
    disabled={disabled}
    value={value === null || !value ? 0 : value}
    range={range || []}
    rangeKey={rangeKey}
    onChange={v => emit('change', handleFormEvent('change', v))}
    onCancel={v => emit('cancel', v)}>
    {children}
  </Selector>
}

