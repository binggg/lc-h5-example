import * as React from 'react'
import { useContext, useCallback, createContext, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { emitEvent } from '../actionHandler/utils'
import { translateStyleToRem, checkVisible } from '@govcloud/weapps-core'
import { get, set } from 'lodash'
import { $page } from '../../app/global-api'
import { getDom } from '../utils/widgets'

export const ForContext = createContext({})

export const CompRenderer = observer(function (props) {
  const { id: compId, xProps, virtualFields, slots = {}, codeContext } = props

  const isInComposite = !!props.codeContext
  // 判断 widgets 是从 page 来的，还是组件来的
  const widgetsData = !isInComposite
    ? $page.widgets[compId]
    : codeContext.$WEAPPS_COMP.widgets[compId]

  if (!xProps) {
    return props.children
  }

  const {
    commonStyle = {},
    sourceKey,
    data = {},
    dataBinds,
    listenerInstances,
    styleBind,
    classNameList = [],
    classNameListBind,
  } = xProps
  const Field = virtualFields[sourceKey]
  const parentForItems = useContext(ForContext)

  const emit = useCallback(
    (trigger, event, forItems) => {
      const listeners = listenerInstances
      event = { detail: event, name: trigger }
      forItems = {
        ...forItems,
        forIndexes: getForIndexes(forItems, widgetsData),
      }
      emitEvent(trigger, listeners, { event, customEventData: event, forItems })
    },
    [props]
  )

  // For循环渲染
  let forList
  try {
    // 绑定了 for 变量，但计算值错误时，应当空数组兜底
    forList =
      dataBinds && dataBinds._waFor && (dataBinds._waFor(parentForItems) || [])
  } catch (e) {
    console.error('_waFor data', e)
  }
  if (forList) {
    return forList.map((item, index) => {
      const forItemsIndexes = (parentForItems.forIndexes || []).concat(index)
      const forItems = {
        ...parentForItems,
        [compId]: item,
        forIndexes: forItemsIndexes,
      }
      const {
        fieldData: forItemData,
        finalStyle: forItemStyle,
        finalClassNameList: forItemClassNameList,
      } = getBindData(forItems)
      if (!checkVisible(forItemData)) {
        return null
      }
      // 多个组件的 slot 属性
      Object.keys(slots).forEach((slotProp) => {
        set(forItemData, slotProp, slots[slotProp])
      })
      const emitWithForItems = (trigger, evt) => emit(trigger, evt, forItems)
      delete forItemData.style

      // 获取当前元素的 ref
      const currentWidget = Array.isArray(widgetsData)
        ? get(widgetsData, forItemsIndexes)
        : widgetsData
      const domRef = setGetDomApi(currentWidget, isInComposite)
      return (
        <ForContext.Provider key={index} value={forItems}>
          <Field
            data={forItemData}
            id={compId}
            style={forItemStyle}
            className={forItemClassNameList.join(' ')}
            emit={emitWithForItems}
            compositeParent={codeContext}
            forIndexes={forItemsIndexes}
            $node={currentWidget}
            domRef={domRef}
          >
            {props.children}
          </Field>
        </ForContext.Provider>
      )
    })
  }

  // 单节点渲染
  const { fieldData, finalClassNameList, finalStyle } = getBindData(
    parentForItems
  )
  const emitWithForItems = (trigger, evt) => emit(trigger, evt, parentForItems)

  // false 或空字符串时
  if (!checkVisible(fieldData)) {
    return null
  }

  // 单个组件的 slot 属性
  Object.keys(slots).forEach((slotProp) => {
    set(fieldData, slotProp, slots[slotProp])
  })

  // 防止渲染时 data 的 style 与实际的 style 冲突
  delete fieldData.style

  // 修正 forIndexes
  const forIndexes = getForIndexes(parentForItems, widgetsData)

  // 获取 Element Ref
  const currentWidget = Array.isArray(widgetsData)
    ? get(widgetsData, forIndexes)
    : widgetsData
  const domRef = setGetDomApi(currentWidget, props)

  return (
    <Field
      data={fieldData}
      id={compId}
      style={finalStyle}
      className={finalClassNameList.join(' ')}
      emit={emitWithForItems}
      compositeParent={codeContext}
      forIndexes={forIndexes}
      $node={currentWidget}
      domRef={domRef}
    >
      {props.children}
    </Field>
  )

  // TODO: 需要不断移除 dataBinds(style/classList)
  function getBindData(forItems) {
    // bindData
    let wData = widgetsData
    if (Array.isArray(wData)) {
      wData =
        forItems.forIndexes === void 0 || wData.length === 0
          ? {}
          : get(wData, getForIndexes(forItems, wData))
    }
    wData = wData || {}
    const fieldData = { ...wData }

    // bindStyle
    let bindStyle = fieldData.style || {}
    // 复合组件第一层需要将最外层样式 style 挂到节点上
    let cssStyle = commonStyle
    if (isInComposite && wData && !wData.parent) {
      cssStyle = {
        ...cssStyle,
        ...(codeContext.$WEAPPS_COMP.props?.style || {}),
      }
      bindStyle = {
        ...bindStyle,
        ...(codeContext.$WEAPPS_COMP.props?.style || {}),
      }
    }
    const finalStyle = getFinalStyle(cssStyle, bindStyle)

    // bindClassList
    const bindClassList = fieldData.classList || []
    const finalClassNameList = getFinalClassNameList(
      classNameList,
      bindClassList
    )

    return { fieldData, finalStyle, finalClassNameList }
  }
})

export function getFinalStyle(
  commonStyle = {},
  bindStyle = {},
  widgetStyle = {}
) {
  const remBindStyle =
    typeof bindStyle === 'object' ? translateStyleToRem(bindStyle) : {}

  return {
    ...(translateStyleToRem(commonStyle) || {}),
    ...(translateStyleToRem(widgetStyle) || {}),
    ...remBindStyle,
  }
}

export function getFinalClassNameList(
  classNameList = [],
  bindClassList = [],
  widgetClassList = []
) {
  return [].concat(classNameList, bindClassList, widgetClassList)
}

// HACK: 从后向前保证循环的深度与 forIndexes 一致
// 后续需要将 For 循环迁移到外层
function getForIndexes(parentForItems, widgetsData) {
  return Array.isArray(widgetsData) && widgetsData.length > 0
    ? (parentForItems.forIndexes || []).slice(0 - getDeepArrLen(widgetsData))
    : undefined
}

function getDeepArrLen(arr, len = 0) {
  if (Array.isArray(arr)) {
    return getDeepArrLen(arr[0], len + 1)
  } else {
    return len
  }
}

function setGetDomApi(currentWidget, props) {
  if (!currentWidget) return React.createRef()
  const isComposite = !currentWidget.widgetType.startsWith('gsd-h5-react')
  const isInComposite = !!props.codeContext

  // 如果当前是复合组件，不做 getDom 的挂载
  if (!isComposite) {
    if (!currentWidget.domRef) {
      currentWidget.domRef = React.createRef()
    }
    if (!currentWidget.getDom) {
      currentWidget.getDom = (options) =>
        getDom(currentWidget.domRef.current, options)
    }

    if (
      isInComposite && // 当前在复合组件内
      !currentWidget.parent && // 当前节点为复合组件的根节点
      props.codeContext.node && // 复合组件的 node 已经创建
      !props.codeContext.node.getDom // 复合组件的 node 未挂载 getDom 方法
    ) {
      props.codeContext.node.domRef = currentWidget.domRef
      props.codeContext.node.getDom = currentWidget.getDom
    }
  }

  return currentWidget.domRef
}
