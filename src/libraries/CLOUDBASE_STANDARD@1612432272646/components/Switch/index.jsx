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

import gsdH5ReactContainer from "libraries/gsd-h5-react@0.0.61/components/Container";

import gsdH5ReactImage from "libraries/gsd-h5-react@0.0.61/components/Image";


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
    
      "gsd-h5-react:Container": gsdH5ReactContainer,
    
      "gsd-h5-react:Image": gsdH5ReactImage,
    
    });
    this.events = (["change"]).reduce((obj, trigger) => {
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
        "commonStyle": {
          "display": "inline-block"
        },
        "listenerInstances": [
          {
            "key": "",
            "trigger": "tap",
            "instanceFunction": this.handler.handleChange.bind(this),
            "data": {
              "target": ""
            }
          }
        ],
        "classNameList": [
          "wa-comp-CLOUDBASE_STANDARD-Switch"
        ]
      },
      "x-index": 1,
      "properties": {
        "id4": {
          "key": "id4",
          "x-component": "gsd-h5-react:container",
          "x-props": {
            "sourceKey": "gsd-h5-react:Container",
            "data": {
              "title": "switch"
            },
            "dataBinds": {
              "_visible": () => this.$WEAPPS_COMP.computed.isSwitch
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
              "g-comp-switch"
            ],
            "classNameListBind": {
              "classList": () => this.$WEAPPS_COMP.computed.getClass
            }
          }
        },
        "id5": {
          "key": "id5",
          "x-component": "gsd-h5-react:container",
          "x-props": {
            "sourceKey": "gsd-h5-react:Container",
            "dataBinds": {
              "_visible": (forItems) => (!this.$WEAPPS_COMP.computed.isSwitch)
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
          "x-index": 1,
          "properties": {
            "id6": {
              "key": "id6",
              "x-component": "gsd-h5-react:image",
              "x-props": {
                "sourceKey": "gsd-h5-react:Image",
                "data": {
                  "alt": "[图片]",
                  "mode": "scaleToFill",
                  "webp": false,
                  "lazyLoad": false,
                  "showMenuByLongpress": false
                },
                "dataBinds": {
                  "src": () => this.$WEAPPS_COMP.props.data.checkedIcon,
                  "_visible": () => this.$WEAPPS_COMP.props.data.value
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
                "classNameList": [
                  "g-comp-switch_icon"
                ]
              },
              "x-index": 1
            },
            "id7": {
              "key": "id7",
              "x-component": "gsd-h5-react:image",
              "x-props": {
                "sourceKey": "gsd-h5-react:Image",
                "data": {
                  "alt": "[图片]",
                  "mode": "scaleToFill",
                  "webp": false,
                  "lazyLoad": false,
                  "showMenuByLongpress": false
                },
                "dataBinds": {
                  "src": () => this.$WEAPPS_COMP.props.data.uncheckedIcon,
                  "_visible": () => !this.$WEAPPS_COMP.props.data.value
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
                "classNameList": [
                  "g-comp-switch_icon"
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
  "id4": {
    "title": "switch",
    "style": {},
    "classList": [
      "g-comp-switch"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id3"
  },
  "id6": {
    "alt": "[图片]",
    "mode": "scaleToFill",
    "webp": false,
    "lazyLoad": false,
    "showMenuByLongpress": false,
    "style": {},
    "classList": [
      "g-comp-switch_icon"
    ],
    "widgetType": "gsd-h5-react:Image",
    "_parentId": "id5"
  },
  "id7": {
    "alt": "[图片]",
    "mode": "scaleToFill",
    "webp": false,
    "lazyLoad": false,
    "showMenuByLongpress": false,
    "style": {},
    "classList": [
      "g-comp-switch_icon"
    ],
    "widgetType": "gsd-h5-react:Image",
    "_parentId": "id5"
  },
  "id5": {
    "title": "",
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id3"
  },
  "id3": {
    "title": "",
    "_visible": true,
    "style": {
      "display": "inline-block"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container"
  }
}
    const dataBinds = {
  "id4": {
    "_visible": () => this.$WEAPPS_COMP.computed.isSwitch,
    "classList": () => this.$WEAPPS_COMP.computed.getClass
  },
  "id6": {
    "src": () => this.$WEAPPS_COMP.props.data.checkedIcon,
    "_visible": () => this.$WEAPPS_COMP.props.data.value
  },
  "id7": {
    "src": () => this.$WEAPPS_COMP.props.data.uncheckedIcon,
    "_visible": () => !this.$WEAPPS_COMP.props.data.value
  },
  "id5": {
    "_visible": (forItems) => (!this.$WEAPPS_COMP.computed.isSwitch)
  }
}
    const defaultProps = {
  "type": "switch",
  "value": true,
  "disabled": false,
  "checkedIcon": "https://weapps-prod-1301730524.cos.ap-guangzhou.myqcloud.com/res/2/square.svg",
  "uncheckedIcon": "https://weapps-prod-1301730524.cos.ap-guangzhou.myqcloud.com/res/2/square_un.svg"
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
