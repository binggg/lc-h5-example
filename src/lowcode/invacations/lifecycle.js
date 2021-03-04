import { app, $page } from '../../app/global-api';
export default {
  async onPageLoad(query) {
    try {
        $page.dataset.state.loading = true;
        $page.dataset.state.list =  await $page.handler.getData();       
    }catch(e){
        console.log('==',e)
    }finally{
        $page.dataset.state.loading = false;
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
};
