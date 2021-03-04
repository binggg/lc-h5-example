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


import handler$click from "./lowcode/handler/click.js";

import handler$getForm from "./lowcode/handler/getForm.js";


// Import Components

import gsdH5ReactText from "libraries/gsd-h5-react@0.0.61/components/Text";

import gsdH5ReactSlot from "libraries/gsd-h5-react@0.0.61/components/Slot";

import gsdH5ReactButton from "libraries/gsd-h5-react@0.0.61/components/Button";


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
    
      "gsd-h5-react:Button": gsdH5ReactButton,
    
    });
    this.events = (["getPhoneNumber","contact","getUserInfo","getRealNameAuthInfo","launchApp","openSetting","error","tap"]).reduce((obj, trigger) => {
      obj[trigger] = (event) => {
        this.props.emit(trigger, event)
      };
      return obj
    }, {});
    this.handler = this.$WEAPPS_COMP.handler = {
      
      click: handler$click.bind(this),
      
      getForm: handler$getForm.bind(this),
      
    };
    this.componentSchema = {
  "type": "object",
  "properties": {
    "id31": {
      "key": "id31",
      "x-component": "gsd-h5-react:button",
      "x-props": {
        "sourceKey": "gsd-h5-react:Button",
        "data": {
          "lang": "en",
          "divider": "",
          "_visible": true
        },
        "dataBinds": {
          "size": () => this.$WEAPPS_COMP.props.data.size,
          "type": () => this.$WEAPPS_COMP.props.data.type,
          "plain": () => this.$WEAPPS_COMP.props.data.plain,
          "loading": () => this.$WEAPPS_COMP.props.data.loading,
          "disabled": () => this.$WEAPPS_COMP.props.data.disabled,
          "formType": () => this.$WEAPPS_COMP.props.data.formType,
          "openType": () => this.$WEAPPS_COMP.props.data.openType,
          "categoryId": () => this.$WEAPPS_COMP.props.data.categoryId,
          "sessionFrom": () => this.$WEAPPS_COMP.props.data.sessionFrom,
          "appParameter": () => this.$WEAPPS_COMP.props.data.appParameter,
          "sendMessageImg": () => this.$WEAPPS_COMP.props.data.sendMessageImg,
          "sendMessagePath": () => this.$WEAPPS_COMP.props.data.sendMessagePath,
          "showMessageCard": () => this.$WEAPPS_COMP.props.data.showMessageCard,
          "sendMessageTitle": () => this.$WEAPPS_COMP.props.data.sendMessageTitle
        },
        "dataTypes": [
          {
            "propertyPath": "lang",
            "type": "static"
          },
          {
            "propertyPath": "size",
            "type": "bind"
          },
          {
            "propertyPath": "type",
            "type": "bind"
          },
          {
            "propertyPath": "plain",
            "type": "bind"
          },
          {
            "propertyPath": "divider",
            "type": "static"
          },
          {
            "propertyPath": "loading",
            "type": "bind"
          },
          {
            "propertyPath": "disabled",
            "type": "bind"
          },
          {
            "propertyPath": "formType",
            "type": "bind"
          },
          {
            "propertyPath": "openType",
            "type": "bind"
          },
          {
            "propertyPath": "categoryId",
            "type": "bind"
          },
          {
            "propertyPath": "sessionFrom",
            "type": "bind"
          },
          {
            "propertyPath": "appParameter",
            "type": "bind"
          },
          {
            "propertyPath": "sendMessageImg",
            "type": "bind"
          },
          {
            "propertyPath": "sendMessagePath",
            "type": "bind"
          },
          {
            "propertyPath": "showMessageCard",
            "type": "bind"
          },
          {
            "propertyPath": "sendMessageTitle",
            "type": "bind"
          },
          {
            "propertyPath": "text",
            "type": "slot"
          }
        ],
        "classNameList": [
          "g-btn",
          "wa-comp-CLOUDBASE_STANDARD-Button"
        ],
        "classNameListBind": {
          "classList": () => this.$WEAPPS_COMP.computed.classnames
        },
        "listenerInstances": [
          {
            "key": "",
            "trigger": "contact",
            "instanceFunction": function({data}) { this.props.emit('contact', data.target) }.bind(this),
            "data": {
              "target": ""
            }
          },
          {
            "key": "",
            "trigger": "error",
            "instanceFunction": function({data}) { this.props.emit('error', data.target) }.bind(this),
            "data": {
              "target": ""
            }
          },
          {
            "key": "",
            "trigger": "tap",
            "instanceFunction": this.handler.click.bind(this),
            "data": {
              "target": ""
            }
          },
          {
            "key": "",
            "trigger": "getphonenumber",
            "instanceFunction": function({data}) { this.props.emit('getPhoneNumber', data.target) }.bind(this),
            "data": {
              "target": ""
            }
          },
          {
            "key": "",
            "trigger": "getuserinfo",
            "instanceFunction": function({data}) { this.props.emit('getUserInfo', data.target) }.bind(this),
            "data": {
              "target": ""
            }
          },
          {
            "key": "",
            "trigger": "getrealnameauthinfo",
            "instanceFunction": function({data}) { this.props.emit('getRealNameAuthInfo', data.target) }.bind(this),
            "data": {
              "target": ""
            }
          },
          {
            "key": "",
            "trigger": "launchapp",
            "instanceFunction": function({data}) { this.props.emit('launchApp', data.target) }.bind(this),
            "data": {
              "target": ""
            }
          },
          {
            "key": "",
            "trigger": "opensetting",
            "instanceFunction": function({data}) { this.props.emit('openSetting', data.target) }.bind(this),
            "data": {
              "target": ""
            }
          }
        ]
      },
      "properties": {
        "text": {
          "key": "text",
          "properties": {
            "id34": {
              "key": "id34",
              "x-component": "gsd-h5-react:text",
              "x-props": {
                "sourceKey": "gsd-h5-react:Text",
                "data": {
                  "decode": false,
                  "selectable": false
                },
                "dataBinds": {
                  "text": () => this.$WEAPPS_COMP.props.data.content,
                  "_visible": (forItems) => (this.$WEAPPS_COMP.props.data.content)
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
            "id35": {
              "key": "id35",
              "x-component": "gsd-h5-react:slot",
              "x-props": {
                "sourceKey": "gsd-h5-react:Slot",
                "data": {
                  "name": "contentSlot"
                },
                "dataBinds": {
                  "_visible": (forItems) => (!this.$WEAPPS_COMP.props.data.content)
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
        }
      }
    }
  }
};
    const widgetContext = {
  "id34": {
    "decode": false,
    "selectable": false,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id31"
  },
  "id35": {
    "name": "contentSlot",
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id31"
  },
  "id31": {
    "lang": "en",
    "divider": "",
    "_visible": true,
    "style": {},
    "classList": [
      "g-btn",
      "wa-comp-CLOUDBASE_STANDARD-Button"
    ],
    "widgetType": "gsd-h5-react:Button"
  }
}
    const dataBinds = {
  "id34": {
    "text": () => this.$WEAPPS_COMP.props.data.content,
    "_visible": (forItems) => (this.$WEAPPS_COMP.props.data.content)
  },
  "id35": {
    "_visible": (forItems) => (!this.$WEAPPS_COMP.props.data.content)
  },
  "id31": {
    "size": () => this.$WEAPPS_COMP.props.data.size,
    "type": () => this.$WEAPPS_COMP.props.data.type,
    "plain": () => this.$WEAPPS_COMP.props.data.plain,
    "loading": () => this.$WEAPPS_COMP.props.data.loading,
    "disabled": () => this.$WEAPPS_COMP.props.data.disabled,
    "formType": () => this.$WEAPPS_COMP.props.data.formType,
    "openType": () => this.$WEAPPS_COMP.props.data.openType,
    "categoryId": () => this.$WEAPPS_COMP.props.data.categoryId,
    "sessionFrom": () => this.$WEAPPS_COMP.props.data.sessionFrom,
    "appParameter": () => this.$WEAPPS_COMP.props.data.appParameter,
    "sendMessageImg": () => this.$WEAPPS_COMP.props.data.sendMessageImg,
    "sendMessagePath": () => this.$WEAPPS_COMP.props.data.sendMessagePath,
    "showMessageCard": () => this.$WEAPPS_COMP.props.data.showMessageCard,
    "sendMessageTitle": () => this.$WEAPPS_COMP.props.data.sendMessageTitle,
    "classList": () => this.$WEAPPS_COMP.computed.classnames
  }
}
    const defaultProps = {
  "size": "default",
  "type": "primary",
  "plain": false,
  "content": "按钮",
  "loading": false,
  "disabled": false,
  "formType": "button",
  "openType": "",
  "categoryId": [],
  "contentSlot": "",
  "sessionFrom": "",
  "appParameter": "",
  "sendMessageImg": "",
  "sendMessagePath": "",
  "showMessageCard": false,
  "sendMessageTitle": ""
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
