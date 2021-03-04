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

import cloudbaseStandardInput from "libraries/CLOUDBASE_STANDARD@1612432272646/components/Input";

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
    
      "CLOUDBASE_STANDARD:Input": cloudbaseStandardInput,
    
      "CLOUDBASE_STANDARD:FormItem": cloudbaseStandardFormItem,
    
    });
    this.events = (["validator","change","focus","blur","confirm","clear"]).reduce((obj, trigger) => {
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
          "descSlot": "",
          "labelSlot": "",
          "contentSlot": "",
          "_visible": true
        },
        "dataBinds": {
          "name": () => this.$WEAPPS_COMP.props.data.name,
          "rules": () => this.$WEAPPS_COMP.props.data.rules,
          "layout": () => this.$WEAPPS_COMP.props.data.layout,
          "required": () => this.$WEAPPS_COMP.props.data.required,
          "underline": () => this.$WEAPPS_COMP.props.data.underline,
          "requiredMsg": () => this.$WEAPPS_COMP.props.data.requiredMsg,
          "labelVisible": () => this.$WEAPPS_COMP.props.data.labelVisible,
          "requiredFlag": () => this.$WEAPPS_COMP.props.data.requiredFlag,
          "validateStatus": () => this.$WEAPPS_COMP.props.data.validateStatus,
          "validateTrigger": () => this.$WEAPPS_COMP.props.data.validateTrigger
        },
        "dataTypes": [
          {
            "propertyPath": "name",
            "type": "bind"
          },
          {
            "propertyPath": "rules",
            "type": "bind"
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
            "type": "bind"
          },
          {
            "propertyPath": "validateTrigger",
            "type": "bind"
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
          "wa-comp-CLOUDBASE_STANDARD-FormUrl"
        ]
      },
      "x-index": 0,
      "properties": {
        "descSlot": {
          "key": "descSlot",
          "properties": {
            "id4": {
              "key": "id4",
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
            "id3": {
              "key": "id3",
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
            },
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
            }
          }
        },
        "contentSlot": {
          "key": "contentSlot",
          "properties": {
            "id2": {
              "key": "id2",
              "x-component": "cloudbase_standard:input",
              "x-props": {
                "sourceKey": "CLOUDBASE_STANDARD:Input",
                "data": {
                  "prefix": "",
                  "suffix": "",
                  "autoFill": "",
                  "password": false,
                  "_visible": true
                },
                "dataBinds": {
                  "type": () => this.$WEAPPS_COMP.props.data.type,
                  "focus": () => this.$WEAPPS_COMP.props.data.focus,
                  "value": () => this.$WEAPPS_COMP.props.data.value,
                  "cursor": () => this.$WEAPPS_COMP.props.data.cursor,
                  "disabled": () => this.$WEAPPS_COMP.props.data.disabled,
                  "clearable": () => this.$WEAPPS_COMP.props.data.clearable,
                  "maxLength": () => this.$WEAPPS_COMP.props.data.maxLength,
                  "alwaysEmbed": () => this.$WEAPPS_COMP.props.data.alwaysEmbed,
                  "confirmHold": () => this.$WEAPPS_COMP.props.data.confirmHold,
                  "confirmType": () => this.$WEAPPS_COMP.props.data.confirmType,
                  "placeholder": () => this.$WEAPPS_COMP.props.data.placeholder,
                  "holdKeyboard": () => this.$WEAPPS_COMP.props.data.holdKeyboard,
                  "selectionEnd": () => this.$WEAPPS_COMP.props.data.selectionEnd,
                  "cursorSpacing": () => this.$WEAPPS_COMP.props.data.cursorSpacing,
                  "adjustPosition": () => this.$WEAPPS_COMP.props.data.adjustPosition,
                  "selectionStart": () => this.$WEAPPS_COMP.props.data.selectionStart
                },
                "dataTypes": [
                  {
                    "propertyPath": "type",
                    "type": "bind"
                  },
                  {
                    "propertyPath": "focus",
                    "type": "bind"
                  },
                  {
                    "propertyPath": "value",
                    "type": "bind"
                  },
                  {
                    "propertyPath": "cursor",
                    "type": "bind"
                  },
                  {
                    "propertyPath": "prefix",
                    "type": "slot"
                  },
                  {
                    "propertyPath": "suffix",
                    "type": "slot"
                  },
                  {
                    "propertyPath": "autoFill",
                    "type": "static"
                  },
                  {
                    "propertyPath": "disabled",
                    "type": "bind"
                  },
                  {
                    "propertyPath": "password",
                    "type": "static"
                  },
                  {
                    "propertyPath": "clearable",
                    "type": "bind"
                  },
                  {
                    "propertyPath": "maxLength",
                    "type": "bind"
                  },
                  {
                    "propertyPath": "alwaysEmbed",
                    "type": "bind"
                  },
                  {
                    "propertyPath": "confirmHold",
                    "type": "bind"
                  },
                  {
                    "propertyPath": "confirmType",
                    "type": "bind"
                  },
                  {
                    "propertyPath": "placeholder",
                    "type": "bind"
                  },
                  {
                    "propertyPath": "holdKeyboard",
                    "type": "bind"
                  },
                  {
                    "propertyPath": "selectionEnd",
                    "type": "bind"
                  },
                  {
                    "propertyPath": "cursorSpacing",
                    "type": "bind"
                  },
                  {
                    "propertyPath": "adjustPosition",
                    "type": "bind"
                  },
                  {
                    "propertyPath": "selectionStart",
                    "type": "bind"
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
                  },
                  {
                    "key": "",
                    "trigger": "focus",
                    "instanceFunction": function({data}) { this.props.emit('focus', data.target) }.bind(this),
                    "data": {
                      "target": ""
                    }
                  },
                  {
                    "key": "",
                    "trigger": "blur",
                    "instanceFunction": function({data}) { this.props.emit('blur', data.target) }.bind(this),
                    "data": {
                      "target": ""
                    }
                  },
                  {
                    "key": "",
                    "trigger": "confirm",
                    "instanceFunction": function({data}) { this.props.emit('confirm', data.target) }.bind(this),
                    "data": {
                      "target": ""
                    }
                  },
                  {
                    "key": "",
                    "trigger": "clear",
                    "instanceFunction": function({data}) { this.props.emit('clear', data.target) }.bind(this),
                    "data": {
                      "target": ""
                    }
                  }
                ]
              },
              "x-index": 0,
              "properties": {
                "prefix": {
                  "key": "prefix"
                },
                "suffix": {
                  "key": "suffix"
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
  "id4": {
    "name": "descSlot",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id1"
  },
  "id3": {
    "name": "labelSlot",
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id1"
  },
  "id5": {
    "decode": false,
    "selectable": false,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id1"
  },
  "id2": {
    "prefix": "",
    "suffix": "",
    "autoFill": "",
    "password": false,
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "CLOUDBASE_STANDARD:Input",
    "_parentId": "id1"
  },
  "id1": {
    "descSlot": "",
    "labelSlot": "",
    "contentSlot": "",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "CLOUDBASE_STANDARD:FormItem"
  }
}
    const dataBinds = {
  "id3": {
    "_visible": (forItems) => (this.$WEAPPS_COMP.props.data.labelVisible && !this.$WEAPPS_COMP.props.data.label)
  },
  "id5": {
    "text": () => this.$WEAPPS_COMP.props.data.label,
    "_visible": (forItems) => (this.$WEAPPS_COMP.props.data.labelVisible && this.$WEAPPS_COMP.props.data.label)
  },
  "id2": {
    "type": () => this.$WEAPPS_COMP.props.data.type,
    "focus": () => this.$WEAPPS_COMP.props.data.focus,
    "value": () => this.$WEAPPS_COMP.props.data.value,
    "cursor": () => this.$WEAPPS_COMP.props.data.cursor,
    "disabled": () => this.$WEAPPS_COMP.props.data.disabled,
    "clearable": () => this.$WEAPPS_COMP.props.data.clearable,
    "maxLength": () => this.$WEAPPS_COMP.props.data.maxLength,
    "alwaysEmbed": () => this.$WEAPPS_COMP.props.data.alwaysEmbed,
    "confirmHold": () => this.$WEAPPS_COMP.props.data.confirmHold,
    "confirmType": () => this.$WEAPPS_COMP.props.data.confirmType,
    "placeholder": () => this.$WEAPPS_COMP.props.data.placeholder,
    "holdKeyboard": () => this.$WEAPPS_COMP.props.data.holdKeyboard,
    "selectionEnd": () => this.$WEAPPS_COMP.props.data.selectionEnd,
    "cursorSpacing": () => this.$WEAPPS_COMP.props.data.cursorSpacing,
    "adjustPosition": () => this.$WEAPPS_COMP.props.data.adjustPosition,
    "selectionStart": () => this.$WEAPPS_COMP.props.data.selectionStart
  },
  "id1": {
    "name": () => this.$WEAPPS_COMP.props.data.name,
    "rules": () => this.$WEAPPS_COMP.props.data.rules,
    "layout": () => this.$WEAPPS_COMP.props.data.layout,
    "required": () => this.$WEAPPS_COMP.props.data.required,
    "underline": () => this.$WEAPPS_COMP.props.data.underline,
    "requiredMsg": () => this.$WEAPPS_COMP.props.data.requiredMsg,
    "labelVisible": () => this.$WEAPPS_COMP.props.data.labelVisible,
    "requiredFlag": () => this.$WEAPPS_COMP.props.data.requiredFlag,
    "validateStatus": () => this.$WEAPPS_COMP.props.data.validateStatus,
    "validateTrigger": () => this.$WEAPPS_COMP.props.data.validateTrigger
  }
}
    const defaultProps = {
  "name": "formUrl",
  "type": "text",
  "focus": false,
  "label": "网址",
  "rules": [
    {
      "format": "url",
      "message": "url校验失败"
    }
  ],
  "value": "",
  "cursor": -1,
  "layout": "",
  "descSlot": "",
  "disabled": false,
  "required": false,
  "clearable": true,
  "labelSlot": "",
  "maxLength": 140,
  "underline": true,
  "alwaysEmbed": false,
  "confirmHold": false,
  "confirmType": "done",
  "placeholder": "请输入网址",
  "requiredMsg": "该项为必填项",
  "holdKeyboard": false,
  "labelVisible": true,
  "requiredFlag": true,
  "selectionEnd": -1,
  "cursorSpacing": 0,
  "adjustPosition": false,
  "selectionStart": -1,
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
