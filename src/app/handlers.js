
      import index_getCategories from '../lowcode/index/handler/getCategories'
      import index_navigateConfig from '../lowcode/index/handler/navigateConfig'
      import index_onSearch from '../lowcode/index/handler/onSearch'
      import index_onTypeChange from '../lowcode/index/handler/onTypeChange'
      import index_onRegionChange from '../lowcode/index/handler/onRegionChange'
      import index_onSortChang from '../lowcode/index/handler/onSortChang'
      import index_onTabListItem from '../lowcode/index/handler/onTabListItem'
      import index_getData from '../lowcode/index/handler/getData'
      import graph_onTabListItem from '../lowcode/graph/handler/onTabListItem'
      import graph_getGraphList from '../lowcode/graph/handler/getGraphList'
      import graph_getNavigateConfig from '../lowcode/graph/handler/getNavigateConfig'
      import user_onGetUserInfo from '../lowcode/user/handler/onGetUserInfo'
      import user_getListConfig from '../lowcode/user/handler/getListConfig'
      import user_getNavigateConfig from '../lowcode/user/handler/getNavigateConfig'
      import user_navigate from '../lowcode/user/handler/navigate'
      import user_onTabLoginButton from '../lowcode/user/handler/onTabLoginButton'
      import graphDetail_getData from '../lowcode/graphDetail/handler/getData'
      import expertDetail_onTapInvite from '../lowcode/expertDetail/handler/onTapInvite'
      import expertDetail_onTapCloseModal from '../lowcode/expertDetail/handler/onTapCloseModal'
      import expertDetail_onTapFavorite from '../lowcode/expertDetail/handler/onTapFavorite'
      import expertDetail_getData from '../lowcode/expertDetail/handler/getData'
      import classification_onClickSidebar from '../lowcode/classification/handler/onClickSidebar'
      import classification_getTypeList from '../lowcode/classification/handler/getTypeList'
      import classification_getValue from '../lowcode/classification/handler/getValue'
      import classification_navigate from '../lowcode/classification/handler/navigate'
      import invacations_getData from '../lowcode/invacations/handler/getData'
      import favorites_getData from '../lowcode/favorites/handler/getData'
      import favorites_onTabListItem from '../lowcode/favorites/handler/onTabListItem'
      import category_onSearch from '../lowcode/category/handler/onSearch'
      import category_onTypeChange from '../lowcode/category/handler/onTypeChange'
      import category_onTabListItem from '../lowcode/category/handler/onTabListItem'
      import category_getTypeTags from '../lowcode/category/handler/getTypeTags'
      import category_getData from '../lowcode/category/handler/getData'


export const $$_index = {
  getCategories: index_getCategories,
  navigateConfig: index_navigateConfig,
  onSearch: index_onSearch,
  onTypeChange: index_onTypeChange,
  onRegionChange: index_onRegionChange,
  onSortChang: index_onSortChang,
  onTabListItem: index_onTabListItem,
  getData: index_getData,
}

export const $$_graph = {
  onTabListItem: graph_onTabListItem,
  getGraphList: graph_getGraphList,
  getNavigateConfig: graph_getNavigateConfig,
}

export const $$_user = {
  onGetUserInfo: user_onGetUserInfo,
  getListConfig: user_getListConfig,
  getNavigateConfig: user_getNavigateConfig,
  navigate: user_navigate,
  onTabLoginButton: user_onTabLoginButton,
}

export const $$_graphDetail = {
  getData: graphDetail_getData,
}

export const $$_about = {
}

export const $$_expertDetail = {
  onTapInvite: expertDetail_onTapInvite,
  onTapCloseModal: expertDetail_onTapCloseModal,
  onTapFavorite: expertDetail_onTapFavorite,
  getData: expertDetail_getData,
}

export const $$_classification = {
  onClickSidebar: classification_onClickSidebar,
  getTypeList: classification_getTypeList,
  getValue: classification_getValue,
  navigate: classification_navigate,
}

export const $$_invacations = {
  getData: invacations_getData,
}

export const $$_favorites = {
  getData: favorites_getData,
  onTabListItem: favorites_onTabListItem,
}

export const $$_category = {
  onSearch: category_onSearch,
  onTypeChange: category_onTypeChange,
  onTabListItem: category_onTabListItem,
  getTypeTags: category_getTypeTags,
  getData: category_getData,
}

