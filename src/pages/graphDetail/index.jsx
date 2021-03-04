// Import Libs and Handlers
import * as React from 'react'
import { observable } from 'mobx'
import { AppRender } from 'handlers/render'
import { initLifeCycle, pageLifeCycleMount } from 'handlers/lifecycle'
import { createComputed } from 'utils'
import AppLifeCycle from 'lowcode/lifecycle'
import { createDataVar, buildDataVarFetchFn, createDataset, updateDatasetParams, createStateDatasrouceVar } from '@/datasources'
import PageLifeCycle from '../../lowcode/graphDetail/lifecycle'
import initPageState from '../../lowcode/graphDetail/state'
import computed from '../../lowcode/graphDetail/computed'
import { $$_graphDetail as handler } from '../../app/handlers'
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
import GsdH5ReactText from 'libraries/gsd-h5-react@0.0.61/components/Text'

// Import Plugins


// Import Actions


// Actions

// Plugin
const pluginInstances = [];
const virtualFields = {
  "gsd-h5-react:Container": (props) => <GsdH5ReactContainer {...props} pageVirtualFields={virtualFields}/>,
  "gsd-h5-react:Text": (props) => <GsdH5ReactText {...props} pageVirtualFields={virtualFields}/>
};
const componentSchema = {
  "type": "object",
  "x-index": 0,
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
          "paddingBottom": "0.7143rem",
          "background": "rgb(241, 245, 246)",
          "minHeight": "100%"
        }
      },
      "x-index": 1,
      "properties": {
        "id13": {
          "key": "id13",
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
              "paddingTop": "0",
              "paddingBottom": "7.1429rem",
              "display": "block",
              "position": "relative"
            },
            "styleBind": {
              "style": (forItems, event) => ({background: `#eee center/cover no-repeat url(${$page.dataset.state.data.background})`})
            }
          },
          "x-index": 0,
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
                  "width": "100%",
                  "height": "10.7143rem",
                  "display": "flex",
                  "justifyContent": "center",
                  "alignItems": "center",
                  "flexDirection": "row",
                  "position": "relative"
                }
              },
              "x-index": 1,
              "properties": {
                "id14": {
                  "key": "id14",
                  "x-component": "gsd-h5-react:text",
                  "x-props": {
                    "sourceKey": "gsd-h5-react:Text",
                    "data": {
                      "decode": false,
                      "selectable": false,
                      "_visible": true
                    },
                    "dataBinds": {
                      "text": (forItems, event) => ($page.dataset.state.data ? $page.dataset.state.data.text : '')
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
                      "fontSize": "1.7857rem",
                      "fontWeight": "bolder",
                      "wordBreak": "0.3571rem",
                      "letterSpacing": "0.1071rem"
                    }
                  },
                  "x-index": 0
                }
              }
            },
            "id26": {
              "key": "id26",
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
                  "height": "100%",
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
              "marginTop": "-7.1429rem",
              "position": "relative"
            }
          },
          "x-index": 2,
          "properties": {
            "id17": {
              "key": "id17",
              "x-component": "gsd-h5-react:container",
              "x-props": {
                "sourceKey": "gsd-h5-react:Container",
                "dataBinds": {
                  "_waFor": (forItems, event) => ($page.dataset.state.data? $page.dataset.state.data.jobs|| [] : [])
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
                  "marginRight": "1.0714rem",
                  "marginBottom": "1.0714rem",
                  "marginLeft": "1.0714rem",
                  "padding": "1.0714rem",
                  "border": "0.0357rem solid rgb(238, 238, 238)",
                  "borderRadius": "0.5357rem",
                  "backgroundColor": "rgb(255, 255, 255)",
                  "background": "rgb(255, 255, 255)",
                  "paddingTop": "1.0714rem",
                  "borderWidth": "0.0357rem",
                  "paddingLeft": "1.0714rem",
                  "paddingRight": "1.0714rem"
                }
              },
              "x-index": 1,
              "properties": {
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
                      "marginBottom": "0.3571rem",
                      "color": "rgb(0, 0, 0)",
                      "fontSize": "1.1429rem",
                      "fontWeight": "bolder"
                    }
                  },
                  "x-index": 1,
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
                          "text": (forItems) => forItems.id17.title
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
                "id20": {
                  "key": "id20",
                  "x-component": "gsd-h5-react:container",
                  "x-props": {
                    "sourceKey": "gsd-h5-react:Container",
                    "dataBinds": {
                      "_waFor": (forItems) => forItems.id17.info
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
                      "marginBottom": "0.7143rem"
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
                          "justifyContent": "flex-start",
                          "alignItems": "center",
                          "flexFlow": "row nowrap",
                          "fontSize": "1.0000rem",
                          "flexDirection": "row"
                        }
                      },
                      "x-index": 1,
                      "properties": {
                        "id22": {
                          "key": "id22",
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
                              "width": "0.3571rem",
                              "height": "0.3571rem",
                              "display": "flex",
                              "justifyContent": "center",
                              "alignItems": "center",
                              "flexFlow": "row nowrap",
                              "borderRadius": "50%",
                              "background": "rgb(112, 171, 243)",
                              "flexDirection": "row"
                            }
                          },
                          "x-index": 1
                        },
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
                              "text": (forItems) => forItems.id20.title
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
                              "marginLeft": "0.7143rem",
                              "display": "flex",
                              "justifyContent": "flex-start",
                              "alignItems": "center",
                              "flexFlow": "row nowrap",
                              "flexDirection": "row"
                            }
                          },
                          "x-index": 2
                        }
                      }
                    },
                    "id23": {
                      "key": "id23",
                      "x-component": "gsd-h5-react:container",
                      "x-props": {
                        "sourceKey": "gsd-h5-react:Container",
                        "dataBinds": {
                          "_waFor": (forItems) => forItems.id20.items
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
                          "fontSize": "0.9286rem"
                        }
                      },
                      "x-index": 2,
                      "properties": {
                        "id25": {
                          "key": "id25",
                          "x-component": "gsd-h5-react:text",
                          "x-props": {
                            "sourceKey": "gsd-h5-react:Text",
                            "data": {
                              "decode": false,
                              "selectable": false,
                              "_visible": true
                            },
                            "dataBinds": {
                              "text": (forItems) => forItems.id23
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
                              "color": "rgb(0, 0, 0)"
                            }
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
  "id14": {
    "decode": false,
    "selectable": false,
    "_visible": true,
    "style": {
      "color": "rgb(255, 255, 255)",
      "fontSize": "1.7857rem",
      "fontWeight": "bolder",
      "wordBreak": "0.3571rem",
      "letterSpacing": "0.1071rem"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id15"
  },
  "id15": {
    "title": "",
    "_visible": true,
    "style": {
      "width": "100%",
      "height": "10.7143rem",
      "display": "flex",
      "justifyContent": "center",
      "alignItems": "center",
      "flexDirection": "row",
      "position": "relative"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id13"
  },
  "id26": {
    "title": "",
    "_visible": true,
    "style": {
      "width": "100%",
      "height": "100%",
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
    "_parentId": "id13"
  },
  "id13": {
    "title": "",
    "_visible": true,
    "style": {
      "paddingTop": "0",
      "paddingBottom": "7.1429rem",
      "display": "block",
      "position": "relative"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id11"
  },
  "id19": {
    "decode": false,
    "selectable": false,
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id18"
  },
  "id18": {
    "title": "",
    "_visible": true,
    "style": {
      "marginBottom": "0.3571rem",
      "color": "rgb(0, 0, 0)",
      "fontSize": "1.1429rem",
      "fontWeight": "bolder"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id17"
  },
  "id22": {
    "title": "",
    "_visible": true,
    "style": {
      "width": "0.3571rem",
      "height": "0.3571rem",
      "display": "flex",
      "justifyContent": "center",
      "alignItems": "center",
      "flexFlow": "row nowrap",
      "borderRadius": "50%",
      "background": "rgb(112, 171, 243)",
      "flexDirection": "row"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id21"
  },
  "id24": {
    "decode": false,
    "selectable": false,
    "_visible": true,
    "style": {
      "marginLeft": "0.7143rem",
      "display": "flex",
      "justifyContent": "flex-start",
      "alignItems": "center",
      "flexFlow": "row nowrap",
      "flexDirection": "row"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id21"
  },
  "id21": {
    "title": "",
    "_visible": true,
    "style": {
      "display": "flex",
      "justifyContent": "flex-start",
      "alignItems": "center",
      "flexFlow": "row nowrap",
      "fontSize": "1.0000rem",
      "flexDirection": "row"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id20"
  },
  "id25": {
    "decode": false,
    "selectable": false,
    "_visible": true,
    "style": {
      "color": "rgb(0, 0, 0)"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id23"
  },
  "id23": {
    "title": "",
    "style": {
      "fontSize": "0.9286rem"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id20"
  },
  "id20": {
    "title": "",
    "style": {
      "marginBottom": "0.7143rem"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id17"
  },
  "id17": {
    "title": "",
    "style": {
      "marginRight": "1.0714rem",
      "marginBottom": "1.0714rem",
      "marginLeft": "1.0714rem",
      "padding": "1.0714rem",
      "border": "0.0357rem solid rgb(238, 238, 238)",
      "borderRadius": "0.5357rem",
      "backgroundColor": "rgb(255, 255, 255)",
      "background": "rgb(255, 255, 255)",
      "paddingTop": "1.0714rem",
      "borderWidth": "0.0357rem",
      "paddingLeft": "1.0714rem",
      "paddingRight": "1.0714rem"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id16"
  },
  "id16": {
    "title": "",
    "_visible": true,
    "style": {
      "marginTop": "-7.1429rem",
      "position": "relative"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id11"
  },
  "id11": {
    "title": "",
    "_visible": true,
    "style": {
      "paddingBottom": "0.7143rem",
      "background": "rgb(241, 245, 246)",
      "minHeight": "100%"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container"
  }
};
const dataBinds = {
  "id14": {
    "text": (forItems, event) => ($page.dataset.state.data ? $page.dataset.state.data.text : '')
  },
  "id13": {
    "style": (forItems, event) => ({background: `#eee center/cover no-repeat url(${$page.dataset.state.data.background})`})
  },
  "id19": {
    "text": (forItems) => forItems.id17.title
  },
  "id24": {
    "text": (forItems) => forItems.id20.title
  },
  "id25": {
    "text": (forItems) => forItems.id23
  },
  "id23": {
    "_waFor": (forItems) => forItems.id20.items
  },
  "id20": {
    "_waFor": (forItems) => forItems.id17.info
  },
  "id17": {
    "_waFor": (forItems, event) => ($page.dataset.state.data? $page.dataset.state.data.jobs|| [] : [])
  }
};

AppLifeCycle.beforeCustomLaunch = (query)=>{
  updateDatasetParams('$global', query || {})
  buildDataVarFetchFn('$global')
  createStateDatasrouceVar('$global',{app})
};
PageLifeCycle.beforePageCustomLaunch = (query) => {
  updateDatasetParams('graphDetail', query || {})
  createStateDatasrouceVar('graphDetail',{app, $page})
  buildDataVarFetchFn('graphDetail');
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
    id:'graphDetail',
    state: observable(initPageState),
    computed: createComputed(computed),
    dataVar: createDataVar('graphDetail'),
    handler
  })
  let dataset = createDataset('graphDetail', {app, $page})
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
