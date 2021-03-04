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


import handler$start from "./lowcode/handler/start.js";

import handler$reset from "./lowcode/handler/reset.js";


// Import Components

import gsdH5ReactImage from "libraries/gsd-h5-react@0.0.61/components/Image";

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

    this.compConfig = {}
    this.virtualFields = Object.assign({}, props.pageVirtualFields || {}, {
    
      "gsd-h5-react:Image": gsdH5ReactImage,
    
      "gsd-h5-react:Text": gsdH5ReactText,
    
      "gsd-h5-react:Container": gsdH5ReactContainer,
    
    });
    this.events = (["end"]).reduce((obj, trigger) => {
      obj[trigger] = (event) => {
        this.props.emit(trigger, event)
      };
      return obj
    }, {});
    this.handler = this.$WEAPPS_COMP.handler = {
      
      start: handler$start.bind(this),
      
      reset: handler$reset.bind(this),
      
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
          "lcap_machine",
          "wa-comp-CLOUDBASE_STANDARD-SlotMachine"
        ]
      },
      "x-index": 0,
      "properties": {
        "id8": {
          "key": "id8",
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
              "lcap_machine_items"
            ]
          },
          "x-index": 1,
          "properties": {
            "id2": {
              "key": "id2",
              "x-component": "gsd-h5-react:container",
              "x-props": {
                "sourceKey": "gsd-h5-react:Container",
                "dataBinds": {
                  "_waFor": (forItems) => (this.$WEAPPS_COMP.state.items && this.$WEAPPS_COMP.state.items.slice() || [])
                },
                "dataTypes": [
                  {
                    "propertyPath": "title",
                    "type": "static"
                  },
                  {
                    "propertyPath": "_waFor",
                    "type": "bind"
                  }
                ],
                "classNameList": [
                  "lcap_machine_item"
                ]
              },
              "x-index": 0,
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
                      "lcap_machine_item_slide"
                    ],
                    "styleBind": {
                      "style": (forItems) => ({transform: `translate3d(0, ${forItems.id2.translate/this.$WEAPPS_COMP.state.height*100}%, 1px)`})
                    }
                  },
                  "x-index": 0,
                  "properties": {
                    "id4": {
                      "key": "id4",
                      "x-component": "gsd-h5-react:container",
                      "x-props": {
                        "sourceKey": "gsd-h5-react:Container",
                        "dataBinds": {
                          "_waFor": () => this.$WEAPPS_COMP.props.data.candidates
                        },
                        "dataTypes": [
                          {
                            "propertyPath": "title",
                            "type": "static"
                          },
                          {
                            "propertyPath": "_waFor",
                            "type": "bind"
                          }
                        ],
                        "classNameList": [
                          "lcap_machine_item_ele"
                        ]
                      },
                      "x-index": 0,
                      "properties": {
                        "id5": {
                          "key": "id5",
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
                              "lcap_machine_item_ele_content"
                            ]
                          },
                          "x-index": 0,
                          "properties": {
                            "id6": {
                              "key": "id6",
                              "x-component": "gsd-h5-react:image",
                              "x-props": {
                                "sourceKey": "gsd-h5-react:Image",
                                "data": {
                                  "alt": "",
                                  "mode": "aspectFit",
                                  "webp": false,
                                  "lazyLoad": false,
                                  "showMenuByLongpress": false
                                },
                                "dataBinds": {
                                  "src": (forItems) => forItems.id4.image,
                                  "_visible": (forItems) => (!!forItems.id4.image)
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
                                ]
                              },
                              "x-index": 0
                            },
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
                                  "text": (forItems) => forItems.id4.value,
                                  "_visible": (forItems) => (!forItems.id4.image)
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
                                "commonStyle": {
                                  "fontSize": "1.5000rem"
                                }
                              },
                              "x-index": 1
                            }
                          }
                        }
                      }
                    },
                    "id9": {
                      "key": "id9",
                      "x-component": "gsd-h5-react:container",
                      "x-props": {
                        "sourceKey": "gsd-h5-react:Container",
                        "data": {
                          "_visible": true
                        },
                        "dataBinds": {
                          "title": () => this.$WEAPPS_COMP.computed.start
                        },
                        "dataTypes": [
                          {
                            "propertyPath": "title",
                            "type": "bind"
                          }
                        ],
                        "commonStyle": {
                          "width": "0",
                          "height": "0"
                        }
                      },
                      "x-index": 1
                    },
                    "id10": {
                      "key": "id10",
                      "x-component": "gsd-h5-react:container",
                      "x-props": {
                        "sourceKey": "gsd-h5-react:Container",
                        "data": {
                          "_visible": true
                        },
                        "dataBinds": {
                          "title": () => this.$WEAPPS_COMP.computed.reset
                        },
                        "dataTypes": [
                          {
                            "propertyPath": "title",
                            "type": "bind"
                          }
                        ],
                        "commonStyle": {
                          "width": "0",
                          "height": "0"
                        }
                      },
                      "x-index": 2
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
  "id6": {
    "alt": "",
    "mode": "aspectFit",
    "webp": false,
    "lazyLoad": false,
    "showMenuByLongpress": false,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Image",
    "_parentId": "id5"
  },
  "id7": {
    "decode": false,
    "selectable": false,
    "style": {
      "fontSize": "1.5000rem"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id5"
  },
  "id5": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [
      "lcap_machine_item_ele_content"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id4"
  },
  "id4": {
    "title": "",
    "style": {},
    "classList": [
      "lcap_machine_item_ele"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id3"
  },
  "id9": {
    "_visible": true,
    "style": {
      "width": "0",
      "height": "0"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id3"
  },
  "id10": {
    "_visible": true,
    "style": {
      "width": "0",
      "height": "0"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id3"
  },
  "id3": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [
      "lcap_machine_item_slide"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id2"
  },
  "id2": {
    "title": "",
    "style": {},
    "classList": [
      "lcap_machine_item"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id8"
  },
  "id8": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [
      "lcap_machine_items"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id1"
  },
  "id1": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [
      "lcap_machine",
      "wa-comp-CLOUDBASE_STANDARD-SlotMachine"
    ],
    "widgetType": "gsd-h5-react:Container"
  }
}
    const dataBinds = {
  "id6": {
    "src": (forItems) => forItems.id4.image,
    "_visible": (forItems) => (!!forItems.id4.image)
  },
  "id7": {
    "text": (forItems) => forItems.id4.value,
    "_visible": (forItems) => (!forItems.id4.image)
  },
  "id4": {
    "_waFor": () => this.$WEAPPS_COMP.props.data.candidates
  },
  "id9": {
    "title": () => this.$WEAPPS_COMP.computed.start
  },
  "id10": {
    "title": () => this.$WEAPPS_COMP.computed.reset
  },
  "id3": {
    "style": (forItems) => ({transform: `translate3d(0, ${forItems.id2.translate/this.$WEAPPS_COMP.state.height*100}%, 1px)`})
  },
  "id2": {
    "_waFor": (forItems) => (this.$WEAPPS_COMP.state.items && this.$WEAPPS_COMP.state.items.slice() || [])
  }
}
    const defaultProps = {
  "items": [
    {
      "value": 0
    },
    {
      "value": 0
    },
    {
      "value": 0
    }
  ],
  "reset": false,
  "speed": 60,
  "start": false,
  "candidates": [
    {
      "image": "",
      "value": 0
    },
    {
      "image": "",
      "value": 1
    },
    {
      "image": "",
      "value": 2
    },
    {
      "image": "",
      "value": 3
    },
    {
      "image": "",
      "value": 4
    },
    {
      "image": "",
      "value": 5
    },
    {
      "image": "",
      "value": 6
    },
    {
      "image": "",
      "value": 7
    },
    {
      "image": "",
      "value": 8
    },
    {
      "image": "",
      "value": 9
    }
  ]
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
