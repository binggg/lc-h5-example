import * as React from "react";
import { observer } from "mobx-react-lite";
import { observable } from "mobx";

import { AppRender } from "handlers/render";
import { createComputed } from "../../../../utils";
import { createWidgets, retryDataBinds, WidgetsContext } from 'handlers/utils'
import { get } from 'lodash'
import getStateFn from "./lowcode/state.js";
import computed from "./lowcode/computed.js";
import lifecycle from "./lowcode/lifecycle.js";
import { app, $page } from '../../../../app/global-api'


import handler$onClick from "./lowcode/handler/onClick.js";

import handler$getTitleStyle from "./lowcode/handler/getTitleStyle.js";

import handler$getCircleStyle from "./lowcode/handler/getCircleStyle.js";


// Import Components

import cloudbaseStandardIcon from "libraries/CLOUDBASE_STANDARD@1612432272646/components/Icon";

import gsdH5ReactSlot from "libraries/gsd-h5-react@0.0.61/components/Slot";

import gsdH5ReactContainer from "libraries/gsd-h5-react@0.0.61/components/Container";

import gsdH5ReactText from "libraries/gsd-h5-react@0.0.61/components/Text";


import * as constObj from '../../libCommonRes/const'
import * as toolsObj from '../../libCommonRes/tools'

import "./lowcode/style.less";

const pluginInstances = [];

class CompositeCompWrapper extends React.Component {

  $WEAPPS_COMP = {}

  componentDidUpdate() {
    const { data } = this.props
    for(let prop in data) {
      // 更新 propsData
      this.propsData[prop] = data[prop]
    }
  }


