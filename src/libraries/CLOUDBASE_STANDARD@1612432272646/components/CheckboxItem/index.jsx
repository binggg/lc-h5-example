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


import handler$handleChange from "./lowcode/handler/handleChange.js";

import handler$getChecked from "./lowcode/handler/getChecked.js";

import handler$getCheckboxGroup from "./lowcode/handler/getCheckboxGroup.js";


// Import Components

import gsdH5ReactImage from "libraries/gsd-h5-react@0.0.61/components/Image";

import gsdH5ReactContainer from "libraries/gsd-h5-react@0.0.61/components/Container";

import gsdH5ReactText from "libraries/gsd-h5-react@0.0.61/components/Text";

import gsdH5ReactLabel from "libraries/gsd-h5-react@0.0.61/components/Label";

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
    
      "gsd-h5-react:Image": gsdH5ReactImage,
    
      "gsd-h5-react:Container": gsdH5ReactContainer,
    
      "gsd-h5-react:Text": gsdH5ReactText,
    
      "gsd-h5-react:Label": gsdH5ReactLabel,
    
      "gsd-h5-react:Slot": gsdH5ReactSlot,
    
    });
    this.events = (["change"]).reduce((obj, trigger) => {
      obj[trigger] = (event) => {
        this.props.emit(trigger, event)
      };
      return obj
    }, {});
    this.handler = this.$WEAPPS_COMP.handler = {
      
      handleChange: handler$handleChange.bind(this),
      
      getChecked: handler$getChecked.bind(this),
      
      getCheckboxGroup: handler$getCheckboxGroup.bind(this),
      
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
          "title": "checkbox",
          "_visible": true
        },
        "dataTypes": [
          {
            "propertyPath": "title",
            "type": "static"
          }
        ],
        "classNameList": [
          "g-checkbox",
          "wa-comp-CLOUDBASE_STANDARD-CheckboxItem"
        ],
        "classNameListBind": {
          "classList": () => this.$WEAPPS_COMP.computed.getContainerCls
        }
      },
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
              "g-checkbox-container"
            ]
          },
          "x-index": 0,
          "properties": {
            "id2": {
              "key": "id2",
              "x-component": "gsd-h5-react:label",
              "x-props": {
                "sourceKey": "gsd-h5-react:Label",
                "data": {
                  "for": "",
                  "_visible": true
                },
                "dataTypes": [
                  {
                    "propertyPath": "for",
                    "type": "static"
                  }
                ],
                "classNameList": [
                  "label"
                ],
                "listenerInstances": [
                  {
                    "key": "",
                    "trigger": "tap",
                    "instanceFunction": this.handler.handleChange.bind(this),
                    "data": {
                      "target": ""
                    }
                  }
                ]
              },
              "x-index": 0,
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
                      "check-icon"
                    ]
                  },
                  "x-index": 0,
                  "properties": {
                    "id5": {
                      "key": "id5"
                    },
                    "id6": {
                      "key": "id6"
                    },
                    "id14": {
                      "key": "id14",
                      "x-component": "gsd-h5-react:container",
                      "x-props": {
                        "sourceKey": "gsd-h5-react:Container",
                        "dataBinds": {
                          "_visible": () => this.$WEAPPS_COMP.computed.getChecked
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
                          "check-icon-item",
                          "check-icon-checked"
                        ]
                      },
                      "x-index": 3
                    },
                    "id15": {
                      "key": "id15",
                      "x-component": "gsd-h5-react:container",
                      "x-props": {
                        "sourceKey": "gsd-h5-react:Container",
                        "dataBinds": {
                          "_visible": () => this.$WEAPPS_COMP.computed.getUnChecked
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
                          "check-icon-item",
                          "check-icon-uncheck"
                        ]
                      },
                      "x-index": 2
                    }
                  }
                },
                "id11": {
                  "key": "id11",
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
                      "check-text"
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
                          "text": () => this.$WEAPPS_COMP.props.data.label
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
                        "classNameList": [
                          "label"
                        ]
                      },
                      "x-index": 0
                    },
                    "id13": {
                      "key": "id13",
                      "x-component": "gsd-h5-react:text",
                      "x-props": {
                        "sourceKey": "gsd-h5-react:Text",
                        "data": {
                          "decode": false,
                          "selectable": false
                        },
                        "dataBinds": {
                          "text": () => this.$WEAPPS_COMP.props.data.desc,
                          "_visible": () => this.$WEAPPS_COMP.props.data.desc
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
                          "desc"
                        ]
                      },
                      "x-index": 1
                    }
                  }
                }
              }
            },
            "id16": {
              "key": "id16",
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
              "x-index": 2
            }
          }
        }
      }
    }
  }
};
    const widgetContext = {
  "id14": {
    "title": "",
    "style": {},
    "classList": [
      "check-icon-item",
      "check-icon-checked"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id4"
  },
  "id15": {
    "title": "",
    "style": {},
    "classList": [
      "check-icon-item",
      "check-icon-uncheck"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id4"
  },
  "id4": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [
      "check-icon"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id2"
  },
  "id12": {
    "decode": false,
    "selectable": false,
    "_visible": true,
    "style": {},
    "classList": [
      "label"
    ],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id11"
  },
  "id13": {
    "decode": false,
    "selectable": false,
    "style": {},
    "classList": [
      "desc"
    ],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id11"
  },
  "id11": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [
      "check-text"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id2"
  },
  "id2": {
    "for": "",
    "_visible": true,
    "style": {},
    "classList": [
      "label"
    ],
    "widgetType": "gsd-h5-react:Label",
    "_parentId": "id17"
  },
  "id16": {
    "name": "suffixSlot",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id17"
  },
  "id17": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [
      "g-checkbox-container"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id1"
  },
  "id1": {
    "title": "checkbox",
    "_visible": true,
    "style": {},
    "classList": [
      "g-checkbox",
      "wa-comp-CLOUDBASE_STANDARD-CheckboxItem"
    ],
    "widgetType": "gsd-h5-react:Container"
  }
}
    const dataBinds = {
  "id14": {
    "_visible": () => this.$WEAPPS_COMP.computed.getChecked
  },
  "id15": {
    "_visible": () => this.$WEAPPS_COMP.computed.getUnChecked
  },
  "id12": {
    "text": () => this.$WEAPPS_COMP.props.data.label
  },
  "id13": {
    "text": () => this.$WEAPPS_COMP.props.data.desc,
    "_visible": () => this.$WEAPPS_COMP.props.data.desc
  },
  "id1": {
    "classList": () => this.$WEAPPS_COMP.computed.getContainerCls
  }
}
    const defaultProps = {
  "desc": "",
  "label": "标签值",
  "value": "checkbox",
  "disabled": false,
  "underline": false,
  "suffixSlot": ""
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
