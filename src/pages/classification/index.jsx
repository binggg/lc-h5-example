// Import Libs and Handlers
import * as React from 'react'
import { observable } from 'mobx'
import { AppRender } from 'handlers/render'
import { initLifeCycle, pageLifeCycleMount } from 'handlers/lifecycle'
import { createComputed } from 'utils'
import AppLifeCycle from 'lowcode/lifecycle'
import { createDataVar, buildDataVarFetchFn, createDataset, updateDatasetParams, createStateDatasrouceVar } from '@/datasources'
import PageLifeCycle from '../../lowcode/classification/lifecycle'
import initPageState from '../../lowcode/classification/state'
import computed from '../../lowcode/classification/computed'
import { $$_classification as handler } from '../../app/handlers'
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
import CloudbaseStandardClassification from 'libraries/CLOUDBASE_STANDARD@1612432272646/components/Classification';
import GsdH5ReactContainer from 'libraries/gsd-h5-react@0.0.61/components/Container';
import GsdH5ReactText from 'libraries/gsd-h5-react@0.0.61/components/Text'

// Import Plugins


// Import Actions


// Actions

// Plugin
const pluginInstances = [];
const virtualFields = {
  "CLOUDBASE_STANDARD:Classification": (props) => <CloudbaseStandardClassification {...props} pageVirtualFields={virtualFields}/>,
  "gsd-h5-react:Container": (props) => <GsdH5ReactContainer {...props} pageVirtualFields={virtualFields}/>,
  "gsd-h5-react:Text": (props) => <GsdH5ReactText {...props} pageVirtualFields={virtualFields}/>
};
const componentSchema = {
  "type": "object",
  "x-index": 0,
  "properties": {
    "id12": {
      "key": "id12",
      "x-component": "cloudbase_standard:classification",
      "x-props": {
        "sourceKey": "CLOUDBASE_STANDARD:Classification",
        "data": {
          "defaultValue": "",
          "_visible": true
        },
        "dataBinds": {
          "list": () => $page.dataset.state.types,
          "value": () => $page.dataset.state.selectedType
        },
        "dataTypes": [
          {
            "propertyPath": "defaultValue",
            "type": "static"
          },
          {
            "propertyPath": "list",
            "type": "bind"
          },
          {
            "propertyPath": "value",
            "type": "bind"
          },
          {
            "propertyPath": "content",
            "type": "slot"
          }
        ],
        "listenerInstances": [
          {
            "key": "",
            "trigger": "change",
            "isCapturePhase": false,
            "noPropagation": false,
            "instanceFunction": handler.onClickSidebar,
            "data": {
              "target": ""
            }
          }
        ]
      },
      "x-index": 0,
      "properties": {
        "content": {
          "key": "content",
          "properties": {
            "id3": {
              "key": "id3",
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
                  "width": "75%",
                  "padding": "1.4286rem",
                  "display": "block",
                  "position": "fixed",
                  "right": "0",
                  "top": "0",
                  "bottom": "0"
                },
                "classNameList": [
                  "content"
                ]
              },
              "x-index": 0,
              "properties": {
                "id6": {
                  "key": "id6",
                  "x-component": "gsd-h5-react:text",
                  "x-props": {
                    "sourceKey": "gsd-h5-react:Text",
                    "data": {
                      "decode": false,
                      "selectable": false,
                      "_visible": true
                    },
                    "dataBinds": {
                      "text": (forItems, event) => ($page.handler.getValue().text)
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
                      "marginBottom": "0.7143rem",
                      "display": "block",
                      "color": "rgb(77, 74, 74)",
                      "fontSize": "1.0714rem",
                      "fontWeight": "bolder"
                    }
                  },
                  "x-index": 1
                },
                "id8": {
                  "key": "id8",
                  "x-component": "gsd-h5-react:container",
                  "x-props": {
                    "sourceKey": "gsd-h5-react:Container",
                    "dataBinds": {
                      "_visible": (forItems, event) => ($page.handler.getValue()?true:false)
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
                      "display": "flex",
                      "justifyContent": "flex-start",
                      "alignItems": "center",
                      "flexFlow": "row wrap",
                      "flexWrap": "wrap"
                    }
                  },
                  "x-index": 2,
                  "properties": {
                    "id9": {
                      "key": "id9",
                      "x-component": "gsd-h5-react:container",
                      "x-props": {
                        "sourceKey": "gsd-h5-react:Container",
                        "dataBinds": {
                          "_waFor": (forItems, event) => ($page.handler.getValue().jobTypes || [])
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
                          "marginTop": "0",
                          "marginRight": "0.7143rem",
                          "marginBottom": "0.7143rem",
                          "padding": "0 0.7143rem",
                          "fontSize": "0.8929rem",
                          "border": "0.0357rem solid rgb(136, 136, 136)",
                          "borderRadius": "1.7857rem",
                          "background": "rgb(255, 255, 255)"
                        }
                      },
                      "x-index": 1,
                      "properties": {
                        "id10": {
                          "key": "id10",
                          "x-component": "gsd-h5-react:text",
                          "x-props": {
                            "sourceKey": "gsd-h5-react:Text",
                            "data": {
                              "decode": false,
                              "selectable": false,
                              "_visible": true
                            },
                            "dataBinds": {
                              "text": (forItems) => forItems.id9
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
                            "listenerInstances": [
                              {
                                "key": "",
                                "trigger": "tap",
                                "isCapturePhase": false,
                                "noPropagation": false,
                                "instanceFunction": handler.navigate,
                                "dataBinds": {
                                  "target": (forItems) => forItems.id9
                                }
                              }
                            ]
                          },
                          "x-index": 1
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
  "id6": {
    "decode": false,
    "selectable": false,
    "_visible": true,
    "style": {
      "marginBottom": "0.7143rem",
      "display": "block",
      "color": "rgb(77, 74, 74)",
      "fontSize": "1.0714rem",
      "fontWeight": "bolder"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id3"
  },
  "id10": {
    "decode": false,
    "selectable": false,
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id9"
  },
  "id9": {
    "title": "",
    "style": {
      "marginTop": "0",
      "marginRight": "0.7143rem",
      "marginBottom": "0.7143rem",
      "padding": "0 0.7143rem",
      "fontSize": "0.8929rem",
      "border": "0.0357rem solid rgb(136, 136, 136)",
      "borderRadius": "1.7857rem",
      "background": "rgb(255, 255, 255)"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id8"
  },
  "id8": {
    "title": "",
    "style": {
      "display": "flex",
      "justifyContent": "flex-start",
      "alignItems": "center",
      "flexFlow": "row wrap",
      "flexWrap": "wrap"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id3"
  },
  "id3": {
    "title": "",
    "_visible": true,
    "style": {
      "width": "75%",
      "padding": "1.4286rem",
      "display": "block",
      "position": "fixed",
      "right": "0",
      "top": "0",
      "bottom": "0"
    },
    "classList": [
      "content"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id12"
  },
  "id12": {
    "defaultValue": "",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "CLOUDBASE_STANDARD:Classification"
  }
};
const dataBinds = {
  "id6": {
    "text": (forItems, event) => ($page.handler.getValue().text)
  },
  "id10": {
    "text": (forItems) => forItems.id9
  },
  "id9": {
    "_waFor": (forItems, event) => ($page.handler.getValue().jobTypes || [])
  },
  "id8": {
    "_visible": (forItems, event) => ($page.handler.getValue()?true:false)
  },
  "id12": {
    "list": () => $page.dataset.state.types,
    "value": () => $page.dataset.state.selectedType
  }
};

AppLifeCycle.beforeCustomLaunch = (query)=>{
  updateDatasetParams('$global', query || {})
  buildDataVarFetchFn('$global')
  createStateDatasrouceVar('$global',{app})
};
PageLifeCycle.beforePageCustomLaunch = (query) => {
  updateDatasetParams('classification', query || {})
  createStateDatasrouceVar('classification',{app, $page})
  buildDataVarFetchFn('classification');
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
    id:'classification',
    state: observable(initPageState),
    computed: createComputed(computed),
    dataVar: createDataVar('classification'),
    handler
  })
  let dataset = createDataset('classification', {app, $page})
  $page.dataset = dataset
  $page.state.dataset = dataset

  $page.widgets = createWidgets(widgetsContext, dataBinds)
  // widgets 内的 dataBinds 可能需要关联 widgets，需要重新执行 dataBinds
  retryDataBinds()
  // Web 环境页面级别生命周期
  if (!process.env.isMiniprogram) {
    React.useEffect(() => {
      document.title = "全部分类"
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
