import { app, $page } from '../app/global-api';
export default {
  onAppLaunch(launchOpts) {
    //console.log('---------> LifeCycle onAppLaunch', launchOpts)
  },
  onAppShow(appShowOpts) {
    //console.log('---------> LifeCycle onAppShow', appShowOpts)
  },
  onAppHide() {
    //console.log('---------> LifeCycle onAppHide')
  },
  onAppError(options) {
    //console.log('---------> LifeCycle onAppError', options)
  },
  onAppPageNotFound(options) {
    //console.log('---------> LifeCycle onAppPageNotFound', options)
  },
  onAppUnhandledRejection(options) {
    //console.log('---------> LifeCycle onAppUnhandledRejection', options)
  }
}