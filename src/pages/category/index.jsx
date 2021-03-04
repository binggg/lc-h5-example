// Import Libs and Handlers
import * as React from 'react'
import { observable } from 'mobx'
import { AppRender } from 'handlers/render'
import { initLifeCycle, pageLifeCycleMount } from 'handlers/lifecycle'
import { createComputed } from 'utils'
import AppLifeCycle from 'lowcode/lifecycle'
import { createDataVar, buildDataVarFetchFn, createDataset, updateDatasetParams, createStateDatasrouceVar } from '@/datasources'
import PageLifeCycle from '../../lowcode/category/lifecycle'
import initPageState from '../../lowcode/category/state'
import computed from '../../lowcode/category/computed'
import { $$_category as handler } from '../../app/handlers'
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
import GsdH5ReactScrollView from 'libraries/gsd-h5-react@0.0.61/components/ScrollView';
import GsdH5ReactText from 'libraries/gsd-h5-react@0.0.61/components/Text';
import CloudbaseStandardItemList from 'libraries/CLOUDBASE_STANDARD@1612432272646/components/ItemList';
import CloudbaseStandardMedia from 'libraries/CLOUDBASE_STANDARD@1612432272646/components/Media'

// Import Plugins


// Import Actions


// Actions

// Plugin
const pluginInstances = [];
const virtualFields = {
  "gsd-h5-react:Container": (props) => <GsdH5ReactContainer {...props} pageVirtualFields={virtualFields}/>,
  "gsd-h5-react:ScrollView": (props) => <GsdH5ReactScrollView {...props} pageVirtualFields={virtualFields}/>,
  "gsd-h5-react:Text": (props) => <GsdH5ReactText {...props} pageVirtualFields={virtualFields}/>,
  "CLOUDBASE_STANDARD:ItemList": (props) => <CloudbaseStandardItemList {...props} pageVirtualFields={virtualFields}/>,
  "CLOUDBASE_STANDARD:Media": (props) => <CloudbaseStandardMedia {...props} pageVirtualFields={virtualFields}/>
};
const componentSchema = {
  "type": "object",
  "x-index": 0,
  "properties": {
    "id46": {
      "key": "id46",
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
              "display": "flex",
              "justifyContent": "space-around",
              "alignItems": "center",
              "flexDirection": "row",
              "textAlign": "left"
            }
          },
          "x-index": 1,
          "properties": {
            "id47": {
              "key": "id47",
              "x-component": "gsd-h5-react:scrollview",
              "x-props": {
                "sourceKey": "gsd-h5-react:ScrollView",
                "data": {
                  "bounces": true,
                  "divider": "",
                  "scrollX": true,
                  "scrollY": true,
                  "enhanced": false,
                  "scrollTop": "",
                  "enableFlex": false,
                  "scrollLeft": "",
                  "pagingEnabled": "",
                  "showScrollbar": true,
                  "lowerThreshold": 50,
                  "scrollIntoView": "",
                  "upperThreshold": 50,
                  "enableBackToTop": false,
                  "scrollAnchoring": false,
                  "fastDeceleration": "",
                  "refresherEnabled": false,
                  "refresherThreshold": 50,
                  "refresherTriggered": "",
                  "refresherBackground": "#fff",
                  "scrollWithAnimation": false,
                  "refresherDefaultStyle": "block",
                  "_visible": true
                },
                "dataTypes": [
                  {
                    "propertyPath": "bounces",
                    "type": "static"
                  },
                  {
                    "propertyPath": "divider",
                    "type": "static"
                  },
                  {
                    "propertyPath": "scrollX",
                    "type": "static"
                  },
                  {
                    "propertyPath": "scrollY",
                    "type": "static"
                  },
                  {
                    "propertyPath": "enhanced",
                    "type": "static"
                  },
                  {
                    "propertyPath": "scrollTop",
                    "type": "static"
                  },
                  {
                    "propertyPath": "enableFlex",
                    "type": "static"
                  },
                  {
                    "propertyPath": "scrollLeft",
                    "type": "static"
                  },
                  {
                    "propertyPath": "pagingEnabled",
                    "type": "static"
                  },
                  {
                    "propertyPath": "showScrollbar",
                    "type": "static"
                  },
                  {
                    "propertyPath": "lowerThreshold",
                    "type": "static"
                  },
                  {
                    "propertyPath": "scrollIntoView",
                    "type": "static"
                  },
                  {
                    "propertyPath": "upperThreshold",
                    "type": "static"
                  },
                  {
                    "propertyPath": "enableBackToTop",
                    "type": "static"
                  },
                  {
                    "propertyPath": "scrollAnchoring",
                    "type": "static"
                  },
                  {
                    "propertyPath": "fastDeceleration",
                    "type": "static"
                  },
                  {
                    "propertyPath": "refresherEnabled",
                    "type": "static"
                  },
                  {
                    "propertyPath": "refresherThreshold",
                    "type": "static"
                  },
                  {
                    "propertyPath": "refresherTriggered",
                    "type": "static"
                  },
                  {
                    "propertyPath": "refresherBackground",
                    "type": "static"
                  },
                  {
                    "propertyPath": "scrollWithAnimation",
                    "type": "static"
                  },
                  {
                    "propertyPath": "refresherDefaultStyle",
                    "type": "static"
                  }
                ],
                "commonStyle": {
                  "width": "90%",
                  "height": "100%",
                  "display": "flex",
                  "justifyContent": "flex-start",
                  "alignItems": "stretch",
                  "flexFlow": "row nowrap",
                  "whiteSpace": "nowrap"
                }
              },
              "x-index": 2,
              "properties": {
                "id7": {
                  "key": "id7",
                  "x-component": "gsd-h5-react:container",
                  "x-props": {
                    "sourceKey": "gsd-h5-react:Container",
                    "dataBinds": {
                      "_waFor": (forItems, event) => (($page.dataset.state.types||[]).slice())
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
                      "marginRight": "0.5357rem",
                      "display": "inline-block",
                      "textAlign": "left"
                    },
                    "classNameList": [
                      "nav-item"
                    ],
                    "classNameListBind": {
                      "classList": (forItems, event) => (forItems.id7.value === $page.dataset.state.selectedType ? 'actived':'')
                    },
                    "listenerInstances": [
                      {
                        "key": "",
                        "trigger": "tap",
                        "isCapturePhase": false,
                        "noPropagation": false,
                        "instanceFunction": handler.onTypeChange,
                        "dataBinds": {
                          "target": (forItems, event) => (forItems.id7.value)
                        }
                      }
                    ]
                  },
                  "x-index": 1,
                  "properties": {
                    "id12": {
                      "key": "id12",
                      "x-component": "gsd-h5-react:text",
                      "x-props": {
                        "sourceKey": "gsd-h5-react:Text",
                        "data": {
                          "decode": false,
                          "selectable": false,
                          "_visible": true
                        },
                        "dataBinds": {
                          "text": (forItems) => forItems.id7.text
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
                          "color": "rgb(0, 0, 0)",
                          "fontSize": "1.0000rem",
                          "textAlign": "center",
                          "fontWeight": "normal"
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
        "id61": {
          "key": "id61",
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
              "paddingTop": "0.7143rem"
            }
          },
          "x-index": 2,
          "properties": {
            "id71": {
              "key": "id71",
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
              "x-index": 0,
              "properties": {
                "items": {
                  "key": "items",
                  "properties": {
                    "id15": {
                      "key": "id15",
                      "x-component": "gsd-h5-react:container",
                      "x-props": {
                        "sourceKey": "gsd-h5-react:Container",
                        "dataBinds": {
                          "_visible": (forItems, event) => (!$page.dataset.state.loading && $page.dataset.state.list.length),
                          "_waFor": (forItems, event) => (($page.dataset.state.list || []).slice())
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
                        "id72": {
                          "key": "id72",
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
                              "title": (forItems) => forItems.id15.name,
                              "content": (forItems, event) => (forItems.id15.tags.join(' | ')),
                              "mediaUrl": (forItems) => forItems.id15.avator,
                              "subtitle": (forItems) => forItems.id15.type.text
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
                        "id17": {
                          "key": "id17",
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
                                  "text": (forItems) => forItems.id15.description
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
                              "fontSize": "0.7143rem"
                            }
                          },
                          "x-index": 3,
                          "properties": {
                            "id22": {
                              "key": "id22",
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
                            "id23": {
                              "key": "id23",
                              "x-component": "gsd-h5-react:text",
                              "x-props": {
                                "sourceKey": "gsd-h5-react:Text",
                                "data": {
                                  "decode": false,
                                  "selectable": false,
                                  "_visible": true
                                },
                                "dataBinds": {
                                  "text": (forItems) => forItems.id15.invitations
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
                            "id24": {
                              "key": "id24",
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
    }
  }
};
const pageListenerInstances = [];
const widgetsContext = {
  "id12": {
    "decode": false,
    "selectable": false,
    "_visible": true,
    "style": {
      "color": "rgb(0, 0, 0)",
      "fontSize": "1.0000rem",
      "textAlign": "center",
      "fontWeight": "normal"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id7"
  },
  "id7": {
    "title": "",
    "style": {
      "marginRight": "0.5357rem",
      "display": "inline-block",
      "textAlign": "left"
    },
    "classList": [
      "nav-item"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id47"
  },
  "id47": {
    "bounces": true,
    "divider": "",
    "scrollX": true,
    "scrollY": true,
    "enhanced": false,
    "scrollTop": "",
    "enableFlex": false,
    "scrollLeft": "",
    "pagingEnabled": "",
    "showScrollbar": true,
    "lowerThreshold": 50,
    "scrollIntoView": "",
    "upperThreshold": 50,
    "enableBackToTop": false,
    "scrollAnchoring": false,
    "fastDeceleration": "",
    "refresherEnabled": false,
    "refresherThreshold": 50,
    "refresherTriggered": "",
    "refresherBackground": "#fff",
    "scrollWithAnimation": false,
    "refresherDefaultStyle": "block",
    "_visible": true,
    "style": {
      "width": "90%",
      "height": "100%",
      "display": "flex",
      "justifyContent": "flex-start",
      "alignItems": "stretch",
      "flexFlow": "row nowrap",
      "whiteSpace": "nowrap"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:ScrollView",
    "_parentId": "id5"
  },
  "id5": {
    "title": "",
    "_visible": true,
    "style": {
      "display": "flex",
      "justifyContent": "space-around",
      "alignItems": "center",
      "flexDirection": "row",
      "textAlign": "left"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id46"
  },
  "id72": {
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
    "_parentId": "id15"
  },
  "id19": {
    "decode": false,
    "selectable": false,
    "_visible": true,
    "style": {
      "fontSize": "1.0000rem"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id17"
  },
  "id17": {
    "title": "",
    "_visible": true,
    "style": {
      "marginBottom": "0.7143rem"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id15"
  },
  "id22": {
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
    "_parentId": "id18"
  },
  "id23": {
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
    "_parentId": "id18"
  },
  "id24": {
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
    "_parentId": "id18"
  },
  "id18": {
    "title": "",
    "_visible": true,
    "style": {
      "fontSize": "0.7143rem"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id15"
  },
  "id15": {
    "title": "",
    "style": {
      "margin": "0 0.7143rem 0",
      "padding": "0.7143rem",
      "color": "rgb(0, 0, 0)",
      "borderBottom": "0.0357rem solid rgb(238, 238, 238)"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id71"
  },
  "id71": {
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
    "_parentId": "id61"
  },
  "id61": {
    "title": "",
    "_visible": true,
    "style": {
      "paddingTop": "0.7143rem"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id46"
  },
  "id46": {
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
  "id12": {
    "text": (forItems) => forItems.id7.text
  },
  "id7": {
    "_waFor": (forItems, event) => (($page.dataset.state.types||[]).slice()),
    "classList": (forItems, event) => (forItems.id7.value === $page.dataset.state.selectedType ? 'actived':'')
  },
  "id72": {
    "title": (forItems) => forItems.id15.name,
    "content": (forItems, event) => (forItems.id15.tags.join(' | ')),
    "mediaUrl": (forItems) => forItems.id15.avator,
    "subtitle": (forItems) => forItems.id15.type.text
  },
  "id19": {
    "text": (forItems) => forItems.id15.description
  },
  "id23": {
    "text": (forItems) => forItems.id15.invitations
  },
  "id15": {
    "_visible": (forItems, event) => (!$page.dataset.state.loading && $page.dataset.state.list.length),
    "_waFor": (forItems, event) => (($page.dataset.state.list || []).slice())
  },
  "id71": {
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
  updateDatasetParams('category', query || {})
  createStateDatasrouceVar('category',{app, $page})
  buildDataVarFetchFn('category');
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
    id:'category',
    state: observable(initPageState),
    computed: createComputed(computed),
    dataVar: createDataVar('category'),
    handler
  })
  let dataset = createDataset('category', {app, $page})
  $page.dataset = dataset
  $page.state.dataset = dataset

  $page.widgets = createWidgets(widgetsContext, dataBinds)
  // widgets 内的 dataBinds 可能需要关联 widgets，需要重新执行 dataBinds
  retryDataBinds()
  // Web 环境页面级别生命周期
  if (!process.env.isMiniprogram) {
    React.useEffect(() => {
      document.title = "分类查看"
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
