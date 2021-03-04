export const EventListenerTarget = {
  PAGE: 'page',
  COMPONENT: 'component',
  HOT_AREA: 'hotarea',
};

/**
 * @desc Page Events
 */

export const PageEventListenerTypes = {
  INIT: 'afterRender',
};

/**
 * @desc Component Events
 */
export const ComponentEventListenerTypes = {
  INIT: 'afterRender',
  CLICK: 'click',
  MOUSE_ENTER: 'mouseEnter',
  MOUSE_LEAVE: 'mouseLeave',
  DOUBLE_CLICK: 'doubleClick',
  LONG_PRESS: 'longPress',
  ENTER_VIEW: 'enterView',
  LEAVE_VIEW: 'leaveView',
};

/**
 * @desc HotArea Events
 */
export const HotAreaEventListenerTypes = ComponentEventListenerTypes;
