// Import Libs and Handlers
import * as React from 'react'
import { observable } from 'mobx'
import { AppRender } from 'handlers/render'
import { initLifeCycle, pageLifeCycleMount } from 'handlers/lifecycle'
import { createComputed } from 'utils'
import AppLifeCycle from 'lowcode/lifecycle'
import { createDataVar, buildDataVarFetchFn, createDataset, updateDatasetParams, createStateDatasrouceVar } from '@/datasources'
import PageLifeCycle from '../../lowcode/index/lifecycle'
import initPageState from '../../lowcode/index/state'
import computed from '../../lowcode/index/computed'
import { $$_index as handler } from '../../app/handlers'
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
import GsdH5ReactSelector from 'libraries/gsd-h5-react@0.0.61/components/Selector';
import GsdH5ReactText from 'libraries/gsd-h5-react@0.0.61/components/Text';
import GsdH5ReactScrollView from 'libraries/gsd-h5-react@0.0.61/components/ScrollView';
import GsdH5ReactImage from 'libraries/gsd-h5-react@0.0.61/components/Image';
import CloudbaseStandardItemList from 'libraries/CLOUDBASE_STANDARD@1612432272646/components/ItemList';
import CloudbaseStandardMedia from 'libraries/CLOUDBASE_STANDARD@1612432272646/components/Media';
import CloudbaseStandardNavBar from 'libraries/CLOUDBASE_STANDARD@1612432272646/components/NavBar';
import GsdH5ReactRegionPicker from 'libraries/gsd-h5-react@0.0.61/components/RegionPicker';
import CloudbaseStandardTabBar from 'libraries/CLOUDBASE_STANDARD@1612432272646/components/TabBar'

// Import Plugins


// Import Actions
import gsdH5ReactOpenUrl from 'libraries/gsd-h5-react@0.0.61/actions/OpenURL'

// Actions

