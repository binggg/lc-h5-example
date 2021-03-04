import { EventProxy } from '../utils/eventProxy';

const hotAreaEventListeners = new EventProxy();

export function onHotArea(eventType, callback) {
  hotAreaEventListeners.on(eventType, callback);
}

export function emitHotArea(eventType, hotArea, instance, meta, global) {
  // eslint-disable-next-line
  const params = getHotAreaEventListenerCallbackParams(hotArea, instance, global, meta);
  hotAreaEventListeners.emit(eventType, params);
}

function getHotAreaEventListenerCallbackParams(
  { key, position, size },
  { key: componentKey, sourceKey },
  global,
  meta
) {
  return {
    global,
    meta,
    hotArea: {
      key,
      position,
      size,
    },
    sourceKey,
    componentKey
  };
}