  constructor(props) {
    super(props);

    this.compConfig = {}
    this.virtualFields = Object.assign({}, props.pageVirtualFields || {}, {
    
      "CLOUDBASE_STANDARD:Icon": cloudbaseStandardIcon,
    
      "gsd-h5-react:Slot": gsdH5ReactSlot,
    
      "gsd-h5-react:Container": gsdH5ReactContainer,
    
      "gsd-h5-react:Text": gsdH5ReactText,
    
    });
    this.events = (["click"]).reduce((obj, trigger) => {
      obj[trigger] = (event) => {
        this.props.emit(trigger, event)
      };
      return obj
    }, {});
    this.handler = this.$WEAPPS_COMP.handler = {
      
      onClick: handler$onClick.bind(this),
      
      getTitleStyle: handler$getTitleStyle.bind(this),
      
      getCircleStyle: handler$getCircleStyle.bind(this),
      
    };
    this.componentSchema = {
  "type": "object",
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
        "classNameList": [
          "lcap-tabbar-item",
          "wa-comp-CLOUDBASE_STANDARD-TabBarItem"
        ],
        "listenerInstances": [
          {
            "key": "",
            "trigger": "tap",
            "instanceFunction": this.handler.onClick.bind(this),
            "data": {
              "target": ""
            }
          }
        ]
      },
      "x-index": 1,
      "properties": {
        "id2": {
          "key": "id2",
          "x-component": "gsd-h5-react:container",
          "x-props": {
            "sourceKey": "gsd-h5-react:Container",
            "dataBinds": {
              "_visible": () => this.$WEAPPS_COMP.props.data.circle
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
                "classNameList": [
                  "lcap-tabbar-item--circle"
                ],
                "styleBind": {
                  "style": (forItems) => (this.$WEAPPS_COMP.handler.getCircleStyle())
                }
              },
              "x-index": 1,
              "properties": {
                "id6": {
                  "key": "id6",
                  "x-component": "cloudbase_standard:icon",
                  "x-props": {
                    "sourceKey": "CLOUDBASE_STANDARD:Icon",
                    "data": {
                      "name": "success"
                    },
                    "dataBinds": {
                      "src": () => this.$WEAPPS_COMP.props.data.icon,
                      "size": () => this.$WEAPPS_COMP.props.data.childIconSize,
                      "color": () => this.$WEAPPS_COMP.props.data.color,
                      "_visible": () => this.$WEAPPS_COMP.props.data.icon
                    },
                    "dataTypes": [
                      {
                        "propertyPath": "src",
                        "type": "bind"
                      },
                      {
                        "propertyPath": "name",
                        "type": "static"
                      },
                      {
                        "propertyPath": "size",
                        "type": "bind"
                      },
                      {
                        "propertyPath": "color",
                        "type": "bind"
                      },
                      {
                        "propertyPath": "_visible",
                        "type": "bind"
                      }
                    ]
                  },
                  "x-index": 1
                },
                "id7": {
                  "key": "id7",
                  "x-component": "gsd-h5-react:slot",
                  "x-props": {
                    "sourceKey": "gsd-h5-react:Slot",
                    "data": {
                      "name": "costomIcon"
                    },
                    "dataBinds": {
                      "_visible": (forItems) => (!this.$WEAPPS_COMP.props.data.icon)
                    },
                    "dataTypes": [
                      {
                        "propertyPath": "name",
                        "type": "static"
                      },
                      {
                        "propertyPath": "_visible",
                        "type": "bind"
                      }
                    ]
                  },
                  "x-index": 2
                }
              }
            }
          }
        },
        "id4": {
          "key": "id4",
          "x-component": "gsd-h5-react:container",
          "x-props": {
            "sourceKey": "gsd-h5-react:Container",
            "dataBinds": {
              "_visible": () => this.$WEAPPS_COMP.props.data.title
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
            "classNameList": [
              "lcap-tabbar-item__title"
            ],
            "styleBind": {
              "style": (forItems) => (this.$WEAPPS_COMP.handler.getTitleStyle())
            }
          },
          "x-index": 2,
          "properties": {
            "id8": {
              "key": "id8",
              "x-component": "gsd-h5-react:text",
              "x-props": {
                "sourceKey": "gsd-h5-react:Text",
                "data": {
                  "decode": false,
                  "selectable": false,
                  "_visible": true
                },
                "dataBinds": {
                  "text": () => this.$WEAPPS_COMP.props.data.title
                },
                "dataTypes": [
                  {
                    "propertyPath": "text",
                    "type": "bind"
                  },
                  {
                    "propertyPath": "decode",
                    "type": "static"
                  },
                  {
                    "propertyPath": "selectable",
                    "type": "static"
                  }
                ]
              },
              "x-index": 1
            }
          }
        },
        "id5": {
          "key": "id5",
          "x-component": "gsd-h5-react:container",
          "x-props": {
            "sourceKey": "gsd-h5-react:Container",
            "dataBinds": {
              "_visible": (forItems) => (this.$WEAPPS_COMP.props.data.underline && this.$WEAPPS_COMP.props.data.actived)
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
            "classNameList": [
              "lcap-tabbar-item__underline"
            ],
            "styleBind": {
              "style": (forItems) => (this.$WEAPPS_COMP.props.data.activeColor?{'border-color':this.$WEAPPS_COMP.props.data.activeColor}:{})
            }
          },
          "x-index": 3
        },
        "id10": {
          "key": "id10",
          "x-component": "gsd-h5-react:container",
          "x-props": {
            "sourceKey": "gsd-h5-react:Container",
            "dataBinds": {
              "_visible": (forItems) => (!this.$WEAPPS_COMP.props.data.circle)
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
            "id11": {
              "key": "id11",
              "x-component": "gsd-h5-react:container",
              "x-props": {
                "sourceKey": "gsd-h5-react:Container",
                "dataBinds": {
                  "_visible": (forItems) => (this.$WEAPPS_COMP.props.data.actived)
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
                "id13": {
                  "key": "id13",
                  "x-component": "gsd-h5-react:container",
                  "x-props": {
                    "sourceKey": "gsd-h5-react:Container",
                    "dataBinds": {
                      "_visible": () => this.$WEAPPS_COMP.props.data.icon
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
                    "classNameList": [
                      "lcap-tabbar__icon-box"
                    ]
                  },
                  "x-index": 1,
                  "properties": {
                    "id15": {
                      "key": "id15",
                      "x-component": "cloudbase_standard:icon",
                      "x-props": {
                        "sourceKey": "CLOUDBASE_STANDARD:Icon",
                        "data": {
                          "name": "success",
                          "_visible": true
                        },
                        "dataBinds": {
                          "src": () => this.$WEAPPS_COMP.props.data.icon,
                          "size": () => this.$WEAPPS_COMP.props.data.childIconSize,
                          "color": () => this.$WEAPPS_COMP.props.data.activeColor
                        },
                        "dataTypes": [
                          {
                            "propertyPath": "src",
                            "type": "bind"
                          },
                          {
                            "propertyPath": "name",
                            "type": "static"
                          },
                          {
                            "propertyPath": "size",
                            "type": "bind"
                          },
                          {
                            "propertyPath": "color",
                            "type": "bind"
                          }
                        ]
                      },
                      "x-index": 1
                    }
                  }
                },
                "id14": {
                  "key": "id14",
                  "x-component": "gsd-h5-react:slot",
                  "x-props": {
                    "sourceKey": "gsd-h5-react:Slot",
                    "data": {
                      "name": "activeIcon"
                    },
                    "dataBinds": {
                      "_visible": (forItems) => (!this.$WEAPPS_COMP.props.data.icon)
                    },
                    "dataTypes": [
                      {
                        "propertyPath": "name",
                        "type": "static"
                      },
                      {
                        "propertyPath": "_visible",
                        "type": "bind"
                      }
                    ]
                  },
                  "x-index": 2
                }
              }
            },
            "id12": {
              "key": "id12",
              "x-component": "gsd-h5-react:container",
              "x-props": {
                "sourceKey": "gsd-h5-react:Container",
                "dataBinds": {
                  "_visible": (forItems) => (!this.$WEAPPS_COMP.props.data.actived)
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
              "x-index": 2,
              "properties": {
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
                    "classNameList": [
                      "lcap-tabbar-item__icon"
                    ],
                    "styleBind": {
                      "style": (forItems) => ({height: `${this.$WEAPPS_COMP.props.data.childIconSize}px`})
                    }
                  },
                  "x-index": 1,
                  "properties": {
                    "id18": {
                      "key": "id18",
                      "x-component": "cloudbase_standard:icon",
                      "x-props": {
                        "sourceKey": "CLOUDBASE_STANDARD:Icon",
                        "data": {
                          "name": "success",
                          "_visible": true
                        },
                        "dataBinds": {
                          "src": () => this.$WEAPPS_COMP.props.data.icon,
                          "size": () => this.$WEAPPS_COMP.props.data.childIconSize,
                          "color": () => this.$WEAPPS_COMP.props.data.color
                        },
                        "dataTypes": [
                          {
                            "propertyPath": "src",
                            "type": "bind"
                          },
                          {
                            "propertyPath": "name",
                            "type": "static"
                          },
                          {
                            "propertyPath": "size",
                            "type": "bind"
                          },
                          {
                            "propertyPath": "color",
                            "type": "bind"
                          }
                        ]
                      },
                      "x-index": 1
                    }
                  }
                },
                "id19": {
                  "key": "id19",
                  "x-component": "gsd-h5-react:slot",
                  "x-props": {
                    "sourceKey": "gsd-h5-react:Slot",
                    "data": {
                      "name": "custonIcon"
                    },
                    "dataBinds": {
                      "_visible": (forItems) => (!this.$WEAPPS_COMP.props.data.icon)
                    },
                    "dataTypes": [
                      {
                        "propertyPath": "name",
                        "type": "static"
                      },
                      {
                        "propertyPath": "_visible",
                        "type": "bind"
                      }
                    ]
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
};
    const widgetContext = {
  "id6": {
    "name": "success",
    "style": {},
    "classList": [],
    "widgetType": "CLOUDBASE_STANDARD:Icon",
    "_parentId": "id3"
  },
  "id7": {
    "name": "costomIcon",
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id3"
  },
  "id3": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [
      "lcap-tabbar-item--circle"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id2"
  },
  "id2": {
    "title": "",
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id1"
  },
  "id8": {
    "decode": false,
    "selectable": false,
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id4"
  },
  "id4": {
    "title": "",
    "style": {},
    "classList": [
      "lcap-tabbar-item__title"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id1"
  },
  "id5": {
    "title": "",
    "style": {},
    "classList": [
      "lcap-tabbar-item__underline"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id1"
  },
  "id15": {
    "name": "success",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "CLOUDBASE_STANDARD:Icon",
    "_parentId": "id13"
  },
  "id13": {
    "title": "",
    "style": {},
    "classList": [
      "lcap-tabbar__icon-box"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id11"
  },
  "id14": {
    "name": "activeIcon",
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id11"
  },
  "id11": {
    "title": "",
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id10"
  },
  "id18": {
    "name": "success",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "CLOUDBASE_STANDARD:Icon",
    "_parentId": "id17"
  },
  "id17": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [
      "lcap-tabbar-item__icon"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id12"
  },
  "id19": {
    "name": "custonIcon",
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id12"
  },
  "id12": {
    "title": "",
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id10"
  },
  "id10": {
    "title": "",
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id1"
  },
  "id1": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [
      "lcap-tabbar-item",
      "wa-comp-CLOUDBASE_STANDARD-TabBarItem"
    ],
    "widgetType": "gsd-h5-react:Container"
  }
}
    const dataBinds = {
  "id6": {
    "src": () => this.$WEAPPS_COMP.props.data.icon,
    "size": () => this.$WEAPPS_COMP.props.data.childIconSize,
    "color": () => this.$WEAPPS_COMP.props.data.color,
    "_visible": () => this.$WEAPPS_COMP.props.data.icon
  },
  "id7": {
    "_visible": (forItems) => (!this.$WEAPPS_COMP.props.data.icon)
  },
  "id3": {
    "style": (forItems) => (this.$WEAPPS_COMP.handler.getCircleStyle())
  },
  "id2": {
    "_visible": () => this.$WEAPPS_COMP.props.data.circle
  },
  "id8": {
    "text": () => this.$WEAPPS_COMP.props.data.title
  },
  "id4": {
    "_visible": () => this.$WEAPPS_COMP.props.data.title,
    "style": (forItems) => (this.$WEAPPS_COMP.handler.getTitleStyle())
  },
  "id5": {
    "_visible": (forItems) => (this.$WEAPPS_COMP.props.data.underline && this.$WEAPPS_COMP.props.data.actived),
    "style": (forItems) => (this.$WEAPPS_COMP.props.data.activeColor?{'border-color':this.$WEAPPS_COMP.props.data.activeColor}:{})
  },
  "id15": {
    "src": () => this.$WEAPPS_COMP.props.data.icon,
    "size": () => this.$WEAPPS_COMP.props.data.childIconSize,
    "color": () => this.$WEAPPS_COMP.props.data.activeColor
  },
  "id13": {
    "_visible": () => this.$WEAPPS_COMP.props.data.icon
  },
  "id14": {
    "_visible": (forItems) => (!this.$WEAPPS_COMP.props.data.icon)
  },
  "id11": {
    "_visible": (forItems) => (this.$WEAPPS_COMP.props.data.actived)
  },
  "id18": {
    "src": () => this.$WEAPPS_COMP.props.data.icon,
    "size": () => this.$WEAPPS_COMP.props.data.childIconSize,
    "color": () => this.$WEAPPS_COMP.props.data.color
  },
  "id17": {
    "style": (forItems) => ({height: `${this.$WEAPPS_COMP.props.data.childIconSize}px`})
  },
  "id19": {
    "_visible": (forItems) => (!this.$WEAPPS_COMP.props.data.icon)
  },
  "id12": {
    "_visible": (forItems) => (!this.$WEAPPS_COMP.props.data.actived)
  },
  "id10": {
    "_visible": (forItems) => (!this.$WEAPPS_COMP.props.data.circle)
  }
}
    const defaultProps = {
  "icon": "https://imgcache.qq.com/qcloud/tcloud_dtc/static/low_code/c868cd77-8454-46d5-bd13-54539707e9f2.svg",
  "name": "name",
  "color": "#444444",
  "title": "标题",
  "circle": false,
  "actived": false,
  "textSize": 24,
  "underline": false,
  "circleSize": 100,
  "activeColor": "#006EFF",
  "childIconSize": 40
}
    this.propsData = observable(Object.assign({}, defaultProps, this.props.data || {}))
    this.$WEAPPS_COMP.lib = { const: constObj, tools: toolsObj }
    this.$WEAPPS_COMP.props = { ...this.props, events: this.events, data: this.propsData }
    this.state = this.$WEAPPS_COMP.state = observable(getStateFn.bind(this)())
    this.computed = this.$WEAPPS_COMP.computed = createComputed(computed, this)
    this.node = this.$WEAPPS_COMP.node = this.createWidgetNode(this) || {}
    this.widgets = createWidgets(widgetContext, dataBinds)
    // widgets 内的 dataBinds 可能需要关联 widgets，需要重新执行 dataBinds
    retryDataBinds()
    Object.keys(this.widgets || {}).forEach(widgetId => {
      // 将实例 ownerWidget 挂到内部组件上。内部组件就可以通过 $comp.node.ownerWidget 获取到所在的组件实例
      this.widgets[widgetId].ownerWidget = this.node
    })
    this.pageListenerInstances = [];
    this.createCompAPI(this)
  }

  createWidgetNode(compThis) {
    // 当为数组时，需要判断自己属于 widgets 的哪一项
    const {
      compositeParent,
      forIndexes,
      id
    } = compThis.props
    let widgetData = compositeParent
      ? compositeParent.$WEAPPS_COMP.widgets[id]
      : $page.widgets[id]
    if(Array.isArray(widgetData)) {
      widgetData = widgetData.length > 0 ? get(widgetData, forIndexes) : {}
    }
    widgetData = widgetData || {}
    widgetData.getOwnerWidget = () => compThis.node.ownerWidget
    widgetData.getConfig = () => compThis.compConfig

    return widgetData
  }

  createCompAPI(compThis) {
    compThis.$WEAPPS_COMP = {
      compConfig: compThis.compConfig,
      widgets: compThis.widgets,
      node: compThis.node,
      handler: compThis.handler,
      lib: { const: constObj, tools: toolsObj },
      get props() {
        return {...compThis.props, events: compThis.events, data: compThis.propsData }
      },
      get state() {
        return compThis.state
      },
      get computed() {
        return compThis.computed
      },
    };
  }

  componentDidMount() {
    lifecycle.onAttached && lifecycle.onAttached.bind(this)()
    lifecycle.onReady && lifecycle.onReady.bind(this)()
  }

  componentWillUnmount() {
    lifecycle.onDetached && lifecycle.onDetached.bind(this)()
  }

  render() {
    return (
      <WidgetsContext.Provider value={{ parent: this }}>
        <AppRender
          className={this.props.className}
          virtualFields={this.virtualFields}
          componentSchema={this.componentSchema}
          codeContext={this}
        />
      </WidgetsContext.Provider>
    );
  }
}

export default observer((props) => (
   <CompositeCompWrapper {...props}></CompositeCompWrapper>
));
