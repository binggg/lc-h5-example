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


import handler$addUnit from "./lowcode/handler/addUnit.js";

import handler$isInternalIcon from "./lowcode/handler/isInternalIcon.js";


// Import Components

import gsdH5ReactImage from "libraries/gsd-h5-react@0.0.61/components/Image";

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

    this.compConfig = {}
    this.virtualFields = Object.assign({}, props.pageVirtualFields || {}, {
    
      "gsd-h5-react:Image": gsdH5ReactImage,
    
      "gsd-h5-react:Container": gsdH5ReactContainer,
    
    });
    this.events = ([]).reduce((obj, trigger) => {
      obj[trigger] = (event) => {
        this.props.emit(trigger, event)
      };
      return obj
    }, {});
    this.handler = this.$WEAPPS_COMP.handler = {
      
      addUnit: handler$addUnit.bind(this),
      
      isInternalIcon: handler$isInternalIcon.bind(this),
      
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
          "_visible": true
        },
        "dataTypes": [
          {
            "propertyPath": "title",
            "type": "static"
          }
        ],
        "commonStyle": {
          "display": "inline-block",
          "flexFlow": "row nowrap",
          "alignItems": "center",
          "justifyContent": "center"
        },
        "classNameList": [
          "wa-comp-CLOUDBASE_STANDARD-Icon"
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
              "_visible": true
            },
            "dataTypes": [
              {
                "propertyPath": "title",
                "type": "static"
              }
            ],
            "classNameList": [
              "lcap-icon"
            ],
            "classNameListBind": {
              "classList": (forItems) => (this.$WEAPPS_COMP.handler.isInternalIcon() ? `lcap-icon-${this.$WEAPPS_COMP.props.data.name}`: '')
            },
            "styleBind": {
              "style": (forItems) => (this.$WEAPPS_COMP.handler.isInternalIcon() ? {"font-size": `${this.$WEAPPS_COMP.props.data.size}px`, color: this.$WEAPPS_COMP.props.data.color} : {width: `${this.$WEAPPS_COMP.props.data.size}px`, height: `${this.$WEAPPS_COMP.props.data.size}px`,  color: this.$WEAPPS_COMP.props.data.color})
            }
          },
          "x-index": 2,
          "properties": {
            "id2": {
              "key": "id2",
              "x-component": "gsd-h5-react:image",
              "x-props": {
                "sourceKey": "gsd-h5-react:Image",
                "data": {
                  "alt": "[icon]",
                  "mode": "aspectFit",
                  "webp": false,
                  "lazyLoad": false,
                  "showMenuByLongpress": false
                },
                "dataBinds": {
                  "src": () => this.$WEAPPS_COMP.props.data.src,
                  "_visible": (forItems) => (!this.$WEAPPS_COMP.handler.isInternalIcon())
                },
                "dataTypes": [
                  {
                    "propertyPath": "alt",
                    "type": "static"
                  },
                  {
                    "propertyPath": "src",
                    "type": "bind"
                  },
                  {
                    "propertyPath": "mode",
                    "type": "static"
                  },
                  {
                    "propertyPath": "webp",
                    "type": "static"
                  },
                  {
                    "propertyPath": "lazyLoad",
                    "type": "static"
                  },
                  {
                    "propertyPath": "showMenuByLongpress",
                    "type": "static"
                  },
                  {
                    "propertyPath": "_visible",
                    "type": "bind"
                  }
                ],
                "commonStyle": {
                  "width": "100%",
                  "height": "100%",
                  "display": "block"
                }
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
    "alt": "[icon]",
    "mode": "aspectFit",
    "webp": false,
    "lazyLoad": false,
    "showMenuByLongpress": false,
    "style": {
      "width": "100%",
      "height": "100%",
      "display": "block"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Image",
    "_parentId": "id3"
  },
  "id3": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [
      "lcap-icon"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id1"
  },
  "id1": {
    "title": "",
    "_visible": true,
    "style": {
      "display": "inline-block",
      "flexFlow": "row nowrap",
      "alignItems": "center",
      "justifyContent": "center"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container"
  }
}
    const dataBinds = {
  "id2": {
    "src": () => this.$WEAPPS_COMP.props.data.src,
    "_visible": (forItems) => (!this.$WEAPPS_COMP.handler.isInternalIcon())
  },
  "id3": {
    "style": (forItems) => (this.$WEAPPS_COMP.handler.isInternalIcon() ? {"font-size": `${this.$WEAPPS_COMP.props.data.size}px`, color: this.$WEAPPS_COMP.props.data.color} : {width: `${this.$WEAPPS_COMP.props.data.size}px`, height: `${this.$WEAPPS_COMP.props.data.size}px`,  color: this.$WEAPPS_COMP.props.data.color}),
    "classList": (forItems) => (this.$WEAPPS_COMP.handler.isInternalIcon() ? `lcap-icon-${this.$WEAPPS_COMP.props.data.name}`: '')
  }
}
    const defaultProps = {
  "src": "",
  "name": "success",
  "size": 48,
  "color": ""
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
