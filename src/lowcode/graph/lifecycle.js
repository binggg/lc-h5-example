import { app, $page } from '../../app/global-api';
export default {
 async onPageLoad(query) {
     $page.dataset.state.list = await $page.handler.getGraphList()
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