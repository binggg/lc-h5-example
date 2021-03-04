import * as React from "react";
import ad from './ad.png'

export default function ({ id, data, style, className, emit, children }) {
  return (
    <img src={ad} alt="图片" style={{display: 'block', width: '100%',...style}} className={className}/>
  );
}
