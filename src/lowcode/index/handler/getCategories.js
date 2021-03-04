import { app, $page } from '../../../app/global-api';

/*
 * 可通过 $page.handler.xxx 访问这里定义的方法
 * 注意：该方法仅在所属的页面有效
 * 如果需要 async-await，请修改成 export default async function() {}
 */

export default async function (type) {
  if (app.dataset.state.isMock) {
    let categories = await app.common.mock.fetch(app.common.mock.data.jobs);

    return [{ text: "推荐", value: "recommend" }].concat(
      categories.map((item) => ({
        text: item.text,
        value: item.id,
        ...item,
      }))
    );
  } else {
    let {
      data: { list = [] },
    } = await app.dataSources["o2oJob"].getCategories({
      isRecommend: true,
    });
    return list;
  }
}
