import { EventProxy } from '../utils/eventProxy';

const pageEvents = new EventProxy();

export function onPage(eventType, callback) {
  pageEvents.on(eventType, callback);
}

export function emitPage(eventType, params) {
  pageEvents.emit(eventType, params);
}
