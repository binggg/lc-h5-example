import { getComponentId } from './utils/common';

export const componentNodeMap = new Map();

export function setComponentNode(key, node) {
  return componentNodeMap.set(key, node);
}

export function deleteComponentNode(key) {
  return componentNodeMap.delete(key);
}

export function getComponentNode(key) {
  return componentNodeMap.get(key) || document.getElementById(getComponentId(key));
}

if (typeof window !== 'undefined') {
  Object.defineProperty(window, '__componentInstanceNodeMap', {
    get() {
      return componentNodeMap;
    },
  });
}

