// Import Libs and Handlers
import * as React from 'react'
import { observable } from 'mobx'
import { AppRender } from 'handlers/render'
import { initLifeCycle, pageLifeCycleMount } from 'handlers/lifecycle'
import { createComputed } from 'utils'
import AppLifeCycle from 'lowcode/lifecycle'
import { createDataVar, buildDataVarFetchFn, createDataset, updateDatasetParams, createStateDatasrouceVar } from '@/datasources'
import PageLifeCycle from '../../lowcode/expertDetail/lifecycle'
import initPageState from '../../lowcode/expertDetail/state'
import computed from '../../lowcode/expertDetail/computed'
import { $$_expertDetail as handler } from '../../app/handlers'
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
import CloudbaseStandardStatusTip from 'libraries/CLOUDBASE_STANDARD@1612432272646/components/StatusTip';
import CloudbaseStandardMedia from 'libraries/CLOUDBASE_STANDARD@1612432272646/components/Media';
import CloudbaseStandardCard from 'libraries/CLOUDBASE_STANDARD@1612432272646/components/Card';
import GsdH5ReactText from 'libraries/gsd-h5-react@0.0.61/components/Text';
import GsdH5ReactButton from 'libraries/gsd-h5-react@0.0.61/components/Button';
import CloudbaseStandardIcon from 'libraries/CLOUDBASE_STANDARD@1612432272646/components/Icon';
import CloudbaseStandardModal from 'libraries/CLOUDBASE_STANDARD@1612432272646/components/Modal'

// Import Plugins


// Import Actions


// Actions

