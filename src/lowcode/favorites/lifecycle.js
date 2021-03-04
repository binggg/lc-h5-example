import { app, $page } from '../../app/global-api';
export default {
  onPageLoad(query) {
    //console.log('---------> LifeCycle onPageLoad', query)
  },
  async onPageShow() {
    $page.dataset.state.loading = true
    let list = await $page.handler.getData()
    $page.dataset.state.list = list
    $page.dataset.state.loading = false
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