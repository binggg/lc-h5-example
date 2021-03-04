import * as React from 'react';

export default props => {
  const { id, data, domRef } = props
  const { src } = data;

  return <div ref={domRef} id={id} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
    <iframe src={src} style={{
      width: '100%',
      height: '100%',
    }} frameBorder={0}/>
  </div>
}
