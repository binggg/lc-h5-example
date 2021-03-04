
  import * as dynamicConfig from '../lowcode/common/dynamicConfig'
  import * as router from '../lowcode/common/router'
  import * as mock from '../lowcode/common/mock'

  function getModule(targetModule) {
    if(targetModule.__esModule) {
      return targetModule.default ? targetModule.default : targetModule
    }
  }

  export default {
  
    dynamicConfig: getModule(dynamicConfig),
    router: getModule(router),
    mock: getModule(mock),
  }
