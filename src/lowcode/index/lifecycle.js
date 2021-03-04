import { app, $page } from '../../app/global-api';
export default {
  async onPageLoad(query) {
    $page.dataset.state.loading = true
    $page.dataset.state.list=[]

    let types = await $page.handler.getCategories()

    $page.dataset.state.types = types

    let list = await $page.handler.getData()

    $page.dataset.state.list = list
    $page.dataset.state.loading = false
    
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
