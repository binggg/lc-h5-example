import { app, $page } from '../../app/global-api';
export default {
 async onPageLoad(query) {
    let list = await $page.handler.getTypeList()
    $page.dataset.state.types = list
    $page.dataset.state.selectedType = $page.dataset.state.types[0].value || ''
 },
 onPageShow() {
 // console.log('---------> LifeCycle onPageShow')
 },
 onPageReady() {
 // console.log('---------> LifeCycle onPageReady')
 
 },
 onPageHide() {
 // console.log('---------> LifeCycle onPageHide')
 },
 onPageUnload() {
 // console.log('---------> LifeCycle onPageUnload')
 },
}