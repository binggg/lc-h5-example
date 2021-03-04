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


import handler$handleValidate from "./lowcode/handler/handleValidate.js";

import handler$getForm from "./lowcode/handler/getForm.js";

import handler$getFormChild from "./lowcode/handler/getFormChild.js";

import handler$setValidateState from "./lowcode/handler/setValidateState.js";

import handler$setValue from "./lowcode/handler/setValue.js";


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

    this.compConfig = {
  "componentType": "formItem"
}
    this.virtualFields = Object.assign({}, props.pageVirtualFields || {}, {
    
      "gsd-h5-react:Text": gsdH5ReactText,
    
      "gsd-h5-react:Slot": gsdH5ReactSlot,
    
      "gsd-h5-react:Container": gsdH5ReactContainer,
    
    });
    this.events = (["validator"]).reduce((obj, trigger) => {
      obj[trigger] = (event) => {
        this.props.emit(trigger, event)
      };
      return obj
    }, {});
    this.handler = this.$WEAPPS_COMP.handler = {
      
      handleValidate: handler$handleValidate.bind(this),
      
      getForm: handler$getForm.bind(this),
      
      getFormChild: handler$getFormChild.bind(this),
      
      setValidateState: handler$setValidateState.bind(this),
      
      setValue: handler$setValue.bind(this),
      
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
          "title": "formItem"
        },
        "dataTypes": [
          {
            "propertyPath": "title",
            "type": "static"
          }
        ],
        "classNameList": [
          "g-form-item-layout",
          "wa-comp-CLOUDBASE_STANDARD-FormItem"
        ],
        "classNameListBind": {
          "classList": (forItems) => (this.$WEAPPS_COMP.props.data.underline?'g-form-item-underline':'')
        }
      },
      "x-index": 0,
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
            "classNameListBind": {
              "classList": () => this.$WEAPPS_COMP.computed.getItemCls
            }
          },
          "x-index": 2,
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
                "classNameListBind": {
                  "classList": () => this.$WEAPPS_COMP.computed.getWrapCls
                }
              },
              "x-index": 0,
              "properties": {
                "id9": {
                  "key": "id9",
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
                      "label-text"
                    ]
                  },
                  "x-index": 0,
                  "properties": {
                    "id7": {
                      "key": "id7",
                      "x-component": "gsd-h5-react:text",
                      "x-props": {
                        "sourceKey": "gsd-h5-react:Text",
                        "data": {
                          "text": "*",
                          "decode": false,
                          "selectable": false
                        },
                        "dataBinds": {
                          "_visible": () => this.$WEAPPS_COMP.computed.requiredFlag
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
                          },
                          {
                            "propertyPath": "_visible",
                            "type": "bind"
                          }
                        ],
                        "classNameList": [
                          "label-text_required"
                        ]
                      },
                      "x-index": 0
                    },
                    "id20": {
                      "key": "id20",
                      "x-component": "gsd-h5-react:container",
                      "x-props": {
                        "sourceKey": "gsd-h5-react:Container",
                        "dataBinds": {
                          "_visible": () => this.$WEAPPS_COMP.props.data.labelVisible
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
                        "id19": {
                          "key": "id19",
                          "x-component": "gsd-h5-react:slot",
                          "x-props": {
                            "sourceKey": "gsd-h5-react:Slot",
                            "data": {
                              "name": "labelSlot",
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
                      "g-form-item__content"
                    ]
                  },
                  "x-index": 2,
                  "properties": {
                    "id8": {
                      "key": "id8",
                      "x-component": "gsd-h5-react:slot",
                      "x-props": {
                        "sourceKey": "gsd-h5-react:Slot",
                        "data": {
                          "name": "contentSlot",
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
            },
            "id21": {
              "key": "id21",
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
              "x-index": 2,
              "properties": {
                "id22": {
                  "key": "id22",
                  "x-component": "gsd-h5-react:slot",
                  "x-props": {
                    "sourceKey": "gsd-h5-react:Slot",
                    "data": {
                      "name": "descSlot",
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
        },
        "id3": {
          "key": "id3",
          "x-component": "gsd-h5-react:container",
          "x-props": {
            "sourceKey": "gsd-h5-react:Container",
            "data": {
              "title": "status"
            },
            "dataBinds": {
              "_visible": (forItems) => (this.$WEAPPS_COMP.computed.getValidateStatus !== 'success')
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
            "classNameListBind": {
              "classList": () => this.$WEAPPS_COMP.computed.getStatusCls
            }
          },
          "x-index": 3,
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
                  "text": () => this.$WEAPPS_COMP.computed.getHelp
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
        }
      }
    }
  }
};
    const widgetContext = {
  "id7": {
    "text": "*",
    "decode": false,
    "selectable": false,
    "style": {},
    "classList": [
      "label-text_required"
    ],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id9"
  },
  "id19": {
    "name": "labelSlot",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id20"
  },
  "id20": {
    "title": "",
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id9"
  },
  "id9": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [
      "label-text"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id5"
  },
  "id8": {
    "name": "contentSlot",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id14"
  },
  "id14": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [
      "g-form-item__content"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id5"
  },
  "id5": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id2"
  },
  "id22": {
    "name": "descSlot",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id21"
  },
  "id21": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [],
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
  "id4": {
    "decode": false,
    "selectable": false,
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id3"
  },
  "id3": {
    "title": "status",
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id1"
  },
  "id1": {
    "title": "formItem",
    "style": {},
    "classList": [
      "g-form-item-layout",
      "wa-comp-CLOUDBASE_STANDARD-FormItem"
    ],
    "widgetType": "gsd-h5-react:Container"
  }
}
    const dataBinds = {
  "id7": {
    "_visible": () => this.$WEAPPS_COMP.computed.requiredFlag
  },
  "id20": {
    "_visible": () => this.$WEAPPS_COMP.props.data.labelVisible
  },
  "id5": {
    "classList": () => this.$WEAPPS_COMP.computed.getWrapCls
  },
  "id2": {
    "classList": () => this.$WEAPPS_COMP.computed.getItemCls
  },
  "id4": {
    "text": () => this.$WEAPPS_COMP.computed.getHelp
  },
  "id3": {
    "_visible": (forItems) => (this.$WEAPPS_COMP.computed.getValidateStatus !== 'success'),
    "classList": () => this.$WEAPPS_COMP.computed.getStatusCls
  },
  "id1": {
    "classList": (forItems) => (this.$WEAPPS_COMP.props.data.underline?'g-form-item-underline':'')
  }
}
    const defaultProps = {
  "name": "thisIsInputKey",
  "rules": [],
  "layout": "",
  "descSlot": "",
  "required": false,
  "labelSlot": "",
  "underline": true,
  "contentSlot": "",
  "requiredMsg": "该项为必填项",
  "labelVisible": true,
  "requiredFlag": true,
  "validateStatus": "success",
  "validateTrigger": "onChange"
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
