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


import handler$getNavigationbarStyle from "./lowcode/handler/getNavigationbarStyle.js";

import handler$getTitleBarStartStyle from "./lowcode/handler/getTitleBarStartStyle.js";

import handler$getSystemInfo from "./lowcode/handler/getSystemInfo.js";


// Import Components

import gsdH5ReactContainer from "libraries/gsd-h5-react@0.0.61/components/Container";

import gsdH5ReactSlot from "libraries/gsd-h5-react@0.0.61/components/Slot";

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
    
      "gsd-h5-react:Container": gsdH5ReactContainer,
    
      "gsd-h5-react:Slot": gsdH5ReactSlot,
    
      "gsd-h5-react:Text": gsdH5ReactText,
    
    });
    this.events = (["back","home"]).reduce((obj, trigger) => {
      obj[trigger] = (event) => {
        this.props.emit(trigger, event)
      };
      return obj
    }, {});
    this.handler = this.$WEAPPS_COMP.handler = {
      
      getNavigationbarStyle: handler$getNavigationbarStyle.bind(this),
      
      getTitleBarStartStyle: handler$getTitleBarStartStyle.bind(this),
      
      getSystemInfo: handler$getSystemInfo.bind(this),
      
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
          "wa-comp-CLOUDBASE_STANDARD-NavBar"
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
              "_visible": (forItems) => (this.$WEAPPS_COMP.props.data.mode !== 'cover')
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
            "styleBind": {
              "style": (forItems) => ({height: `${this.$WEAPPS_COMP.state.navBarHeight||0}px`})
            }
          },
          "x-index": 1
        },
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
              "lcap-navbar"
            ],
            "styleBind": {
              "style": (forItems) => ({ 'background-color': this.$WEAPPS_COMP.props.data.backgroundColor, height: `${this.$WEAPPS_COMP.state.navBarHeight||0}px` })
            }
          },
          "x-index": 2,
          "properties": {
            "id4": {
              "key": "id4",
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
                  "lcap-navbar__statusbar"
                ],
                "styleBind": {
                  "style": (forItems) => ({height: `${this.$WEAPPS_COMP.state.statusBarHeight}px`})
                }
              },
              "x-index": 1
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
                "classNameList": [
                  "lcap-navbar__titlebar"
                ],
                "styleBind": {
                  "style": (forItems) => ({'height': `${this.$WEAPPS_COMP.state.titleBarHeight}px`, color: this.$WEAPPS_COMP.props.data.textColor})
                }
              },
              "x-index": 2,
              "properties": {
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
                    "classNameList": [
                      "lcap-navbar__start"
                    ],
                    "styleBind": {
                      "style": (forItems) => (this.$WEAPPS_COMP.handler.getTitleBarStartStyle())
                    }
                  },
                  "x-index": 0,
                  "properties": {
                    "id9": {
                      "key": "id9",
                      "x-component": "gsd-h5-react:container",
                      "x-props": {
                        "sourceKey": "gsd-h5-react:Container",
                        "dataBinds": {
                          "_visible": (forItems) => (this.$WEAPPS_COMP.props.data.back && !this.$WEAPPS_COMP.props.data.home)
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
                          "lcap-navbar__action",
                          "lcap-navbar__action-goback"
                        ],
                        "classNameListBind": {
                          "classList": () => this.$WEAPPS_COMP.props.data.iconTheme
                        },
                        "listenerInstances": [
                          {
                            "key": "",
                            "trigger": "tap",
                            "instanceFunction": function({data}) { this.props.emit('back', data.target) }.bind(this),
                            "data": {
                              "target": ""
                            }
                          }
                        ]
                      },
                      "x-index": 1
                    },
                    "id10": {
                      "key": "id10",
                      "x-component": "gsd-h5-react:container",
                      "x-props": {
                        "sourceKey": "gsd-h5-react:Container",
                        "dataBinds": {
                          "_visible": (forItems) => (!this.$WEAPPS_COMP.props.data.back && this.$WEAPPS_COMP.props.data.home)
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
                          "lcap-navbar__action",
                          "lcap-navbar__action-gohome"
                        ],
                        "classNameListBind": {
                          "classList": () => this.$WEAPPS_COMP.props.data.iconTheme
                        },
                        "listenerInstances": [
                          {
                            "key": "",
                            "trigger": "tap",
                            "instanceFunction": function({data}) { this.props.emit('home', data.target) }.bind(this),
                            "data": {
                              "target": ""
                            }
                          }
                        ]
                      },
                      "x-index": 2
                    },
                    "id11": {
                      "key": "id11",
                      "x-component": "gsd-h5-react:container",
                      "x-props": {
                        "sourceKey": "gsd-h5-react:Container",
                        "dataBinds": {
                          "_visible": (forItems) => (this.$WEAPPS_COMP.props.data.back && this.$WEAPPS_COMP.props.data.home)
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
                          "lcap-navbar__actions"
                        ],
                        "classNameListBind": {
                          "classList": (forItems) => (this.$WEAPPS_COMP.state.ios?'ios':'android')
                        },
                        "styleBind": {
                          "style": (forItems) => ({'margin-left': `${750-this.$WEAPPS_COMP.state.capsuleRectInfo.right}px`})
                        }
                      },
                      "x-index": 3,
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
                            "classNameList": [
                              "lcap-navbar__action",
                              "lcap-navbar__action-goback"
                            ],
                            "classNameListBind": {
                              "classList": () => this.$WEAPPS_COMP.props.data.iconTheme
                            },
                            "listenerInstances": [
                              {
                                "key": "",
                                "trigger": "tap",
                                "instanceFunction": function({data}) { this.props.emit('back', data.target) }.bind(this),
                                "data": {
                                  "target": ""
                                }
                              }
                            ]
                          }
                        },
                        "id14": {
                          "key": "id14",
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
                              "lcap-navbar__action",
                              "lcap-navbar__action-gohome"
                            ],
                            "classNameListBind": {
                              "classList": () => this.$WEAPPS_COMP.props.data.iconTheme
                            },
                            "listenerInstances": [
                              {
                                "key": "",
                                "trigger": "tap",
                                "instanceFunction": function({data}) { this.props.emit('home', data.target) }.bind(this),
                                "data": {
                                  "target": ""
                                }
                              }
                            ]
                          }
                        }
                      }
                    },
                    "id12": {
                      "key": "id12",
                      "x-component": "gsd-h5-react:slot",
                      "x-props": {
                        "sourceKey": "gsd-h5-react:Slot",
                        "data": {
                          "name": "start"
                        },
                        "dataBinds": {
                          "_visible": (forItems) => (!this.$WEAPPS_COMP.props.data.back && !this.$WEAPPS_COMP.props.data.home)
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
                      "x-index": 4
                    }
                  }
                },
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
                    "classNameList": [
                      "lcap-navbar__center"
                    ]
                  },
                  "x-index": 2,
                  "properties": {
                    "id15": {
                      "key": "id15",
                      "x-component": "gsd-h5-react:text",
                      "x-props": {
                        "sourceKey": "gsd-h5-react:Text",
                        "data": {
                          "decode": false,
                          "selectable": false
                        },
                        "dataBinds": {
                          "text": () => this.$WEAPPS_COMP.props.data.title,
                          "_visible": () => this.$WEAPPS_COMP.props.data.title
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
                          },
                          {
                            "propertyPath": "_visible",
                            "type": "bind"
                          }
                        ],
                        "classNameList": [
                          "lcap-navbar__title"
                        ],
                        "styleBind": {
                          "style": (forItems) => ({'font-size': `${this.$WEAPPS_COMP.props.data.textSize}px`})
                        }
                      },
                      "x-index": 0
                    },
                    "id16": {
                      "key": "id16",
                      "x-component": "gsd-h5-react:slot",
                      "x-props": {
                        "sourceKey": "gsd-h5-react:Slot",
                        "data": {
                          "name": "center"
                        },
                        "dataBinds": {
                          "_visible": (forItems) => (!this.$WEAPPS_COMP.props.data.title)
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
                      "x-index": 1
                    }
                  }
                },
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
                    "classNameList": [
                      "lcap-navbar__end"
                    ],
                    "styleBind": {
                      "style": (forItems) => ({'width': `${this.$WEAPPS_COMP.state.capsuleRectInfo.width + 750 - this.$WEAPPS_COMP.state.capsuleRectInfo.right}px`, height: `${this.$WEAPPS_COMP.state.capsuleRectInfo.height}px`})
                    }
                  },
                  "x-index": 3,
                  "properties": {
                    "id17": {
                      "key": "id17",
                      "x-component": "gsd-h5-react:slot",
                      "x-props": {
                        "sourceKey": "gsd-h5-react:Slot",
                        "data": {
                          "name": "end",
                          "_visible": true
                        },
                        "dataTypes": [
                          {
                            "propertyPath": "name",
                            "type": "static"
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
};
    const widgetContext = {
  "id2": {
    "title": "",
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id1"
  },
  "id4": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [
      "lcap-navbar__statusbar"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id3"
  },
  "id9": {
    "title": "",
    "style": {},
    "classList": [
      "lcap-navbar__action",
      "lcap-navbar__action-goback"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id6"
  },
  "id10": {
    "title": "",
    "style": {},
    "classList": [
      "lcap-navbar__action",
      "lcap-navbar__action-gohome"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id6"
  },
  "id13": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [
      "lcap-navbar__action",
      "lcap-navbar__action-goback"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id11"
  },
  "id14": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [
      "lcap-navbar__action",
      "lcap-navbar__action-gohome"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id11"
  },
  "id11": {
    "title": "",
    "style": {},
    "classList": [
      "lcap-navbar__actions"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id6"
  },
  "id12": {
    "name": "start",
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id6"
  },
  "id6": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [
      "lcap-navbar__start"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id5"
  },
  "id15": {
    "decode": false,
    "selectable": false,
    "style": {},
    "classList": [
      "lcap-navbar__title"
    ],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id7"
  },
  "id16": {
    "name": "center",
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id7"
  },
  "id7": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [
      "lcap-navbar__center"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id5"
  },
  "id17": {
    "name": "end",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id8"
  },
  "id8": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [
      "lcap-navbar__end"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id5"
  },
  "id5": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [
      "lcap-navbar__titlebar"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id3"
  },
  "id3": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [
      "lcap-navbar"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id1"
  },
  "id1": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Container"
  }
}
    const dataBinds = {
  "id2": {
    "_visible": (forItems) => (this.$WEAPPS_COMP.props.data.mode !== 'cover'),
    "style": (forItems) => ({height: `${this.$WEAPPS_COMP.state.navBarHeight||0}px`})
  },
  "id4": {
    "style": (forItems) => ({height: `${this.$WEAPPS_COMP.state.statusBarHeight}px`})
  },
  "id9": {
    "_visible": (forItems) => (this.$WEAPPS_COMP.props.data.back && !this.$WEAPPS_COMP.props.data.home),
    "classList": () => this.$WEAPPS_COMP.props.data.iconTheme
  },
  "id10": {
    "_visible": (forItems) => (!this.$WEAPPS_COMP.props.data.back && this.$WEAPPS_COMP.props.data.home),
    "classList": () => this.$WEAPPS_COMP.props.data.iconTheme
  },
  "id13": {
    "classList": () => this.$WEAPPS_COMP.props.data.iconTheme
  },
  "id14": {
    "classList": () => this.$WEAPPS_COMP.props.data.iconTheme
  },
  "id11": {
    "_visible": (forItems) => (this.$WEAPPS_COMP.props.data.back && this.$WEAPPS_COMP.props.data.home),
    "style": (forItems) => ({'margin-left': `${750-this.$WEAPPS_COMP.state.capsuleRectInfo.right}px`}),
    "classList": (forItems) => (this.$WEAPPS_COMP.state.ios?'ios':'android')
  },
  "id12": {
    "_visible": (forItems) => (!this.$WEAPPS_COMP.props.data.back && !this.$WEAPPS_COMP.props.data.home)
  },
  "id6": {
    "style": (forItems) => (this.$WEAPPS_COMP.handler.getTitleBarStartStyle())
  },
  "id15": {
    "text": () => this.$WEAPPS_COMP.props.data.title,
    "_visible": () => this.$WEAPPS_COMP.props.data.title,
    "style": (forItems) => ({'font-size': `${this.$WEAPPS_COMP.props.data.textSize}px`})
  },
  "id16": {
    "_visible": (forItems) => (!this.$WEAPPS_COMP.props.data.title)
  },
  "id8": {
    "style": (forItems) => ({'width': `${this.$WEAPPS_COMP.state.capsuleRectInfo.width + 750 - this.$WEAPPS_COMP.state.capsuleRectInfo.right}px`, height: `${this.$WEAPPS_COMP.state.capsuleRectInfo.height}px`})
  },
  "id5": {
    "style": (forItems) => ({'height': `${this.$WEAPPS_COMP.state.titleBarHeight}px`, color: this.$WEAPPS_COMP.props.data.textColor})
  },
  "id3": {
    "style": (forItems) => ({ 'background-color': this.$WEAPPS_COMP.props.data.backgroundColor, height: `${this.$WEAPPS_COMP.state.navBarHeight||0}px` })
  }
}
    const defaultProps = {
  "end": "",
  "back": false,
  "home": false,
  "mode": "default",
  "start": "",
  "title": "导航标题",
  "center": "",
  "textSize": 28,
  "iconTheme": "black",
  "textColor": "rgba(0, 0, 0, 1)",
  "backgroundColor": "rgba(255, 255, 255, 1)"
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
