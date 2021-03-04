import { app, $page } from '../../../app/global-api';

/*
* 可通过 $page.handler.xxx 访问这里定义的方法
* 注意：该方法仅在所属的页面有效
* 如果需要 async-await，请修改成 export default async function() {}
*/

export default async function(e) {
    if(app.platform !== 'MINIPROGRAME'){
        // web
        let auth = app.auth
        try {
            await auth.anonymousAuthProvider().signIn();
            const loginState = await auth.getLoginState();
            if(loginState){
                let user = loginState.user
                app.dataset.state.userInfo = {...user, nickName: user.nickName || '匿名用户' }
            }
        } catch(err){
            app.showToast({
                title: '登录失败',
                icon: 'error',
            })
            console.error('登录失败',err)
        }
    }
}