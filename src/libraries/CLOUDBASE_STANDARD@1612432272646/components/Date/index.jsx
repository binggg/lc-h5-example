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


// Import Components

import cloudbaseStandardFormCell from "libraries/CLOUDBASE_STANDARD@1612432272646/components/FormCell";

import gsdH5ReactDatePicker from "libraries/gsd-h5-react@0.0.61/components/DatePicker";


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
    
      "CLOUDBASE_STANDARD:FormCell": cloudbaseStandardFormCell,
    
      "gsd-h5-react:DatePicker": gsdH5ReactDatePicker,
    
    });
    this.events = (["change","cancel"]).reduce((obj, trigger) => {
      obj[trigger] = (event) => {
        this.props.emit(trigger, event)
      };
      return obj
    }, {});
    this.handler = this.$WEAPPS_COMP.handler = {
      
      handleChange: handler$handleChange.bind(this),
      
    };
    this.componentSchema = {
  "type": "object",
  "properties": {
    "id1": {
      "key": "id1",
      "x-component": "gsd-h5-react:datepicker",
      "x-props": {
        "sourceKey": "gsd-h5-react:DatePicker",
        "data": {
          "mode": "date",
          "name": "thisIsDateKey",
          "_visible": true
        },
        "dataBinds": {
          "end": () => this.$WEAPPS_COMP.props.data.end,
          "start": () => this.$WEAPPS_COMP.props.data.start,
          "value": () => this.$WEAPPS_COMP.props.data.value,
          "fields": () => this.$WEAPPS_COMP.props.data.mode,
          "autoFill": () => this.$WEAPPS_COMP.props.data.autoFill,
          "disabled": () => this.$WEAPPS_COMP.props.data.disabled
        },
        "dataTypes": [
          {
            "propertyPath": "end",
            "type": "bind"
          },
          {
            "propertyPath": "mode",
            "type": "static"
          },
          {
            "propertyPath": "name",
            "type": "static"
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
            "propertyPath": "fields",
            "type": "bind"
          },
          {
            "propertyPath": "autoFill",
            "type": "bind"
          },
          {
            "propertyPath": "disabled",
            "type": "bind"
          }
        ],
        "listenerInstances": [
          {
            "trigger": "change",
            "instanceFunction": function({ event, forItems }) {    const wid = this.widgets.id1;    const widgetData = (forItems.forIndexes && forItems.forIndexes.length > 0) ? get(wid, forItems.forIndexes) : wid;    widgetData.value = event.detail.value;  }.bind(this)
          },
          {
            "key": "",
            "trigger": "change",
            "instanceFunction": this.handler.handleChange.bind(this),
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
        ],
        "classNameList": [
          "wa-comp-CLOUDBASE_STANDARD-Date"
        ]
      },
      "x-index": 0,
      "properties": {
        "id3": {
          "key": "id3",
          "x-component": "cloudbase_standard:formcell",
          "x-props": {
            "sourceKey": "CLOUDBASE_STANDARD:FormCell",
            "data": {
              "_visible": true
            },
            "dataBinds": {
              "value": () => this.$WEAPPS_COMP.props.data.value,
              "suffixText": () => this.$WEAPPS_COMP.props.data.suffixText,
              "suffixType": () => this.$WEAPPS_COMP.props.data.suffixType,
              "placeholder": () => this.$WEAPPS_COMP.props.data.placeholder
            },
            "dataTypes": [
              {
                "propertyPath": "value",
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
              },
              {
                "propertyPath": "suffixSlot",
                "type": "slot"
              }
            ]
          },
          "x-index": 1,
          "properties": {
            "suffixSlot": {
              "key": "suffixSlot"
            }
          }
        }
      }
    }
  }
};
    const widgetContext = {
  "id3": {
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "CLOUDBASE_STANDARD:FormCell",
    "_parentId": "id1"
  },
  "id1": {
    "mode": "date",
    "name": "thisIsDateKey",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:DatePicker"
  }
}
    const dataBinds = {
  "id3": {
    "value": () => this.$WEAPPS_COMP.props.data.value,
    "suffixText": () => this.$WEAPPS_COMP.props.data.suffixText,
    "suffixType": () => this.$WEAPPS_COMP.props.data.suffixType,
    "placeholder": () => this.$WEAPPS_COMP.props.data.placeholder
  },
  "id1": {
    "end": () => this.$WEAPPS_COMP.props.data.end,
    "start": () => this.$WEAPPS_COMP.props.data.start,
    "value": () => this.$WEAPPS_COMP.props.data.value,
    "fields": () => this.$WEAPPS_COMP.props.data.mode,
    "autoFill": () => this.$WEAPPS_COMP.props.data.autoFill,
    "disabled": () => this.$WEAPPS_COMP.props.data.disabled
  }
}
    const defaultProps = {
  "end": "",
  "mode": "day",
  "start": "",
  "value": "",
  "disabled": false,
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
