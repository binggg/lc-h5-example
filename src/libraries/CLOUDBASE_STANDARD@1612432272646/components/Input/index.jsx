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


import handler$handleClear from "./lowcode/handler/handleClear.js";

import handler$handleChange from "./lowcode/handler/handleChange.js";

import handler$handleBlur from "./lowcode/handler/handleBlur.js";

import handler$handleConfirm from "./lowcode/handler/handleConfirm.js";


// Import Components

import gsdH5ReactInput from "libraries/gsd-h5-react@0.0.61/components/Input";

import gsdH5ReactIcon from "libraries/gsd-h5-react@0.0.61/components/Icon";

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

    this.compConfig = {
  "componentType": "formControl"
}
    this.virtualFields = Object.assign({}, props.pageVirtualFields || {}, {
    
      "gsd-h5-react:Input": gsdH5ReactInput,
    
      "gsd-h5-react:Icon": gsdH5ReactIcon,
    
      "gsd-h5-react:Container": gsdH5ReactContainer,
    
      "gsd-h5-react:Slot": gsdH5ReactSlot,
    
    });
    this.events = (["change","focus","blur","confirm","clear"]).reduce((obj, trigger) => {
      obj[trigger] = (event) => {
        this.props.emit(trigger, event)
      };
      return obj
    }, {});
    this.handler = this.$WEAPPS_COMP.handler = {
      
      handleClear: handler$handleClear.bind(this),
      
      handleChange: handler$handleChange.bind(this),
      
      handleBlur: handler$handleBlur.bind(this),
      
      handleConfirm: handler$handleConfirm.bind(this),
      
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
          "title": "input",
          "_visible": true
        },
        "dataTypes": [
          {
            "propertyPath": "title",
            "type": "static"
          }
        ],
        "classNameList": [
          "g-comp-input",
          "wa-comp-CLOUDBASE_STANDARD-Input"
        ]
      },
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
              "g-comp-container"
            ]
          },
          "x-index": 1,
          "properties": {
            "id5": {
              "key": "id5",
              "x-component": "gsd-h5-react:input",
              "x-props": {
                "sourceKey": "gsd-h5-react:Input",
                "data": {
                  "name": "thisIsInputKey",
                  "divider": "",
                  "placeholderClass": "g-input-placeholder",
                  "placeholderStyle": "",
                  "_visible": true
                },
                "dataBinds": {
                  "type": () => this.$WEAPPS_COMP.props.data.type,
                  "focus": () => this.$WEAPPS_COMP.props.data.focus,
                  "value": () => this.$WEAPPS_COMP.props.data.value,
                  "cursor": () => this.$WEAPPS_COMP.props.data.cursor,
                  "autoFill": () => this.$WEAPPS_COMP.props.data.autoFill,
                  "disabled": () => this.$WEAPPS_COMP.props.data.disabled,
                  "password": () => this.$WEAPPS_COMP.props.data.password,
                  "maxlength": () => this.$WEAPPS_COMP.props.data.maxLength,
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
                    "propertyPath": "name",
                    "type": "static"
                  },
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
                    "propertyPath": "password",
                    "type": "bind"
                  },
                  {
                    "propertyPath": "maxlength",
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
                  },
                  {
                    "propertyPath": "placeholderClass",
                    "type": "static"
                  },
                  {
                    "propertyPath": "placeholderStyle",
                    "type": "static"
                  }
                ],
                "listenerInstances": [
                  {
                    "trigger": "input",
                    "instanceFunction": function({ event, forItems }) {    const wid = this.widgets.id5;    const widgetData = (forItems.forIndexes && forItems.forIndexes.length > 0) ? get(wid, forItems.forIndexes) : wid;    widgetData.value = event.detail.value;  }.bind(this)
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
                    "trigger": "input",
                    "instanceFunction": this.handler.handleChange.bind(this),
                    "data": {
                      "target": ""
                    }
                  },
                  {
                    "key": "",
                    "trigger": "confirm",
                    "instanceFunction": this.handler.handleConfirm.bind(this),
                    "data": {
                      "target": ""
                    }
                  }
                ]
              },
              "x-index": 0
            },
            "id11": {
              "key": "id11",
              "x-component": "gsd-h5-react:icon",
              "x-props": {
                "sourceKey": "gsd-h5-react:Icon",
                "data": {
                  "size": 22,
                  "type": "clear",
                  "color": "#919EAB"
                },
                "dataBinds": {
                  "_visible": () => this.$WEAPPS_COMP.computed.isShowClear
                },
                "dataTypes": [
                  {
                    "propertyPath": "size",
                    "type": "static"
                  },
                  {
                    "propertyPath": "type",
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
                  "close-icon"
                ],
                "listenerInstances": [
                  {
                    "key": "",
                    "trigger": "tap",
                    "instanceFunction": this.handler.handleClear.bind(this),
                    "data": {
                      "target": ""
                    }
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
            "dataTypes": [
              {
                "propertyPath": "title",
                "type": "static"
              }
            ],
            "classNameList": [
              "prefix"
            ]
          },
          "x-index": 0,
          "properties": {
            "id2": {
              "key": "id2",
              "x-component": "gsd-h5-react:slot",
              "x-props": {
                "sourceKey": "gsd-h5-react:Slot",
                "data": {
                  "name": "prefix",
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
        "id8": {
          "key": "id8",
          "x-component": "gsd-h5-react:container",
          "x-props": {
            "sourceKey": "gsd-h5-react:Container",
            "dataTypes": [
              {
                "propertyPath": "title",
                "type": "static"
              }
            ],
            "classNameList": [
              "suffix"
            ]
          },
          "x-index": 2,
          "properties": {
            "id3": {
              "key": "id3",
              "x-component": "gsd-h5-react:slot",
              "x-props": {
                "sourceKey": "gsd-h5-react:Slot",
                "data": {
                  "name": "suffix",
                  "_visible": true
                },
                "dataTypes": [
                  {
                    "propertyPath": "name",
                    "type": "static"
                  }
                ],
                "classNameList": [
                  "suffix"
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
  "id5": {
    "name": "thisIsInputKey",
    "divider": "",
    "placeholderClass": "g-input-placeholder",
    "placeholderStyle": "",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Input",
    "_parentId": "id4"
  },
  "id11": {
    "size": 22,
    "type": "clear",
    "color": "#919EAB",
    "style": {},
    "classList": [
      "close-icon"
    ],
    "widgetType": "gsd-h5-react:Icon",
    "_parentId": "id4"
  },
  "id4": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [
      "g-comp-container"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id1"
  },
  "id2": {
    "name": "prefix",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id7"
  },
  "id7": {
    "title": "",
    "style": {},
    "classList": [
      "prefix"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id1"
  },
  "id3": {
    "name": "suffix",
    "_visible": true,
    "style": {},
    "classList": [
      "suffix"
    ],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id8"
  },
  "id8": {
    "title": "",
    "style": {},
    "classList": [
      "suffix"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id1"
  },
  "id1": {
    "title": "input",
    "_visible": true,
    "style": {},
    "classList": [
      "g-comp-input",
      "wa-comp-CLOUDBASE_STANDARD-Input"
    ],
    "widgetType": "gsd-h5-react:Container"
  }
}
    const dataBinds = {
  "id5": {
    "type": () => this.$WEAPPS_COMP.props.data.type,
    "focus": () => this.$WEAPPS_COMP.props.data.focus,
    "value": () => this.$WEAPPS_COMP.props.data.value,
    "cursor": () => this.$WEAPPS_COMP.props.data.cursor,
    "autoFill": () => this.$WEAPPS_COMP.props.data.autoFill,
    "disabled": () => this.$WEAPPS_COMP.props.data.disabled,
    "password": () => this.$WEAPPS_COMP.props.data.password,
    "maxlength": () => this.$WEAPPS_COMP.props.data.maxLength,
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
  "id11": {
    "_visible": () => this.$WEAPPS_COMP.computed.isShowClear
  }
}
    const defaultProps = {
  "type": "text",
  "focus": false,
  "value": "",
  "cursor": -1,
  "prefix": "",
  "suffix": "",
  "autoFill": "",
  "disabled": false,
  "password": false,
  "clearable": true,
  "maxLength": 140,
  "alwaysEmbed": false,
  "confirmHold": false,
  "confirmType": "done",
  "placeholder": "请输入",
  "holdKeyboard": false,
  "selectionEnd": -1,
  "cursorSpacing": 0,
  "adjustPosition": false,
  "selectionStart": -1
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
