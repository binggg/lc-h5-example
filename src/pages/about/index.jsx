// Import Libs and Handlers
import * as React from 'react'
import { observable } from 'mobx'
import { AppRender } from 'handlers/render'
import { initLifeCycle, pageLifeCycleMount } from 'handlers/lifecycle'
import { createComputed } from 'utils'
import AppLifeCycle from 'lowcode/lifecycle'
import { createDataVar, buildDataVarFetchFn, createDataset, updateDatasetParams, createStateDatasrouceVar } from '@/datasources'
import PageLifeCycle from '../../lowcode/about/lifecycle'
import initPageState from '../../lowcode/about/state'
import computed from '../../lowcode/about/computed'
import { $$_about as handler } from '../../app/handlers'
import { app as mainApp } from 'app/global-api' // 取主包app
import { app, $page } from '../../app/global-api' // 取对应子包app
import { createWidgets, retryDataBinds } from 'handlers/utils'
import { useScrollTop } from 'handlers/hooks'
import { get } from 'lodash'
import './index.less'

let ReactDOMServer;

if(process.env.SSR) {
  ReactDOMServer = require('react-dom/server');
}

// Import Components
import GsdH5ReactContainer from 'libraries/gsd-h5-react@0.0.61/components/Container';
import GsdH5ReactText from 'libraries/gsd-h5-react@0.0.61/components/Text'

// Import Plugins


// Import Actions


// Actions

// Plugin
const pluginInstances = [];
const virtualFields = {
  "gsd-h5-react:Container": (props) => <GsdH5ReactContainer {...props} pageVirtualFields={virtualFields}/>,
  "gsd-h5-react:Text": (props) => <GsdH5ReactText {...props} pageVirtualFields={virtualFields}/>
};
const componentSchema = {
  "type": "object",
  "x-index": 0,
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
        "commonStyle": {
          "width": "100%",
          "padding": "1.4286rem",
          "fontSize": "1.0000rem",
          "position": "absolute",
          "left": "0",
          "right": "0",
          "minHeight": "100%"
        }
      },
      "x-index": 2,
      "properties": {
        "id1": {
          "key": "id1",
          "x-component": "gsd-h5-react:text",
          "x-props": {
            "sourceKey": "gsd-h5-react:Text",
            "data": {
              "text": "云开发低码 LowCode ",
              "decode": false,
              "selectable": false,
              "_visible": true
            },
            "dataTypes": [
              {
                "propertyPath": "text",
                "type": "static"
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
            "commonStyle": {
              "display": "block",
              "fontWeight": "bolder"
            }
          },
          "x-index": 0
        },
        "id3": {
          "key": "id3",
          "x-component": "gsd-h5-react:text",
          "x-props": {
            "sourceKey": "gsd-h5-react:Text",
            "data": {
              "text": "云原生能力支撑的可视化开发平台，行业场景秒触达",
              "decode": false,
              "selectable": false,
              "_visible": true
            },
            "dataTypes": [
              {
                "propertyPath": "text",
                "type": "static"
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
            "commonStyle": {
              "display": "block"
            }
          },
          "x-index": 1
        },
        "id4": {
          "key": "id4",
          "x-component": "gsd-h5-react:text",
          "x-props": {
            "sourceKey": "gsd-h5-react:Text",
            "data": {
              "text": "云开发低码向上连接前端的行业业务，向下连接云计算的海量能力，助力企业垂直上云。云开发低码将繁琐的底层架构和基础设施抽象化为图形界面，通过行业化模板、拖放式组件和可视化配置快速构建多端应用，免去了代码编写工作，让您能够完全专注于业务场景。云开发低码以云开发作为底层支撑，云原生能力将应用搭建的全链路打通，提供高度开放的开发环境，且时刻为您的应用保驾护航。",
              "decode": false,
              "selectable": false,
              "_visible": true
            },
            "dataTypes": [
              {
                "propertyPath": "text",
                "type": "static"
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
            "commonStyle": {
              "marginTop": "0.7143rem",
              "display": "block"
            }
          },
          "x-index": 2
        }
      }
    }
  }
};
const pageListenerInstances = [];
const widgetsContext = {
  "id1": {
    "text": "云开发低码 LowCode ",
    "decode": false,
    "selectable": false,
    "_visible": true,
    "style": {
      "display": "block",
      "fontWeight": "bolder"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id2"
  },
  "id3": {
    "text": "云原生能力支撑的可视化开发平台，行业场景秒触达",
    "decode": false,
    "selectable": false,
    "_visible": true,
    "style": {
      "display": "block"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id2"
  },
  "id4": {
    "text": "云开发低码向上连接前端的行业业务，向下连接云计算的海量能力，助力企业垂直上云。云开发低码将繁琐的底层架构和基础设施抽象化为图形界面，通过行业化模板、拖放式组件和可视化配置快速构建多端应用，免去了代码编写工作，让您能够完全专注于业务场景。云开发低码以云开发作为底层支撑，云原生能力将应用搭建的全链路打通，提供高度开放的开发环境，且时刻为您的应用保驾护航。",
    "decode": false,
    "selectable": false,
    "_visible": true,
    "style": {
      "marginTop": "0.7143rem",
      "display": "block"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id2"
  },
  "id2": {
    "title": "",
    "_visible": true,
    "style": {
      "width": "100%",
      "padding": "1.4286rem",
      "fontSize": "1.0000rem",
      "position": "absolute",
      "left": "0",
      "right": "0",
      "minHeight": "100%"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container"
  }
};
const dataBinds = {};

AppLifeCycle.beforeCustomLaunch = (query)=>{
  updateDatasetParams('$global', query || {})
  buildDataVarFetchFn('$global')
  createStateDatasrouceVar('$global',{app})
};
PageLifeCycle.beforePageCustomLaunch = (query) => {
  updateDatasetParams('about', query || {})
  createStateDatasrouceVar('about',{app, $page})
  buildDataVarFetchFn('about');
};
// lifecycle
initLifeCycle({
  ...AppLifeCycle,
  ...PageLifeCycle
}, app, mainApp)


// Init
export default function App() {
  useScrollTop()

  Object.assign($page, {
    id:'about',
    state: observable(initPageState),
    computed: createComputed(computed),
    dataVar: createDataVar('about'),
    handler
  })
  let dataset = createDataset('about', {app, $page})
  $page.dataset = dataset
  $page.state.dataset = dataset

  $page.widgets = createWidgets(widgetsContext, dataBinds)
  // widgets 内的 dataBinds 可能需要关联 widgets，需要重新执行 dataBinds
  retryDataBinds()
  // Web 环境页面级别生命周期
  if (!process.env.isMiniprogram) {
    React.useEffect(() => {
      document.title = "关于"
    }, [])
    pageLifeCycleMount(React.useEffect, PageLifeCycle, app)
  }

  return (
    <div className="weapps-page">
      <AppRender
        pageListenerInstances={pageListenerInstances}
        virtualFields={virtualFields}
        componentSchema={componentSchema}
      />
    </div>
  );
}

export function renderToString() {
  return ReactDOMServer.renderToString(<App />);
}
