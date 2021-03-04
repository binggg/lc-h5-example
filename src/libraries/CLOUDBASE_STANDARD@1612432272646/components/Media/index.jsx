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

import gsdH5ReactText from "libraries/gsd-h5-react@0.0.61/components/Text";

import gsdH5ReactContainer from "libraries/gsd-h5-react@0.0.61/components/Container";

import gsdH5ReactSlot from "libraries/gsd-h5-react@0.0.61/components/Slot";

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
    
      "gsd-h5-react:Text": gsdH5ReactText,
    
      "gsd-h5-react:Container": gsdH5ReactContainer,
    
      "gsd-h5-react:Slot": gsdH5ReactSlot,
    
      "gsd-h5-react:Image": gsdH5ReactImage,
    
    });
    this.events = (["tap"]).reduce((obj, trigger) => {
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
          "lcap-media",
          "wa-comp-CLOUDBASE_STANDARD-Media"
        ],
        "classNameListBind": {
          "classList": (forItems) => (this.$WEAPPS_COMP.props.data.reverse?'lcap-reverse':'')
        },
        "listenerInstances": [
          {
            "key": "",
            "trigger": "tap",
            "instanceFunction": function({data}) { this.props.emit('tap', data.target) }.bind(this),
            "data": {
              "target": ""
            }
          }
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
              "_visible": true
            },
            "dataTypes": [
              {
                "propertyPath": "title",
                "type": "static"
              }
            ],
            "classNameList": [
              "lcap-media__right"
            ]
          },
          "x-index": 2,
          "properties": {
            "id5": {
              "key": "id5",
              "x-component": "gsd-h5-react:container",
              "x-props": {
                "sourceKey": "gsd-h5-react:Container",
                "dataBinds": {
                  "_visible": (forItems) => (!this.$WEAPPS_COMP.props.data.isCustomContent)
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
                  "lcap-media__title_container"
                ]
              },
              "x-index": 1,
              "properties": {
                "id7": {
                  "key": "id7",
                  "x-component": "gsd-h5-react:text",
                  "x-props": {
                    "sourceKey": "gsd-h5-react:Text",
                    "data": {
                      "decode": false,
                      "selectable": false
                    },
                    "dataBinds": {
                      "text": () => this.$WEAPPS_COMP.props.data.title,
                      "_visible": () => this.$WEAPPS_COMP.props.data.title
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
                    ],
                    "classNameList": [
                      "lcap-media__title"
                    ]
                  },
                  "x-index": 1
                },
                "id8": {
                  "key": "id8",
                  "x-component": "gsd-h5-react:text",
                  "x-props": {
                    "sourceKey": "gsd-h5-react:Text",
                    "data": {
                      "decode": false,
                      "selectable": false,
                      "_visible": true
                    },
                    "dataBinds": {
                      "text": () => this.$WEAPPS_COMP.props.data.subtitle
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
                    ],
                    "classNameList": [
                      "lcap-media__subtitle"
                    ],
                    "classNameListBind": {
                      "classList": (forItems) => (this.$WEAPPS_COMP.props.data.subtitleType)
                    }
                  },
                  "x-index": 3
                }
              }
            },
            "id6": {
              "key": "id6",
              "x-component": "gsd-h5-react:container",
              "x-props": {
                "sourceKey": "gsd-h5-react:Container",
                "dataBinds": {
                  "_visible": () => this.$WEAPPS_COMP.props.data.content
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
                  "lcap-media__content_container"
                ]
              },
              "x-index": 2,
              "properties": {
                "id9": {
                  "key": "id9",
                  "x-component": "gsd-h5-react:text",
                  "x-props": {
                    "sourceKey": "gsd-h5-react:Text",
                    "data": {
                      "decode": false,
                      "selectable": false,
                      "_visible": true
                    },
                    "dataBinds": {
                      "text": () => this.$WEAPPS_COMP.props.data.content
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
                  "x-index": 1
                }
              }
            },
            "id12": {
              "key": "id12",
              "x-component": "gsd-h5-react:slot",
              "x-props": {
                "sourceKey": "gsd-h5-react:Slot",
                "data": {
                  "name": "customContent"
                },
                "dataBinds": {
                  "_visible": (forItems) => (this.$WEAPPS_COMP.props.data.isCustomContent)
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
              "x-index": 3
            }
          }
        },
        "id10": {
          "key": "id10",
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
              "lcap-media__left"
            ]
          },
          "x-index": 1,
          "properties": {
            "id3": {
              "key": "id3",
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
                  "src": () => this.$WEAPPS_COMP.props.data.mediaUrl,
                  "_visible": (forItems) => (!this.$WEAPPS_COMP.props.data.isCustomMedia)
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
                  "lcap-media__left_image"
                ],
                "styleBind": {
                  "style": (forItems) => ({
     width: `${this.$WEAPPS_COMP.props.data.thumbSize || 0}px`,
     height: `${this.$WEAPPS_COMP.props.data.thumbSize || 0}px`
 })
                }
              },
              "x-index": 0
            },
            "id11": {
              "key": "id11",
              "x-component": "gsd-h5-react:slot",
              "x-props": {
                "sourceKey": "gsd-h5-react:Slot",
                "data": {
                  "name": "customMedia"
                },
                "dataBinds": {
                  "_visible": (forItems) => (this.$WEAPPS_COMP.props.data.isCustomMedia)
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
  "id7": {
    "decode": false,
    "selectable": false,
    "style": {},
    "classList": [
      "lcap-media__title"
    ],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id5"
  },
  "id8": {
    "decode": false,
    "selectable": false,
    "_visible": true,
    "style": {},
    "classList": [
      "lcap-media__subtitle"
    ],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id5"
  },
  "id5": {
    "title": "",
    "style": {},
    "classList": [
      "lcap-media__title_container"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id4"
  },
  "id9": {
    "decode": false,
    "selectable": false,
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id6"
  },
  "id6": {
    "title": "",
    "style": {},
    "classList": [
      "lcap-media__content_container"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id4"
  },
  "id12": {
    "name": "customContent",
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id4"
  },
  "id4": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [
      "lcap-media__right"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id1"
  },
  "id3": {
    "alt": "[图片]",
    "mode": "scaleToFill",
    "webp": false,
    "lazyLoad": false,
    "showMenuByLongpress": false,
    "style": {},
    "classList": [
      "lcap-media__left_image"
    ],
    "widgetType": "gsd-h5-react:Image",
    "_parentId": "id10"
  },
  "id11": {
    "name": "customMedia",
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id10"
  },
  "id10": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [
      "lcap-media__left"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id1"
  },
  "id1": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [
      "lcap-media",
      "wa-comp-CLOUDBASE_STANDARD-Media"
    ],
    "widgetType": "gsd-h5-react:Container"
  }
}
    const dataBinds = {
  "id7": {
    "text": () => this.$WEAPPS_COMP.props.data.title,
    "_visible": () => this.$WEAPPS_COMP.props.data.title
  },
  "id8": {
    "text": () => this.$WEAPPS_COMP.props.data.subtitle,
    "classList": (forItems) => (this.$WEAPPS_COMP.props.data.subtitleType)
  },
  "id5": {
    "_visible": (forItems) => (!this.$WEAPPS_COMP.props.data.isCustomContent)
  },
  "id9": {
    "text": () => this.$WEAPPS_COMP.props.data.content
  },
  "id6": {
    "_visible": () => this.$WEAPPS_COMP.props.data.content
  },
  "id12": {
    "_visible": (forItems) => (this.$WEAPPS_COMP.props.data.isCustomContent)
  },
  "id3": {
    "src": () => this.$WEAPPS_COMP.props.data.mediaUrl,
    "_visible": (forItems) => (!this.$WEAPPS_COMP.props.data.isCustomMedia),
    "style": (forItems) => ({
     width: `${this.$WEAPPS_COMP.props.data.thumbSize || 0}px`,
     height: `${this.$WEAPPS_COMP.props.data.thumbSize || 0}px`
 })
  },
  "id11": {
    "_visible": (forItems) => (this.$WEAPPS_COMP.props.data.isCustomMedia)
  },
  "id1": {
    "classList": (forItems) => (this.$WEAPPS_COMP.props.data.reverse?'lcap-reverse':'')
  }
}
    const defaultProps = {
  "align": "top",
  "title": "标题",
  "content": "消息内容",
  "reverse": false,
  "mediaUrl": "https://main.qcloudimg.com/raw/d9fe2045658211eeb3ad60edca3102a8.png",
  "subtitle": "子标题",
  "thumbSize": 100,
  "customMedia": "",
  "subtitleType": "raw",
  "customContent": "",
  "isCustomMedia": false,
  "isCustomContent": false
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
