import * as React from "react";
import './index.scss'

export default function ({ id, data, style, className, emit, children }) {
  const { src } = data
  return (
    <img
      id={id}
      className={`g-cover-image ${className}`}
      src={src}
      onLoad={(e) => emit('load', e)}
      onError={(e) => emit('error', e)}
      style={style}>
    </img>
  )
}

