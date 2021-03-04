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


import handler$findActiveItem from "./lowcode/handler/findActiveItem.js";

import handler$onClickSidebar from "./lowcode/handler/onClickSidebar.js";

import handler$selectValueFromActiveItem from "./lowcode/handler/selectValueFromActiveItem.js";

import handler$getValue from "./lowcode/handler/getValue.js";

import handler$isControlled from "./lowcode/handler/isControlled.js";


// Import Components

import gsdH5ReactText from "libraries/gsd-h5-react@0.0.61/components/Text";

import gsdH5ReactContainer from "libraries/gsd-h5-react@0.0.61/components/Container";

import gsdH5ReactSlot from "libraries/gsd-h5-react@0.0.61/components/Slot";


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
    
      "gsd-h5-react:Text": gsdH5ReactText,
    
      "gsd-h5-react:Container": gsdH5ReactContainer,
    
      "gsd-h5-react:Slot": gsdH5ReactSlot,
    
    });
    this.events = (["change"]).reduce((obj, trigger) => {
      obj[trigger] = (event) => {
        this.props.emit(trigger, event)
      };
      return obj
    }, {});
    this.handler = this.$WEAPPS_COMP.handler = {
      
      findActiveItem: handler$findActiveItem.bind(this),
      
      onClickSidebar: handler$onClickSidebar.bind(this),
      
      selectValueFromActiveItem: handler$selectValueFromActiveItem.bind(this),
      
      getValue: handler$getValue.bind(this),
      
      isControlled: handler$isControlled.bind(this),
      
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
          "lcap-classification",
          "wa-comp-CLOUDBASE_STANDARD-Classification"
        ]
      },
      "x-index": 1,
      "properties": {
        "id2": {
          "key": "id2",
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
              "lcap-classification__sidebar"
            ]
          },
          "x-index": 0,
          "properties": {
            "id3": {
              "key": "id3",
              "x-component": "gsd-h5-react:container",
              "x-props": {
                "sourceKey": "gsd-h5-react:Container",
                "dataBinds": {
                  "title": (forItems) => forItems.id3.value,
                  "_waFor": () => this.$WEAPPS_COMP.props.data.list
                },
                "dataTypes": [
                  {
                    "propertyPath": "title",
                    "type": "bind"
                  },
                  {
                    "propertyPath": "_waFor",
                    "type": "bind"
                  }
                ],
                "classNameList": [
                  "lcap-classification__sidebar_item"
                ],
                "classNameListBind": {
                  "classList": (forItems) => (forItems.id3.value === this.$WEAPPS_COMP.handler.getValue() ? 'actived' : '')
                },
                "listenerInstances": [
                  {
                    "key": "",
                    "trigger": "tap",
                    "instanceFunction": this.handler.onClickSidebar.bind(this),
                    "dataBinds": {
                      "target": (forItems) => forItems.id3.value
                    }
                  }
                ]
              },
              "x-index": 0,
              "properties": {
                "id4": {
                  "key": "id4",
                  "x-component": "gsd-h5-react:text",
                  "x-props": {
                    "sourceKey": "gsd-h5-react:Text",
                    "data": {
                      "decode": false,
                      "selectable": false,
                      "_visible": true
                    },
                    "dataBinds": {
                      "text": (forItems) => forItems.id3.lable
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
                    ],
                    "commonStyle": {
                      "textAlign": "center"
                    }
                  },
                  "x-index": 1
                }
              }
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
            "classNameList": [
              "lcap-classification__content"
            ]
          },
          "x-index": 1,
          "properties": {
            "id7": {
              "key": "id7",
              "x-component": "gsd-h5-react:container",
              "x-props": {
                "sourceKey": "gsd-h5-react:Container",
                "dataBinds": {
                  "_visible": (forItems) => (this.$WEAPPS_COMP.handler.selectValueFromActiveItem('content.text'))
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
                },
                "classNameList": [
                  "lcap-classification__content_container"
                ]
              },
              "x-index": 1,
              "properties": {
                "id20": {
                  "key": "id20",
                  "x-component": "gsd-h5-react:text",
                  "x-props": {
                    "sourceKey": "gsd-h5-react:Text",
                    "data": {
                      "decode": false,
                      "selectable": false,
                      "_visible": true
                    },
                    "dataBinds": {
                      "text": (forItems) => (this.$WEAPPS_COMP.handler.selectValueFromActiveItem('content.text'))
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
            "id11": {
              "key": "id11",
              "x-component": "gsd-h5-react:text",
              "x-props": {
                "sourceKey": "gsd-h5-react:Text",
                "data": {
                  "decode": false,
                  "selectable": false
                },
                "dataBinds": {
                  "text": (forItems) => (this.$WEAPPS_COMP.handler.selectValueFromActiveItem('content.title')),
                  "_visible": (forItems) => (this.$WEAPPS_COMP.handler.selectValueFromActiveItem('content.title'))
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
                  "lcap-classification__content_title"
                ]
              },
              "x-index": 0
            },
            "id12": {
              "key": "id12",
              "x-component": "gsd-h5-react:slot",
              "x-props": {
                "sourceKey": "gsd-h5-react:Slot",
                "data": {
                  "name": "content",
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
        }
      }
    }
  }
};
    const widgetContext = {
  "id4": {
    "decode": false,
    "selectable": false,
    "_visible": true,
    "style": {
      "textAlign": "center"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id3"
  },
  "id3": {
    "style": {},
    "classList": [
      "lcap-classification__sidebar_item"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id2"
  },
  "id2": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [
      "lcap-classification__sidebar"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id1"
  },
  "id20": {
    "decode": false,
    "selectable": false,
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id7"
  },
  "id7": {
    "title": "",
    "style": {
      "display": "flex",
      "justifyContent": "flex-start",
      "alignItems": "center",
      "flexFlow": "row wrap",
      "flexWrap": "wrap"
    },
    "classList": [
      "lcap-classification__content_container"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id5"
  },
  "id11": {
    "decode": false,
    "selectable": false,
    "style": {},
    "classList": [
      "lcap-classification__content_title"
    ],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id5"
  },
  "id12": {
    "name": "content",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id5"
  },
  "id5": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [
      "lcap-classification__content"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id1"
  },
  "id1": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [
      "lcap-classification",
      "wa-comp-CLOUDBASE_STANDARD-Classification"
    ],
    "widgetType": "gsd-h5-react:Container"
  }
}
    const dataBinds = {
  "id4": {
    "text": (forItems) => forItems.id3.lable
  },
  "id3": {
    "title": (forItems) => forItems.id3.value,
    "_waFor": () => this.$WEAPPS_COMP.props.data.list,
    "classList": (forItems) => (forItems.id3.value === this.$WEAPPS_COMP.handler.getValue() ? 'actived' : '')
  },
  "id20": {
    "text": (forItems) => (this.$WEAPPS_COMP.handler.selectValueFromActiveItem('content.text'))
  },
  "id7": {
    "_visible": (forItems) => (this.$WEAPPS_COMP.handler.selectValueFromActiveItem('content.text'))
  },
  "id11": {
    "text": (forItems) => (this.$WEAPPS_COMP.handler.selectValueFromActiveItem('content.title')),
    "_visible": (forItems) => (this.$WEAPPS_COMP.handler.selectValueFromActiveItem('content.title'))
  }
}
    const defaultProps = {
  "list": [
    {
      "lable": "标签1",
      "value": "value1",
      "content": {
        "text": "内容消息1",
        "title": "标题1"
      }
    },
    {
      "lable": "标签2",
      "value": "value2",
      "content": {
        "text": "内容消息2",
        "title": "标题2"
      }
    }
  ],
  "defaultValue": "value1"
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
