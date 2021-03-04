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


import handler$clickItem from "./lowcode/handler/clickItem.js";


// Import Components

import gsdH5ReactContainer from "libraries/gsd-h5-react@0.0.61/components/Container";

import cloudbaseStandardList from "libraries/CLOUDBASE_STANDARD@1612432272646/components/List";

import cloudbaseStandardStatusTip from "libraries/CLOUDBASE_STANDARD@1612432272646/components/StatusTip";

import gsdH5ReactSlot from "libraries/gsd-h5-react@0.0.61/components/Slot";

import cloudbaseStandardItem from "libraries/CLOUDBASE_STANDARD@1612432272646/components/Item";

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

    this.compConfig = {}
    this.virtualFields = Object.assign({}, props.pageVirtualFields || {}, {
    
      "gsd-h5-react:Container": gsdH5ReactContainer,
    
      "CLOUDBASE_STANDARD:List": cloudbaseStandardList,
    
      "CLOUDBASE_STANDARD:StatusTip": cloudbaseStandardStatusTip,
    
      "gsd-h5-react:Slot": gsdH5ReactSlot,
    
      "CLOUDBASE_STANDARD:Item": cloudbaseStandardItem,
    
      "gsd-h5-react:Image": gsdH5ReactImage,
    
    });
    this.events = (["clickItem"]).reduce((obj, trigger) => {
      obj[trigger] = (event) => {
        this.props.emit(trigger, event)
      };
      return obj
    }, {});
    this.handler = this.$WEAPPS_COMP.handler = {
      
      clickItem: handler$clickItem.bind(this),
      
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
        "classNameList": [
          "lcap-item-list",
          "wa-comp-CLOUDBASE_STANDARD-ItemList"
        ]
      },
      "x-index": 1,
      "properties": {
        "id3": {
          "key": "id3",
          "x-component": "cloudbase_standard:list",
          "x-props": {
            "sourceKey": "CLOUDBASE_STANDARD:List",
            "data": {
              "_visible": true
            },
            "dataBinds": {
              "title": () => this.$WEAPPS_COMP.props.data.title,
              "bordered": () => this.$WEAPPS_COMP.props.data.bordered,
              "borderPosition": () => this.$WEAPPS_COMP.props.data.borderPosition
            },
            "dataTypes": [
              {
                "propertyPath": "title",
                "type": "bind"
              },
              {
                "propertyPath": "bordered",
                "type": "bind"
              },
              {
                "propertyPath": "borderPosition",
                "type": "bind"
              },
              {
                "propertyPath": "item",
                "type": "slot"
              }
            ]
          },
          "x-index": 1,
          "properties": {
            "item": {
              "key": "item",
              "properties": {
                "id7": {
                  "key": "id7",
                  "x-component": "gsd-h5-react:container",
                  "x-props": {
                    "sourceKey": "gsd-h5-react:Container",
                    "dataBinds": {
                      "_visible": (forItems) => (this.$WEAPPS_COMP.props.data.loading || (!this.$WEAPPS_COMP.props.data.loading && this.$WEAPPS_COMP.props.data.list.length === 0))
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
                    "commonStyle": {
                      "textAlign": "center"
                    },
                    "classNameList": [
                      "lcap-item-list__status_tip_item"
                    ]
                  },
                  "x-index": 0,
                  "properties": {
                    "id8": {
                      "key": "id8",
                      "x-component": "cloudbase_standard:statustip",
                      "x-props": {
                        "sourceKey": "CLOUDBASE_STANDARD:StatusTip",
                        "data": {
                          "tip": "",
                          "_visible": true
                        },
                        "dataBinds": {
                          "text": (forItems) => (this.$WEAPPS_COMP.props.data.loading? this.$WEAPPS_COMP.props.data.tips.loading : this.$WEAPPS_COMP.props.data.tips.empty),
                          "type": (forItems) => (this.$WEAPPS_COMP.props.data.loading? 'loading':'empty')
                        },
                        "dataTypes": [
                          {
                            "propertyPath": "tip",
                            "type": "slot"
                          },
                          {
                            "propertyPath": "text",
                            "type": "bind"
                          },
                          {
                            "propertyPath": "type",
                            "type": "bind"
                          }
                        ]
                      },
                      "x-index": 1,
                      "properties": {
                        "tip": {
                          "key": "tip"
                        }
                      }
                    }
                  }
                },
                "id9": {
                  "key": "id9",
                  "x-component": "gsd-h5-react:slot",
                  "x-props": {
                    "sourceKey": "gsd-h5-react:Slot",
                    "data": {
                      "name": "items",
                      "_visible": true
                    },
                    "dataTypes": [
                      {
                        "propertyPath": "name",
                        "type": "static"
                      }
                    ]
                  },
                  "x-index": 1
                },
                "id10": {
                  "key": "id10",
                  "x-component": "cloudbase_standard:item",
                  "x-props": {
                    "sourceKey": "CLOUDBASE_STANDARD:Item",
                    "data": {
                      "bordered": true,
                      "isClickable": true,
                      "is-clickable": true
                    },
                    "dataBinds": {
                      "title": (forItems) => forItems.id10.item.title,
                      "description": (forItems) => forItems.id10.item.description,
                      "value": (forItems) => forItems.id10.item.value,
                      "detail": (forItems) => forItems.id10.item.detail,
                      "_visible": () => !this.$WEAPPS_COMP.props.data.isCustomRender,
                      "_waFor": () => this.$WEAPPS_COMP.computed.list
                    },
                    "dataTypes": [
                      {
                        "propertyPath": "bordered",
                        "type": "static"
                      },
                      {
                        "propertyPath": "isClickable",
                        "type": "static"
                      },
                      {
                        "propertyPath": "is-clickable",
                        "type": "static"
                      },
                      {
                        "propertyPath": "title",
                        "type": "bind"
                      },
                      {
                        "propertyPath": "description",
                        "type": "bind"
                      },
                      {
                        "propertyPath": "value",
                        "type": "bind"
                      },
                      {
                        "propertyPath": "detail",
                        "type": "bind"
                      },
                      {
                        "propertyPath": "customIcon",
                        "type": "slot"
                      },
                      {
                        "propertyPath": "customTitle",
                        "type": "slot"
                      },
                      {
                        "propertyPath": "customValue",
                        "type": "slot"
                      },
                      {
                        "propertyPath": "_visible",
                        "type": "bind"
                      },
                      {
                        "propertyPath": "_waFor",
                        "type": "bind"
                      }
                    ],
                    "listenerInstances": [
                      {
                        "key": "",
                        "trigger": "click",
                        "instanceFunction": this.handler.clickItem.bind(this),
                        "dataBinds": {
                          "target": (forItems) => forItems.id10
                        }
                      }
                    ]
                  },
                  "x-index": 2,
                  "properties": {
                    "customIcon": {
                      "key": "customIcon",
                      "properties": {
                        "id11": {
                          "key": "id11",
                          "x-component": "gsd-h5-react:image",
                          "x-props": {
                            "sourceKey": "gsd-h5-react:Image",
                            "data": {
                              "alt": "[图片]",
                              "mode": "scaleToFill",
                              "webp": false,
                              "lazyLoad": false,
                              "showMenuByLongpress": false,
                              "_visible": true
                            },
                            "dataBinds": {
                              "src": (forItems) => forItems.id10.item.mediaUrl
                            },
                            "dataTypes": [
                              {
                                "propertyPath": "alt",
                                "type": "static"
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
                                "propertyPath": "src",
                                "type": "bind"
                              }
                            ],
                            "classNameList": [
                              "lcap-item-list__media"
                            ]
                          },
                          "x-index": 1
                        }
                      }
                    },
                    "customTitle": {
                      "key": "customTitle"
                    },
                    "customValue": {
                      "key": "customValue"
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
  "id8": {
    "tip": "",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "CLOUDBASE_STANDARD:StatusTip",
    "_parentId": "id7"
  },
  "id7": {
    "title": "",
    "style": {
      "textAlign": "center"
    },
    "classList": [
      "lcap-item-list__status_tip_item"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id3"
  },
  "id9": {
    "name": "items",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id3"
  },
  "id11": {
    "alt": "[图片]",
    "mode": "scaleToFill",
    "webp": false,
    "lazyLoad": false,
    "showMenuByLongpress": false,
    "_visible": true,
    "style": {},
    "classList": [
      "lcap-item-list__media"
    ],
    "widgetType": "gsd-h5-react:Image",
    "_parentId": "id10"
  },
  "id10": {
    "bordered": true,
    "isClickable": true,
    "is-clickable": true,
    "style": {},
    "classList": [],
    "widgetType": "CLOUDBASE_STANDARD:Item",
    "_parentId": "id3"
  },
  "id3": {
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "CLOUDBASE_STANDARD:List",
    "_parentId": "id1"
  },
  "id1": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [
      "lcap-item-list",
      "wa-comp-CLOUDBASE_STANDARD-ItemList"
    ],
    "widgetType": "gsd-h5-react:Container"
  }
}
    const dataBinds = {
  "id8": {
    "text": (forItems) => (this.$WEAPPS_COMP.props.data.loading? this.$WEAPPS_COMP.props.data.tips.loading : this.$WEAPPS_COMP.props.data.tips.empty),
    "type": (forItems) => (this.$WEAPPS_COMP.props.data.loading? 'loading':'empty')
  },
  "id7": {
    "_visible": (forItems) => (this.$WEAPPS_COMP.props.data.loading || (!this.$WEAPPS_COMP.props.data.loading && this.$WEAPPS_COMP.props.data.list.length === 0))
  },
  "id11": {
    "src": (forItems) => forItems.id10.item.mediaUrl
  },
  "id10": {
    "title": (forItems) => forItems.id10.item.title,
    "description": (forItems) => forItems.id10.item.description,
    "value": (forItems) => forItems.id10.item.value,
    "detail": (forItems) => forItems.id10.item.detail,
    "_visible": () => !this.$WEAPPS_COMP.props.data.isCustomRender,
    "_waFor": () => this.$WEAPPS_COMP.computed.list
  },
  "id3": {
    "title": () => this.$WEAPPS_COMP.props.data.title,
    "bordered": () => this.$WEAPPS_COMP.props.data.bordered,
    "borderPosition": () => this.$WEAPPS_COMP.props.data.borderPosition
  }
}
    const defaultProps = {
  "list": [
    {
      "title": "标题",
      "value": "",
      "detail": false,
      "mediaUrl": "https://main.qcloudimg.com/raw/d9fe2045658211eeb3ad60edca3102a8.png",
      "description": "描述信息"
    }
  ],
  "tips": {
    "empty": "暂无数据",
    "loading": "加载中..."
  },
  "items": "",
  "title": "",
  "loading": false,
  "bordered": false,
  "borderPosition": "horizontal",
  "isCustomRender": false
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
