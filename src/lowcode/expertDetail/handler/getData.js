import { app, $page } from '../../../app/global-api';

/*
 * 可通过 $page.handler.xxx 访问这里定义的方法
 * 注意：该方法仅在所属的页面有效
 * 如果需要 async-await，请修改成 export default async function() {}
 */

export default async function (id) {
  if (app.dataset.state.isMock) {
    const candidate = app.common.mock.data.candidate;
    console.log(id);
    const data = (candidate || []).find((item) => item.id === id);
    return app.common.mock.fetch(data);
  } else {
    let { data } = await app.dataSources["o2oCandidate"].getCandidate({ id });
    if (data) {
      let { data: list = [] } = await app.dataSources["o2oFavorite"].getList({
        _openid: "{openid}",
      });
      if (list.length) {
        data.isFavorite = true;
      }
    }
    return data;
  }
}