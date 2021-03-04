import { EventListenerTarget } from './types';
import { onComponent } from './componentEventListener';
import { onPage } from './pageEventListener';
import { onHotArea } from './hotAreaEventListener';

export function on(target, eventType, callback) {
  switch (target) {
    case EventListenerTarget.PAGE: {
      return onPage(eventType, callback);
    }
    case EventListenerTarget.COMPONENT: {
      return onComponent(eventType, callback);
    }
    case EventListenerTarget.HOT_AREA: {
      return onHotArea(eventType, callback);
    }
    default: {
      // eslint-disable-next-line
      throw `Invalid [target], must one of '${EventListenerTarget.PAGE}', '${
        EventListenerTarget.COMPONENT
      }', '${EventListenerTarget.HOT_AREA}'`;
    }
  }
}

export * from './pageEventListener';
export * from './componentEventListener';
export * from './hotAreaEventListener';
export * from './types';
