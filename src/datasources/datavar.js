/**
 * 数据源变量相关处理
 */
import { observable } from 'mobx'
// 数据源变量的描述文件对象, 对像 key 为页面名, 应用变量的key 为 $global
import datavarProfiles from './datavar-profiles'
import { dataSources } from './datasources'
/**
 * 根据页面id生成对应页面数据源变量对象
 * @param pageID 页面id, 应用传 $global 
 */

const allDataVars = {}

export function createDataVar(pageID) {
  if (allDataVars[pageID]) return allDataVars[pageID]
  const varCfgs = datavarProfiles[pageID] || [];
  const result = observable({
    $status: {}
  });
  varCfgs.forEach(varCfg => {
    result.$status[varCfg.name] = {
      status: 'idle',
      isLoading: false
    };
  });
  allDataVars[pageID] = result
  return result;
}
/**
 * 根据页面ID, 生成变量初始化加载函数, 用于应用、页面挂载时调用
 * @param pageID 页面id, 应用传 $global 
 */

export function buildDataVarFetchFn(pageID) {
  return async function () {
    const pageVar = allDataVars[pageID]
    if (!pageVar) return
    const varCfgs = datavarProfiles[pageID] || [];
    varCfgs.forEach(async varCfg => {
      if (varCfg.type === 'new-record') return; // 列表及单条记录类型变量, 则应立即调用相应方法进行加载

      try {
        pageVar.$status[varCfg.name] = {
          status: 'loading',
          isLoading: true
        }; // eslint-disable-next-line no-undef

        const result = await dataSources[varCfg.dataSourceName][varCfg.methodName](varCfg.params);

        if (!result.code) {
          pageVar[varCfg.name] = result.data;
          pageVar.$status[varCfg.name] = {
            status: 'success',
            isLoading: false
          };
        } else {
          pageVar.$status[varCfg.name] = {
            isLoading: false,
            status: 'failed',
            code: result.code,
            message: result.message,
            error: result
          };
        }
      } catch (e) {
        pageVar.$status[varCfg.name] = {
          isLoading: false,
          status: 'failed',
          code: -1,
          message: e.message,
          error: e
        };
      }
    });
  };
}
