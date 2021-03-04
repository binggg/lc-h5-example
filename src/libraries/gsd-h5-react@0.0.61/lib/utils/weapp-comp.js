import * as React from "react";
import { handleCaptureEvent } from './handleEvent'

export default function handleProps({ id, className, style, domRef, emit, data }, isBasicElement) {
  const timer = React.useRef()
  const handleTouchStart = (e) => {
    // console.log("handleTouchStart")
    emit('touchstart', e)
    timer.current = setTimeout(handleLongPress, 350)
  };
  const handleTouchMove = (e) => {
    emit('touchmove', e)
    // console.log("handleTouchMove")
    clearTimeout(timer.current);
  };
  const handleTouchEnd = (e) => {
    // console.log("handleTouchEnd")
    emit('touchend', e)
    clearTimeout(timer.current);
  };
  const handleLongPress = () => {
    // console.log("handleLongPress")
    emit('longpress')
  };
  const refProp = isBasicElement ? 'ref' : 'domRef'

  const customProps = { ...data }

  const builtinProps = ['children', '_parentId', '_visible', 'classList', 'widgetType', 'getWidgetsByType', 'getDom', 'domRef', 'extends']
  // delete builtin props
  builtinProps.map(prop => delete customProps[prop])

  return {
    ...customProps,
    id,
    className,
    style,
    [refProp]: domRef,
    // WXML的冒泡事件列表: https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html
    onClick: e => emit('tap', e),
    onClickCapture: e => emit('tap', handleCaptureEvent(e)),
    onTouchStart: handleTouchStart,
    onTouchStartCapture: e => emit('touchstart', handleCaptureEvent(e)),
    onTouchMove: handleTouchMove,
    onTouchMoveCapture: e => emit('touchmove', handleCaptureEvent(e)),
    onTouchCancel: e => emit('touchcancel', e),
    onTouchCancelCapture: e => emit('touchcancel', handleCaptureEvent(e)),
    onTouchEnd: handleTouchEnd,
    onTouchEndCapture: e => emit('touchend', handleCaptureEvent(e)),
  }
}

/**
 * HOC component
 * @param {*} BaseComp
 * @param {*} getChildren
 */
export function WeAppsComp(BaseComp, { getChildren, events = [], getProps = () => ({}) } = {}) {

  return function (props) {
    const { data, emit, children } = props

    if(typeof BaseComp === 'function'){
      if(BaseComp.name === 'Swiper'){
        console.log("props",props)
      }
    }

    return <BaseComp
      {...handleProps(props, typeof BaseComp === 'string')}
      {...handleEventProps(events, emit)}
      {...getProps(props)}>{getChildren ? getChildren(data) : children}</BaseComp>
  }
}

function handleEventProps(events, emit) {
  const eventProps = {}
  for (const evt of events) {
    const propName = evt
    const evtName = propName.substr(2).toLowerCase()
    eventProps[propName] = (e) => emit(evtName, e)
  }
  return eventProps
}