// Plugin
const pluginInstances = [];
const virtualFields = {
  "gsd-h5-react:Container": (props) => <GsdH5ReactContainer {...props} pageVirtualFields={virtualFields}/>,
  "gsd-h5-react:Selector": (props) => <GsdH5ReactSelector {...props} pageVirtualFields={virtualFields}/>,
  "gsd-h5-react:Text": (props) => <GsdH5ReactText {...props} pageVirtualFields={virtualFields}/>,
  "gsd-h5-react:ScrollView": (props) => <GsdH5ReactScrollView {...props} pageVirtualFields={virtualFields}/>,
  "gsd-h5-react:Image": (props) => <GsdH5ReactImage {...props} pageVirtualFields={virtualFields}/>,
  "CLOUDBASE_STANDARD:ItemList": (props) => <CloudbaseStandardItemList {...props} pageVirtualFields={virtualFields}/>,
  "CLOUDBASE_STANDARD:Media": (props) => <CloudbaseStandardMedia {...props} pageVirtualFields={virtualFields}/>,
  "CLOUDBASE_STANDARD:NavBar": (props) => <CloudbaseStandardNavBar {...props} pageVirtualFields={virtualFields}/>,
  "gsd-h5-react:RegionPicker": (props) => <GsdH5ReactRegionPicker {...props} pageVirtualFields={virtualFields}/>,
  "CLOUDBASE_STANDARD:TabBar": (props) => <CloudbaseStandardTabBar {...props} pageVirtualFields={virtualFields}/>
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
          "paddingBottom": "3.2143rem"
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
            "id36": {
              "key": "id36",
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
                  "display": "block",
                  "fontSize": "1.0000rem",
                  "alignItems": "center",
                  "flexDirection": "row",
                  "justifyContent": "space-around"
                }
              },
              "x-index": 3,
              "properties": {
                "id35": {
                  "key": "id35",
                  "x-component": "gsd-h5-react:selector",
                  "x-props": {
                    "sourceKey": "gsd-h5-react:Selector",
                    "data": {
                      "mode": "selector",
                      "name": "sort",
                      "autoFill": "",
                      "disabled": false,
                      "rangeKey": "text",
                      "_visible": true
                    },
                    "dataBinds": {
                      "range": () => $page.dataset.state.sortOptions,
                      "value": () => $page.dataset.state.selectedSortIndex
                    },
                    "dataTypes": [
                      {
                        "propertyPath": "mode",
                        "type": "static"
                      },
                      {
                        "propertyPath": "name",
                        "type": "static"
                      },
                      {
                        "propertyPath": "autoFill",
                        "type": "static"
                      },
                      {
                        "propertyPath": "disabled",
                        "type": "static"
                      },
                      {
                        "propertyPath": "rangeKey",
                        "type": "static"
                      },
                      {
                        "propertyPath": "range",
                        "type": "bind"
                      },
                      {
                        "propertyPath": "value",
                        "type": "bind"
                      }
                    ],
                    "listenerInstances": [
                      {
                        "trigger": "change",
                        "instanceFunction": function({ event, forItems }) {    const wid = $page.widgets.id35;    const widgetData = (forItems.forIndexes && forItems.forIndexes.length > 0) ? get(wid, forItems.forIndexes) : wid;    widgetData.value = event.detail.value;  }.bind(this)
                      },
                      {
                        "key": "",
                        "trigger": "change",
                        "isCapturePhase": false,
                        "noPropagation": false,
                        "instanceFunction": handler.onSortChang,
                        "data": {
                          "target": ""
                        }
                      }
                    ]
                  },
                  "x-index": 0,
                  "properties": {
                    "id38": {
                      "key": "id38",
                      "x-component": "gsd-h5-react:text",
                      "x-props": {
                        "sourceKey": "gsd-h5-react:Text",
                        "data": {
                          "text": "排序",
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
                          "display": "inline-block",
                          "fontWeight": "bolder"
                        }
                      },
                      "x-index": 0
                    },
                    "id40": {
                      "key": "id40",
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
                          "width": "0",
                          "height": "0",
                          "marginLeft": "0.1786rem",
                          "display": "inline-block",
                          "borderTop": "0.2500rem solid rgb(0, 0, 0)",
                          "borderLeft": "0.2500rem solid transparent",
                          "borderRight": "0.2500rem solid transparent",
                          "verticalAlign": "middle"
                        }
                      },
                      "x-index": 1
                    }
                  }
                }
              }
            },
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
                  "width": "70%",
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
                      "_waFor": (forItems, event) => (($page.dataset.state.types || []).slice())
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
                      "classList": (forItems, event) => ($page.dataset.state.selectedType === forItems.id7.value? 'actived':'')
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
            },
            "id57": {
              "key": "id57",
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
                  "marginRight": "0",
                  "display": "block"
                },
                "listenerInstances": [
                  {
                    "key": "",
                    "trigger": "tap",
                    "isCapturePhase": false,
                    "noPropagation": false,
                    "instanceFunction": gsdH5ReactOpenUrl,
                    "data": {
                      "pageId": "classification",
                      "jumpType": 1,
                      "navigateType": "navigateTo"
                    }
                  }
                ]
              },
              "x-index": 1,
              "properties": {
                "id59": {
                  "key": "id59",
                  "x-component": "gsd-h5-react:image",
                  "x-props": {
                    "sourceKey": "gsd-h5-react:Image",
                    "data": {
                      "alt": "[图片]",
                      "src": "https://imgcache.qq.com/qcloud/tcloud_dtc/static/low_code/1a6b22b0-a9ac-40f3-873d-bc7981040621.svg",
                      "mode": "scaleToFill",
                      "webp": false,
                      "lazyLoad": false,
                      "showMenuByLongpress": false,
                      "_visible": true
                    },
                    "dataTypes": [
                      {
                        "propertyPath": "alt",
                        "type": "static"
                      },
                      {
                        "propertyPath": "src",
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
                      }
                    ],
                    "commonStyle": {
                      "width": "1.4286rem",
                      "height": "1.4286rem",
                      "display": "block"
                    }
                  },
                  "x-index": 1
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
                  "list": (forItems, event) => (($page.dataset.state.list || []).slice()),
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
                          "_visible": (forItems, event) => (!$page.dataset.state.loading && ($page.dataset.state.list || []).slice().length),
                          "_waFor": (forItems, event) => ($page.dataset.state.list.slice() || [])
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
        },
        "id70": {
          "key": "id70",
          "x-component": "cloudbase_standard:navbar",
          "x-props": {
            "sourceKey": "CLOUDBASE_STANDARD:NavBar",
            "data": {
              "end": "",
              "back": false,
              "home": false,
              "mode": "default",
              "start": "",
              "title": "候选列表",
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
            "end": {
              "key": "end"
            },
            "start": {
              "key": "start",
              "properties": {
                "id8": {
                  "key": "id8",
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
                      "marginTop": "0",
                      "marginLeft": "0.5357rem",
                      "display": "flex",
                      "justifyContent": "space-around",
                      "alignItems": "stretch",
                      "flexFlow": "row nowrap",
                      "textAlign": "left",
                      "flexDirection": "row"
                    }
                  },
                  "x-index": 0,
                  "properties": {
                    "id9": {
                      "key": "id9",
                      "x-component": "gsd-h5-react:regionpicker",
                      "x-props": {
                        "sourceKey": "gsd-h5-react:RegionPicker",
                        "data": {
                          "mode": "region",
                          "name": "thisIsRegionsKey",
                          "value": [],
                          "autoFill": "base_info.name",
                          "disabled": false,
                          "customItem": "",
                          "_visible": true
                        },
                        "dataTypes": [
                          {
                            "propertyPath": "mode",
                            "type": "static"
                          },
                          {
                            "propertyPath": "name",
                            "type": "static"
                          },
                          {
                            "propertyPath": "value",
                            "type": "static"
                          },
                          {
                            "propertyPath": "autoFill",
                            "type": "static"
                          },
                          {
                            "propertyPath": "disabled",
                            "type": "static"
                          },
                          {
                            "propertyPath": "customItem",
                            "type": "static"
                          }
                        ],
                        "commonStyle": {
                          "display": "block"
                        },
                        "listenerInstances": [
                          {
                            "trigger": "change",
                            "instanceFunction": function({ event, forItems }) {    const wid = $page.widgets.id9;    const widgetData = (forItems.forIndexes && forItems.forIndexes.length > 0) ? get(wid, forItems.forIndexes) : wid;    widgetData.value = event.detail.value;  }.bind(this)
                          },
                          {
                            "key": "",
                            "trigger": "change",
                            "isCapturePhase": false,
                            "noPropagation": false,
                            "instanceFunction": handler.onRegionChange,
                            "data": {
                              "target": ""
                            }
                          }
                        ]
                      },
                      "x-index": 1,
                      "properties": {
                        "id68": {
                          "key": "id68",
                          "x-component": "gsd-h5-react:image",
                          "x-props": {
                            "sourceKey": "gsd-h5-react:Image",
                            "data": {
                              "alt": "[图片]",
                              "src": "https://imgcache.qq.com/qcloud/tcloud_dtc/static/low_code/eb34473f-128f-4ff5-a8eb-39ea8ba003d3.svg",
                              "mode": "scaleToFill",
                              "webp": false,
                              "lazyLoad": false,
                              "showMenuByLongpress": false,
                              "_visible": true
                            },
                            "dataTypes": [
                              {
                                "propertyPath": "alt",
                                "type": "static"
                              },
                              {
                                "propertyPath": "src",
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
                              }
                            ],
                            "commonStyle": {
                              "width": "1.6429rem",
                              "height": "1.6429rem"
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
            "center": {
              "key": "center"
            }
          }
        }
      }
    },
    "id69": {
      "key": "id69",
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
          "tabs": (forItems, event) => ($page.handler.navigateConfig()),
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
      "x-index": 1,
      "properties": {
        "tabbar": {
          "key": "tabbar"
        }
      }
    }
  }
};
const pageListenerInstances = [];
const widgetsContext = {
  "id38": {
    "text": "排序",
    "decode": false,
    "selectable": false,
    "_visible": true,
    "style": {
      "display": "inline-block",
      "fontWeight": "bolder"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id35"
  },
  "id40": {
    "title": "",
    "_visible": true,
    "style": {
      "width": "0",
      "height": "0",
      "marginLeft": "0.1786rem",
      "display": "inline-block",
      "borderTop": "0.2500rem solid rgb(0, 0, 0)",
      "borderLeft": "0.2500rem solid transparent",
      "borderRight": "0.2500rem solid transparent",
      "verticalAlign": "middle"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id35"
  },
  "id35": {
    "mode": "selector",
    "name": "sort",
    "autoFill": "",
    "disabled": false,
    "rangeKey": "text",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Selector",
    "_parentId": "id36"
  },
  "id36": {
    "title": "",
    "_visible": true,
    "style": {
      "display": "block",
      "fontSize": "1.0000rem",
      "alignItems": "center",
      "flexDirection": "row",
      "justifyContent": "space-around"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id5"
  },
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
      "width": "70%",
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
  "id59": {
    "alt": "[图片]",
    "src": "https://imgcache.qq.com/qcloud/tcloud_dtc/static/low_code/1a6b22b0-a9ac-40f3-873d-bc7981040621.svg",
    "mode": "scaleToFill",
    "webp": false,
    "lazyLoad": false,
    "showMenuByLongpress": false,
    "_visible": true,
    "style": {
      "width": "1.4286rem",
      "height": "1.4286rem",
      "display": "block"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Image",
    "_parentId": "id57"
  },
  "id57": {
    "title": "",
    "_visible": true,
    "style": {
      "marginRight": "0",
      "display": "block"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
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
  "id68": {
    "alt": "[图片]",
    "src": "https://imgcache.qq.com/qcloud/tcloud_dtc/static/low_code/eb34473f-128f-4ff5-a8eb-39ea8ba003d3.svg",
    "mode": "scaleToFill",
    "webp": false,
    "lazyLoad": false,
    "showMenuByLongpress": false,
    "_visible": true,
    "style": {
      "width": "1.6429rem",
      "height": "1.6429rem"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Image",
    "_parentId": "id9"
  },
  "id9": {
    "mode": "region",
    "name": "thisIsRegionsKey",
    "value": [],
    "autoFill": "base_info.name",
    "disabled": false,
    "customItem": "",
    "_visible": true,
    "style": {
      "display": "block"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:RegionPicker",
    "_parentId": "id8"
  },
  "id8": {
    "title": "",
    "_visible": true,
    "style": {
      "marginTop": "0",
      "marginLeft": "0.5357rem",
      "display": "flex",
      "justifyContent": "space-around",
      "alignItems": "stretch",
      "flexFlow": "row nowrap",
      "textAlign": "left",
      "flexDirection": "row"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id70"
  },
  "id70": {
    "end": "",
    "back": false,
    "home": false,
    "mode": "default",
    "start": "",
    "title": "候选列表",
    "center": "",
    "textSize": 28,
    "iconTheme": "black",
    "textColor": "rgba(0, 0, 0, 1)",
    "backgroundColor": "rgba(255, 255, 255, 1)",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "CLOUDBASE_STANDARD:NavBar",
    "_parentId": "id46"
  },
  "id46": {
    "title": "",
    "_visible": true,
    "style": {
      "paddingBottom": "3.2143rem"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container"
  },
  "id69": {
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
  }
};
const dataBinds = {
  "id35": {
    "range": () => $page.dataset.state.sortOptions,
    "value": () => $page.dataset.state.selectedSortIndex
  },
  "id12": {
    "text": (forItems) => forItems.id7.text
  },
  "id7": {
    "_waFor": (forItems, event) => (($page.dataset.state.types || []).slice()),
    "classList": (forItems, event) => ($page.dataset.state.selectedType === forItems.id7.value? 'actived':'')
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
    "_visible": (forItems, event) => (!$page.dataset.state.loading && ($page.dataset.state.list || []).slice().length),
    "_waFor": (forItems, event) => ($page.dataset.state.list.slice() || [])
  },
  "id71": {
    "list": (forItems, event) => (($page.dataset.state.list || []).slice()),
    "loading": () => $page.dataset.state.loading
  },
  "id69": {
    "tabs": (forItems, event) => ($page.handler.navigateConfig()),
    "value": (forItems, event) => ($page.id)
  }
};

AppLifeCycle.beforeCustomLaunch = (query)=>{
  updateDatasetParams('$global', query || {})
  buildDataVarFetchFn('$global')
  createStateDatasrouceVar('$global',{app})
};
PageLifeCycle.beforePageCustomLaunch = (query) => {
  updateDatasetParams('index', query || {})
  createStateDatasrouceVar('index',{app, $page})
  buildDataVarFetchFn('index');
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
    id:'index',
    state: observable(initPageState),
    computed: createComputed(computed),
    dataVar: createDataVar('index'),
    handler
  })
  let dataset = createDataset('index', {app, $page})
  $page.dataset = dataset
  $page.state.dataset = dataset

  $page.widgets = createWidgets(widgetsContext, dataBinds)
  // widgets 内的 dataBinds 可能需要关联 widgets，需要重新执行 dataBinds
  retryDataBinds()
  // Web 环境页面级别生命周期
  if (!process.env.isMiniprogram) {
    React.useEffect(() => {
      document.title = "候选列表"
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
