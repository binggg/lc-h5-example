// Import Libs and Handlers
import * as React from 'react'
import { observable } from 'mobx'
import { AppRender } from 'handlers/render'
import { initLifeCycle, pageLifeCycleMount } from 'handlers/lifecycle'
import { createComputed } from 'utils'
import AppLifeCycle from 'lowcode/lifecycle'
import { createDataVar, buildDataVarFetchFn, createDataset, updateDatasetParams, createStateDatasrouceVar } from '@/datasources'
import PageLifeCycle from '../../lowcode/favorites/lifecycle'
import initPageState from '../../lowcode/favorites/state'
import computed from '../../lowcode/favorites/computed'
import { $$_favorites as handler } from '../../app/handlers'
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
import CloudbaseStandardItemList from 'libraries/CLOUDBASE_STANDARD@1612432272646/components/ItemList';
import CloudbaseStandardMedia from 'libraries/CLOUDBASE_STANDARD@1612432272646/components/Media';
import GsdH5ReactText from 'libraries/gsd-h5-react@0.0.61/components/Text'

// Import Plugins


// Import Actions


// Actions

// Plugin
const pluginInstances = [];
const virtualFields = {
  "gsd-h5-react:Container": (props) => <GsdH5ReactContainer {...props} pageVirtualFields={virtualFields}/>,
  "CLOUDBASE_STANDARD:ItemList": (props) => <CloudbaseStandardItemList {...props} pageVirtualFields={virtualFields}/>,
  "CLOUDBASE_STANDARD:Media": (props) => <CloudbaseStandardMedia {...props} pageVirtualFields={virtualFields}/>,
  "gsd-h5-react:Text": (props) => <GsdH5ReactText {...props} pageVirtualFields={virtualFields}/>
};
const componentSchema = {
  "type": "object",
  "x-index": 0,
  "properties": {
    "id1": {
      "key": "id1",
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
          "paddingBottom": "1.4286rem"
        }
      },
      "x-index": 0,
      "properties": {
        "id2": {
          "key": "id2",
          "x-component": "cloudbase_standard:itemlist",
          "x-props": {
            "sourceKey": "CLOUDBASE_STANDARD:ItemList",
            "data": {
              "tips": {
                "empty": "暂无数据",
                "loading": "加载中..."
              },
              "items": "",
              "bordered": false,
              "borderPosition": "horizontal",
              "isCustomRender": true,
              "_visible": true
            },
            "dataBinds": {
              "list": () => $page.dataset.state.list,
              "loading": () => $page.dataset.state.loading
            },
            "dataTypes": [
              {
                "propertyPath": "tips",
                "type": "static"
              },
              {
                "propertyPath": "items",
                "type": "slot"
              },
              {
                "propertyPath": "title",
                "type": "static"
              },
              {
                "propertyPath": "bordered",
                "type": "static"
              },
              {
                "propertyPath": "borderPosition",
                "type": "static"
              },
              {
                "propertyPath": "isCustomRender",
                "type": "static"
              },
              {
                "propertyPath": "list",
                "type": "bind"
              },
              {
                "propertyPath": "loading",
                "type": "bind"
              }
            ],
            "classNameList": [
              "itemlist"
            ]
          },
          "properties": {
            "items": {
              "key": "items",
              "properties": {
                "id3": {
                  "key": "id3",
                  "x-component": "gsd-h5-react:container",
                  "x-props": {
                    "sourceKey": "gsd-h5-react:Container",
                    "dataBinds": {
                      "_visible": (forItems, event) => (!$page.dataset.state.loading && $page.dataset.state.list.length),
                      "_waFor": (forItems, event) => (($page.dataset.state.list||[]).slice())
                    },
                    "dataTypes": [
                      {
                        "propertyPath": "title",
                        "type": "static"
                      },
                      {
                        "propertyPath": "_visible",
                        "type": "bind"
                      },
                      {
                        "propertyPath": "_waFor",
                        "type": "bind"
                      }
                    ],
                    "commonStyle": {
                      "margin": "0 0.7143rem 0",
                      "padding": "0.7143rem",
                      "color": "rgb(0, 0, 0)",
                      "borderBottom": "0.0357rem solid rgb(238, 238, 238)"
                    },
                    "listenerInstances": [
                      {
                        "key": "",
                        "trigger": "tap",
                        "isCapturePhase": false,
                        "noPropagation": false,
                        "instanceFunction": handler.onTabListItem,
                        "dataBinds": {
                          "target": (forItems) => forItems.id15.id
                        }
                      }
                    ]
                  },
                  "x-index": 0,
                  "properties": {
                    "id4": {
                      "key": "id4",
                      "x-component": "cloudbase_standard:media",
                      "x-props": {
                        "sourceKey": "CLOUDBASE_STANDARD:Media",
                        "data": {
                          "align": "top",
                          "reverse": false,
                          "thumbSize": 90,
                          "subtitleType": "label",
                          "isCustomMedia": false,
                          "isCustomContent": false,
                          "_visible": true
                        },
                        "dataBinds": {
                          "title": (forItems) => forItems.id3.name,
                          "content": (forItems, event) => (forItems.id3.tags.join(' | ')),
                          "mediaUrl": (forItems) => forItems.id3.avator,
                          "subtitle": (forItems) => forItems.id3.type.text
                        },
                        "dataTypes": [
                          {
                            "propertyPath": "align",
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
                            "propertyPath": "content",
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
                        "commonStyle": {
                          "marginBottom": "0.5357rem"
                        },
                        "classNameList": [
                          "userMediaItem"
                        ]
                      },
                      "x-index": 1,
                      "properties": {
                        "customMedia": {
                          "key": "customMedia"
                        },
                        "customContent": {
                          "key": "customContent"
                        }
                      }
                    },
                    "id5": {
                      "key": "id5",
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
                          "marginBottom": "0.7143rem"
                        }
                      },
                      "x-index": 2,
                      "properties": {
                        "id7": {
                          "key": "id7",
                          "x-component": "gsd-h5-react:text",
                          "x-props": {
                            "sourceKey": "gsd-h5-react:Text",
                            "data": {
                              "decode": false,
                              "selectable": false,
                              "_visible": true
                            },
                            "dataBinds": {
                              "text": (forItems) => forItems.id3.description
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
                              "fontSize": "1.0000rem"
                            }
                          },
                          "x-index": 1
                        }
                      }
                    },
                    "id6": {
                      "key": "id6",
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
                          "fontSize": "0.7143rem"
                        }
                      },
                      "x-index": 3,
                      "properties": {
                        "id8": {
                          "key": "id8",
                          "x-component": "gsd-h5-react:text",
                          "x-props": {
                            "sourceKey": "gsd-h5-react:Text",
                            "data": {
                              "text": "邀约量",
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
                              "display": "inline",
                              "color": "rgb(136, 136, 136)"
                            }
                          },
                          "x-index": 0
                        },
                        "id9": {
                          "key": "id9",
                          "x-component": "gsd-h5-react:text",
                          "x-props": {
                            "sourceKey": "gsd-h5-react:Text",
                            "data": {
                              "decode": false,
                              "selectable": false,
                              "_visible": true
                            },
                            "dataBinds": {
                              "text": (forItems) => forItems.id3.invitations
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
                              "marginRight": "0.1071rem",
                              "marginLeft": "0.1071rem",
                              "display": "inline-block",
                              "color": "rgb(68, 144, 238)",
                              "fontSize": "0.8571rem",
                              "fontWeight": "bolder"
                            }
                          },
                          "x-index": 1
                        },
                        "id10": {
                          "key": "id10",
                          "x-component": "gsd-h5-react:text",
                          "x-props": {
                            "sourceKey": "gsd-h5-react:Text",
                            "data": {
                              "text": "次",
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
                              "display": "inline",
                              "color": "rgb(136, 136, 136)"
                            }
                          },
                          "x-index": 2
                        }
                      }
                    }
                  }
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
  "id4": {
    "align": "top",
    "reverse": false,
    "thumbSize": 90,
    "subtitleType": "label",
    "isCustomMedia": false,
    "isCustomContent": false,
    "_visible": true,
    "style": {
      "marginBottom": "0.5357rem"
    },
    "classList": [
      "userMediaItem"
    ],
    "widgetType": "CLOUDBASE_STANDARD:Media",
    "_parentId": "id3"
  },
  "id7": {
    "decode": false,
    "selectable": false,
    "_visible": true,
    "style": {
      "fontSize": "1.0000rem"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id5"
  },
  "id5": {
    "title": "",
    "_visible": true,
    "style": {
      "marginBottom": "0.7143rem"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id3"
  },
  "id8": {
    "text": "邀约量",
    "decode": false,
    "selectable": false,
    "_visible": true,
    "style": {
      "display": "inline",
      "color": "rgb(136, 136, 136)"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id6"
  },
  "id9": {
    "decode": false,
    "selectable": false,
    "_visible": true,
    "style": {
      "marginRight": "0.1071rem",
      "marginLeft": "0.1071rem",
      "display": "inline-block",
      "color": "rgb(68, 144, 238)",
      "fontSize": "0.8571rem",
      "fontWeight": "bolder"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id6"
  },
  "id10": {
    "text": "次",
    "decode": false,
    "selectable": false,
    "_visible": true,
    "style": {
      "display": "inline",
      "color": "rgb(136, 136, 136)"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id6"
  },
  "id6": {
    "title": "",
    "_visible": true,
    "style": {
      "fontSize": "0.7143rem"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id3"
  },
  "id3": {
    "title": "",
    "style": {
      "margin": "0 0.7143rem 0",
      "padding": "0.7143rem",
      "color": "rgb(0, 0, 0)",
      "borderBottom": "0.0357rem solid rgb(238, 238, 238)"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id2"
  },
  "id2": {
    "tips": {
      "empty": "暂无数据",
      "loading": "加载中..."
    },
    "items": "",
    "title": "",
    "bordered": false,
    "borderPosition": "horizontal",
    "isCustomRender": true,
    "_visible": true,
    "style": {},
    "classList": [
      "itemlist"
    ],
    "widgetType": "CLOUDBASE_STANDARD:ItemList",
    "_parentId": "id1"
  },
  "id1": {
    "title": "",
    "_visible": true,
    "style": {
      "paddingBottom": "1.4286rem"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container"
  }
};
const dataBinds = {
  "id4": {
    "title": (forItems) => forItems.id3.name,
    "content": (forItems, event) => (forItems.id3.tags.join(' | ')),
    "mediaUrl": (forItems) => forItems.id3.avator,
    "subtitle": (forItems) => forItems.id3.type.text
  },
  "id7": {
    "text": (forItems) => forItems.id3.description
  },
  "id9": {
    "text": (forItems) => forItems.id3.invitations
  },
  "id3": {
    "_visible": (forItems, event) => (!$page.dataset.state.loading && $page.dataset.state.list.length),
    "_waFor": (forItems, event) => (($page.dataset.state.list||[]).slice())
  },
  "id2": {
    "list": () => $page.dataset.state.list,
    "loading": () => $page.dataset.state.loading
  }
};

AppLifeCycle.beforeCustomLaunch = (query)=>{
  updateDatasetParams('$global', query || {})
  buildDataVarFetchFn('$global')
  createStateDatasrouceVar('$global',{app})
};
PageLifeCycle.beforePageCustomLaunch = (query) => {
  updateDatasetParams('favorites', query || {})
  createStateDatasrouceVar('favorites',{app, $page})
  buildDataVarFetchFn('favorites');
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
    id:'favorites',
    state: observable(initPageState),
    computed: createComputed(computed),
    dataVar: createDataVar('favorites'),
    handler
  })
  let dataset = createDataset('favorites', {app, $page})
  $page.dataset = dataset
  $page.state.dataset = dataset

  $page.widgets = createWidgets(widgetsContext, dataBinds)
  // widgets 内的 dataBinds 可能需要关联 widgets，需要重新执行 dataBinds
  retryDataBinds()
  // Web 环境页面级别生命周期
  if (!process.env.isMiniprogram) {
    React.useEffect(() => {
      document.title = "我的收藏"
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
