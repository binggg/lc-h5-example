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
    list = await fetch([]);
  } else {
    let id = $page.dataset.state.data.id;
    await app.dataSources["o2oInvatation"].createInvatation({
      candidateId: id,
      label: '面试邀约',
      response: '待候选人回复确认'
    });
    await app.dataSources["o2oCandidate"].updateInvitation({ id });
  }
  $page.dataset.state.data.invitations++ 
  $page.dataset.state.showModal = true;
}