import { app, $page } from '../../app/global-api';
export default {
 onPageLoad(query) {
     let { id } = $page.dataset.params ||  query
     console.log($page.dataset.params.id, query)
     $page.dataset.state.data = {}
     $page.handler.getData(id).then(data=>{
         $page.dataset.state.data = data
     })
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