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

import gsdH5ReactSlot from "libraries/gsd-h5-react@0.0.61/components/Slot";

import gsdH5ReactText from "libraries/gsd-h5-react@0.0.61/components/Text";

import cloudbaseStandardRadioItem from "libraries/CLOUDBASE_STANDARD@1612432272646/components/RadioItem";

import cloudbaseStandardRadio from "libraries/CLOUDBASE_STANDARD@1612432272646/components/Radio";

import cloudbaseStandardFormItem from "libraries/CLOUDBASE_STANDARD@1612432272646/components/FormItem";


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
  "componentType": "formField"
}
    this.virtualFields = Object.assign({}, props.pageVirtualFields || {}, {
    
      "gsd-h5-react:Slot": gsdH5ReactSlot,
    
      "gsd-h5-react:Text": gsdH5ReactText,
    
      "CLOUDBASE_STANDARD:RadioItem": cloudbaseStandardRadioItem,
    
      "CLOUDBASE_STANDARD:Radio": cloudbaseStandardRadio,
    
      "CLOUDBASE_STANDARD:FormItem": cloudbaseStandardFormItem,
    
    });
    this.events = (["validator","change"]).reduce((obj, trigger) => {
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
      "x-component": "cloudbase_standard:formitem",
      "x-props": {
        "sourceKey": "CLOUDBASE_STANDARD:FormItem",
        "data": {
          "rules": [],
          "descSlot": "",
          "labelSlot": "",
          "contentSlot": "",
          "validateStatus": "success",
          "validateTrigger": "onChange",
          "_visible": true
        },
        "dataBinds": {
          "name": () => this.$WEAPPS_COMP.props.data.name,
          "layout": () => this.$WEAPPS_COMP.props.data.layout,
          "required": () => this.$WEAPPS_COMP.props.data.required,
          "underline": () => this.$WEAPPS_COMP.props.data.underline,
          "requiredMsg": () => this.$WEAPPS_COMP.props.data.requiredMsg,
          "labelVisible": () => this.$WEAPPS_COMP.props.data.labelVisible,
          "requiredFlag": () => this.$WEAPPS_COMP.props.data.requiredFlag
        },
        "dataTypes": [
          {
            "propertyPath": "name",
            "type": "bind"
          },
          {
            "propertyPath": "rules",
            "type": "static"
          },
          {
            "propertyPath": "layout",
            "type": "bind"
          },
          {
            "propertyPath": "descSlot",
            "type": "slot"
          },
          {
            "propertyPath": "required",
            "type": "bind"
          },
          {
            "propertyPath": "labelSlot",
            "type": "slot"
          },
          {
            "propertyPath": "underline",
            "type": "bind"
          },
          {
            "propertyPath": "contentSlot",
            "type": "slot"
          },
          {
            "propertyPath": "requiredMsg",
            "type": "bind"
          },
          {
            "propertyPath": "labelVisible",
            "type": "bind"
          },
          {
            "propertyPath": "requiredFlag",
            "type": "bind"
          },
          {
            "propertyPath": "validateStatus",
            "type": "static"
          },
          {
            "propertyPath": "validateTrigger",
            "type": "static"
          }
        ],
        "listenerInstances": [
          {
            "key": "",
            "trigger": "validator",
            "instanceFunction": function({data}) { this.props.emit('validator', data.target) }.bind(this),
            "data": {
              "target": ""
            }
          }
        ],
        "classNameList": [
          "wa-comp-CLOUDBASE_STANDARD-FormRadio"
        ]
      },
      "x-index": 0,
      "properties": {
        "descSlot": {
          "key": "descSlot",
          "properties": {
            "id6": {
              "key": "id6",
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
        },
        "labelSlot": {
          "key": "labelSlot",
          "properties": {
            "id4": {
              "key": "id4",
              "x-component": "gsd-h5-react:text",
              "x-props": {
                "sourceKey": "gsd-h5-react:Text",
                "data": {
                  "decode": false,
                  "selectable": false
                },
                "dataBinds": {
                  "text": () => this.$WEAPPS_COMP.props.data.label,
                  "_visible": (forItems) => (this.$WEAPPS_COMP.props.data.labelVisible && this.$WEAPPS_COMP.props.data.label)
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
              "x-index": 0
            },
            "id5": {
              "key": "id5",
              "x-component": "gsd-h5-react:slot",
              "x-props": {
                "sourceKey": "gsd-h5-react:Slot",
                "data": {
                  "name": "labelSlot"
                },
                "dataBinds": {
                  "_visible": (forItems) => (this.$WEAPPS_COMP.props.data.labelVisible && !this.$WEAPPS_COMP.props.data.label)
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
        "contentSlot": {
          "key": "contentSlot",
          "properties": {
            "id2": {
              "key": "id2",
              "x-component": "cloudbase_standard:radio",
              "x-props": {
                "sourceKey": "CLOUDBASE_STANDARD:Radio",
                "data": {
                  "_visible": true
                },
                "dataBinds": {
                  "value": () => this.$WEAPPS_COMP.props.data.value,
                  "disabled": () => this.$WEAPPS_COMP.props.data.disabled
                },
                "dataTypes": [
                  {
                    "propertyPath": "value",
                    "type": "bind"
                  },
                  {
                    "propertyPath": "disabled",
                    "type": "bind"
                  },
                  {
                    "propertyPath": "contentSlot",
                    "type": "slot"
                  }
                ],
                "listenerInstances": [
                  {
                    "trigger": "change",
                    "instanceFunction": function({ event, forItems }) {    const wid = this.widgets.id2;    const widgetData = (forItems.forIndexes && forItems.forIndexes.length > 0) ? get(wid, forItems.forIndexes) : wid;    widgetData.value = event.detail.value;  }.bind(this)
                  },
                  {
                    "key": "",
                    "trigger": "change",
                    "instanceFunction": function({data}) { this.props.emit('change', data.target) }.bind(this),
                    "data": {
                      "target": ""
                    }
                  }
                ]
              },
              "x-index": 0,
              "properties": {
                "contentSlot": {
                  "key": "contentSlot",
                  "properties": {
                    "id3": {
                      "key": "id3",
                      "x-component": "cloudbase_standard:radioitem",
                      "x-props": {
                        "sourceKey": "CLOUDBASE_STANDARD:RadioItem",
                        "data": {
                          "desc": "",
                          "disabled": false,
                          "underline": false
                        },
                        "dataBinds": {
                          "label": (forItems) => forItems.id3.label,
                          "value": (forItems) => forItems.id3.value,
                          "_waFor": () => this.$WEAPPS_COMP.props.data.range
                        },
                        "dataTypes": [
                          {
                            "propertyPath": "desc",
                            "type": "static"
                          },
                          {
                            "propertyPath": "label",
                            "type": "bind"
                          },
                          {
                            "propertyPath": "value",
                            "type": "bind"
                          },
                          {
                            "propertyPath": "disabled",
                            "type": "static"
                          },
                          {
                            "propertyPath": "underline",
                            "type": "static"
                          },
                          {
                            "propertyPath": "suffixSlot",
                            "type": "slot"
                          },
                          {
                            "propertyPath": "_waFor",
                            "type": "bind"
                          }
                        ]
                      },
                      "x-index": 0,
                      "properties": {
                        "suffixSlot": {
                          "key": "suffixSlot"
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
    }
  }
};
    const widgetContext = {
  "id6": {
    "name": "descSlot",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id1"
  },
  "id4": {
    "decode": false,
    "selectable": false,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id1"
  },
  "id5": {
    "name": "labelSlot",
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id1"
  },
  "id3": {
    "desc": "",
    "disabled": false,
    "underline": false,
    "style": {},
    "classList": [],
    "widgetType": "CLOUDBASE_STANDARD:RadioItem",
    "_parentId": "id2"
  },
  "id2": {
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "CLOUDBASE_STANDARD:Radio",
    "_parentId": "id1"
  },
  "id1": {
    "rules": [],
    "descSlot": "",
    "labelSlot": "",
    "contentSlot": "",
    "validateStatus": "success",
    "validateTrigger": "onChange",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "CLOUDBASE_STANDARD:FormItem"
  }
}
    const dataBinds = {
  "id4": {
    "text": () => this.$WEAPPS_COMP.props.data.label,
    "_visible": (forItems) => (this.$WEAPPS_COMP.props.data.labelVisible && this.$WEAPPS_COMP.props.data.label)
  },
  "id5": {
    "_visible": (forItems) => (this.$WEAPPS_COMP.props.data.labelVisible && !this.$WEAPPS_COMP.props.data.label)
  },
  "id3": {
    "label": (forItems) => forItems.id3.label,
    "value": (forItems) => forItems.id3.value,
    "_waFor": () => this.$WEAPPS_COMP.props.data.range
  },
  "id2": {
    "value": () => this.$WEAPPS_COMP.props.data.value,
    "disabled": () => this.$WEAPPS_COMP.props.data.disabled
  },
  "id1": {
    "name": () => this.$WEAPPS_COMP.props.data.name,
    "layout": () => this.$WEAPPS_COMP.props.data.layout,
    "required": () => this.$WEAPPS_COMP.props.data.required,
    "underline": () => this.$WEAPPS_COMP.props.data.underline,
    "requiredMsg": () => this.$WEAPPS_COMP.props.data.requiredMsg,
    "labelVisible": () => this.$WEAPPS_COMP.props.data.labelVisible,
    "requiredFlag": () => this.$WEAPPS_COMP.props.data.requiredFlag
  }
}
    const defaultProps = {
  "name": "thisIsRadioKey",
  "label": "单选框",
  "range": [
    {
      "label": "选项一",
      "value": "first"
    },
    {
      "label": "选项二",
      "value": "second"
    }
  ],
  "value": "",
  "layout": "",
  "descSlot": "",
  "disabled": false,
  "required": false,
  "labelSlot": "",
  "underline": true,
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
