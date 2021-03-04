import { timeout } from 'promise-timeout'
import { resolveDataBinds } from '../utils/common'

const DEFAULT_MAX_TIMEOUT = 10 * 1000

export function getMetaInfoBySourceKey(sourceKey) {
  const [materialName, name] = sourceKey.split(':')
  return {
    materialName,
    name,
  }
}

export async function emitEvent(trigger, listeners = [], args) {
  const targetListeners = listeners.filter((l) => l.trigger === trigger)
  for (const listener of targetListeners) {
    // 当前非捕获Event，再判断冒泡行为
    if (
      !args?.customEventData?.detail?.isCapturePhase &&
      listener.noPropagation
    ) {
      args?.customEventData?.detail?.stopPropagation()
    }

    // 判断捕获的执行，只有执行的捕获与配置的捕获一致时。才会执行。
    if (
      (listener?.isCapturePhase || false) ===
      (args?.customEventData?.detail?.isCapturePhase || false)
    ) {
      try {
        let res = await invokeListener(listener, args)
        let eventName = `${listener.key}.success`
        let event = {
          detail: {
            value: res,
            origin: args.event,
            isCapturePhase: !!args.event?.isCapturePhase,
          },
          name: eventName,
        }
        emitEvent(eventName, listeners, {
          ...args,
          event,
          customEventData: event,
        })
      } catch (e) {
        let eventName = `${listener.key}.fail`
        let event = {
          detail: {
            value: e,
            origin: args.event,
            isCapturePhase: !!args.event?.isCapturePhase,
          },
          name: eventName,
        }
        emitEvent(eventName, listeners, {
          ...args,
          event,
          customEventData: event,
        })
        // 之前 invoke 内部catch 了错误，不会抛错
        // throw e
      }
    }
  }
}

async function invokeListener(
  { instanceFunction, data = {}, dataBinds = {} },
  args
) {
  // ToDo resolve databinds
  const action = instanceFunction
  const maxTimeout = DEFAULT_MAX_TIMEOUT
  const params = {
    data: {
      ...data,
      ...resolveDataBinds(dataBinds, args.forItems, { event: args.event }, true),
    },
    ...args,
  }

  try {
    if (maxTimeout === 'Infinity') {
      await action(params)
    } else {
      const p = action(params)
      if (p instanceof Promise) {
        await timeout(p, maxTimeout)
      }
    }
  } catch (e) {
    console.error('Action error: ', e)
    throw e
  }
}
