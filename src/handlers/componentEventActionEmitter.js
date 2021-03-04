const actionCallbackMap = new Map();

export function onComponentEventAction({ key }, iEventName, callback) {
  const eventName = `__weapps__component-event-${iEventName}`;
  const map = getCallbackMap(key);
  if (!map) {
    return actionCallbackMap.set(key, new Map([[eventName, [callback]]]));
  }

  const callbacks = map.get(eventName);
  if (!callbacks) {
    return map.set(eventName, [callback]);
  }

  callbacks.push(callback);
}

function getCallbackMap(componentKey) {
  return actionCallbackMap.get(componentKey);
}

export function getComponentEventActionCallbacks(componentKey, eventName) {
  const map = getCallbackMap(componentKey);
  if (!map) {
    return null;
  }

  return map.get(eventName);
}
