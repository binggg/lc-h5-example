import { app, $page } from '../../app/global-api';

/*
* 函数里面访问：通过 app.common.[name].xxx 访问这里定义的方法或值
* 函数外面访问：通过 import（如在页面的 handler 引用的例子：import { xxx } from '../../common/[name]'）
*/

export function router(method, data) {
  return app[method](data)
}
