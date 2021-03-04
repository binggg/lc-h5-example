import * as React from 'react';
import handleProps from '../../lib/utils/weapp-comp';
import "./index.scss"

function Text(props) {
  const { text = '', decode } = props.data;

  const handledProps = handleProps(props, true)
  // delete props for wx only
  delete handledProps.selectable
  delete handledProps.decode

  return (decode ? <span
    {...handledProps}
    dangerouslySetInnerHTML={{
      __html: String(text).replace(/[\n\r]/g, '<br/>')
    }} />
    : <span {...handledProps}>{text + ''}</span>)
}

export default Text;
