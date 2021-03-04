import * as React from "react";
import Official from './official.png'

export default function ({ id, data, style, className, emit, children }) {
  return <img src={Official} id={id} className={className} alt="图片"
              style={{ display: 'block', width: '100%', ...style }}/>
}
