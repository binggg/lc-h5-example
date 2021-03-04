/**
 * 构建不同实现方式的数据源操作方法
 * 目前实现类型
 *  http 接口调用
 *  cloud-function 云函数
 *  local-function 本地异步函数
 */
import { init as initTcb } from './tcb';
import { getCloudFnName, getTableName, TCBError } from './utils';
import { localFns } from '../local-functions/index'

const builders = {
  cloudFunctionBuilder,
  localFunctionBuilder
};
/**
 * 根据数据源方法实现方式返回对应方法的构造器
 * @param type 数据源方法实现方式, type值有 'http' | 'local-function' | 'cloud-function'
 */

export function getBuilderByMethodType(type) {
  const builderName = type.replace(/\-[a-z]/g, $0 => $0.charAt(1).toUpperCase()) + 'Builder';
  return builders[builderName];
}
/**
 * 云函数方法构造器
 * @param ds 数据源描述信息
 * @param methodName 函数名称
 */

export function cloudFunctionBuilder(ds, methodName) {
  return async function cloudFnHandler(params) {
    try {
      // @ts-ignore
      const {
        app
      } = await initTcb();
      const resp = await app.callFunction({
        // 使用数据源名称
        name: getCloudFnName(ds),
        data: {
          methodName,
          params
        }
      });
      return resp.result;
    } catch (error) {
      return {
        code: -2,
        message: error.message
      };
    }
  };
}
/**
 * 本地函数方法构造器
 * @param ds 数据源配置
 * @param methodName 函数名称
 * @param cfg       额外配置信息, 目前需要 { isDatabase }
 */

export function localFunctionBuilder(ds, methodName, cfg) {
  return async function localFnHandler(params) {
    try {
      const context = await initTcb();

      if (cfg && cfg.isDatabase) {
        // @ts-ignore
        context.collection = context.database.collection(getTableName(ds));
      } // localFns 应当引入数据源的本地函数
      // @ts-ignore


      const resp = await localFns[ds.name][methodName](params, context);
      return {
        code: 0,
        data: resp
      };
    } catch (e) {
      if (e instanceof TCBError) {
        return {
          code: e.code || -1,
          message: e.message
        }
      }
      return {
        code: -1,
        message: e.message
      }
    }
  };
}
