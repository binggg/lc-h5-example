import * as React from 'react';
import { Textarea } from '@govcloud/gsd-h5-react';
import '@govcloud/gsd-h5-react/lib/components/Textarea/style/index.less';
import { handleFormEvent } from "../../lib/utils/handleEvent";

export default props => {
  const { id, data, style, className, emit, domRef } = props;

  return <Textarea
    id={id}
    domRef={domRef}
    {...data}
    style={style}
    className={className}
    onChange={(v) => emit('input', handleFormEvent('input', v))}
    onBlur={(v) => emit('blur', handleFormEvent('blur', v))}
    onFocus={(v) => emit('focus', handleFormEvent('blur', v))}
  />
};
