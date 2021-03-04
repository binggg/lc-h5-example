import * as React from "react";
import { urlJoinParams } from "../../lib/utils/config";

function routerGo (path, action = 'push') {
  if (process.env.isApp) {
    location.hash = path
  }
  else {
    window._WEAPPS_HISTORY[action](path);
  }
}

export default function (props) {
  const { id, data, style, className, children, domRef, emit } = props;
  const { packageName, pageId, params, openType, delta, target = 'self', url, download } = data

  let selfUrl = packageName ? `${packageName}_${pageId}` : `${pageId}`

  if (target === 'self' && !selfUrl) console.error('请输入pageId')

  let path = selfUrl && urlJoinParams(selfUrl, params)

  // console.log('selfUrl',selfUrl,path)

  const handleClick = (e) => {
    if (target === 'self' && path) {
      switch (openType) {
        case 'navigateBack':
          let backDelta = -(delta || 1);
          history.go(backDelta);
          break;
        case 'navigate':
          routerGo(path, 'push')
          break;
        case 'redirect':
          routerGo(path, 'replace')
          break;
      }
    }
    // console.log(">>>", e)
    emit('tap', e)
  }

  const cls = `g-navigator ${className}`

  const href = target === 'url' ? url : 'javascript:void(0)';
  const targetPath = target === 'url' && !download ? '_blank' : '_self';

  return <a href={href}
            download={download}
            ref={domRef}
            target={targetPath}
            id={id}
            style={style}
            className={cls}
            onClick={handleClick}>
    {children}
  </a>
}
