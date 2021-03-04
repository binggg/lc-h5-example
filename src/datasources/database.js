/**
 * 数据库数据源的个性化处理
 *  目前只针对云开发数据库做了处理
 */
import { init as initTcb } from './tcb';
import { getTableName } from './utils';
import 'regenerator-runtime';

/**
 * 批量构建数据库数据源默认方法
 * @param dsConfig 数据源配置
 */
export function buildDefaultMethods(dsConfig) {
  const methods = {};
  const tableName = getTableName(dsConfig);

  if (Array.isArray(dsConfig.config.methods)) {
    dsConfig.config.methods.forEach((methodName) => {
      methods[methodName] = (params) => {
        return runDefaultMethod(tableName, methodName, params);
      };
    });
  }

  return methods;
}
/**
 * 数据源默认增删查改方法的实现
 */

const defaultHandlers = {
  create: async function (params, table, command) {
    const now = Date.now();
    // 追加
    const newParams = Object.assign({}, params, {
      createdAt: now,
      updatedAt: now,
    });
    const result = await table.add(newParams); // @ts-ignore
    return [
      result,
      {
        id: result.id,
      },
    ];
  },
  // TODO: get list 请求处理待完善
  getList: async function (params, table, command) {
    // where 参数不能为空
    const result = await table.where(params || {}).get();
    return [result, result.data];
  },
  getItem: async function (params, table, command) {
    const result = await table.doc(params._id).get(); // @ts-ignore

    if (!result.code) {
      if (result.data && result.data.length) {
        return [result, result.data[0]];
      }

      throw new Error(`record ${params.id} not exists`);
    }

    return [result];
  },
  update: async function (params, table, command) {
    const newParams = Object.assign({}, params, {
      updatedAt: Date.now(),
    });
    delete newParams.createdAt;
    delete newParams._id;
    const result = await table.doc(params._id).update(newParams);
    return [
      result,
      {
        updated: result.updated,
      },
    ];
  },
  async delete (params, table, command) {
    let ids = params._id || params.id;
    if (!Array.isArray(ids)) ids = [ids]; // 支持批量删除

    const result = await table
      .where({
        _id: command.in(ids),
      })
      .remove();
    return [
      result,
      {
        deleted: result.deleted,
      },
    ];
  },
};
/**
 * 构建数据库数据源单个默认方法
 * @param tableName 数据源表名称
 * @param methodName 数据源方法名称
 * @param params 额外参数
 */

async function runDefaultMethod(tableName, methodName, params) {
  try {
    // @ts-ignore
    const { database } = await initTcb();
    const table = database.collection(tableName);
    let result = await defaultHandlers[methodName](
      params,
      table,
      database.command
    ); // @ts-ignore

    return normalizeDbResponse(...result);
  } catch (error) {
    return {
      code: 1,
      message: error.message,
    };
  }
}
/**
 *
 * @param response 原始的数据库调用响应对象
 * @param data 实际 response 的 data 对象
 */

function normalizeDbResponse(response, data) {
  if (response.code) {
    return {
      code: 1,
      message: `<${response.code}> ${response.message}`,
      original: response,
    };
  }

  return {
    code: 0,
    data,
  };
}
