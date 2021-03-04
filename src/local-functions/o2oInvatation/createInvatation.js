import { TCBError } from '../../datasources'

/** 单个自定义函数生成, method.calleeBody.callee 需要是 `export function methodName(params, context){}` 形式  */

export default async function (params, context) {
  const result = await context.collection.add({
    ...params,
    createdTime: Date.now()
  });
  return {
    id: result.id
  }
}
