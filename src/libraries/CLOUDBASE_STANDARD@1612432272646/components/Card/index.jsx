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

import gsdH5ReactText from "libraries/gsd-h5-react@0.0.61/components/Text";

import gsdH5ReactSlot from "libraries/gsd-h5-react@0.0.61/components/Slot";

import gsdH5ReactContainer from "libraries/gsd-h5-react@0.0.61/components/Container";


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
    
      "gsd-h5-react:Slot": gsdH5ReactSlot,
    
      "gsd-h5-react:Container": gsdH5ReactContainer,
    
    });
    this.events = ([]).reduce((obj, trigger) => {
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
          "lcap-card",
          "wa-comp-CLOUDBASE_STANDARD-Card"
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
              "lcap-card__header"
            ]
          },
          "x-index": 1,
          "properties": {
            "id5": {
              "key": "id5",
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
                "commonStyle": {
                  "display": "block"
                }
              },
              "x-index": 1
            },
            "id8": {
              "key": "id8",
              "x-component": "gsd-h5-react:slot",
              "x-props": {
                "sourceKey": "gsd-h5-react:Slot",
                "data": {
                  "name": "header",
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
              "lcap-card__body"
            ]
          },
          "x-index": 2,
          "properties": {
            "id16": {
              "key": "id16",
              "x-component": "gsd-h5-react:text",
              "x-props": {
                "sourceKey": "gsd-h5-react:Text",
                "data": {
                  "decode": false,
                  "selectable": false
                },
                "dataBinds": {
                  "text": () => this.$WEAPPS_COMP.props.data.content,
                  "_visible": () => this.$WEAPPS_COMP.props.data.content
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
                "commonStyle": {
                  "display": "block"
                }
              }
            },
            "id17": {
              "key": "id17",
              "x-component": "gsd-h5-react:slot",
              "x-props": {
                "sourceKey": "gsd-h5-react:Slot",
                "data": {
                  "name": "body",
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
        },
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
              "lcap-card__footer"
            ]
          },
          "x-index": 3,
          "properties": {
            "id7": {
              "key": "id7",
              "x-component": "gsd-h5-react:slot",
              "x-props": {
                "sourceKey": "gsd-h5-react:Slot",
                "data": {
                  "name": "footer",
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
        },
        "id10": {
          "key": "id10",
          "x-component": "gsd-h5-react:slot",
          "x-props": {
            "sourceKey": "gsd-h5-react:Slot",
            "data": {
              "name": "default",
              "_visible": true
            },
            "dataTypes": [
              {
                "propertyPath": "name",
                "type": "static"
              }
            ]
          },
          "x-index": 0
        }
      }
    }
  }
};
    const widgetContext = {
  "id5": {
    "decode": false,
    "selectable": false,
    "style": {
      "display": "block"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id2"
  },
  "id8": {
    "name": "header",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id2"
  },
  "id2": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [
      "lcap-card__header"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id1"
  },
  "id16": {
    "decode": false,
    "selectable": false,
    "style": {
      "display": "block"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id3"
  },
  "id17": {
    "name": "body",
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
      "lcap-card__body"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id1"
  },
  "id7": {
    "name": "footer",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id4"
  },
  "id4": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [
      "lcap-card__footer"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id1"
  },
  "id10": {
    "name": "default",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id1"
  },
  "id1": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [
      "lcap-card",
      "wa-comp-CLOUDBASE_STANDARD-Card"
    ],
    "widgetType": "gsd-h5-react:Container"
  }
}
    const dataBinds = {
  "id5": {
    "text": () => this.$WEAPPS_COMP.props.data.title,
    "_visible": () => this.$WEAPPS_COMP.props.data.title
  },
  "id16": {
    "text": () => this.$WEAPPS_COMP.props.data.content,
    "_visible": () => this.$WEAPPS_COMP.props.data.content
  }
}
    const defaultProps = {
  "title": "标题",
  "content": "内容"
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
