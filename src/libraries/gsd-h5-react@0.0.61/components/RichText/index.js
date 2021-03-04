import * as React from 'react';
import handleProps from '../../lib/utils/weapp-comp';
import './index.scss';

function RichText(props) {
  const { className, data: { nodes } } = props
  const handledProps = handleProps(props, true)
  return (
    <div
      {...handledProps}
      className={`gsd-rich-text-weapps ${className}`}
      dangerouslySetInnerHTML={{ __html: nodes }} />
  );
}

export default RichText;
