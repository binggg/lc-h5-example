import { app, $page } from '../../app/global-api';
export default {
 async onPageLoad(query) {
    if(app.platform === 'MINIPROGRAME'){
        // wx 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            app.dataset.state.userInfo = res.userInfo
                        },
                    })
                }
            },
        })
    } else {
        // web
        let auth = app.auth
        if(auth){
            const loginState = await auth.getLoginState();
            if(loginState){
                let user = loginState.user
                console.log(user)
                app.dataset.state.userInfo = {...user, nickName: user.nickName || '匿名用户' }
            }
        }
    }
    //console.log('---------> LifeCycle onPageLoad', query)
 },
 onPageShow() {
 //console.log('---------> LifeCycle onPageShow')
 },
 onPageReady() {
 //console.log('---------> LifeCycle onPageReady')
 },
 onPageHide() {
 //console.log('---------> LifeCycle onPageHide')
 },
 onPageUnload() {
 //console.log('---------> LifeCycle onPageUnload')
 },
}