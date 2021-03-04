import './index.scss';
import * as React from 'react';

export function Loading({ text, style = {} }) {
  return (
    <div className="fudao_loading" style={style}>
      {text || 'loading...'}
    </div>
  );
}
