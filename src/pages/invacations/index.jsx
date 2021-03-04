// Import Libs and Handlers
import * as React from 'react'
import { observable } from 'mobx'
import { AppRender } from 'handlers/render'
import { initLifeCycle, pageLifeCycleMount } from 'handlers/lifecycle'
import { createComputed } from 'utils'
import AppLifeCycle from 'lowcode/lifecycle'
import { createDataVar, buildDataVarFetchFn, createDataset, updateDatasetParams, createStateDatasrouceVar } from '@/datasources'
import PageLifeCycle from '../../lowcode/invacations/lifecycle'
import initPageState from '../../lowcode/invacations/state'
import computed from '../../lowcode/invacations/computed'
import { $$_invacations as handler } from '../../app/handlers'
import { app as mainApp } from 'app/global-api' // 取主包app
import { app, $page } from '../../app/global-api' // 取对应子包app
import { createWidgets, retryDataBinds } from 'handlers/utils'
import { useScrollTop } from 'handlers/hooks'
import { get } from 'lodash'
import './index.less'

let ReactDOMServer;

if(process.env.SSR) {
  ReactDOMServer = require('react-dom/server');
}

// Import Components
import GsdH5ReactContainer from 'libraries/gsd-h5-react@0.0.61/components/Container';
import CloudbaseStandardStatusTip from 'libraries/CLOUDBASE_STANDARD@1612432272646/components/StatusTip';
import GsdH5ReactText from 'libraries/gsd-h5-react@0.0.61/components/Text';
import CloudbaseStandardMedia from 'libraries/CLOUDBASE_STANDARD@1612432272646/components/Media'

// Import Plugins


// Import Actions


// Actions