// Plugin
const pluginInstances = [];
const virtualFields = {
  "gsd-h5-react:Container": (props) => <GsdH5ReactContainer {...props} pageVirtualFields={virtualFields}/>,
  "CLOUDBASE_STANDARD:StatusTip": (props) => <CloudbaseStandardStatusTip {...props} pageVirtualFields={virtualFields}/>,
  "CLOUDBASE_STANDARD:Media": (props) => <CloudbaseStandardMedia {...props} pageVirtualFields={virtualFields}/>,
  "CLOUDBASE_STANDARD:Card": (props) => <CloudbaseStandardCard {...props} pageVirtualFields={virtualFields}/>,
  "gsd-h5-react:Text": (props) => <GsdH5ReactText {...props} pageVirtualFields={virtualFields}/>,
  "gsd-h5-react:Button": (props) => <GsdH5ReactButton {...props} pageVirtualFields={virtualFields}/>,
  "CLOUDBASE_STANDARD:Icon": (props) => <CloudbaseStandardIcon {...props} pageVirtualFields={virtualFields}/>,
  "CLOUDBASE_STANDARD:Modal": (props) => <CloudbaseStandardModal {...props} pageVirtualFields={virtualFields}/>
};
const componentSchema = {
  "type": "object",
  "x-index": 0,
  "properties": {
    "id125": {
      "key": "id125",
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
          "paddingTop": "0",
          "background": "rgb(238, 238, 238)",
          "position": "absolute",
          "left": "0",
          "right": "0",
          "minHeight": "100%"
        }
      },
      "x-index": 0,
      "properties": {
        "id111": {
          "key": "id111",
          "x-component": "gsd-h5-react:container",
          "x-props": {
            "sourceKey": "gsd-h5-react:Container",
            "dataBinds": {
              "_visible": () => $page.dataset.state.loading
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
              "paddingTop": "1.4286rem",
              "display": "flex",
              "justifyContent": "center",
              "alignItems": "center",
              "flexDirection": "row"
            }
          },
          "x-index": 0,
          "properties": {
            "id116": {
              "key": "id116",
              "x-component": "cloudbase_standard:statustip",
              "x-props": {
                "sourceKey": "CLOUDBASE_STANDARD:StatusTip",
                "data": {
                  "tip": "",
                  "text": "加载中...",
                  "type": "loading",
                  "_visible": true
                },
                "dataTypes": [
                  {
                    "propertyPath": "tip",
                    "type": "slot"
                  },
                  {
                    "propertyPath": "text",
                    "type": "static"
                  },
                  {
                    "propertyPath": "type",
                    "type": "static"
                  }
                ]
              },
              "x-index": 0,
              "properties": {
                "tip": {
                  "key": "tip"
                }
              }
            }
          }
        },
        "id56": {
          "key": "id56",
          "x-component": "gsd-h5-react:container",
          "x-props": {
            "sourceKey": "gsd-h5-react:Container",
            "dataBinds": {
              "_visible": (forItems, event) => (!$page.dataset.state.loading && $page.dataset.state.data)
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
              "paddingBottom": "5.0000rem",
              "color": "rgb(0, 0, 0)",
              "fontSize": "0.9286rem",
              "background": "rgb(241, 245, 246)",
              "minHeight": "100%"
            },
            "classNameList": [
              "expertDetail-page"
            ]
          },
          "x-index": 1,
          "properties": {
            "id59": {
              "key": "id59",
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
                  "paddingTop": "0",
                  "paddingBottom": "7.1429rem",
                  "display": "block",
                  "borderBottomRightRadius": "15%",
                  "borderBottomLeftRadius": "15%",
                  "overflow": "hidden"
                },
                "styleBind": {
                  "style": (forItems, event) => ({background: `#eee center/cover no-repeat url(${$page.dataset.state.data.background})`})
                }
              },
              "x-index": 1,
              "properties": {
                "id60": {
                  "key": "id60",
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
                      "height": "7.1429rem",
                      "paddingRight": "1.4286rem",
                      "paddingLeft": "1.4286rem",
                      "display": "flex",
                      "justifyContent": "flex-start",
                      "alignItems": "center",
                      "flexDirection": "row",
                      "color": "rgb(255, 255, 255)"
                    }
                  },
                  "x-index": 2,
                  "properties": {
                    "id117": {
                      "key": "id117",
                      "x-component": "cloudbase_standard:media",
                      "x-props": {
                        "sourceKey": "CLOUDBASE_STANDARD:Media",
                        "data": {
                          "align": "top",
                          "reverse": false,
                          "thumbSize": 90,
                          "subtitleType": "label",
                          "isCustomMedia": false,
                          "isCustomContent": false,
                          "_visible": true
                        },
                        "dataBinds": {
                          "title": () => $page.dataset.state.data.name,
                          "content": (forItems, event) => (($page.dataset.state.data.tags || []).join(' | ')),
                          "mediaUrl": () => $page.dataset.state.data.avator,
                          "subtitle": () => $page.dataset.state.data.type.text
                        },
                        "dataTypes": [
                          {
                            "propertyPath": "align",
                            "type": "static"
                          },
                          {
                            "propertyPath": "reverse",
                            "type": "static"
                          },
                          {
                            "propertyPath": "thumbSize",
                            "type": "static"
                          },
                          {
                            "propertyPath": "subtitleType",
                            "type": "static"
                          },
                          {
                            "propertyPath": "isCustomMedia",
                            "type": "static"
                          },
                          {
                            "propertyPath": "isCustomContent",
                            "type": "static"
                          },
                          {
                            "propertyPath": "title",
                            "type": "bind"
                          },
                          {
                            "propertyPath": "content",
                            "type": "bind"
                          },
                          {
                            "propertyPath": "mediaUrl",
                            "type": "bind"
                          },
                          {
                            "propertyPath": "subtitle",
                            "type": "bind"
                          },
                          {
                            "propertyPath": "customMedia",
                            "type": "slot"
                          },
                          {
                            "propertyPath": "customContent",
                            "type": "slot"
                          }
                        ],
                        "classNameList": [
                          "userMediaItem"
                        ]
                      },
                      "x-index": 1,
                      "properties": {
                        "customMedia": {
                          "key": "customMedia"
                        },
                        "customContent": {
                          "key": "customContent"
                        }
                      }
                    }
                  }
                }
              }
            },
            "id69": {
              "key": "id69",
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
                  "marginTop": "-7.1429rem",
                  "paddingRight": "1.4286rem",
                  "paddingLeft": "1.4286rem"
                }
              },
              "x-index": 2,
              "properties": {
                "id118": {
                  "key": "id118",
                  "x-component": "cloudbase_standard:card",
                  "x-props": {
                    "sourceKey": "CLOUDBASE_STANDARD:Card",
                    "data": {
                      "content": "",
                      "_visible": true
                    },
                    "dataTypes": [
                      {
                        "propertyPath": "title",
                        "type": "static"
                      },
                      {
                        "propertyPath": "content",
                        "type": "static"
                      },
                      {
                        "propertyPath": "body",
                        "type": "slot"
                      },
                      {
                        "propertyPath": "footer",
                        "type": "slot"
                      },
                      {
                        "propertyPath": "header",
                        "type": "slot"
                      },
                      {
                        "propertyPath": "default",
                        "type": "slot"
                      }
                    ],
                    "commonStyle": {
                      "color": "rgb(0, 0, 0)",
                      "border": "0.0357rem solid rgb(238, 238, 238)",
                      "borderRadius": "0.3571rem",
                      "background": "rgb(255, 255, 255)"
                    }
                  },
                  "x-index": 1,
                  "properties": {
                    "body": {
                      "key": "body",
                      "properties": {
                        "id71": {
                          "key": "id71",
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
                              "paddingTop": "0.7143rem",
                              "paddingBottom": "0.7143rem",
                              "textAlign": "left",
                              "borderBottom": "0.0357rem solid rgb(238, 238, 238)"
                            }
                          },
                          "x-index": 0,
                          "properties": {
                            "id72": {
                              "key": "id72",
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
                                  "color": "rgb(102, 102, 102)",
                                  "fontSize": "0.8929rem",
                                  "textAlign": "left"
                                }
                              },
                              "x-index": 0,
                              "properties": {
                                "id74": {
                                  "key": "id74",
                                  "x-component": "gsd-h5-react:text",
                                  "x-props": {
                                    "sourceKey": "gsd-h5-react:Text",
                                    "data": {
                                      "text": "邀约量",
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
                                      "display": "inline-block"
                                    }
                                  },
                                  "x-index": 1
                                },
                                "id75": {
                                  "key": "id75",
                                  "x-component": "gsd-h5-react:text",
                                  "x-props": {
                                    "sourceKey": "gsd-h5-react:Text",
                                    "data": {
                                      "decode": false,
                                      "selectable": false,
                                      "_visible": true
                                    },
                                    "dataBinds": {
                                      "text": () => $page.dataset.state.data.invitations
                                    },
                                    "dataTypes": [
                                      {
                                        "propertyPath": "decode",
                                        "type": "static"
                                      },
                                      {
                                        "propertyPath": "selectable",
                                        "type": "static"
                                      },
                                      {
                                        "propertyPath": "text",
                                        "type": "bind"
                                      }
                                    ],
                                    "commonStyle": {
                                      "marginRight": "0.3571rem",
                                      "marginLeft": "0.3571rem",
                                      "display": "inline-block",
                                      "color": "rgb(0, 0, 0)",
                                      "fontSize": "1.2857rem"
                                    }
                                  },
                                  "x-index": 2
                                },
                                "id76": {
                                  "key": "id76",
                                  "x-component": "gsd-h5-react:text",
                                  "x-props": {
                                    "sourceKey": "gsd-h5-react:Text",
                                    "data": {
                                      "text": "次",
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
                                      "display": "inline-block"
                                    }
                                  },
                                  "x-index": 3
                                }
                              }
                            },
                            "id73": {
                              "key": "id73",
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
                                  "height": "5.3571rem",
                                  "display": "flex",
                                  "justifyContent": "flex-start",
                                  "alignItems": "center",
                                  "flexDirection": "row"
                                }
                              },
                              "x-index": 1,
                              "properties": {
                                "id77": {
                                  "key": "id77",
                                  "x-component": "gsd-h5-react:text",
                                  "x-props": {
                                    "sourceKey": "gsd-h5-react:Text",
                                    "data": {
                                      "decode": false,
                                      "selectable": false,
                                      "_visible": true
                                    },
                                    "dataBinds": {
                                      "text": () => $page.dataset.state.data.description
                                    },
                                    "dataTypes": [
                                      {
                                        "propertyPath": "decode",
                                        "type": "static"
                                      },
                                      {
                                        "propertyPath": "selectable",
                                        "type": "static"
                                      },
                                      {
                                        "propertyPath": "text",
                                        "type": "bind"
                                      }
                                    ],
                                    "commonStyle": {
                                      "color": "rgb(0, 0, 0)",
                                      "fontSize": "1.0714rem",
                                      "fontWeight": "bolder"
                                    }
                                  },
                                  "x-index": 1
                                }
                              }
                            }
                          }
                        },
                        "id78": {
                          "key": "id78",
                          "x-component": "gsd-h5-react:container",
                          "x-props": {
                            "sourceKey": "gsd-h5-react:Container",
                            "dataBinds": {
                              "_waFor": () => $page.dataset.state.data.info
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
                            "commonStyle": {
                              "paddingTop": "1.0714rem",
                              "paddingBottom": "1.0714rem"
                            },
                            "classNameList": [
                              "items"
                            ]
                          },
                          "x-index": 1,
                          "properties": {
                            "id79": {
                              "key": "id79",
                              "x-component": "gsd-h5-react:text",
                              "x-props": {
                                "sourceKey": "gsd-h5-react:Text",
                                "data": {
                                  "decode": false,
                                  "selectable": false,
                                  "_visible": true
                                },
                                "dataBinds": {
                                  "text": (forItems) => forItems.id78.title
                                },
                                "dataTypes": [
                                  {
                                    "propertyPath": "decode",
                                    "type": "static"
                                  },
                                  {
                                    "propertyPath": "selectable",
                                    "type": "static"
                                  },
                                  {
                                    "propertyPath": "text",
                                    "type": "bind"
                                  }
                                ],
                                "commonStyle": {
                                  "marginBottom": "0.5357rem",
                                  "display": "block",
                                  "color": "rgb(0, 0, 0)",
                                  "fontSize": "1.0714rem",
                                  "fontWeight": "bolder"
                                }
                              },
                              "x-index": 0
                            },
                            "id80": {
                              "key": "id80",
                              "x-component": "gsd-h5-react:text",
                              "x-props": {
                                "sourceKey": "gsd-h5-react:Text",
                                "data": {
                                  "decode": false,
                                  "selectable": false
                                },
                                "dataBinds": {
                                  "text": (forItems) => forItems.id78.description,
                                  "_visible": (forItems, event) => (forItems.id78.description)
                                },
                                "dataTypes": [
                                  {
                                    "propertyPath": "decode",
                                    "type": "static"
                                  },
                                  {
                                    "propertyPath": "selectable",
                                    "type": "static"
                                  },
                                  {
                                    "propertyPath": "text",
                                    "type": "bind"
                                  },
                                  {
                                    "propertyPath": "_visible",
                                    "type": "bind"
                                  }
                                ],
                                "commonStyle": {
                                  "display": "block",
                                  "color": "rgb(0, 0, 0)",
                                  "fontSize": "0.9286rem"
                                }
                              },
                              "x-index": 1
                            },
                            "id82": {
                              "key": "id82",
                              "x-component": "gsd-h5-react:container",
                              "x-props": {
                                "sourceKey": "gsd-h5-react:Container",
                                "dataBinds": {
                                  "_visible": (forItems, event) => ((forItems.id78.tags || []).slice().length)
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
                                  "display": "flex",
                                  "justifyContent": "flex-start",
                                  "alignItems": "center",
                                  "flexFlow": "row wrap",
                                  "flexDirection": "row"
                                }
                              },
                              "x-index": 2,
                              "properties": {
                                "id83": {
                                  "key": "id83",
                                  "x-component": "gsd-h5-react:container",
                                  "x-props": {
                                    "sourceKey": "gsd-h5-react:Container",
                                    "dataBinds": {
                                      "_waFor": (forItems) => forItems.id78.tags
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
                                    "commonStyle": {
                                      "marginRight": "0.7143rem",
                                      "marginBottom": "0.3571rem",
                                      "padding": "0.1786rem 1.4286rem 0.1786rem 1.4286rem",
                                      "display": "block",
                                      "borderRadius": "0.3571rem",
                                      "background": "rgb(238, 238, 238)"
                                    }
                                  },
                                  "x-index": 1,
                                  "properties": {
                                    "id85": {
                                      "key": "id85",
                                      "x-component": "gsd-h5-react:text",
                                      "x-props": {
                                        "sourceKey": "gsd-h5-react:Text",
                                        "data": {
                                          "decode": false,
                                          "selectable": false,
                                          "_visible": true
                                        },
                                        "dataBinds": {
                                          "text": (forItems) => forItems.id83
                                        },
                                        "dataTypes": [
                                          {
                                            "propertyPath": "decode",
                                            "type": "static"
                                          },
                                          {
                                            "propertyPath": "selectable",
                                            "type": "static"
                                          },
                                          {
                                            "propertyPath": "text",
                                            "type": "bind"
                                          }
                                        ],
                                        "commonStyle": {
                                          "fontSize": "0.9286rem"
                                        }
                                      },
                                      "x-index": 1
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "footer": {
                      "key": "footer"
                    },
                    "header": {
                      "key": "header"
                    },
                    "default": {
                      "key": "default"
                    }
                  }
                }
              }
            }
          }
        },
        "id86": {
          "key": "id86",
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
              "height": "3.2143rem",
              "display": "flex",
              "justifyContent": "space-between",
              "alignItems": "stretch",
              "flexFlow": "row nowrap",
              "zIndex": 10,
              "background": "rgb(255, 255, 255)",
              "position": "fixed",
              "bottom": "0",
              "flexDirection": "row"
            }
          },
          "x-index": 2,
          "properties": {
            "id87": {
              "key": "id87",
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
                  "width": "30%",
                  "height": "100%"
                }
              },
              "x-index": 1,
              "properties": {
                "id89": {
                  "key": "id89",
                  "x-component": "gsd-h5-react:button",
                  "x-props": {
                    "sourceKey": "gsd-h5-react:Button",
                    "data": {
                      "lang": "en",
                      "size": "default",
                      "type": "default",
                      "plain": false,
                      "divider": "",
                      "loading": false,
                      "disabled": false,
                      "formType": "button",
                      "openType": "",
                      "categoryId": [],
                      "sessionFrom": "",
                      "appParameter": "",
                      "sendMessageImg": "",
                      "sendMessagePath": "",
                      "showMessageCard": "",
                      "sendMessageTitle": "",
                      "_visible": true
                    },
                    "dataTypes": [
                      {
                        "propertyPath": "lang",
                        "type": "static"
                      },
                      {
                        "propertyPath": "size",
                        "type": "static"
                      },
                      {
                        "propertyPath": "type",
                        "type": "static"
                      },
                      {
                        "propertyPath": "plain",
                        "type": "static"
                      },
                      {
                        "propertyPath": "divider",
                        "type": "static"
                      },
                      {
                        "propertyPath": "loading",
                        "type": "static"
                      },
                      {
                        "propertyPath": "disabled",
                        "type": "static"
                      },
                      {
                        "propertyPath": "formType",
                        "type": "static"
                      },
                      {
                        "propertyPath": "openType",
                        "type": "static"
                      },
                      {
                        "propertyPath": "categoryId",
                        "type": "static"
                      },
                      {
                        "propertyPath": "sessionFrom",
                        "type": "static"
                      },
                      {
                        "propertyPath": "appParameter",
                        "type": "static"
                      },
                      {
                        "propertyPath": "sendMessageImg",
                        "type": "static"
                      },
                      {
                        "propertyPath": "sendMessagePath",
                        "type": "static"
                      },
                      {
                        "propertyPath": "showMessageCard",
                        "type": "static"
                      },
                      {
                        "propertyPath": "sendMessageTitle",
                        "type": "static"
                      },
                      {
                        "propertyPath": "text",
                        "type": "slot"
                      }
                    ],
                    "commonStyle": {
                      "width": "100%",
                      "height": "100%",
                      "display": "flex",
                      "justifyContent": "center",
                      "alignItems": "center",
                      "flexDirection": "row",
                      "borderWidth": "0",
                      "borderRadius": "0",
                      "background": "rgb(255, 255, 255)"
                    },
                    "listenerInstances": [
                      {
                        "key": "",
                        "trigger": "tap",
                        "isCapturePhase": false,
                        "noPropagation": false,
                        "instanceFunction": handler.onTapFavorite,
                        "data": {
                          "target": ""
                        }
                      }
                    ]
                  },
                  "x-index": 1,
                  "properties": {
                    "text": {
                      "key": "text",
                      "properties": {
                        "id114": {
                          "key": "id114",
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
                              "display": "flex",
                              "justifyContent": "center",
                              "alignItems": "center",
                              "flexFlow": "row nowrap",
                              "flexDirection": "row"
                            }
                          },
                          "x-index": 1,
                          "properties": {
                            "id92": {
                              "key": "id92",
                              "x-component": "gsd-h5-react:text",
                              "x-props": {
                                "sourceKey": "gsd-h5-react:Text",
                                "data": {
                                  "text": "收藏",
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
                                  "marginTop": "0.1786rem",
                                  "marginLeft": "0.3571rem",
                                  "display": "inline-block",
                                  "fontSize": "0.9286rem"
                                }
                              },
                              "x-index": 2
                            },
                            "id119": {
                              "key": "id119",
                              "x-component": "cloudbase_standard:icon",
                              "x-props": {
                                "sourceKey": "CLOUDBASE_STANDARD:Icon",
                                "data": {
                                  "src": "",
                                  "size": 48,
                                  "color": "rgb(255, 201, 70)",
                                  "_visible": true
                                },
                                "dataBinds": {
                                  "name": (forItems, event) => ($page.dataset.state.data.isFavorite?'star-fill':'star')
                                },
                                "dataTypes": [
                                  {
                                    "propertyPath": "src",
                                    "type": "static"
                                  },
                                  {
                                    "propertyPath": "size",
                                    "type": "static"
                                  },
                                  {
                                    "propertyPath": "color",
                                    "type": "static"
                                  },
                                  {
                                    "propertyPath": "name",
                                    "type": "bind"
                                  }
                                ]
                              },
                              "x-index": 0
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "id88": {
              "key": "id88",
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
                  "width": "70%",
                  "height": "100%",
                  "borderRadius": "0"
                }
              },
              "x-index": 2,
              "properties": {
                "id90": {
                  "key": "id90",
                  "x-component": "gsd-h5-react:button",
                  "x-props": {
                    "sourceKey": "gsd-h5-react:Button",
                    "data": {
                      "lang": "en",
                      "size": "default",
                      "type": "default",
                      "plain": false,
                      "divider": "",
                      "loading": false,
                      "disabled": false,
                      "formType": "button",
                      "openType": "",
                      "categoryId": [],
                      "sessionFrom": "",
                      "appParameter": "",
                      "sendMessageImg": "",
                      "sendMessagePath": "",
                      "showMessageCard": "",
                      "sendMessageTitle": "",
                      "_visible": true
                    },
                    "dataTypes": [
                      {
                        "propertyPath": "lang",
                        "type": "static"
                      },
                      {
                        "propertyPath": "size",
                        "type": "static"
                      },
                      {
                        "propertyPath": "type",
                        "type": "static"
                      },
                      {
                        "propertyPath": "plain",
                        "type": "static"
                      },
                      {
                        "propertyPath": "divider",
                        "type": "static"
                      },
                      {
                        "propertyPath": "loading",
                        "type": "static"
                      },
                      {
                        "propertyPath": "disabled",
                        "type": "static"
                      },
                      {
                        "propertyPath": "formType",
                        "type": "static"
                      },
                      {
                        "propertyPath": "openType",
                        "type": "static"
                      },
                      {
                        "propertyPath": "categoryId",
                        "type": "static"
                      },
                      {
                        "propertyPath": "sessionFrom",
                        "type": "static"
                      },
                      {
                        "propertyPath": "appParameter",
                        "type": "static"
                      },
                      {
                        "propertyPath": "sendMessageImg",
                        "type": "static"
                      },
                      {
                        "propertyPath": "sendMessagePath",
                        "type": "static"
                      },
                      {
                        "propertyPath": "showMessageCard",
                        "type": "static"
                      },
                      {
                        "propertyPath": "sendMessageTitle",
                        "type": "static"
                      },
                      {
                        "propertyPath": "text",
                        "type": "slot"
                      }
                    ],
                    "commonStyle": {
                      "width": "100%",
                      "height": "100%",
                      "borderWidth": "0",
                      "borderRadius": "0",
                      "background": "rgb(38, 131, 244)"
                    },
                    "listenerInstances": [
                      {
                        "key": "",
                        "trigger": "tap",
                        "isCapturePhase": false,
                        "noPropagation": false,
                        "instanceFunction": handler.onTapInvite,
                        "data": {
                          "target": ""
                        }
                      }
                    ]
                  },
                  "x-index": 1,
                  "properties": {
                    "text": {
                      "key": "text",
                      "properties": {
                        "id93": {
                          "key": "id93",
                          "x-component": "gsd-h5-react:text",
                          "x-props": {
                            "sourceKey": "gsd-h5-react:Text",
                            "data": {
                              "text": "邀约专家",
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
                              "color": "rgb(255, 255, 255)",
                              "fontSize": "0.9286rem"
                            }
                          },
                          "x-index": 1
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
    },
    "id120": {
      "key": "id120",
      "x-component": "cloudbase_standard:modal",
      "x-props": {
        "sourceKey": "CLOUDBASE_STANDARD:Modal",
        "data": {
          "content": "",
          "isDefaultButton": true,
          "_visible": true
        },
        "dataBinds": {
          "visible": (forItems, event) => (!!$page.dataset.state.showModal)
        },
        "dataTypes": [
          {
            "propertyPath": "content",
            "type": "static"
          },
          {
            "propertyPath": "isDefaultButton",
            "type": "static"
          },
          {
            "propertyPath": "visible",
            "type": "bind"
          },
          {
            "propertyPath": "customButton",
            "type": "slot"
          },
          {
            "propertyPath": "customContent",
            "type": "slot"
          }
        ],
        "listenerInstances": [
          {
            "key": "",
            "trigger": "close",
            "isCapturePhase": false,
            "noPropagation": false,
            "instanceFunction": handler.onTapCloseModal,
            "data": {
              "target": ""
            }
          },
          {
            "key": "",
            "trigger": "comfirm",
            "isCapturePhase": false,
            "noPropagation": false,
            "instanceFunction": handler.onTapCloseModal,
            "data": {
              "target": ""
            }
          }
        ]
      },
      "x-index": 1,
      "properties": {
        "customButton": {
          "key": "customButton"
        },
        "customContent": {
          "key": "customContent",
          "properties": {
            "id122": {
              "key": "id122",
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
                  "paddingTop": "1.4286rem",
                  "display": "flex",
                  "justifyContent": "center",
                  "alignItems": "center",
                  "flexFlow": "column nowrap"
                }
              },
              "x-index": 1,
              "properties": {
                "id121": {
                  "key": "id121",
                  "x-component": "cloudbase_standard:icon",
                  "x-props": {
                    "sourceKey": "CLOUDBASE_STANDARD:Icon",
                    "data": {
                      "src": "",
                      "name": "success",
                      "size": 130,
                      "color": "rgb(0, 207, 164)",
                      "_visible": true
                    },
                    "dataTypes": [
                      {
                        "propertyPath": "src",
                        "type": "static"
                      },
                      {
                        "propertyPath": "name",
                        "type": "static"
                      },
                      {
                        "propertyPath": "size",
                        "type": "static"
                      },
                      {
                        "propertyPath": "color",
                        "type": "static"
                      }
                    ],
                    "commonStyle": {
                      "display": "block"
                    }
                  },
                  "x-index": 0
                },
                "id123": {
                  "key": "id123",
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
                      "marginTop": "1.0714rem",
                      "display": "block"
                    }
                  },
                  "x-index": 1,
                  "properties": {
                    "id124": {
                      "key": "id124",
                      "x-component": "gsd-h5-react:text",
                      "x-props": {
                        "sourceKey": "gsd-h5-react:Text",
                        "data": {
                          "text": "邀约成功",
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
                        ]
                      },
                      "x-index": 0
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
const pageListenerInstances = [];
const widgetsContext = {
  "id116": {
    "tip": "",
    "text": "加载中...",
    "type": "loading",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "CLOUDBASE_STANDARD:StatusTip",
    "_parentId": "id111"
  },
  "id111": {
    "title": "",
    "style": {
      "paddingTop": "1.4286rem",
      "display": "flex",
      "justifyContent": "center",
      "alignItems": "center",
      "flexDirection": "row"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id125"
  },
  "id117": {
    "align": "top",
    "reverse": false,
    "thumbSize": 90,
    "subtitleType": "label",
    "isCustomMedia": false,
    "isCustomContent": false,
    "_visible": true,
    "style": {},
    "classList": [
      "userMediaItem"
    ],
    "widgetType": "CLOUDBASE_STANDARD:Media",
    "_parentId": "id60"
  },
  "id60": {
    "title": "",
    "_visible": true,
    "style": {
      "width": "100%",
      "height": "7.1429rem",
      "paddingRight": "1.4286rem",
      "paddingLeft": "1.4286rem",
      "display": "flex",
      "justifyContent": "flex-start",
      "alignItems": "center",
      "flexDirection": "row",
      "color": "rgb(255, 255, 255)"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id59"
  },
  "id59": {
    "title": "",
    "_visible": true,
    "style": {
      "paddingTop": "0",
      "paddingBottom": "7.1429rem",
      "display": "block",
      "borderBottomRightRadius": "15%",
      "borderBottomLeftRadius": "15%",
      "overflow": "hidden"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id56"
  },
  "id74": {
    "text": "邀约量",
    "decode": false,
    "selectable": false,
    "_visible": true,
    "style": {
      "display": "inline-block"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id72"
  },
  "id75": {
    "decode": false,
    "selectable": false,
    "_visible": true,
    "style": {
      "marginRight": "0.3571rem",
      "marginLeft": "0.3571rem",
      "display": "inline-block",
      "color": "rgb(0, 0, 0)",
      "fontSize": "1.2857rem"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id72"
  },
  "id76": {
    "text": "次",
    "decode": false,
    "selectable": false,
    "_visible": true,
    "style": {
      "display": "inline-block"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id72"
  },
  "id72": {
    "title": "",
    "_visible": true,
    "style": {
      "color": "rgb(102, 102, 102)",
      "fontSize": "0.8929rem",
      "textAlign": "left"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id71"
  },
  "id77": {
    "decode": false,
    "selectable": false,
    "_visible": true,
    "style": {
      "color": "rgb(0, 0, 0)",
      "fontSize": "1.0714rem",
      "fontWeight": "bolder"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id73"
  },
  "id73": {
    "title": "",
    "_visible": true,
    "style": {
      "height": "5.3571rem",
      "display": "flex",
      "justifyContent": "flex-start",
      "alignItems": "center",
      "flexDirection": "row"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id71"
  },
  "id71": {
    "title": "",
    "_visible": true,
    "style": {
      "paddingTop": "0.7143rem",
      "paddingBottom": "0.7143rem",
      "textAlign": "left",
      "borderBottom": "0.0357rem solid rgb(238, 238, 238)"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id118"
  },
  "id79": {
    "decode": false,
    "selectable": false,
    "_visible": true,
    "style": {
      "marginBottom": "0.5357rem",
      "display": "block",
      "color": "rgb(0, 0, 0)",
      "fontSize": "1.0714rem",
      "fontWeight": "bolder"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id78"
  },
  "id80": {
    "decode": false,
    "selectable": false,
    "style": {
      "display": "block",
      "color": "rgb(0, 0, 0)",
      "fontSize": "0.9286rem"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id78"
  },
  "id85": {
    "decode": false,
    "selectable": false,
    "_visible": true,
    "style": {
      "fontSize": "0.9286rem"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id83"
  },
  "id83": {
    "title": "",
    "style": {
      "marginRight": "0.7143rem",
      "marginBottom": "0.3571rem",
      "padding": "0.1786rem 1.4286rem 0.1786rem 1.4286rem",
      "display": "block",
      "borderRadius": "0.3571rem",
      "background": "rgb(238, 238, 238)"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id82"
  },
  "id82": {
    "title": "",
    "style": {
      "display": "flex",
      "justifyContent": "flex-start",
      "alignItems": "center",
      "flexFlow": "row wrap",
      "flexDirection": "row"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id78"
  },
  "id78": {
    "title": "",
    "style": {
      "paddingTop": "1.0714rem",
      "paddingBottom": "1.0714rem"
    },
    "classList": [
      "items"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id118"
  },
  "id118": {
    "title": "",
    "content": "",
    "_visible": true,
    "style": {
      "color": "rgb(0, 0, 0)",
      "border": "0.0357rem solid rgb(238, 238, 238)",
      "borderRadius": "0.3571rem",
      "background": "rgb(255, 255, 255)"
    },
    "classList": [],
    "widgetType": "CLOUDBASE_STANDARD:Card",
    "_parentId": "id69"
  },
  "id69": {
    "title": "",
    "_visible": true,
    "style": {
      "marginTop": "-7.1429rem",
      "paddingRight": "1.4286rem",
      "paddingLeft": "1.4286rem"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id56"
  },
  "id56": {
    "title": "",
    "style": {
      "paddingBottom": "5.0000rem",
      "color": "rgb(0, 0, 0)",
      "fontSize": "0.9286rem",
      "background": "rgb(241, 245, 246)",
      "minHeight": "100%"
    },
    "classList": [
      "expertDetail-page"
    ],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id125"
  },
  "id92": {
    "text": "收藏",
    "decode": false,
    "selectable": false,
    "_visible": true,
    "style": {
      "marginTop": "0.1786rem",
      "marginLeft": "0.3571rem",
      "display": "inline-block",
      "fontSize": "0.9286rem"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id114"
  },
  "id119": {
    "src": "",
    "size": 48,
    "color": "rgb(255, 201, 70)",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "CLOUDBASE_STANDARD:Icon",
    "_parentId": "id114"
  },
  "id114": {
    "title": "",
    "_visible": true,
    "style": {
      "display": "flex",
      "justifyContent": "center",
      "alignItems": "center",
      "flexFlow": "row nowrap",
      "flexDirection": "row"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id89"
  },
  "id89": {
    "lang": "en",
    "size": "default",
    "type": "default",
    "plain": false,
    "divider": "",
    "loading": false,
    "disabled": false,
    "formType": "button",
    "openType": "",
    "categoryId": [],
    "sessionFrom": "",
    "appParameter": "",
    "sendMessageImg": "",
    "sendMessagePath": "",
    "showMessageCard": "",
    "sendMessageTitle": "",
    "_visible": true,
    "style": {
      "width": "100%",
      "height": "100%",
      "display": "flex",
      "justifyContent": "center",
      "alignItems": "center",
      "flexDirection": "row",
      "borderWidth": "0",
      "borderRadius": "0",
      "background": "rgb(255, 255, 255)"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Button",
    "_parentId": "id87"
  },
  "id87": {
    "title": "",
    "_visible": true,
    "style": {
      "width": "30%",
      "height": "100%"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id86"
  },
  "id93": {
    "text": "邀约专家",
    "decode": false,
    "selectable": false,
    "_visible": true,
    "style": {
      "color": "rgb(255, 255, 255)",
      "fontSize": "0.9286rem"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id90"
  },
  "id90": {
    "lang": "en",
    "size": "default",
    "type": "default",
    "plain": false,
    "divider": "",
    "loading": false,
    "disabled": false,
    "formType": "button",
    "openType": "",
    "categoryId": [],
    "sessionFrom": "",
    "appParameter": "",
    "sendMessageImg": "",
    "sendMessagePath": "",
    "showMessageCard": "",
    "sendMessageTitle": "",
    "_visible": true,
    "style": {
      "width": "100%",
      "height": "100%",
      "borderWidth": "0",
      "borderRadius": "0",
      "background": "rgb(38, 131, 244)"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Button",
    "_parentId": "id88"
  },
  "id88": {
    "title": "",
    "_visible": true,
    "style": {
      "width": "70%",
      "height": "100%",
      "borderRadius": "0"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id86"
  },
  "id86": {
    "title": "",
    "_visible": true,
    "style": {
      "width": "100%",
      "height": "3.2143rem",
      "display": "flex",
      "justifyContent": "space-between",
      "alignItems": "stretch",
      "flexFlow": "row nowrap",
      "zIndex": 10,
      "background": "rgb(255, 255, 255)",
      "position": "fixed",
      "bottom": "0",
      "flexDirection": "row"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id125"
  },
  "id125": {
    "title": "",
    "_visible": true,
    "style": {
      "width": "100%",
      "paddingTop": "0",
      "background": "rgb(238, 238, 238)",
      "position": "absolute",
      "left": "0",
      "right": "0",
      "minHeight": "100%"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container"
  },
  "id121": {
    "src": "",
    "name": "success",
    "size": 130,
    "color": "rgb(0, 207, 164)",
    "_visible": true,
    "style": {
      "display": "block"
    },
    "classList": [],
    "widgetType": "CLOUDBASE_STANDARD:Icon",
    "_parentId": "id122"
  },
  "id124": {
    "text": "邀约成功",
    "decode": false,
    "selectable": false,
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Text",
    "_parentId": "id123"
  },
  "id123": {
    "title": "",
    "_visible": true,
    "style": {
      "marginTop": "1.0714rem",
      "display": "block"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id122"
  },
  "id122": {
    "title": "",
    "_visible": true,
    "style": {
      "paddingTop": "1.4286rem",
      "display": "flex",
      "justifyContent": "center",
      "alignItems": "center",
      "flexFlow": "column nowrap"
    },
    "classList": [],
    "widgetType": "gsd-h5-react:Container",
    "_parentId": "id120"
  },
  "id120": {
    "content": "",
    "isDefaultButton": true,
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "CLOUDBASE_STANDARD:Modal"
  }
};
const dataBinds = {
  "id111": {
    "_visible": () => $page.dataset.state.loading
  },
  "id117": {
    "title": () => $page.dataset.state.data.name,
    "content": (forItems, event) => (($page.dataset.state.data.tags || []).join(' | ')),
    "mediaUrl": () => $page.dataset.state.data.avator,
    "subtitle": () => $page.dataset.state.data.type.text
  },
  "id59": {
    "style": (forItems, event) => ({background: `#eee center/cover no-repeat url(${$page.dataset.state.data.background})`})
  },
  "id75": {
    "text": () => $page.dataset.state.data.invitations
  },
  "id77": {
    "text": () => $page.dataset.state.data.description
  },
  "id79": {
    "text": (forItems) => forItems.id78.title
  },
  "id80": {
    "text": (forItems) => forItems.id78.description,
    "_visible": (forItems, event) => (forItems.id78.description)
  },
  "id85": {
    "text": (forItems) => forItems.id83
  },
  "id83": {
    "_waFor": (forItems) => forItems.id78.tags
  },
  "id82": {
    "_visible": (forItems, event) => ((forItems.id78.tags || []).slice().length)
  },
  "id78": {
    "_waFor": () => $page.dataset.state.data.info
  },
  "id56": {
    "_visible": (forItems, event) => (!$page.dataset.state.loading && $page.dataset.state.data)
  },
  "id119": {
    "name": (forItems, event) => ($page.dataset.state.data.isFavorite?'star-fill':'star')
  },
  "id120": {
    "visible": (forItems, event) => (!!$page.dataset.state.showModal)
  }
};

AppLifeCycle.beforeCustomLaunch = (query)=>{
  updateDatasetParams('$global', query || {})
  buildDataVarFetchFn('$global')
  createStateDatasrouceVar('$global',{app})
};
PageLifeCycle.beforePageCustomLaunch = (query) => {
  updateDatasetParams('expertDetail', query || {})
  createStateDatasrouceVar('expertDetail',{app, $page})
  buildDataVarFetchFn('expertDetail');
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
    id:'expertDetail',
    state: observable(initPageState),
    computed: createComputed(computed),
    dataVar: createDataVar('expertDetail'),
    handler
  })
  let dataset = createDataset('expertDetail', {app, $page})
  $page.dataset = dataset
  $page.state.dataset = dataset

  $page.widgets = createWidgets(widgetsContext, dataBinds)
  // widgets 内的 dataBinds 可能需要关联 widgets，需要重新执行 dataBinds
  retryDataBinds()
  // Web 环境页面级别生命周期
  if (!process.env.isMiniprogram) {
    React.useEffect(() => {
      document.title = "面试邀约"
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
