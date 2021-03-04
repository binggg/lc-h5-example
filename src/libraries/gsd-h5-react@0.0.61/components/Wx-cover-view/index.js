import * as React from "react";

export default function ({ id, data, style, className, emit, children }) {
  const { text } = data
  return (
    <div
      id={id}
      className={className}
      style={style}>
      {text}
      {children}
    </div>
  )
}

