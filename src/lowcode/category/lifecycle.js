import { app, $page } from '../../app/global-api';
export default {
  async onPageLoad(query) {
    $page.dataset.state.loading = true

    let { type, tag = "" } = $page.dataset.params || query || {};

    let tags = await $page.handler.getTypeTags(type);
    $page.dataset.state.types = tags;

    if (!tags.find((item) => item.value === tag)) {
      tag = (tags[0] && tags[0].value) || "";
    }

    $page.dataset.state.selectedType = tag

    let list = await $page.handler.getData(tag)

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
