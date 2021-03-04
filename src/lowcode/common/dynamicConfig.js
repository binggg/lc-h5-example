import { app, $page } from '../../app/global-api';

/*
* 函数里面访问：通过 app.common.[name].xxx 访问这里定义的方法或值
* 函数外面访问：通过 import（如在页面的 handler 引用的例子：import { xxx } from '../../common/[name]'）
*/

export function getNavigateConfig(pageId) {
  return [
      {
        icon: 'https://imgcache.qq.com/qcloud/tcloud_dtc/static/low_code/c868cd77-8454-46d5-bd13-54539707e9f2.svg',
        title: '候选列表',
        activeIcon: 'https://imgcache.qq.com/qcloud/tcloud_dtc/static/low_code/ad23c89d-e318-4f1c-b336-c818ca8dc3cc.svg',
        name: "index"
      },
      {
        icon: 'https://imgcache.qq.com/qcloud/tcloud_dtc/static/low_code/d60e9fcf-3ed2-4b89-b227-795a12c43eb0.svg',
        title: '岗位信息',
        activeIcon: 'https://imgcache.qq.com/qcloud/tcloud_dtc/static/low_code/a4de8c70-92cb-4a8d-a173-d77f29be8495.svg',
        name: 'graph'
      },
      {
        icon: 'https://imgcache.qq.com/qcloud/tcloud_dtc/static/low_code/ebe46d92-de84-45a0-b92f-555c2d7a6363.svg',
        title: '个人中心',
        activeIcon: 'https://imgcache.qq.com/qcloud/tcloud_dtc/static/low_code/323fd0b2-3bef-47ba-baec-3d5535743b09.svg',
        name: 'user'
      }
  ]
}