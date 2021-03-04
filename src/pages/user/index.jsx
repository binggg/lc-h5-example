// Import Libs and Handlers
import * as React from 'react'
import { observable } from 'mobx'
import { AppRender } from 'handlers/render'
import { initLifeCycle, pageLifeCycleMount } from 'handlers/lifecycle'
import { createComputed } from 'utils'
import AppLifeCycle from 'lowcode/lifecycle'
import { createDataVar, buildDataVarFetchFn, createDataset, updateDatasetParams, createStateDatasrouceVar } from '@/datasources'
import PageLifeCycle from '../../lowcode/user/lifecycle'
import initPageState from '../../lowcode/user/state'
import computed from '../../lowcode/user/computed'
import { $$_user as handler } from '../../app/handlers'
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
import CloudbaseStandardItem from 'libraries/CLOUDBASE_STANDARD@1612432272646/components/Item';
import GsdH5ReactImage from 'libraries/gsd-h5-react@0.0.61/components/Image';
import GsdH5ReactText from 'libraries/gsd-h5-react@0.0.61/components/Text';
import GsdH5ReactButton from 'libraries/gsd-h5-react@0.0.61/components/Button';
import CloudbaseStandardTabBar from 'libraries/CLOUDBASE_STANDARD@1612432272646/components/TabBar';
import CloudbaseStandardNavBar from 'libraries/CLOUDBASE_STANDARD@1612432272646/components/NavBar'

// Import Plugins


// Import Actions


// Actions

