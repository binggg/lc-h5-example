import * as React from 'react';
import handleProps from '../../lib/utils/weapp-comp';

export default function (props) {
  const handledProps = handleProps(props,true)
  const { data: { mode }, style, emit } = props
  let h5Mode = '';
  switch (mode) {
    case 'scaleToFill':
      h5Mode = 'fill';
      break;
    case 'aspectFit':
      h5Mode = 'contain';
      break;
    case 'aspectFill':
      h5Mode = 'cover';
      break;
    default:
      h5Mode = 'fill';
  }
  const styles = { ...style, objectFit: h5Mode }

  // delete props for wx only

  const builtinProps = ['webp', 'lazyLoad', 'showMenuByLongpress']
  // delete builtin props
  builtinProps.map(prop => delete handledProps[prop])

  return <img
    {...handledProps}
    width={320}
    height={240}
    style={styles}
    onError={(v) => emit('error', v)}
  // onLoad={(v) => emit('load', { detail: v })}
  />

}