// Plugin
const pluginInstances = [];
const virtualFields = {
  "gsd-h5-react:Container": (props) => <GsdH5ReactContainer {...props} pageVirtualFields={virtualFields}/>,
  "CLOUDBASE_STANDARD:StatusTip": (props) => <CloudbaseStandardStatusTip {...props} pageVirtualFields={virtualFields}/>,
  "gsd-h5-react:Text": (props) => <GsdH5ReactText {...props} pageVirtualFields={virtualFields}/>,
  "CLOUDBASE_STANDARD:Media": (props) => <CloudbaseStandardMedia {...props} pageVirtualFields={virtualFields}/>
};
const componentSchema = {
  "type": "object",
  "x-index": 0,
  "properties": {
    "id38": {
      "key": "id38",
      "x-component": "gsd-h5-react:container",
      "x-props": {
        "sourceKey": "gsd-h5-react:Container",
        "data": {
          "_visible": true
        },
        "dataTypes": [
          {
            "propertyPath": "title",
            "type": "static"
          }
        ],
        "commonStyle": {
          "width": "100%",
          "padding": "1.4286rem",
          "fontSize": "1.0000rem",
          "background": "rgb(241, 245, 246)",
          "position": "absolute",
          "left": "0",
          "right": "0",
          "minHeight": "100%"
        }
      },
      "x-index": 0,
      "properties": {
        "id29": {
          "key": "id29",
          "x-component": "gsd-h5-react:container",
          "x-props": {
            "sourceKey": "gsd-h5-react:Container",
            "dataBinds": {
              "_visible": () => $page.dataset.state.loading
            },
            "dataTypes": [
              {
                "propertyPath": "title",
                "type": "static"
              },
              {
                "propertyPath": "_visible",
                "type": "bind"
              }
            ],
            "commonStyle": {
              "paddingTop": "1.0714rem",
              "paddingBottom": "1.0714rem",
              "display": "flex",
              "justifyContent": "center",
              "alignItems": "center",
              "flexDirection": "row"
            }
          },
          "x-index": 0,
          "properties": {
            "id36": {
              "key": "id36",
              "x-component": "cloudbase_standard:statustip",
              "x-props": {
                "sourceKey": "CLOUDBASE_STANDARD:StatusTip",
                "data": {
                  "tip": "",
                  "text": "加载中...",
                  "type": "loading",
                  "_visible": true
                },
                "dataTypes": [
                  {
                    "propertyPath": "tip",
                    "type": "slot"
                  },
                  {
                    "propertyPath": "text",
                    "type": "static"
                  },
                  {
                    "propertyPath": "type",
                    "type": "static"
                  }
                ]
              },
              "x-index": 2,
              "properties": {
                "tip": {
                  "key": "tip"
                }
              }
            }
          }
        },
        "id32": {
          "key": "id32",
          "x-component": "gsd-h5-react:container",
          "x-props": {
            "sourceKey": "gsd-h5-react:Container",
            "dataBinds": {
              "_visible": (forItems, event) => (!$page.dataset.state.loading)
            },
            "dataTypes": [
              {
                "propertyPath": "title",
                "type": "static"
              },
              {
                "propertyPath": "_visible",
                "type": "bind"
              }
            ]
          },
          "x-index": 1,
          "properties": {
            "id33": {
              "key": "id33",
              "x-component": "gsd-h5-react:container",
              "x-props": {
                "sourceKey": "gsd-h5-react:Container",
                "dataBinds": {
                  "_visible": (forItems, event) => ($page.dataset.state.list && $page.dataset.state.list.slice().length)
                },
                "dataTypes": [
                  {
                    "propertyPath": "title",
                    "type": "static"
                  },
                  {
                    "propertyPath": "_visible",
                    "type": "bind"
                  }
                ]
              },
              "x-index": 0,
              "properties": {
                "id12": {
                  "key": "id12",
                  "x-component": "gsd-h5-react:container",
                  "x-props": {
                    "sourceKey": "gsd-h5-react:Container",
                    "dataBinds": {
                      "_waFor": (forItems, event) => (($page.dataset.state.list||[]).slice())
                    },
                    "dataTypes": [
                      {
                        "propertyPath": "title",
                        "type": "static"
                      },
                      {
                        "propertyPath": "_waFor",
                        "type": "bind"
                      }
                    ],
                    "commonStyle": {
                      "marginBottom": "1.4286rem",
                      "padding": "0.7143rem",
                      "borderRadius": "0.7143rem",
                      "background": "rgb(255, 255, 255)",
                      "position": "relative",
                      "paddingTop": "0.7143rem",
                      "paddingLeft": "0.7143rem",
                      "paddingBottom": "0.7143rem"
                    }
                  },
                  "x-index": 2,
                  "properties": {
                    "id15": {
                      "key": "id15",
                      "x-component": "gsd-h5-react:container",
                      "x-props": {
                        "sourceKey": "gsd-h5-react:Container",
                        "data": {
                          "_visible": true
                        },
                        "dataTypes": [
                          {
                            "propertyPath": "title",
                            "type": "static"
                          }
                        ],
                        "commonStyle": {
                          "paddingTop": "0.8929rem",
                          "paddingBottom": "0.7143rem",
                          "display": "block",
                          "fontSize": "0.9286rem",
                          "minHeight": "3.5714rem"
                        }
                      },
                      "x-index": 1,
                      "properties": {
                        "id27": {
                          "key": "id27",
                          "x-component": "gsd-h5-react:text",
                          "x-props": {
                            "sourceKey": "gsd-h5-react:Text",
                            "data": {
                              "decode": false,
                              "selectable": false,
                              "_visible": true
                            },
                            "dataBinds": {
                              "text": (forItems) => forItems.id12.response
                            },
                            "dataTypes": [
                              {
                                "propertyPath": "decode",
                                "type": "static"
                              },
                              {
                                "propertyPath": "selectable",
                                "type": "static"
                              },
                              {
                                "propertyPath": "text",
                                "type": "bind"
                              }
                            ]
                          },
                          "x-index": 1
                        }
                      }
                    },
                    "id16": {
                      "key": "id16",
                      "x-component": "gsd-h5-react:container",
                      "x-props": {
                        "sourceKey": "gsd-h5-react:Container",
                        "data": {
                          "_visible": true
                        },
                        "dataTypes": [
                          {
                            "propertyPath": "title",
                            "type": "static"
                          }
                        ],
                        "commonStyle": {
                          "paddingTop": "0.7143rem",
                          "borderTop": "0.0357rem solid rgb(238, 238, 238)"
                        }
                      },
                      "x-index": 2,
                      "properties": {
                        "id21": {
                          "key": "id21",
                          "x-component": "gsd-h5-react:container",
                          "x-props": {
                            "sourceKey": "gsd-h5-react:Container",
                            "data": {
                              "_visible": true
                            },
                            "dataTypes": [
                              {
                                "propertyPath": "title",
                                "type": "static"
                              }
                            ],
                            "commonStyle": {
                              "display": "flex",
                              "justifyContent": "space-between",
                              "alignItems": "center",
                              "flexFlow": "row nowrap",
                              "flexDirection": "row"
                            }
                          },
                          "x-index": 0,
                          "properties": {
                            "id23": {
                              "key": "id23",
                              "x-component": "gsd-h5-react:container",
                              "x-props": {
                                "sourceKey": "gsd-h5-react:Container",
                                "data": {
                                  "_visible": true
                                },
                                "dataTypes": [
                                  {
                                    "propertyPath": "title",
                                    "type": "static"
                                  }
                                ],
                                "commonStyle": {
                                  "display": "inline-block"
                                }
                              },
                              "x-index": 2,
                              "properties": {
                                "id24": {
                                  "key": "id24",
                                  "x-component": "gsd-h5-react:text",
                                  "x-props": {
                                    "sourceKey": "gsd-h5-react:Text",
                                    "data": {
                                      "decode": false,
                                      "selectable": false,
                                      "_visible": true
                                    },
                                    "dataBinds": {
                                      "text": (forItems) => forItems.id12.createdTime
                                    },
                                    "dataTypes": [
                                      {
                                        "propertyPath": "decode",
                                        "type": "static"
                                      },
                                      {
                                        "propertyPath": "selectable",
                                        "type": "static"
                                      },
                                      {
                                        "propertyPath": "text",
                                        "type": "bind"
                                      }
                                    ],
                                    "commonStyle": {
                                      "display": "inline",
                                      "color": "rgb(136, 136, 136)",
                                      "fontSize": "0.8571rem"
                                    }
                                  },
                                  "x-index": 1
                                }
                              }
                            },
                            "id37": {
                              "key": "id37",
                              "x-component": "cloudbase_standard:media",
                              "x-props": {
                                "sourceKey": "CLOUDBASE_STANDARD:Media",
                                "data": {
                                  "align": "top",
                                  "content": "",
                                  "reverse": false,
                                  "thumbSize": 60,
                                  "subtitleType": "raw",
                                  "isCustomMedia": false,
                                  "isCustomContent": false,
                                  "_visible": true
                                },
                                "dataBinds": {
                                  "title": (forItems) => forItems.id12.name,
                                  "mediaUrl": (forItems) => forItems.id12.avator,
                                  "subtitle": (forItems, event) => (forItems.id12.types.join(' / '))
                                },
                                "dataTypes": [
                                  {
                                    "propertyPath": "align",
                                    "type": "static"
                                  },
                                  {
                                    "propertyPath": "content",
                                    "type": "static"
                                  },
                                  {
                                    "propertyPath": "reverse",
                                    "type": "static"
                                  },
                                  {
                                    "propertyPath": "thumbSize",
                                    "type": "static"
                                  },
                                  {
                                    "propertyPath": "subtitleType",
                                    "type": "static"
                                  },
                                  {
                                    "propertyPath": "isCustomMedia",
                                    "type": "static"
                                  },
                                  {
                                    "propertyPath": "isCustomContent",
                                    "type": "static"
                                  },
                                  {
                                    "propertyPath": "title",
                                    "type": "bind"
                                  },
                                  {
                                    "propertyPath": "mediaUrl",
                                    "type": "bind"
                                  },
                                  {
                                    "propertyPath": "subtitle",
                                    "type": "bind"
                                  },
                                  {
                                    "propertyPath": "customMedia",
                                    "type": "slot"
                                  },
                                  {
                                    "propertyPath": "customContent",
                                    "type": "slot"
                                  }
                                ],
                                "classNameList": [
                                  "userMediaItem"
                                ]
                              },
                              "x-index": 0,
                              "properties": {
                                "customMedia": {
                                  "key": "customMedia"
                                },
                                "customContent": {
                                  "key": "customContent"
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "id18": {
                      "key": "id18",
                      "x-component": "gsd-h5-react:container",
                      "x-props": {
                        "sourceKey": "gsd-h5-react:Container",
                        "data": {
                          "_visible": true
                        },
                        "dataTypes": [
                          {
                            "propertyPath": "title",
                            "type": "static"
                          }
                        ],
                        "commonStyle": {
                          "padding": "0.1786rem 0.7143rem",
                          "color": "rgb(255, 255, 255)",
                          "borderRadius": "0 0.7143rem",
                          "background": "rgb(50, 129, 248)",
                          "position": "absolute",
                          "right": "0",
                          "top": "0",
                          "paddingTop": "0.1786rem",
                          "paddingLeft": "0.7143rem",
                          "paddingRight": "0.7143rem",
                          "borderTopLeftRadius": "0",
                          "borderTopRightRadius": "0.7143rem",
                          "borderBottomLeftRadius": "0.7143rem"
                        },
                        "classNameList": [
                          "label"
                        ]
                      },
                      "x-index": 0,
                      "properties": {
                        "id19": {
                          "key": "id19",
                          "x-component": "gsd-h5-react:text",
                          "x-props": {
                            "sourceKey": "gsd-h5-react:Text",
                            "data": {
                              "decode": false,
                              "selectable": false,
                              "_visible": true
                            },
                            "dataBinds": {
                              "text": (forItems) => forItems.id12.label
                            },
                            "dataTypes": [
                              {
                                "propertyPath": "decode",
                                "type": "static"
                              },
                              {
                                "propertyPath": "selectable",
                                "type": "static"
                              },
                              {
                                "propertyPath": "text",
                                "type": "bind"
                              }
                            ],
                            "commonStyle": {
                              "fontSize": "0.8571rem"
                            }
                          },
                          "x-index": 1
                        }
                      }
                    }
                  }
                }
              }
            },
            "id35": {
              "key": "id35",
              "x-component": "gsd-h5-react:container",
              "x-props": {
                "sourceKey": "gsd-h5-react:Container",
                "dataBinds": {
                  "_visible": (forItems, event) => (!($page.dataset.state.list || []).slice().length)
                },
                "dataTypes": [
                  {
                    "propertyPath": "title",
                    "type": "static"
                  },
                  {
                    "propertyPath": "_visible",
                    "type": "bind"
                  }
                ],
                "commonStyle": {
                  "textAlign": "center"
                }
              },
              "x-index": 1,
              "properties": {
                "id34": {
                  "key": "id34",
                  "x-component": "gsd-h5-react:text",
                  "x-props": {
                    "sourceKey": "gsd-h5-react:Text",
                    "data": {
                      "text": "暂无邀约记录",
                      "decode": false,
                      "selectable": false,
                      "_visible": true
                    },
                    "dataTypes": [
                      {
                        "propertyPath": "text",
                        "type": "static"
                      },
                      {
                        "propertyPath": "decode",
                        "type": "static"
                      },
                      {
                        "propertyPath": "selectable",
                        "type": "static"
                      }
                    ],
                    "commonStyle": {
                      "textAlign": "center"
                    }
                  },
                  "x-index": 0
                }
              }
            }
          }
        }
      }
    }
  }
};
const pageListenerInstances = [];
const widgetsContext = {
  "id36": {
    "tip": "",
    "text": "加载中...",
    "type": "loading",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "CLOUDBASE_STANDARD:StatusTip",
    "_parentId": "id29"
  },
  "id29": {
    "title": "",
    "style": {
      "paddingTop": "1.0714rem",
      "paddingBottom": "1.0714rem",
      "display": "flex",
      "justifyContent": "center",
      "alignItems": "center",
      "flexDirection": "row"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id38"
  },
  "id27": {
    "decode": false,
    "selectable": false,
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id15"
  },
  "id15": {
    "title": "",
    "_visible": true,
    "style": {
      "paddingTop": "0.8929rem",
      "paddingBottom": "0.7143rem",
      "display": "block",
      "fontSize": "0.9286rem",
      "minHeight": "3.5714rem"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id12"
  },
  "id24": {
    "decode": false,
    "selectable": false,
    "_visible": true,
    "style": {
      "display": "inline",
      "color": "rgb(136, 136, 136)",
      "fontSize": "0.8571rem"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id23"
  },
  "id23": {
    "title": "",
    "_visible": true,
    "style": {
      "display": "inline-block"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id21"
  },
  "id37": {
    "align": "top",
    "content": "",
    "reverse": false,
    "thumbSize": 60,
    "subtitleType": "raw",
    "isCustomMedia": false,
    "isCustomContent": false,
    "_visible": true,
    "style": {},
    "classList": [
      "userMediaItem"
    ],
    "widgetType": "CLOUDBASE_STANDARD:Media",
    "_parentId": "id21"
  },
  "id21": {
    "title": "",
    "_visible": true,
    "style": {
      "display": "flex",
      "justifyContent": "space-between",
      "alignItems": "center",
      "flexFlow": "row nowrap",
      "flexDirection": "row"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id16"
  },
  "id16": {
    "title": "",
    "_visible": true,
    "style": {
      "paddingTop": "0.7143rem",
      "borderTop": "0.0357rem solid rgb(238, 238, 238)"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id12"
  },
  "id19": {
    "decode": false,
    "selectable": false,
    "_visible": true,
    "style": {
      "fontSize": "0.8571rem"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id18"
  },
  "id18": {
    "title": "",
    "_visible": true,
    "style": {
      "padding": "0.1786rem 0.7143rem",
      "color": "rgb(255, 255, 255)",
      "borderRadius": "0 0.7143rem",
      "background": "rgb(50, 129, 248)",
      "position": "absolute",
      "right": "0",
      "top": "0",
      "paddingTop": "0.1786rem",
      "paddingLeft": "0.7143rem",
      "paddingRight": "0.7143rem",
      "borderTopLeftRadius": "0",
      "borderTopRightRadius": "0.7143rem",
      "borderBottomLeftRadius": "0.7143rem"
    },
    "classList": [
      "label"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id12"
  },
  "id12": {
    "title": "",
    "style": {
      "marginBottom": "1.4286rem",
      "padding": "0.7143rem",
      "borderRadius": "0.7143rem",
      "background": "rgb(255, 255, 255)",
      "position": "relative",
      "paddingTop": "0.7143rem",
      "paddingLeft": "0.7143rem",
      "paddingBottom": "0.7143rem"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id33"
  },
  "id33": {
    "title": "",
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id32"
  },
  "id34": {
    "text": "暂无邀约记录",
    "decode": false,
    "selectable": false,
    "_visible": true,
    "style": {
      "textAlign": "center"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id35"
  },
  "id35": {
    "title": "",
    "style": {
      "textAlign": "center"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id32"
  },
  "id32": {
    "title": "",
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id38"
  },
  "id38": {
    "title": "",
    "_visible": true,
    "style": {
      "width": "100%",
      "padding": "1.4286rem",
      "fontSize": "1.0000rem",
      "background": "rgb(241, 245, 246)",
      "position": "absolute",
      "left": "0",
      "right": "0",
      "minHeight": "100%"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container"
  }
};
const dataBinds = {
  "id29": {
    "_visible": () => $page.dataset.state.loading
  },
  "id27": {
    "text": (forItems) => forItems.id12.response
  },
  "id24": {
    "text": (forItems) => forItems.id12.createdTime
  },
  "id37": {
    "title": (forItems) => forItems.id12.name,
    "mediaUrl": (forItems) => forItems.id12.avator,
    "subtitle": (forItems, event) => (forItems.id12.types.join(' / '))
  },
  "id19": {
    "text": (forItems) => forItems.id12.label
  },
  "id12": {
    "_waFor": (forItems, event) => (($page.dataset.state.list||[]).slice())
  },
  "id33": {
    "_visible": (forItems, event) => ($page.dataset.state.list && $page.dataset.state.list.slice().length)
  },
  "id35": {
    "_visible": (forItems, event) => (!($page.dataset.state.list || []).slice().length)
  },
  "id32": {
    "_visible": (forItems, event) => (!$page.dataset.state.loading)
  }
};

AppLifeCycle.beforeCustomLaunch = (query)=>{
  updateDatasetParams('$global', query || {})
  buildDataVarFetchFn('$global')
  createStateDatasrouceVar('$global',{app})
};
PageLifeCycle.beforePageCustomLaunch = (query) => {
  updateDatasetParams('invacations', query || {})
  createStateDatasrouceVar('invacations',{app, $page})
  buildDataVarFetchFn('invacations');
};
// lifecycle
initLifeCycle({
  ...AppLifeCycle,
  ...PageLifeCycle
}, app, mainApp)


// Init
export default function App() {
  useScrollTop()

  Object.assign($page, {
    id:'invacations',
    state: observable(initPageState),
    computed: createComputed(computed),
    dataVar: createDataVar('invacations'),
    handler
  })
  let dataset = createDataset('invacations', {app, $page})
  $page.dataset = dataset
  $page.state.dataset = dataset

  $page.widgets = createWidgets(widgetsContext, dataBinds)
  // widgets 内的 dataBinds 可能需要关联 widgets，需要重新执行 dataBinds
  retryDataBinds()
  // Web 环境页面级别生命周期
  if (!process.env.isMiniprogram) {
    React.useEffect(() => {
      document.title = "我的邀约"
    }, [])
    pageLifeCycleMount(React.useEffect, PageLifeCycle, app)
  }

  return (
    <div className="weapps-page">
      <AppRender
        pageListenerInstances={pageListenerInstances}
        virtualFields={virtualFields}
        componentSchema={componentSchema}
      />
    </div>
  );
}

export function renderToString() {
  return ReactDOMServer.renderToString(<App />);
}
