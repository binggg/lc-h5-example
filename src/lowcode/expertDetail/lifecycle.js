import { app, $page } from '../../app/global-api';
export default {
  async onPageLoad(query) {
    let { id } = $page.dataset.params || query
    
    $page.dataset.state.loading = true
    $page.dataset.state.data = {}
    const data = await $page.handler.getData(id)

    if(data){
      for (let key in data) {
        $page.dataset.state.data[key] = data[key]
      }
    }
    
    $page.dataset.state.loading = false
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
