// Import Libs and Handlers
import * as React from 'react'
import { observable } from 'mobx'
import { AppRender } from 'handlers/render'
import { initLifeCycle, pageLifeCycleMount } from 'handlers/lifecycle'
import { createComputed } from 'utils'
import AppLifeCycle from 'lowcode/lifecycle'
import { createDataVar, buildDataVarFetchFn, createDataset, updateDatasetParams, createStateDatasrouceVar } from '@/datasources'
import PageLifeCycle from '../../lowcode/graph/lifecycle'
import initPageState from '../../lowcode/graph/state'
import computed from '../../lowcode/graph/computed'
import { $$_graph as handler } from '../../app/handlers'
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
import GsdH5ReactText from 'libraries/gsd-h5-react@0.0.61/components/Text';
import CloudbaseStandardTabBar from 'libraries/CLOUDBASE_STANDARD@1612432272646/components/TabBar';
import CloudbaseStandardNavBar from 'libraries/CLOUDBASE_STANDARD@1612432272646/components/NavBar'

// Import Plugins


// Import Actions


// Actions

// Plugin
const pluginInstances = [];
const virtualFields = {
  "gsd-h5-react:Container": (props) => <GsdH5ReactContainer {...props} pageVirtualFields={virtualFields}/>,
  "gsd-h5-react:Text": (props) => <GsdH5ReactText {...props} pageVirtualFields={virtualFields}/>,
  "CLOUDBASE_STANDARD:TabBar": (props) => <CloudbaseStandardTabBar {...props} pageVirtualFields={virtualFields}/>,
  "CLOUDBASE_STANDARD:NavBar": (props) => <CloudbaseStandardNavBar {...props} pageVirtualFields={virtualFields}/>
};
const componentSchema = {
  "type": "object",
  "x-index": 0,
  "properties": {
    "id7": {
      "key": "id7",
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
          "paddingBottom": "3.2143rem"
        }
      },
      "x-index": 1,
      "properties": {
        "id8": {
          "key": "id8",
          "x-component": "gsd-h5-react:container",
          "x-props": {
            "sourceKey": "gsd-h5-react:Container",
            "dataBinds": {
              "_waFor": () => $page.dataset.state.list
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
              "height": "7.1429rem",
              "marginRight": "1.4286rem",
              "marginBottom": "1.4286rem",
              "marginLeft": "1.4286rem",
              "borderRadius": "0.8929rem",
              "position": "relative",
              "overflow": "hidden"
            },
            "styleBind": {
              "style": (forItems, event) => (forItems.id8.background?{background: `#eee center/cover no-repeat url(${forItems.id8.background})`}:{})
            }
          },
          "x-index": 1,
          "properties": {
            "id11": {
              "key": "id11",
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
                  "height": "100%",
                  "display": "flex",
                  "justifyContent": "center",
                  "alignItems": "center",
                  "flexFlow": "row nowrap",
                  "zIndex": "1",
                  "position": "absolute",
                  "left": "0",
                  "right": "0",
                  "top": "0",
                  "bottom": "0"
                },
                "listenerInstances": [
                  {
                    "key": "",
                    "trigger": "tap",
                    "isCapturePhase": false,
                    "noPropagation": false,
                    "instanceFunction": handler.onTabListItem,
                    "dataBinds": {
                      "target": (forItems) => forItems.id8.id
                    }
                  }
                ]
              },
              "x-index": 1,
              "properties": {
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
                      "text": (forItems) => forItems.id8.text
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
                      "color": "rgb(255, 255, 255)",
                      "fontSize": "1.4286rem",
                      "textAlign": "center",
                      "fontWeight": "bolder",
                      "wordSpacing": "0.5357rem",
                      "letterSpacing": "0.1071rem"
                    }
                  },
                  "x-index": 0
                }
              }
            },
            "id12": {
              "key": "id12",
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
                  "opacity": 0.3,
                  "background": "rgb(0, 0, 0)",
                  "position": "absolute",
                  "left": "0",
                  "right": "0",
                  "top": "0",
                  "bottom": "0"
                }
              },
              "x-index": 0
            }
          }
        }
      }
    },
    "id13": {
      "key": "id13",
      "x-component": "cloudbase_standard:tabbar",
      "x-props": {
        "sourceKey": "CLOUDBASE_STANDARD:TabBar",
        "data": {
          "color": "#444444",
          "route": true,
          "iconSize": 40,
          "position": "bottom",
          "routeType": "redirectTo",
          "activeColor": "#006EFF",
          "backgroundColor": "#FFF",
          "backgroundImage": "",
          "_visible": true
        },
        "dataBinds": {
          "tabs": (forItems, event) => ($page.handler.getNavigateConfig()),
          "value": (forItems, event) => ($page.id)
        },
        "dataTypes": [
          {
            "propertyPath": "color",
            "type": "static"
          },
          {
            "propertyPath": "route",
            "type": "static"
          },
          {
            "propertyPath": "iconSize",
            "type": "static"
          },
          {
            "propertyPath": "position",
            "type": "static"
          },
          {
            "propertyPath": "routeType",
            "type": "static"
          },
          {
            "propertyPath": "activeColor",
            "type": "static"
          },
          {
            "propertyPath": "backgroundColor",
            "type": "static"
          },
          {
            "propertyPath": "backgroundImage",
            "type": "static"
          },
          {
            "propertyPath": "tabs",
            "type": "bind"
          },
          {
            "propertyPath": "value",
            "type": "bind"
          },
          {
            "propertyPath": "tabbar",
            "type": "slot"
          }
        ]
      },
      "x-index": 2,
      "properties": {
        "tabbar": {
          "key": "tabbar"
        }
      }
    },
    "id14": {
      "key": "id14",
      "x-component": "cloudbase_standard:navbar",
      "x-props": {
        "sourceKey": "CLOUDBASE_STANDARD:NavBar",
        "data": {
          "end": "",
          "back": false,
          "home": false,
          "mode": "default",
          "start": "",
          "title": "岗位信息",
          "center": "",
          "textSize": 28,
          "iconTheme": "black",
          "textColor": "rgba(0, 0, 0, 1)",
          "backgroundColor": "rgba(255, 255, 255, 1)",
          "_visible": true
        },
        "dataTypes": [
          {
            "propertyPath": "end",
            "type": "slot"
          },
          {
            "propertyPath": "back",
            "type": "static"
          },
          {
            "propertyPath": "home",
            "type": "static"
          },
          {
            "propertyPath": "mode",
            "type": "static"
          },
          {
            "propertyPath": "start",
            "type": "slot"
          },
          {
            "propertyPath": "title",
            "type": "static"
          },
          {
            "propertyPath": "center",
            "type": "slot"
          },
          {
            "propertyPath": "textSize",
            "type": "static"
          },
          {
            "propertyPath": "iconTheme",
            "type": "static"
          },
          {
            "propertyPath": "textColor",
            "type": "static"
          },
          {
            "propertyPath": "backgroundColor",
            "type": "static"
          }
        ]
      },
      "x-index": 0,
      "properties": {
        "start": {
          "key": "start"
        },
        "center": {
          "key": "center"
        },
        "end": {
          "key": "end"
        }
      }
    }
  }
};
const pageListenerInstances = [];
const widgetsContext = {
  "id9": {
    "decode": false,
    "selectable": false,
    "_visible": true,
    "style": {
      "color": "rgb(255, 255, 255)",
      "fontSize": "1.4286rem",
      "textAlign": "center",
      "fontWeight": "bolder",
      "wordSpacing": "0.5357rem",
      "letterSpacing": "0.1071rem"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id11"
  },
  "id11": {
    "title": "",
    "_visible": true,
    "style": {
      "height": "100%",
      "display": "flex",
      "justifyContent": "center",
      "alignItems": "center",
      "flexFlow": "row nowrap",
      "zIndex": "1",
      "position": "absolute",
      "left": "0",
      "right": "0",
      "top": "0",
      "bottom": "0"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id8"
  },
  "id12": {
    "title": "",
    "_visible": true,
    "style": {
      "opacity": 0.3,
      "background": "rgb(0, 0, 0)",
      "position": "absolute",
      "left": "0",
      "right": "0",
      "top": "0",
      "bottom": "0"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id8"
  },
  "id8": {
    "title": "",
    "style": {
      "height": "7.1429rem",
      "marginRight": "1.4286rem",
      "marginBottom": "1.4286rem",
      "marginLeft": "1.4286rem",
      "borderRadius": "0.8929rem",
      "position": "relative",
      "overflow": "hidden"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id7"
  },
  "id7": {
    "title": "",
    "_visible": true,
    "style": {
      "paddingTop": "0.7143rem",
      "paddingBottom": "3.2143rem"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container"
  },
  "id13": {
    "color": "#444444",
    "route": true,
    "iconSize": 40,
    "position": "bottom",
    "routeType": "redirectTo",
    "activeColor": "#006EFF",
    "backgroundColor": "#FFF",
    "backgroundImage": "",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "CLOUDBASE_STANDARD:TabBar"
  },
  "id14": {
    "end": "",
    "back": false,
    "home": false,
    "mode": "default",
    "start": "",
    "title": "岗位信息",
    "center": "",
    "textSize": 28,
    "iconTheme": "black",
    "textColor": "rgba(0, 0, 0, 1)",
    "backgroundColor": "rgba(255, 255, 255, 1)",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "CLOUDBASE_STANDARD:NavBar"
  }
};
const dataBinds = {
  "id9": {
    "text": (forItems) => forItems.id8.text
  },
  "id8": {
    "_waFor": () => $page.dataset.state.list,
    "style": (forItems, event) => (forItems.id8.background?{background: `#eee center/cover no-repeat url(${forItems.id8.background})`}:{})
  },
  "id13": {
    "tabs": (forItems, event) => ($page.handler.getNavigateConfig()),
    "value": (forItems, event) => ($page.id)
  }
};

AppLifeCycle.beforeCustomLaunch = (query)=>{
  updateDatasetParams('$global', query || {})
  buildDataVarFetchFn('$global')
  createStateDatasrouceVar('$global',{app})
};
PageLifeCycle.beforePageCustomLaunch = (query) => {
  updateDatasetParams('graph', query || {})
  createStateDatasrouceVar('graph',{app, $page})
  buildDataVarFetchFn('graph');
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
    id:'graph',
    state: observable(initPageState),
    computed: createComputed(computed),
    dataVar: createDataVar('graph'),
    handler
  })
  let dataset = createDataset('graph', {app, $page})
  $page.dataset = dataset
  $page.state.dataset = dataset

  $page.widgets = createWidgets(widgetsContext, dataBinds)
  // widgets 内的 dataBinds 可能需要关联 widgets，需要重新执行 dataBinds
  retryDataBinds()
  // Web 环境页面级别生命周期
  if (!process.env.isMiniprogram) {
    React.useEffect(() => {
      document.title = "岗位信息"
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
