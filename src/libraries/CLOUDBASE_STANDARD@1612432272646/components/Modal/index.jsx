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



// Import Components

import gsdH5ReactContainer from "libraries/gsd-h5-react@0.0.61/components/Container";

import gsdH5ReactSlot from "libraries/gsd-h5-react@0.0.61/components/Slot";

import gsdH5ReactText from "libraries/gsd-h5-react@0.0.61/components/Text";

import gsdH5ReactButton from "libraries/gsd-h5-react@0.0.61/components/Button";

import cloudbaseStandardIcon from "libraries/CLOUDBASE_STANDARD@1612432272646/components/Icon";


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
    
      "gsd-h5-react:Button": gsdH5ReactButton,
    
      "CLOUDBASE_STANDARD:Icon": cloudbaseStandardIcon,
    
    });
    this.events = (["close","comfirm"]).reduce((obj, trigger) => {
      obj[trigger] = (event) => {
        this.props.emit(trigger, event)
      };
      return obj
    }, {});
    this.handler = this.$WEAPPS_COMP.handler = {
      
    };
    this.componentSchema = {
  "type": "object",
  "properties": {
    "id1": {
      "key": "id1",
      "x-component": "gsd-h5-react:container",
      "x-props": {
        "sourceKey": "gsd-h5-react:Container",
        "dataBinds": {
          "_visible": (forItems) => (this.$WEAPPS_COMP.props.data.visible || this.$WEAPPS_COMP.computed.contentIn)
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
          "lcap-modal",
          "container",
          "wa-comp-CLOUDBASE_STANDARD-Modal"
        ]
      },
      "x-index": 1,
      "properties": {
        "id2": {
          "key": "id2",
          "x-component": "gsd-h5-react:container",
          "x-props": {
            "sourceKey": "gsd-h5-react:Container",
            "dataTypes": [
              {
                "propertyPath": "title",
                "type": "static"
              }
            ],
            "classNameList": [
              "lcap-modal__mask"
            ]
          },
          "x-index": 1
        },
        "id3": {
          "key": "id3",
          "x-component": "gsd-h5-react:container",
          "x-props": {
            "sourceKey": "gsd-h5-react:Container",
            "dataTypes": [
              {
                "propertyPath": "title",
                "type": "static"
              }
            ],
            "classNameList": [
              "lcap-modal__dialog"
            ],
            "classNameListBind": {
              "classList": (forItems) => (this.$WEAPPS_COMP.props.data.visible && this.$WEAPPS_COMP.computed.contentIn ? 'enter' : '')
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
                  "title": "modal-header",
                  "_visible": true
                },
                "dataTypes": [
                  {
                    "propertyPath": "title",
                    "type": "static"
                  }
                ]
              },
              "x-index": 1,
              "properties": {
                "id12": {
                  "key": "id12",
                  "x-component": "gsd-h5-react:slot",
                  "x-props": {
                    "sourceKey": "gsd-h5-react:Slot",
                    "data": {
                      "name": "customContent",
                      "_visible": true
                    },
                    "dataTypes": [
                      {
                        "propertyPath": "name",
                        "type": "static"
                      }
                    ]
                  },
                  "x-index": 2
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
                  "paddingBottom": "3.5714rem"
                }
              },
              "x-index": 2,
              "properties": {
                "id8": {
                  "key": "id8",
                  "x-component": "gsd-h5-react:button",
                  "x-props": {
                    "sourceKey": "gsd-h5-react:Button",
                    "data": {
                      "lang": "en",
                      "size": "default",
                      "text": "",
                      "type": "default",
                      "plain": false,
                      "divider": "",
                      "loading": false,
                      "disabled": false,
                      "formType": "button",
                      "openType": "",
                      "categoryId": [],
                      "sessionFrom": "",
                      "appParameter": "",
                      "sendMessageImg": "",
                      "sendMessagePath": "",
                      "showMessageCard": "",
                      "sendMessageTitle": ""
                    },
                    "dataBinds": {
                      "_visible": () => this.$WEAPPS_COMP.props.data.isDefaultButton
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
                        "propertyPath": "text",
                        "type": "slot"
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
                        "propertyPath": "_visible",
                        "type": "bind"
                      }
                    ],
                    "commonStyle": {
                      "color": "rgb(255, 255, 255)",
                      "borderWidth": "0",
                      "borderRadius": "0",
                      "background": "rgb(50, 129, 248)",
                      "position": "fixed",
                      "left": "0",
                      "right": "0",
                      "bottom": "0"
                    },
                    "listenerInstances": [
                      {
                        "key": "",
                        "trigger": "tap",
                        "instanceFunction": function({data}) { this.props.emit('comfirm', data.target) }.bind(this),
                        "data": {
                          "target": ""
                        }
                      }
                    ]
                  },
                  "x-index": 0,
                  "properties": {
                    "text": {
                      "key": "text",
                      "properties": {
                        "id9": {
                          "key": "id9",
                          "x-component": "gsd-h5-react:text",
                          "x-props": {
                            "sourceKey": "gsd-h5-react:Text",
                            "data": {
                              "text": "确定",
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
                              "zIndex": 30,
                              "position": "static",
                              "bottom": "0"
                            }
                          },
                          "x-index": 1
                        }
                      }
                    }
                  }
                },
                "id13": {
                  "key": "id13",
                  "x-component": "gsd-h5-react:slot",
                  "x-props": {
                    "sourceKey": "gsd-h5-react:Slot",
                    "data": {
                      "name": "customButton"
                    },
                    "dataBinds": {
                      "_visible": () => !this.$WEAPPS_COMP.props.data.isDefaultButton
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
                    ],
                    "commonStyle": {
                      "color": "rgb(255, 255, 255)",
                      "borderWidth": "0",
                      "borderRadius": "0",
                      "background": "rgb(50, 129, 248)",
                      "position": "fixed",
                      "left": "0",
                      "right": "0",
                      "bottom": "0"
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
                "classNameList": [
                  "lcap-modal__close_btn"
                ],
                "listenerInstances": [
                  {
                    "key": "",
                    "trigger": "tap",
                    "instanceFunction": function({data}) { this.props.emit('close', data.target) }.bind(this),
                    "data": {
                      "target": ""
                    }
                  }
                ]
              },
              "x-index": 0,
              "properties": {
                "id14": {
                  "key": "id14",
                  "x-component": "cloudbase_standard:icon",
                  "x-props": {
                    "sourceKey": "CLOUDBASE_STANDARD:Icon",
                    "data": {
                      "src": "",
                      "name": "close",
                      "size": 48,
                      "color": "rgb(136, 136, 136)",
                      "_visible": true
                    },
                    "dataTypes": [
                      {
                        "propertyPath": "src",
                        "type": "static"
                      },
                      {
                        "propertyPath": "name",
                        "type": "static"
                      },
                      {
                        "propertyPath": "size",
                        "type": "static"
                      },
                      {
                        "propertyPath": "color",
                        "type": "static"
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
  "id2": {
    "title": "",
    "style": {},
    "classList": [
      "lcap-modal__mask"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id1"
  },
  "id12": {
    "name": "customContent",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id4"
  },
  "id4": {
    "title": "modal-header",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id3"
  },
  "id9": {
    "text": "确定",
    "decode": false,
    "selectable": false,
    "_visible": true,
    "style": {
      "zIndex": 30,
      "position": "static",
      "bottom": "0"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id8"
  },
  "id8": {
    "lang": "en",
    "size": "default",
    "text": "",
    "type": "default",
    "plain": false,
    "divider": "",
    "loading": false,
    "disabled": false,
    "formType": "button",
    "openType": "",
    "categoryId": [],
    "sessionFrom": "",
    "appParameter": "",
    "sendMessageImg": "",
    "sendMessagePath": "",
    "showMessageCard": "",
    "sendMessageTitle": "",
    "style": {
      "color": "rgb(255, 255, 255)",
      "borderWidth": "0",
      "borderRadius": "0",
      "background": "rgb(50, 129, 248)",
      "position": "fixed",
      "left": "0",
      "right": "0",
      "bottom": "0"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Button",
    "_parentId": "id5"
  },
  "id13": {
    "name": "customButton",
    "style": {
      "color": "rgb(255, 255, 255)",
      "borderWidth": "0",
      "borderRadius": "0",
      "background": "rgb(50, 129, 248)",
      "position": "fixed",
      "left": "0",
      "right": "0",
      "bottom": "0"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id5"
  },
  "id5": {
    "title": "",
    "_visible": true,
    "style": {
      "paddingBottom": "3.5714rem"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id3"
  },
  "id14": {
    "src": "",
    "name": "close",
    "size": 48,
    "color": "rgb(136, 136, 136)",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "CLOUDBASE_STANDARD:Icon",
    "_parentId": "id6"
  },
  "id6": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [
      "lcap-modal__close_btn"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id3"
  },
  "id3": {
    "title": "",
    "style": {},
    "classList": [
      "lcap-modal__dialog"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id1"
  },
  "id1": {
    "title": "",
    "style": {},
    "classList": [
      "lcap-modal",
      "container",
      "wa-comp-CLOUDBASE_STANDARD-Modal"
    ],
    "widgetType": "gsd-h5-react:Container"
  }
}
    const dataBinds = {
  "id8": {
    "_visible": () => this.$WEAPPS_COMP.props.data.isDefaultButton
  },
  "id13": {
    "_visible": () => !this.$WEAPPS_COMP.props.data.isDefaultButton
  },
  "id3": {
    "classList": (forItems) => (this.$WEAPPS_COMP.props.data.visible && this.$WEAPPS_COMP.computed.contentIn ? 'enter' : '')
  },
  "id1": {
    "_visible": (forItems) => (this.$WEAPPS_COMP.props.data.visible || this.$WEAPPS_COMP.computed.contentIn)
  }
}
    const defaultProps = {
  "content": "",
  "visible": false,
  "isDefaultButton": true
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
