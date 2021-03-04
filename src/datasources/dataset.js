/**
 * 数据源变量相关处理
 */
import { observable } from 'mobx'
// 数据源变量的描述文件对象, 对像 key 为页面名, 应用变量的key 为 $global
import profiles from './dataset-profiles'
import { dataSources } from './datasources'
/**
 * 根据页面id生成对应页面数据源变量对象
 * @param pageID 页面id, 应用传 $global
 */

const varContext = {}

export function createDataset(pageID) {
  if (varContext[pageID]) return varContext[pageID]

  const dataset = profiles[pageID]

  const result = observable({
    state: {
      $status: {},
    },
    params: {},
  })

  varContext[pageID] = result
  if (!dataset) {
    return result
  }

  createStateBasicVar(dataset.state, result.state)
  createParamsVar(dataset.params, result.params)

  return result
}

/**
 * 创建状态变量
 * @param steteConfigMap 状态变量配置
 * @param context 变量所挂载的对象上下文
 */
export function createStateBasicVar(steteConfigMap, context) {
  if (!steteConfigMap) return
  const varNames = Object.keys(steteConfigMap)
  if (!varNames.length) return

  let datasourceNames = []
  // 优先初始化基本 state 值
  for (let name in steteConfigMap) {
    let config = steteConfigMap[name]
    if (config.varType === 'state') {
      context[name] = config.initialValue
    } else if (config.varType === 'datasource') {
      datasourceNames.push(name)
    }
  }
}

/**
 * 创建参数变量
 * @param paramConfigMap 参数变量配置
 * @param context 参数挂载的对象
 */
export function createParamsVar(paramConfigMap, context) {
  if (!paramConfigMap) return
  const varNames = Object.keys(paramConfigMap)
  if (!varNames.length) return
  varNames.forEach((name) => {
    const varCfg = paramConfigMap[name]
    context[name] = varCfg.sampleValue || ''
  })
}

export function updateDatasetParams(id, params) {
  const dataset = profiles[id]
  const context = varContext[id] && varContext[id].params
  if (!dataset || !dataset.params || !context) {
    return
  }

  for (let key in dataset.params) {
    if (params[key] != undefined) {
      context[key] = params[key]
    }
  }
}

export async function createStateDatasrouceVar(id, dynamicValueContext) {
  let steteConfigMap = profiles[id] && profiles[id].state
  if (!steteConfigMap) return

  let context = varContext[id].state

  const varNames = Object.keys(steteConfigMap)
  if (!varNames.length) return

  // 优先初始化基本 state 值
  for (let name in steteConfigMap) {
    let config = steteConfigMap[name]
    if (config.varType === 'datasource') {
      // 无初始化方法
      if (!config.initMethod || !config.initMethod.name) {
        context[name] = {}
        // 此时变量状态为 idle, 只有相应表单提交时才会有其他状态
        context.$status[name] = { status: 'idle' }
      } else {
        // 列表及单条记录类型变量, 则应立即调用相应方法进行加载
        try {
          context.$status[config.name] = { status: 'loading' }
          const { initMethod } = config
          // @ts-ignore
          // eslint-disable-next-line no-undef
          const result = await dataSources[config.dataSourceName][
            initMethod.name
          ](_getInitParams(initMethod.params, dynamicValueContext))
          if (!result.code) {
            context[config.name] = result.data
            context.$status[config.name] = { status: 'success' }
          } else {
            context.$status[config.name] = {
              status: 'failed',
              code: result.code,
              message: result.message,
              error: result,
            }
          }
        } catch (e) {
          console.error(e)
          context.$status[config.name] = {
            status: 'failed',
            code: -1,
            message: e.message,
            error: e,
          }
        }
      }
    }
  }
}

/**
 * 获取变量初始化参数
 * @param dynamicParams
 * @param context 动态值计算上下文
 * @param context.app 全局 dataset
 * @param context.$page 页面级 dataset
 */
function _getInitParams(dynamicParams, context) {
  if (!dynamicParams) {
    return dynamicParams
  }
  let params = {}
  for (let key in dynamicParams) {
    params[key] = dynamicParams[key](context.app, context.$page)
  }
  return params
}
