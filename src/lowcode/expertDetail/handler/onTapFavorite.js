import { app, $page } from '../../../app/global-api';
/*
 * 可通过 $page.handler.xxx 访问这里定义的方法
 * 注意：该方法仅在所属的页面有效
 * 如果需要 async-await，请修改成 export default async function() {}
 */

export default async function (e) {
  if (app.dataset.state.isMock) {
    $page.dataset.state.data.isFavorite = await app.common.mock.fetch(true);
  } else {
    await app.dataSources["o2oFavorite"].create({
      candidateId: $page.dataset.state.data.id,
    });
    $page.dataset.state.data.isFavorite = true;
  }
}
