import { EventProxy } from '../utils/eventProxy';

const componentEvents = new EventProxy();

export function onComponent(eventType, callback) {
  componentEvents.on(eventType, callback);
}

export function emitComponent(eventType, schema) {
  componentEvents.emit(eventType, {
    key: schema.key,
    sourceKey: schema['x-component']
  });
}

