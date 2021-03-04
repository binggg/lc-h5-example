import { app, $page } from '../../../app/global-api';

/*
* 可通过 $page.handler.xxx 访问这里定义的方法
* 注意：该方法仅在所属的页面有效
* 如果需要 async-await，请修改成 export default async function() {}
*/

export default function() {
     return [{
        icon: 'https://imgcache.qq.com/qcloud/tcloud_dtc/static/low_code/350cbd30-24e1-4779-832f-3f26fa9d843e.svg',
        text: '邀约记录',
        url:'invacations'
    },{
        icon: 'https://imgcache.qq.com/qcloud/tcloud_dtc/static/low_code/f6e7a4ae-a662-4c64-9bec-41df2aad974f.svg',
        text: '收藏记录',
        url:'favorites'
    },{
        icon: 'https://imgcache.qq.com/qcloud/tcloud_dtc/static/low_code/36de0576-59bd-4de1-81e9-e3889fce6073.svg',
        text: '关于',
        url:'about'
    }]
}