import { EventProxy } from './eventProxy';

export const EventEmitTypes = {
  COMPONENT_INTERSECTING_CHANGE: 'component_intersecting_change',
  HOT_AREA_INTERSECTING_CHANGE: 'hot_area_intersecting_change',
};

export const events = new EventProxy();