// Plugin
const pluginInstances = [];
const virtualFields = {
  "gsd-h5-react:Container": (props) => <GsdH5ReactContainer {...props} pageVirtualFields={virtualFields}/>,
  "CLOUDBASE_STANDARD:Item": (props) => <CloudbaseStandardItem {...props} pageVirtualFields={virtualFields}/>,
  "gsd-h5-react:Image": (props) => <GsdH5ReactImage {...props} pageVirtualFields={virtualFields}/>,
  "gsd-h5-react:Text": (props) => <GsdH5ReactText {...props} pageVirtualFields={virtualFields}/>,
  "gsd-h5-react:Button": (props) => <GsdH5ReactButton {...props} pageVirtualFields={virtualFields}/>,
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
          "paddingRight": "0.7143rem",
          "paddingLeft": "0.7143rem"
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
              "_waFor": (forItems, event) => ($page.handler.getListConfig())
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
              "display": "block",
              "color": "rgb(102, 102, 102)",
              "borderBottom": "0.0357rem solid rgb(238, 238, 238)"
            },
            "listenerInstances": [
              {
                "key": "",
                "trigger": "tap",
                "isCapturePhase": false,
                "noPropagation": false,
                "instanceFunction": handler.navigate,
                "dataBinds": {
                  "target": (forItems) => forItems.id8.url
                }
              }
            ]
          },
          "x-index": 2,
          "properties": {
            "id28": {
              "key": "id28",
              "x-component": "cloudbase_standard:item",
              "x-props": {
                "sourceKey": "CLOUDBASE_STANDARD:Item",
                "data": {
                  "value": "",
                  "detail": true,
                  "bordered": true,
                  "description": "",
                  "isClickable": false,
                  "_visible": true
                },
                "dataTypes": [
                  {
                    "propertyPath": "title",
                    "type": "static"
                  },
                  {
                    "propertyPath": "value",
                    "type": "static"
                  },
                  {
                    "propertyPath": "detail",
                    "type": "static"
                  },
                  {
                    "propertyPath": "bordered",
                    "type": "static"
                  },
                  {
                    "propertyPath": "description",
                    "type": "static"
                  },
                  {
                    "propertyPath": "isClickable",
                    "type": "static"
                  },
                  {
                    "propertyPath": "customIcon",
                    "type": "slot"
                  },
                  {
                    "propertyPath": "customTitle",
                    "type": "slot"
                  },
                  {
                    "propertyPath": "customValue",
                    "type": "slot"
                  }
                ]
              },
              "x-index": 1,
              "properties": {
                "customIcon": {
                  "key": "customIcon",
                  "properties": {
                    "id10": {
                      "key": "id10",
                      "x-component": "gsd-h5-react:image",
                      "x-props": {
                        "sourceKey": "gsd-h5-react:Image",
                        "data": {
                          "alt": "[图片]",
                          "mode": "scaleToFill",
                          "webp": false,
                          "lazyLoad": false,
                          "showMenuByLongpress": false,
                          "_visible": true
                        },
                        "dataBinds": {
                          "src": (forItems) => forItems.id8.icon
                        },
                        "dataTypes": [
                          {
                            "propertyPath": "alt",
                            "type": "static"
                          },
                          {
                            "propertyPath": "mode",
                            "type": "static"
                          },
                          {
                            "propertyPath": "webp",
                            "type": "static"
                          },
                          {
                            "propertyPath": "lazyLoad",
                            "type": "static"
                          },
                          {
                            "propertyPath": "showMenuByLongpress",
                            "type": "static"
                          },
                          {
                            "propertyPath": "src",
                            "type": "bind"
                          }
                        ],
                        "commonStyle": {
                          "width": "1.4286rem",
                          "height": "1.4286rem"
                        }
                      },
                      "x-index": 0
                    }
                  }
                },
                "customTitle": {
                  "key": "customTitle",
                  "properties": {
                    "id11": {
                      "key": "id11",
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
                          "marginLeft": "0.7143rem",
                          "display": "inline-block"
                        }
                      },
                      "x-index": 0
                    }
                  }
                },
                "customValue": {
                  "key": "customValue"
                }
              }
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
              "height": "5.3571rem",
              "display": "block",
              "flexFlow": "row nowrap",
              "alignItems": "center",
              "borderBottom": "0.0357rem solid rgb(238, 238, 238)",
              "flexDirection": "row",
              "justifyContent": "space-between"
            }
          },
          "x-index": 1,
          "properties": {
            "id19": {
              "key": "id19",
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
                  "justifyContent": "flex-start",
                  "alignItems": "center",
                  "flexFlow": "row nowrap",
                  "flexDirection": "row"
                }
              },
              "x-index": 0,
              "properties": {
                "id17": {
                  "key": "id17",
                  "x-component": "gsd-h5-react:text",
                  "x-props": {
                    "sourceKey": "gsd-h5-react:Text",
                    "data": {
                      "decode": false,
                      "selectable": false
                    },
                    "dataBinds": {
                      "text": (forItems, event) => (app.dataset.state.userInfo?app.dataset.state.userInfo.nickName : ''),
                      "_visible": (forItems, event) => (app.dataset.state.userInfo)
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
                      },
                      {
                        "propertyPath": "_visible",
                        "type": "bind"
                      }
                    ],
                    "commonStyle": {
                      "fontSize": "1.2857rem"
                    }
                  },
                  "x-index": 2
                },
                "id18": {
                  "key": "id18",
                  "x-component": "gsd-h5-react:image",
                  "x-props": {
                    "sourceKey": "gsd-h5-react:Image",
                    "data": {
                      "alt": "[图片]",
                      "mode": "scaleToFill",
                      "webp": false,
                      "lazyLoad": false,
                      "showMenuByLongpress": false,
                      "_visible": true
                    },
                    "dataBinds": {
                      "src": (forItems, event) => (app.dataset.state.userInfo ? app.dataset.state.userInfo.avatarUrl||'https://imgcache.qq.com/qcloud/tcloud_dtc/static/low_code/566bba12-f1fc-4a7c-ab75-4335e9340c6e.svg' : 'https://imgcache.qq.com/qcloud/tcloud_dtc/static/low_code/566bba12-f1fc-4a7c-ab75-4335e9340c6e.svg')
                    },
                    "dataTypes": [
                      {
                        "propertyPath": "alt",
                        "type": "static"
                      },
                      {
                        "propertyPath": "mode",
                        "type": "static"
                      },
                      {
                        "propertyPath": "webp",
                        "type": "static"
                      },
                      {
                        "propertyPath": "lazyLoad",
                        "type": "static"
                      },
                      {
                        "propertyPath": "showMenuByLongpress",
                        "type": "static"
                      },
                      {
                        "propertyPath": "src",
                        "type": "bind"
                      }
                    ],
                    "commonStyle": {
                      "width": "3.5714rem",
                      "height": "3.5714rem",
                      "marginRight": "1.4286rem",
                      "borderRadius": "50%"
                    }
                  },
                  "x-index": 0
                },
                "id23": {
                  "key": "id23",
                  "x-component": "gsd-h5-react:button",
                  "x-props": {
                    "sourceKey": "gsd-h5-react:Button",
                    "data": {
                      "lang": "zh_CN",
                      "size": "default",
                      "type": "default",
                      "plain": false,
                      "divider": "",
                      "loading": false,
                      "disabled": false,
                      "formType": "button",
                      "openType": "getUserInfo",
                      "categoryId": [],
                      "sessionFrom": "",
                      "appParameter": "",
                      "sendMessageImg": "",
                      "sendMessagePath": "",
                      "showMessageCard": "",
                      "sendMessageTitle": ""
                    },
                    "dataBinds": {
                      "_visible": (forItems, event) => (!app.dataset.state.userInfo)
                    },
                    "dataTypes": [
                      {
                        "propertyPath": "lang",
                        "type": "static"
                      },
                      {
                        "propertyPath": "size",
                        "type": "static"
                      },
                      {
                        "propertyPath": "type",
                        "type": "static"
                      },
                      {
                        "propertyPath": "plain",
                        "type": "static"
                      },
                      {
                        "propertyPath": "divider",
                        "type": "static"
                      },
                      {
                        "propertyPath": "loading",
                        "type": "static"
                      },
                      {
                        "propertyPath": "disabled",
                        "type": "static"
                      },
                      {
                        "propertyPath": "formType",
                        "type": "static"
                      },
                      {
                        "propertyPath": "openType",
                        "type": "static"
                      },
                      {
                        "propertyPath": "categoryId",
                        "type": "static"
                      },
                      {
                        "propertyPath": "sessionFrom",
                        "type": "static"
                      },
                      {
                        "propertyPath": "appParameter",
                        "type": "static"
                      },
                      {
                        "propertyPath": "sendMessageImg",
                        "type": "static"
                      },
                      {
                        "propertyPath": "sendMessagePath",
                        "type": "static"
                      },
                      {
                        "propertyPath": "showMessageCard",
                        "type": "static"
                      },
                      {
                        "propertyPath": "sendMessageTitle",
                        "type": "static"
                      },
                      {
                        "propertyPath": "text",
                        "type": "slot"
                      },
                      {
                        "propertyPath": "_visible",
                        "type": "bind"
                      }
                    ],
                    "commonStyle": {
                      "width": "7.1429rem",
                      "height": "2.1429rem",
                      "marginRight": "0",
                      "marginLeft": "0",
                      "fontSize": "1.0000rem",
                      "lineHeight": "2.1429rem",
                      "borderWidth": "0",
                      "borderRadius": "0.1786rem",
                      "background": "#006eff"
                    },
                    "listenerInstances": [
                      {
                        "key": "",
                        "trigger": "getuserinfo",
                        "isCapturePhase": false,
                        "noPropagation": false,
                        "instanceFunction": handler.onGetUserInfo,
                        "data": {
                          "target": ""
                        }
                      },
                      {
                        "key": "",
                        "trigger": "tap",
                        "isCapturePhase": false,
                        "noPropagation": false,
                        "instanceFunction": handler.onTabLoginButton,
                        "data": {
                          "target": ""
                        }
                      }
                    ]
                  },
                  "x-index": 1,
                  "properties": {
                    "text": {
                      "key": "text",
                      "properties": {
                        "id24": {
                          "key": "id24",
                          "x-component": "gsd-h5-react:text",
                          "x-props": {
                            "sourceKey": "gsd-h5-react:Text",
                            "data": {
                              "text": "点击登录",
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
                              "color": "rgb(255, 255, 255)"
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
        }
      }
    },
    "id25": {
      "key": "id25",
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
    "id29": {
      "key": "id29",
      "x-component": "cloudbase_standard:navbar",
      "x-props": {
        "sourceKey": "CLOUDBASE_STANDARD:NavBar",
        "data": {
          "end": "",
          "back": false,
          "home": false,
          "mode": "default",
          "start": "",
          "title": "个人中心",
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
  "id10": {
    "alt": "[图片]",
    "mode": "scaleToFill",
    "webp": false,
    "lazyLoad": false,
    "showMenuByLongpress": false,
    "_visible": true,
    "style": {
      "width": "1.4286rem",
      "height": "1.4286rem"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Image",
    "_parentId": "id28"
  },
  "id11": {
    "decode": false,
    "selectable": false,
    "_visible": true,
    "style": {
      "marginLeft": "0.7143rem",
      "display": "inline-block"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id28"
  },
  "id28": {
    "title": "",
    "value": "",
    "detail": true,
    "bordered": true,
    "description": "",
    "isClickable": false,
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "CLOUDBASE_STANDARD:Item",
    "_parentId": "id8"
  },
  "id8": {
    "title": "",
    "style": {
      "display": "block",
      "color": "rgb(102, 102, 102)",
      "borderBottom": "0.0357rem solid rgb(238, 238, 238)"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id7"
  },
  "id17": {
    "decode": false,
    "selectable": false,
    "style": {
      "fontSize": "1.2857rem"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id19"
  },
  "id18": {
    "alt": "[图片]",
    "mode": "scaleToFill",
    "webp": false,
    "lazyLoad": false,
    "showMenuByLongpress": false,
    "_visible": true,
    "style": {
      "width": "3.5714rem",
      "height": "3.5714rem",
      "marginRight": "1.4286rem",
      "borderRadius": "50%"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Image",
    "_parentId": "id19"
  },
  "id24": {
    "text": "点击登录",
    "decode": false,
    "selectable": false,
    "_visible": true,
    "style": {
      "color": "rgb(255, 255, 255)"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id23"
  },
  "id23": {
    "lang": "zh_CN",
    "size": "default",
    "type": "default",
    "plain": false,
    "divider": "",
    "loading": false,
    "disabled": false,
    "formType": "button",
    "openType": "getUserInfo",
    "categoryId": [],
    "sessionFrom": "",
    "appParameter": "",
    "sendMessageImg": "",
    "sendMessagePath": "",
    "showMessageCard": "",
    "sendMessageTitle": "",
    "style": {
      "width": "7.1429rem",
      "height": "2.1429rem",
      "marginRight": "0",
      "marginLeft": "0",
      "fontSize": "1.0000rem",
      "lineHeight": "2.1429rem",
      "borderWidth": "0",
      "borderRadius": "0.1786rem",
      "background": "#006eff"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Button",
    "_parentId": "id19"
  },
  "id19": {
    "title": "",
    "_visible": true,
    "style": {
      "height": "100%",
      "display": "flex",
      "justifyContent": "flex-start",
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
      "height": "5.3571rem",
      "display": "block",
      "flexFlow": "row nowrap",
      "alignItems": "center",
      "borderBottom": "0.0357rem solid rgb(238, 238, 238)",
      "flexDirection": "row",
      "justifyContent": "space-between"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id7"
  },
  "id7": {
    "title": "",
    "_visible": true,
    "style": {
      "paddingRight": "0.7143rem",
      "paddingLeft": "0.7143rem"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container"
  },
  "id25": {
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
  "id29": {
    "end": "",
    "back": false,
    "home": false,
    "mode": "default",
    "start": "",
    "title": "个人中心",
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
  "id10": {
    "src": (forItems) => forItems.id8.icon
  },
  "id11": {
    "text": (forItems) => forItems.id8.text
  },
  "id8": {
    "_waFor": (forItems, event) => ($page.handler.getListConfig())
  },
  "id17": {
    "text": (forItems, event) => (app.dataset.state.userInfo?app.dataset.state.userInfo.nickName : ''),
    "_visible": (forItems, event) => (app.dataset.state.userInfo)
  },
  "id18": {
    "src": (forItems, event) => (app.dataset.state.userInfo ? app.dataset.state.userInfo.avatarUrl||'https://imgcache.qq.com/qcloud/tcloud_dtc/static/low_code/566bba12-f1fc-4a7c-ab75-4335e9340c6e.svg' : 'https://imgcache.qq.com/qcloud/tcloud_dtc/static/low_code/566bba12-f1fc-4a7c-ab75-4335e9340c6e.svg')
  },
  "id23": {
    "_visible": (forItems, event) => (!app.dataset.state.userInfo)
  },
  "id25": {
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
  updateDatasetParams('user', query || {})
  createStateDatasrouceVar('user',{app, $page})
  buildDataVarFetchFn('user');
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
    id:'user',
    state: observable(initPageState),
    computed: createComputed(computed),
    dataVar: createDataVar('user'),
    handler
  })
  let dataset = createDataset('user', {app, $page})
  $page.dataset = dataset
  $page.state.dataset = dataset

  $page.widgets = createWidgets(widgetsContext, dataBinds)
  // widgets 内的 dataBinds 可能需要关联 widgets，需要重新执行 dataBinds
  retryDataBinds()
  // Web 环境页面级别生命周期
  if (!process.env.isMiniprogram) {
    React.useEffect(() => {
      document.title = "个人中心"
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
