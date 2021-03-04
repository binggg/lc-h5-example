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


import handler$getTabbarStyle from "./lowcode/handler/getTabbarStyle.js";

import handler$onTabItemClick from "./lowcode/handler/onTabItemClick.js";


// Import Components

import gsdH5ReactSlot from "libraries/gsd-h5-react@0.0.61/components/Slot";

import cloudbaseStandardIcon from "libraries/CLOUDBASE_STANDARD@1612432272646/components/Icon";

import cloudbaseStandardTabBarItem from "libraries/CLOUDBASE_STANDARD@1612432272646/components/TabBarItem";

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
    
      "gsd-h5-react:Slot": gsdH5ReactSlot,
    
      "CLOUDBASE_STANDARD:Icon": cloudbaseStandardIcon,
    
      "CLOUDBASE_STANDARD:TabBarItem": cloudbaseStandardTabBarItem,
    
      "gsd-h5-react:Container": gsdH5ReactContainer,
    
    });
    this.events = (["change"]).reduce((obj, trigger) => {
      obj[trigger] = (event) => {
        this.props.emit(trigger, event)
      };
      return obj
    }, {});
    this.handler = this.$WEAPPS_COMP.handler = {
      
      getTabbarStyle: handler$getTabbarStyle.bind(this),
      
      onTabItemClick: handler$onTabItemClick.bind(this),
      
    };
    this.componentSchema = {
  "type": "object",
  "properties": {
    "id2": {
      "key": "id2",
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
          "lcap-tabbar",
          "wa-comp-CLOUDBASE_STANDARD-TabBar"
        ],
        "classNameListBind": {
          "classList": () => this.$WEAPPS_COMP.props.data.position
        },
        "styleBind": {
          "style": (forItems) => (this.$WEAPPS_COMP.handler.getTabbarStyle())
        }
      },
      "x-index": 1,
      "properties": {
        "id3": {
          "key": "id3",
          "x-component": "gsd-h5-react:slot",
          "x-props": {
            "sourceKey": "gsd-h5-react:Slot",
            "data": {
              "name": "tabbar",
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
        },
        "id4": {
          "key": "id4",
          "x-component": "cloudbase_standard:tabbaritem",
          "x-props": {
            "sourceKey": "CLOUDBASE_STANDARD:TabBarItem",
            "data": {
              "circle": false,
              "textSize": 24,
              "underline": false,
              "activeIcon": "",
              "circleSize": 100,
              "costomIcon": ""
            },
            "dataBinds": {
              "icon": (forItems) => (forItems.id4.name === this.$WEAPPS_COMP.props.data.value ? '':forItems.id4.icon),
              "name": (forItems) => forItems.id4.name,
              "color": () => this.$WEAPPS_COMP.props.data.color,
              "title": (forItems) => forItems.id4.title,
              "actived": (forItems) => (forItems.id4.name === this.$WEAPPS_COMP.props.data.value),
              "activeColor": () => this.$WEAPPS_COMP.props.data.activeColor,
              "childIconSize": () => this.$WEAPPS_COMP.props.data.iconSize,
              "_waFor": () => this.$WEAPPS_COMP.props.data.tabs
            },
            "dataTypes": [
              {
                "propertyPath": "icon",
                "type": "bind"
              },
              {
                "propertyPath": "name",
                "type": "bind"
              },
              {
                "propertyPath": "color",
                "type": "bind"
              },
              {
                "propertyPath": "title",
                "type": "bind"
              },
              {
                "propertyPath": "circle",
                "type": "static"
              },
              {
                "propertyPath": "actived",
                "type": "bind"
              },
              {
                "propertyPath": "textSize",
                "type": "static"
              },
              {
                "propertyPath": "underline",
                "type": "static"
              },
              {
                "propertyPath": "activeIcon",
                "type": "slot"
              },
              {
                "propertyPath": "circleSize",
                "type": "static"
              },
              {
                "propertyPath": "costomIcon",
                "type": "slot"
              },
              {
                "propertyPath": "activeColor",
                "type": "bind"
              },
              {
                "propertyPath": "childIconSize",
                "type": "bind"
              },
              {
                "propertyPath": "_waFor",
                "type": "bind"
              }
            ],
            "classNameListBind": {
              "classList": () => this.$WEAPPS_COMP.props.data.tabs
            },
            "listenerInstances": [
              {
                "key": "",
                "trigger": "click",
                "instanceFunction": this.handler.onTabItemClick.bind(this),
                "dataBinds": {
                  "target": (forItems) => forItems.id4.name
                }
              }
            ]
          },
          "x-index": 2,
          "properties": {
            "activeIcon": {
              "key": "activeIcon",
              "properties": {
                "id5": {
                  "key": "id5",
                  "x-component": "cloudbase_standard:icon",
                  "x-props": {
                    "sourceKey": "CLOUDBASE_STANDARD:Icon",
                    "data": {
                      "name": "success",
                      "_visible": true
                    },
                    "dataBinds": {
                      "src": (forItems) => forItems.id4.activeIcon,
                      "size": () => this.$WEAPPS_COMP.props.data.iconSize,
                      "color": (forItems) => (this.$WEAPPS_COMP.props.data.value === forItems.id4.name ? this.$WEAPPS_COMP.props.data.activeColor:this.$WEAPPS_COMP.props.data.color)
                    },
                    "dataTypes": [
                      {
                        "propertyPath": "src",
                        "type": "bind"
                      },
                      {
                        "propertyPath": "name",
                        "type": "static"
                      },
                      {
                        "propertyPath": "size",
                        "type": "bind"
                      },
                      {
                        "propertyPath": "color",
                        "type": "bind"
                      }
                    ]
                  },
                  "x-index": 1
                }
              }
            },
            "costomIcon": {
              "key": "costomIcon"
            }
          }
        }
      }
    }
  }
};
    const widgetContext = {
  "id3": {
    "name": "tabbar",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id2"
  },
  "id5": {
    "name": "success",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "CLOUDBASE_STANDARD:Icon",
    "_parentId": "id4"
  },
  "id4": {
    "circle": false,
    "textSize": 24,
    "underline": false,
    "activeIcon": "",
    "circleSize": 100,
    "costomIcon": "",
    "style": {},
    "classList": [],
    "widgetType": "CLOUDBASE_STANDARD:TabBarItem",
    "_parentId": "id2"
  },
  "id2": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [
      "lcap-tabbar",
      "wa-comp-CLOUDBASE_STANDARD-TabBar"
    ],
    "widgetType": "gsd-h5-react:Container"
  }
}
    const dataBinds = {
  "id5": {
    "src": (forItems) => forItems.id4.activeIcon,
    "size": () => this.$WEAPPS_COMP.props.data.iconSize,
    "color": (forItems) => (this.$WEAPPS_COMP.props.data.value === forItems.id4.name ? this.$WEAPPS_COMP.props.data.activeColor:this.$WEAPPS_COMP.props.data.color)
  },
  "id4": {
    "icon": (forItems) => (forItems.id4.name === this.$WEAPPS_COMP.props.data.value ? '':forItems.id4.icon),
    "name": (forItems) => forItems.id4.name,
    "color": () => this.$WEAPPS_COMP.props.data.color,
    "title": (forItems) => forItems.id4.title,
    "actived": (forItems) => (forItems.id4.name === this.$WEAPPS_COMP.props.data.value),
    "activeColor": () => this.$WEAPPS_COMP.props.data.activeColor,
    "childIconSize": () => this.$WEAPPS_COMP.props.data.iconSize,
    "_waFor": () => this.$WEAPPS_COMP.props.data.tabs,
    "classList": () => this.$WEAPPS_COMP.props.data.tabs
  },
  "id2": {
    "style": (forItems) => (this.$WEAPPS_COMP.handler.getTabbarStyle()),
    "classList": () => this.$WEAPPS_COMP.props.data.position
  }
}
    const defaultProps = {
  "tabs": [
    {
      "icon": "https://imgcache.qq.com/qcloud/tcloud_dtc/static/low_code/c868cd77-8454-46d5-bd13-54539707e9f2.svg",
      "name": "value1",
      "title": "标题1",
      "activeIcon": "https://imgcache.qq.com/qcloud/tcloud_dtc/static/low_code/ad23c89d-e318-4f1c-b336-c818ca8dc3cc.svg"
    },
    {
      "icon": "https://imgcache.qq.com/qcloud/tcloud_dtc/static/low_code/d60e9fcf-3ed2-4b89-b227-795a12c43eb0.svg",
      "name": "value2",
      "title": "标题2",
      "activeIcon": "https://imgcache.qq.com/qcloud/tcloud_dtc/static/low_code/a4de8c70-92cb-4a8d-a173-d77f29be8495.svg"
    }
  ],
  "color": "#444444",
  "route": false,
  "value": "value1",
  "tabbar": "",
  "iconSize": 40,
  "position": "bottom",
  "routeType": "navigateTo",
  "activeColor": "#006EFF",
  "backgroundColor": "#FFF",
  "backgroundImage": ""
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
