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


import handler$getWrapperClassName from "./lowcode/handler/getWrapperClassName.js";

import handler$onTapListItem from "./lowcode/handler/onTapListItem.js";


// Import Components

import gsdH5ReactSlot from "libraries/gsd-h5-react@0.0.61/components/Slot";

import gsdH5ReactText from "libraries/gsd-h5-react@0.0.61/components/Text";

import gsdH5ReactContainer from "libraries/gsd-h5-react@0.0.61/components/Container";

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
    
      "gsd-h5-react:Slot": gsdH5ReactSlot,
    
      "gsd-h5-react:Text": gsdH5ReactText,
    
      "gsd-h5-react:Container": gsdH5ReactContainer,
    
      "CLOUDBASE_STANDARD:Icon": cloudbaseStandardIcon,
    
    });
    this.events = (["click"]).reduce((obj, trigger) => {
      obj[trigger] = (event) => {
        this.props.emit(trigger, event)
      };
      return obj
    }, {});
    this.handler = this.$WEAPPS_COMP.handler = {
      
      getWrapperClassName: handler$getWrapperClassName.bind(this),
      
      onTapListItem: handler$onTapListItem.bind(this),
      
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
          "lcap-item",
          "wa-comp-CLOUDBASE_STANDARD-Item"
        ],
        "classNameListBind": {
          "classList": (forItems) => (this.$WEAPPS_COMP.handler.getWrapperClassName())
        },
        "listenerInstances": [
          {
            "key": "",
            "trigger": "tap",
            "instanceFunction": function({data}) { this.props.emit('click', data.target) }.bind(this),
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
          "x-component": "gsd-h5-react:slot",
          "x-props": {
            "sourceKey": "gsd-h5-react:Slot",
            "data": {
              "name": "customIcon",
              "_visible": true
            },
            "dataTypes": [
              {
                "propertyPath": "name",
                "type": "static"
              }
            ],
            "classNameList": [
              "lcap-slot"
            ]
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
              "lcap-item__body"
            ]
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
                  "lcap-item__title"
                ]
              },
              "x-index": 1,
              "properties": {
                "id8": {
                  "key": "id8",
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
                  "lcap-item__description"
                ]
              },
              "x-index": 2,
              "properties": {
                "id9": {
                  "key": "id9",
                  "x-component": "gsd-h5-react:text",
                  "x-props": {
                    "sourceKey": "gsd-h5-react:Text",
                    "data": {
                      "decode": false,
                      "selectable": false
                    },
                    "dataBinds": {
                      "text": () => this.$WEAPPS_COMP.props.data.description,
                      "_visible": () => this.$WEAPPS_COMP.props.data.description
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
                    ]
                  },
                  "x-index": 1
                }
              }
            },
            "id6": {
              "key": "id6",
              "x-component": "gsd-h5-react:slot",
              "x-props": {
                "sourceKey": "gsd-h5-react:Slot",
                "data": {
                  "name": "customTitle",
                  "_visible": true
                },
                "dataTypes": [
                  {
                    "propertyPath": "name",
                    "type": "static"
                  }
                ]
              },
              "x-index": 3
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
              "lcap-item__value"
            ]
          },
          "x-index": 3,
          "properties": {
            "id10": {
              "key": "id10",
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
                ]
              },
              "x-index": 0,
              "properties": {
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
                      "text": () => this.$WEAPPS_COMP.props.data.value,
                      "_visible": () => this.$WEAPPS_COMP.props.data.value
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
                    ]
                  },
                  "x-index": 1
                }
              }
            },
            "id12": {
              "key": "id12",
              "x-component": "gsd-h5-react:slot",
              "x-props": {
                "sourceKey": "gsd-h5-react:Slot",
                "data": {
                  "name": "customValue",
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
            },
            "id13": {
              "key": "id13",
              "x-component": "cloudbase_standard:icon",
              "x-props": {
                "sourceKey": "CLOUDBASE_STANDARD:Icon",
                "data": {
                  "src": "",
                  "name": "chevronright",
                  "size": 48,
                  "color": "#888"
                },
                "dataBinds": {
                  "_visible": () => this.$WEAPPS_COMP.props.data.detail
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
                  },
                  {
                    "propertyPath": "_visible",
                    "type": "bind"
                  }
                ],
                "classNameList": [
                  "lcap-item__detail-icon--vertical",
                  "lcap-item__right-icon"
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
  "id2": {
    "name": "customIcon",
    "_visible": true,
    "style": {},
    "classList": [
      "lcap-slot"
    ],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id1"
  },
  "id8": {
    "decode": false,
    "selectable": false,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id4"
  },
  "id4": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [
      "lcap-item__title"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id3"
  },
  "id9": {
    "decode": false,
    "selectable": false,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id5"
  },
  "id5": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [
      "lcap-item__description"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id3"
  },
  "id6": {
    "name": "customTitle",
    "_visible": true,
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
      "lcap-item__body"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id1"
  },
  "id11": {
    "decode": false,
    "selectable": false,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id10"
  },
  "id10": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id7"
  },
  "id12": {
    "name": "customValue",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id7"
  },
  "id13": {
    "src": "",
    "name": "chevronright",
    "size": 48,
    "color": "#888",
    "style": {},
    "classList": [
      "lcap-item__detail-icon--vertical",
      "lcap-item__right-icon"
    ],
    "widgetType": "CLOUDBASE_STANDARD:Icon",
    "_parentId": "id7"
  },
  "id7": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [
      "lcap-item__value"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id1"
  },
  "id1": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [
      "lcap-item",
      "wa-comp-CLOUDBASE_STANDARD-Item"
    ],
    "widgetType": "gsd-h5-react:Container"
  }
}
    const dataBinds = {
  "id8": {
    "text": () => this.$WEAPPS_COMP.props.data.title,
    "_visible": () => this.$WEAPPS_COMP.props.data.title
  },
  "id9": {
    "text": () => this.$WEAPPS_COMP.props.data.description,
    "_visible": () => this.$WEAPPS_COMP.props.data.description
  },
  "id11": {
    "text": () => this.$WEAPPS_COMP.props.data.value,
    "_visible": () => this.$WEAPPS_COMP.props.data.value
  },
  "id13": {
    "_visible": () => this.$WEAPPS_COMP.props.data.detail
  },
  "id1": {
    "classList": (forItems) => (this.$WEAPPS_COMP.handler.getWrapperClassName())
  }
}
    const defaultProps = {
  "title": "标题",
  "value": "右侧内容",
  "detail": true,
  "bordered": true,
  "customIcon": "",
  "customTitle": "",
  "customValue": "",
  "description": "标题下描述",
  "isClickable": false
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
