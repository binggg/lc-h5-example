import * as React from "react";
import { WeAppsComp } from "../../lib/utils/weapp-comp";

export default WeAppsComp('audio', {
  getChildren: ({ src }) => (<>
    <source src={src} type="audio/ogg" />
    <source src={src} type="audio/mpeg" />
    <source src={src} type="audio/wav" />
你的浏览器不支持audio标签</>),
  events: ['onPlay', 'onPause', 'onTimeUpdate', 'onEnded', 'onError']
})
