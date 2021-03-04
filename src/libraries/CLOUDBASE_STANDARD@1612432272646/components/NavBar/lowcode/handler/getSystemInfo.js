import { app } from 'app/global-api'
      
/*
* 可通过 this.$WEAPPS_COMP.handler.xxx 访问这里定义的方法
* 
* 如果需要 async-await，请修改成 export default async function() {}
*/

export default function() {
    try {
        const app = getApp();
        if (app.globalNavInfo && !app.globalNavInfo.ios) {
            return app.globalNavInfo;
        }
        const systemInfo = wx.getSystemInfoSync();
        const ratio = 750 / systemInfo.screenWidth

        let globalNavInfo = {
             windowWidth: 750,
            ios: !!(systemInfo.system.toLowerCase().search("ios") + 1) // 是否ios
        }
        
        const rect = wx.getMenuButtonBoundingClientRect
            ? wx.getMenuButtonBoundingClientRect()
            : null;

        let navBarHeight = 0;

        if (!systemInfo.statusBarHeight) {
            let statusBarHeight = systemInfo.screenHeight - systemInfo.windowHeight - 20
            globalNavInfo.statusBarHeight = statusBarHeight * ratio;
                
            navBarHeight = (function () {
                const gap = rect.top - statusBarHeight;
                return 2 * gap + rect.height;
            })();

            systemInfo.statusBarHeight = 0
        } else {
            globalNavInfo.statusBarHeight = systemInfo.statusBarHeight*ratio

            navBarHeight = (function () {
                const gap = rect.top - systemInfo.statusBarHeight;
                return systemInfo.statusBarHeight + 2 * gap + rect.height;
            })();
        }



        globalNavInfo.navBarHeight = navBarHeight*ratio;
        globalNavInfo.titleBarHeight = (navBarHeight - systemInfo.statusBarHeight)*ratio;
        globalNavInfo.capsuleRectInfo = {
            width: rect.width*ratio,
            height: rect.height*ratio,
            right: rect.right*ratio
        }; // 右上角胶囊按钮信息

        app.globalNavInfo = globalNavInfo; // 将信息保存到全局变量

        return globalNavInfo;

    }catch(e){
        return {
            navBarHeight: 92,
            statusBarHeight: 0,
            titleBarHeight:92,
            capsuleRectInfo: {
                width: 116 ,
                height: 43 ,
                right: 741 
            },
            ios: false,
            windowWidth: 750,
        }
    }
};