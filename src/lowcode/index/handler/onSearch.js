import { app, $page } from '../../../app/global-api';
/*
 * 可通过 $page.handler.xxx 访问这里定义的方法
 * 注意：该方法仅在所属的页面有效
 * 如果需要 async-await，请修改成 export default async function() {}
 */
export default async function ({
  type = $page.dataset.state.selectedType,
  region,
  sort = $page.dataset.state.sortOptions[$page.dataset.state.selectedSortIndex]
    .value,
}) {
  console.log(type, region, sort);
  $page.dataset.state.loading = true;
  let list = [];
  if (app.dataset.state.isMock) {
    list = await app.common.mock.fetch(
      type === "recommend" ? app.common.mock.data.candidate : []
    );
  } else {
    let { data } = await app.dataSources["o2oCandidate"].getList({});
    list = data;
  }
  $page.dataset.state.list = list;

  $page.dataset.state.loading = false;
}
