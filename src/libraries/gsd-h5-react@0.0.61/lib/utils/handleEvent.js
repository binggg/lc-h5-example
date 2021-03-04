export function handleFormEvent (eventName, value) {
  return {
    type: eventName,
    // detail: {
    //   value
    // }
    value
  }
}

export function handleCommonEvent (eventName, value) {
  return {
    type: eventName,
    // detail: value
    value
  }
}


export function handleCaptureEvent (event) {
  return {
    ...event,
    isCapturePhase: true
  }
}
