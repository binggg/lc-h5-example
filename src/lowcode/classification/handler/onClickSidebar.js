import { app, $page } from '../../../app/global-api';

/*
* 可通过 $page.handler.xxx 访问这里定义的方法
* 注意：该方法仅在所属的页面有效
* 如果需要 async-await，请修改成 export default async function() {}
*/

export default function({event}) {
    $page.dataset.state.selectedType = event.detail.data.target
}