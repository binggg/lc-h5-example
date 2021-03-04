import { app, $page } from '../../../app/global-api';

/*
* 可通过 $page.handler.xxx 访问这里定义的方法
* 注意：该方法仅在所属的页面有效
* 如果需要 async-await，请修改成 export default async function() {}
*/

export default async function () {
  let list = [];
  if (app.dataset.state.isMock) {
    let { data, fetch } = app.common.mock;
    list = await fetch(data.jobs);
  } else {
    let { data } = await app.dataSources["o2oJob"].getList({});
    list = data;
  }
  return list.map((item) => {
    return {
      lable: item.text,
      value: item.id,
      ...item,
    };
  });
}