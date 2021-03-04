import * as React from "react";

export default function (props) {
  const { id, data, style, className, emit, children } = props;
  return (
    <div id={id} style={style} className={className}>
      {children}
    </div>
  );
}
