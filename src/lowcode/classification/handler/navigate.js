import { app, $page } from '../../../app/global-api';

/*
* 可通过 $page.handler.xxx 访问这里定义的方法
* 注意：该方法仅在所属的页面有效
* 如果需要 async-await，请修改成 export default async function() {}
*/

import {router} from '../../common/router'

export default function({data}) {
    let tag = data.target
    let selectedType = $page.dataset.state.selectedType
    router('navigateTo',{ pageId: 'category', params:{
        type: selectedType,
        tag
    } })
    
}