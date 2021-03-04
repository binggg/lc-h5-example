import * as React from "react";
// import { WxMovableView } from '@govcloud/gsd-h5-react';

export default function ({ id, data, style, className, emit, children }) {
  return (
    <div id={id} style={style}
         className={className}
         onChange={() => emit('change', value)}
         onScale={() => emit('scale', value)}>
      {children}
    </div>
  );
}

