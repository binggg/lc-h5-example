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


import handler$onChange from "./lowcode/handler/onChange.js";

import handler$onCancel from "./lowcode/handler/onCancel.js";


// Import Components

import gsdH5ReactText from "libraries/gsd-h5-react@0.0.61/components/Text";

import gsdH5ReactLabel from "libraries/gsd-h5-react@0.0.61/components/Label";

import gsdH5ReactSlot from "libraries/gsd-h5-react@0.0.61/components/Slot";

import cloudbaseStandardTime from "libraries/CLOUDBASE_STANDARD@1612432272646/components/Time";

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
    
      "gsd-h5-react:Text": gsdH5ReactText,
    
      "gsd-h5-react:Label": gsdH5ReactLabel,
    
      "gsd-h5-react:Slot": gsdH5ReactSlot,
    
      "CLOUDBASE_STANDARD:Time": cloudbaseStandardTime,
    
      "CLOUDBASE_STANDARD:FormItem": cloudbaseStandardFormItem,
    
    });
    this.events = (["change","cancel","validator"]).reduce((obj, trigger) => {
      obj[trigger] = (event) => {
        this.props.emit(trigger, event)
      };
      return obj
    }, {});
    this.handler = this.$WEAPPS_COMP.handler = {
      
      onChange: handler$onChange.bind(this),
      
      onCancel: handler$onCancel.bind(this),
      
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
          "requiredFlag": () => this.$WEAPPS_COMP.props.data.requiredFlag,
          "submitFormatter": (forItems) => ((value) => value.split(":").reduce((pre, cur, index) => (     pre + cur * [3600, 60, 1][index] * 1000 ), 0))
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
            "propertyPath": "submitFormatter",
            "type": "bind"
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
          "wa-comp-CLOUDBASE_STANDARD-FormTime"
        ]
      },
      "x-index": 0,
      "properties": {
        "descSlot": {
          "key": "descSlot"
        },
        "labelSlot": {
          "key": "labelSlot",
          "properties": {
            "id2": {
              "key": "id2",
              "x-component": "gsd-h5-react:label",
              "x-props": {
                "sourceKey": "gsd-h5-react:Label",
                "data": {
                  "for": ""
                },
                "dataBinds": {
                  "_visible": (forItems) => (this.$WEAPPS_COMP.props.data.labelVisible && this.$WEAPPS_COMP.props.data.label)
                },
                "dataTypes": [
                  {
                    "propertyPath": "for",
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
                  "x-component": "gsd-h5-react:text",
                  "x-props": {
                    "sourceKey": "gsd-h5-react:Text",
                    "data": {
                      "decode": "",
                      "selectable": ""
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
                    ]
                  },
                  "x-index": 0
                }
              }
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
            "id4": {
              "key": "id4",
              "x-component": "cloudbase_standard:time",
              "x-props": {
                "sourceKey": "CLOUDBASE_STANDARD:Time",
                "data": {
                  "_visible": true
                },
                "dataBinds": {
                  "end": () => this.$WEAPPS_COMP.props.data.end,
                  "start": () => this.$WEAPPS_COMP.props.data.start,
                  "value": () => this.$WEAPPS_COMP.computed.value,
                  "disabled": () => this.$WEAPPS_COMP.props.data.disabled,
                  "suffixText": () => this.$WEAPPS_COMP.props.data.suffixText,
                  "suffixType": () => this.$WEAPPS_COMP.props.data.suffixType,
                  "placeholder": () => this.$WEAPPS_COMP.props.data.placeholder
                },
                "dataTypes": [
                  {
                    "propertyPath": "end",
                    "type": "bind"
                  },
                  {
                    "propertyPath": "start",
                    "type": "bind"
                  },
                  {
                    "propertyPath": "value",
                    "type": "bind"
                  },
                  {
                    "propertyPath": "disabled",
                    "type": "bind"
                  },
                  {
                    "propertyPath": "suffixText",
                    "type": "bind"
                  },
                  {
                    "propertyPath": "suffixType",
                    "type": "bind"
                  },
                  {
                    "propertyPath": "placeholder",
                    "type": "bind"
                  }
                ],
                "listenerInstances": [
                  {
                    "trigger": "change",
                    "instanceFunction": function({ event, forItems }) {    const wid = this.widgets.id4;    const widgetData = (forItems.forIndexes && forItems.forIndexes.length > 0) ? get(wid, forItems.forIndexes) : wid;    widgetData.value = event.detail.value;  }.bind(this)
                  },
                  {
                    "key": "",
                    "trigger": "change",
                    "instanceFunction": function({data}) { this.props.emit('change', data.target) }.bind(this),
                    "data": {
                      "target": ""
                    }
                  },
                  {
                    "key": "",
                    "trigger": "cancel",
                    "instanceFunction": function({data}) { this.props.emit('cancel', data.target) }.bind(this),
                    "data": {
                      "target": ""
                    }
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
  "id3": {
    "decode": "",
    "selectable": "",
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id2"
  },
  "id2": {
    "for": "",
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Label",
    "_parentId": "id1"
  },
  "id5": {
    "name": "labelSlot",
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id1"
  },
  "id4": {
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "CLOUDBASE_STANDARD:Time",
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
  "id3": {
    "text": () => this.$WEAPPS_COMP.props.data.label
  },
  "id2": {
    "_visible": (forItems) => (this.$WEAPPS_COMP.props.data.labelVisible && this.$WEAPPS_COMP.props.data.label)
  },
  "id5": {
    "_visible": (forItems) => (this.$WEAPPS_COMP.props.data.labelVisible && !this.$WEAPPS_COMP.props.data.label)
  },
  "id4": {
    "end": () => this.$WEAPPS_COMP.props.data.end,
    "start": () => this.$WEAPPS_COMP.props.data.start,
    "value": () => this.$WEAPPS_COMP.computed.value,
    "disabled": () => this.$WEAPPS_COMP.props.data.disabled,
    "suffixText": () => this.$WEAPPS_COMP.props.data.suffixText,
    "suffixType": () => this.$WEAPPS_COMP.props.data.suffixType,
    "placeholder": () => this.$WEAPPS_COMP.props.data.placeholder
  },
  "id1": {
    "name": () => this.$WEAPPS_COMP.props.data.name,
    "layout": () => this.$WEAPPS_COMP.props.data.layout,
    "required": () => this.$WEAPPS_COMP.props.data.required,
    "underline": () => this.$WEAPPS_COMP.props.data.underline,
    "requiredMsg": () => this.$WEAPPS_COMP.props.data.requiredMsg,
    "labelVisible": () => this.$WEAPPS_COMP.props.data.labelVisible,
    "requiredFlag": () => this.$WEAPPS_COMP.props.data.requiredFlag,
    "submitFormatter": (forItems) => ((value) => value.split(":").reduce((pre, cur, index) => (     pre + cur * [3600, 60, 1][index] * 1000 ), 0))
  }
}
    const defaultProps = {
  "end": "",
  "name": "thisIsTimeKey",
  "label": "时间",
  "start": "",
  "value": "",
  "layout": "",
  "disabled": false,
  "required": false,
  "labelSlot": "",
  "underline": true,
  "suffixText": "选择",
  "suffixType": "none",
  "placeholder": "请输入",
  "requiredMsg": "该项为必填项",
  "labelVisible": true,
  "requiredFlag": true
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
