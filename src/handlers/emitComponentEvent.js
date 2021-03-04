import { getComponentEventActionCallbacks } from './componentEventActionEmitter';

export function emitComponentEvent({ data: { actionName }, target }) {
  const callbacks = getComponentEventActionCallbacks(target.key, actionName);
  if (callbacks) {
    callbacks.forEach(callback => callback());
  }
}
