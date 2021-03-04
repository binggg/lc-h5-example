/**
 * Be default, variables on window of kbone are not shared across pages.
 * Define vars to be shared across pages, Refer https://wechat-miniprogram.github.io/kbone/docs/domextend/#window-global
 */
function shareVarsCrossPage(vars) {
  vars.forEach(name => {
    Object.defineProperty(window, name, {
      get: () => window.$$global[name],
      set(v) {
        window.$$global[name] = v
      },
    })
  })
}

if (process.env.isMiniprogram) {
  shareVarsCrossPage(['__mobxGlobals', '__mobxInstanceCount'])
}
