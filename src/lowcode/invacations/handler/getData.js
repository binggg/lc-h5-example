import { app, $page } from '../../../app/global-api';

/*
 * 可通过 $page.handler.xxx 访问这里定义的方法
 * 注意：该方法仅在所属的页面有效
 * 如果需要 async-await，请修改成 export default async function() {}
 */

export default async function () {
  if (app.dataset.state.isMock) {
    return Math.random() > 0.3
      ? app.common.mock.fetch(app.common.mock.data.invitations)
      : [];
  } else {
    let {
      data: { list = [] },
    } = await app.dataSources["o2oInvatation"].getInvatations({});
    if (list.length) {
      let ids = list.map((item) => item.candidateId);
      let { data } = await app.dataSources[
        "o2oCandidate"
      ].getCandidateListByIds({
        ids,
      });
      let map = (data.list || []).reduce((map, item) => {
        map[item.id] = item;
        return map;
      }, {});

      return list.map((item) => {
        let date = new Date(item.createdTime);
        let candidate = map[item.candidateId];
        return {
          ...item,
          createdTime: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
          avator: candidate.avator,
          name: candidate.name,
          types: (candidate.tags || []).slice(0, 2),
        };
      });
    }

    return list;
  }
}

