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
    this.events = (["onClick"]).reduce((obj, trigger) => {
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
          "title": "thisIsFormCellKey",
          "_visible": true
        },
        "dataTypes": [
          {
            "propertyPath": "title",
            "type": "static"
          }
        ],
        "classNameList": [
          "g-complex-formcell",
          "wa-comp-CLOUDBASE_STANDARD-FormCell"
        ],
        "listenerInstances": [
          {
            "key": "",
            "trigger": "tap",
            "instanceFunction": function({data}) { this.props.emit('onClick', data.target) }.bind(this)
          }
        ]
      },
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
              "content"
            ]
          },
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
                "classNameListBind": {
                  "classList": () => this.$WEAPPS_COMP.computed.getValueCls
                }
              },
              "x-index": 0,
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
                      "text": (forItems) => (this.$WEAPPS_COMP.props.data.value || this.$WEAPPS_COMP.props.data.placeholder)
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
                  "x-index": 0
                }
              }
            },
            "id9": {
              "key": "id9",
              "x-component": "gsd-h5-react:container",
              "x-props": {
                "sourceKey": "gsd-h5-react:Container",
                "dataTypes": [
                  {
                    "propertyPath": "title",
                    "type": "static"
                  }
                ]
              },
              "x-index": 1,
              "properties": {
                "id3": {
                  "key": "id3",
                  "x-component": "gsd-h5-react:container",
                  "x-props": {
                    "sourceKey": "gsd-h5-react:Container",
                    "data": {
                      "title": "dorpdown"
                    },
                    "dataBinds": {
                      "_visible": (forItems) => (this.$WEAPPS_COMP.props.data.suffixType === 'dropdown')
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
                      "dropdown"
                    ]
                  },
                  "x-index": 0
                },
                "id4": {
                  "key": "id4",
                  "x-component": "gsd-h5-react:container",
                  "x-props": {
                    "sourceKey": "gsd-h5-react:Container",
                    "data": {
                      "title": "arrow"
                    },
                    "dataBinds": {
                      "_visible": (forItems) => (this.$WEAPPS_COMP.props.data.suffixType === 'arrow')
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
                      "arrow"
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
                      "_visible": (forItems) => (this.$WEAPPS_COMP.props.data.suffixType === 'actionText')
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
                      "action"
                    ]
                  },
                  "x-index": 3,
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
                          "text": () => this.$WEAPPS_COMP.props.data.suffixText
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
                      "x-index": 0
                    }
                  }
                },
                "id12": {
                  "key": "id12",
                  "x-component": "gsd-h5-react:slot",
                  "x-props": {
                    "sourceKey": "gsd-h5-react:Slot",
                    "data": {
                      "name": "suffixSlot",
                      "_visible": true
                    },
                    "dataTypes": [
                      {
                        "propertyPath": "name",
                        "type": "static"
                      }
                    ]
                  },
                  "x-index": 4
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
  "id8": {
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
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id6"
  },
  "id3": {
    "title": "dorpdown",
    "style": {},
    "classList": [
      "dropdown"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id9"
  },
  "id4": {
    "title": "arrow",
    "style": {},
    "classList": [
      "arrow"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id9"
  },
  "id11": {
    "decode": false,
    "selectable": false,
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id10"
  },
  "id10": {
    "title": "",
    "style": {},
    "classList": [
      "action"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id9"
  },
  "id12": {
    "name": "suffixSlot",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id9"
  },
  "id9": {
    "title": "",
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id6"
  },
  "id6": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [
      "content"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id1"
  },
  "id1": {
    "title": "thisIsFormCellKey",
    "_visible": true,
    "style": {},
    "classList": [
      "g-complex-formcell",
      "wa-comp-CLOUDBASE_STANDARD-FormCell"
    ],
    "widgetType": "gsd-h5-react:Container"
  }
}
    const dataBinds = {
  "id8": {
    "text": (forItems) => (this.$WEAPPS_COMP.props.data.value || this.$WEAPPS_COMP.props.data.placeholder)
  },
  "id7": {
    "classList": () => this.$WEAPPS_COMP.computed.getValueCls
  },
  "id3": {
    "_visible": (forItems) => (this.$WEAPPS_COMP.props.data.suffixType === 'dropdown')
  },
  "id4": {
    "_visible": (forItems) => (this.$WEAPPS_COMP.props.data.suffixType === 'arrow')
  },
  "id11": {
    "text": () => this.$WEAPPS_COMP.props.data.suffixText
  },
  "id10": {
    "_visible": (forItems) => (this.$WEAPPS_COMP.props.data.suffixType === 'actionText')
  }
}
    const defaultProps = {
  "value": "",
  "suffixText": "选择",
  "suffixType": "none",
  "placeholder": "请输入"
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
