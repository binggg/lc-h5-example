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

import handler$handleBlur from "./lowcode/handler/handleBlur.js";


// Import Components

import gsdH5ReactTextArea from "libraries/gsd-h5-react@0.0.61/components/TextArea";

import gsdH5ReactText from "libraries/gsd-h5-react@0.0.61/components/Text";

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
  "componentType": "formControl"
}
    this.virtualFields = Object.assign({}, props.pageVirtualFields || {}, {
    
      "gsd-h5-react:TextArea": gsdH5ReactTextArea,
    
      "gsd-h5-react:Text": gsdH5ReactText,
    
      "gsd-h5-react:Container": gsdH5ReactContainer,
    
    });
    this.events = (["change","blur","focus"]).reduce((obj, trigger) => {
      obj[trigger] = (event) => {
        this.props.emit(trigger, event)
      };
      return obj
    }, {});
    this.handler = this.$WEAPPS_COMP.handler = {
      
      handleChange: handler$handleChange.bind(this),
      
      handleBlur: handler$handleBlur.bind(this),
      
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
          "title": "thisIsTextAreaKey",
          "_visible": true
        },
        "dataTypes": [
          {
            "propertyPath": "title",
            "type": "static"
          }
        ],
        "classNameList": [
          "g-textarea-container",
          "wa-comp-CLOUDBASE_STANDARD-TextArea"
        ]
      },
      "properties": {
        "id2": {
          "key": "id2",
          "x-component": "gsd-h5-react:textarea",
          "x-props": {
            "sourceKey": "gsd-h5-react:TextArea",
            "data": {
              "divider": "",
              "placeholderClass": "g-textarea-placeholder",
              "placeholderStyle": "",
              "_visible": true
            },
            "dataBinds": {
              "name": () => this.$WEAPPS_COMP.props.data.name,
              "fixed": () => this.$WEAPPS_COMP.props.data.fixed,
              "focus": () => this.$WEAPPS_COMP.props.data.focus,
              "value": () => this.$WEAPPS_COMP.props.data.value,
              "cursor": () => this.$WEAPPS_COMP.props.data.cursor,
              "autoFill": () => this.$WEAPPS_COMP.props.data.autoFill,
              "disabled": () => this.$WEAPPS_COMP.props.data.disabled,
              "autoFocus": () => this.$WEAPPS_COMP.props.data.autoFocus,
              "maxLength": () => this.$WEAPPS_COMP.props.data.maxLength,
              "maxlength": () => this.$WEAPPS_COMP.props.data.maxLength,
              "autoHeight": () => this.$WEAPPS_COMP.props.data.autoHeight,
              "confirmHold": () => this.$WEAPPS_COMP.props.data.confirmHold,
              "placeholder": () => this.$WEAPPS_COMP.props.data.placeholder,
              "holdKeyboard": () => this.$WEAPPS_COMP.props.data.holdKeyboard,
              "selectionEnd": () => this.$WEAPPS_COMP.props.data.selectionEnd,
              "cursorSpacing": () => this.$WEAPPS_COMP.props.data.cursorSpacing,
              "adjustPosition": () => this.$WEAPPS_COMP.props.data.adjustPosition,
              "selectionStart": () => this.$WEAPPS_COMP.props.data.selectionStart,
              "showConfirmBar": () => this.$WEAPPS_COMP.props.data.showConfirmBar,
              "disableDefaultPadding": () => this.$WEAPPS_COMP.props.data.disableDefaultPadding
            },
            "dataTypes": [
              {
                "propertyPath": "name",
                "type": "bind"
              },
              {
                "propertyPath": "fixed",
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
                "propertyPath": "divider",
                "type": "static"
              },
              {
                "propertyPath": "autoFill",
                "type": "bind"
              },
              {
                "propertyPath": "disabled",
                "type": "bind"
              },
              {
                "propertyPath": "autoFocus",
                "type": "bind"
              },
              {
                "propertyPath": "maxLength",
                "type": "bind"
              },
              {
                "propertyPath": "maxlength",
                "type": "bind"
              },
              {
                "propertyPath": "autoHeight",
                "type": "bind"
              },
              {
                "propertyPath": "confirmHold",
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
              },
              {
                "propertyPath": "showConfirmBar",
                "type": "bind"
              },
              {
                "propertyPath": "placeholderClass",
                "type": "static"
              },
              {
                "propertyPath": "placeholderStyle",
                "type": "static"
              },
              {
                "propertyPath": "disableDefaultPadding",
                "type": "bind"
              }
            ],
            "listenerInstances": [
              {
                "trigger": "input",
                "instanceFunction": function({ event, forItems }) {    const wid = this.widgets.id2;    const widgetData = (forItems.forIndexes && forItems.forIndexes.length > 0) ? get(wid, forItems.forIndexes) : wid;    widgetData.value = event.detail.value;  }.bind(this)
              },
              {
                "key": "",
                "trigger": "input",
                "instanceFunction": this.handler.handleChange.bind(this),
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
                "instanceFunction": this.handler.handleBlur.bind(this),
                "data": {
                  "target": ""
                }
              }
            ]
          }
        },
        "id4": {
          "key": "id4",
          "x-component": "gsd-h5-react:container",
          "x-props": {
            "sourceKey": "gsd-h5-react:Container",
            "dataBinds": {
              "_visible": (forItems) => (this.$WEAPPS_COMP.props.data.counterVisible && this.$WEAPPS_COMP.props.data.maxLength)
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
              "textarea-counter"
            ]
          },
          "properties": {
            "id3": {
              "key": "id3",
              "x-component": "gsd-h5-react:text",
              "x-props": {
                "sourceKey": "gsd-h5-react:Text",
                "data": {
                  "decode": false,
                  "selectable": false,
                  "_visible": true
                },
                "dataBinds": {
                  "text": () => this.$WEAPPS_COMP.computed.getCount
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
  "id2": {
    "divider": "",
    "placeholderClass": "g-textarea-placeholder",
    "placeholderStyle": "",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:TextArea",
    "_parentId": "id1"
  },
  "id3": {
    "decode": false,
    "selectable": false,
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id4"
  },
  "id4": {
    "title": "",
    "style": {},
    "classList": [
      "textarea-counter"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id1"
  },
  "id1": {
    "title": "thisIsTextAreaKey",
    "_visible": true,
    "style": {},
    "classList": [
      "g-textarea-container",
      "wa-comp-CLOUDBASE_STANDARD-TextArea"
    ],
    "widgetType": "gsd-h5-react:Container"
  }
}
    const dataBinds = {
  "id2": {
    "name": () => this.$WEAPPS_COMP.props.data.name,
    "fixed": () => this.$WEAPPS_COMP.props.data.fixed,
    "focus": () => this.$WEAPPS_COMP.props.data.focus,
    "value": () => this.$WEAPPS_COMP.props.data.value,
    "cursor": () => this.$WEAPPS_COMP.props.data.cursor,
    "autoFill": () => this.$WEAPPS_COMP.props.data.autoFill,
    "disabled": () => this.$WEAPPS_COMP.props.data.disabled,
    "autoFocus": () => this.$WEAPPS_COMP.props.data.autoFocus,
    "maxLength": () => this.$WEAPPS_COMP.props.data.maxLength,
    "maxlength": () => this.$WEAPPS_COMP.props.data.maxLength,
    "autoHeight": () => this.$WEAPPS_COMP.props.data.autoHeight,
    "confirmHold": () => this.$WEAPPS_COMP.props.data.confirmHold,
    "placeholder": () => this.$WEAPPS_COMP.props.data.placeholder,
    "holdKeyboard": () => this.$WEAPPS_COMP.props.data.holdKeyboard,
    "selectionEnd": () => this.$WEAPPS_COMP.props.data.selectionEnd,
    "cursorSpacing": () => this.$WEAPPS_COMP.props.data.cursorSpacing,
    "adjustPosition": () => this.$WEAPPS_COMP.props.data.adjustPosition,
    "selectionStart": () => this.$WEAPPS_COMP.props.data.selectionStart,
    "showConfirmBar": () => this.$WEAPPS_COMP.props.data.showConfirmBar,
    "disableDefaultPadding": () => this.$WEAPPS_COMP.props.data.disableDefaultPadding
  },
  "id3": {
    "text": () => this.$WEAPPS_COMP.computed.getCount
  },
  "id4": {
    "_visible": (forItems) => (this.$WEAPPS_COMP.props.data.counterVisible && this.$WEAPPS_COMP.props.data.maxLength)
  }
}
    const defaultProps = {
  "fixed": false,
  "focus": false,
  "value": "",
  "cursor": -1,
  "disabled": false,
  "autoFocus": false,
  "maxLength": 140,
  "autoHeight": false,
  "confirmHold": false,
  "placeholder": "请输入",
  "holdKeyboard": false,
  "selectionEnd": -1,
  "cursorSpacing": 0,
  "adjustPosition": false,
  "counterVisible": true,
  "selectionStart": -1,
  "showConfirmBar": false,
  "disableDefaultPadding": false
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
