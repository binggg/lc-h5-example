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


import handler$getColClass from "./lowcode/handler/getColClass.js";

import handler$getColVisible from "./lowcode/handler/getColVisible.js";


// Import Components

import gsdH5ReactContainer from "libraries/gsd-h5-react@0.0.61/components/Container";

import cloudbaseStandardRow from "libraries/CLOUDBASE_STANDARD@1612432272646/components/Row";

import cloudbaseStandardCol from "libraries/CLOUDBASE_STANDARD@1612432272646/components/Col";

import gsdH5ReactSlot from "libraries/gsd-h5-react@0.0.61/components/Slot";


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
    
      "CLOUDBASE_STANDARD:Row": cloudbaseStandardRow,
    
      "CLOUDBASE_STANDARD:Col": cloudbaseStandardCol,
    
      "gsd-h5-react:Slot": gsdH5ReactSlot,
    
    });
    this.events = ([]).reduce((obj, trigger) => {
      obj[trigger] = (event) => {
        this.props.emit(trigger, event)
      };
      return obj
    }, {});
    this.handler = this.$WEAPPS_COMP.handler = {
      
      getColClass: handler$getColClass.bind(this),
      
      getColVisible: handler$getColVisible.bind(this),
      
    };
    this.componentSchema = {
  "type": "object",
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
        "classNameList": [
          "lcap-grid-layout",
          "wa-comp-CLOUDBASE_STANDARD-GridLayout"
        ]
      },
      "x-index": 0,
      "properties": {
        "id61": {
          "key": "id61",
          "x-component": "cloudbase_standard:row",
          "x-props": {
            "sourceKey": "CLOUDBASE_STANDARD:Row",
            "data": {
              "child": "",
              "reverse": false,
              "flexWrap": "nowrap",
              "alignItems": "stretch",
              "justifyContent": "flex-start",
              "_visible": true
            },
            "dataBinds": {
              "gutter": () => this.$WEAPPS_COMP.props.data.gutter
            },
            "dataTypes": [
              {
                "propertyPath": "child",
                "type": "slot"
              },
              {
                "propertyPath": "reverse",
                "type": "static"
              },
              {
                "propertyPath": "flexWrap",
                "type": "static"
              },
              {
                "propertyPath": "alignItems",
                "type": "static"
              },
              {
                "propertyPath": "justifyContent",
                "type": "static"
              },
              {
                "propertyPath": "gutter",
                "type": "bind"
              }
            ]
          },
          "properties": {
            "child": {
              "key": "child",
              "properties": {
                "id62": {
                  "key": "id62",
                  "x-component": "cloudbase_standard:col",
                  "x-props": {
                    "sourceKey": "CLOUDBASE_STANDARD:Col",
                    "data": {
                      "default": ""
                    },
                    "dataBinds": {
                      "gutter": () => this.$WEAPPS_COMP.props.data.gutter,
                      "classNameType": (forItems) => (this.$WEAPPS_COMP.handler.getColClass(0)),
                      "_visible": (forItems) => (this.$WEAPPS_COMP.handler.getColVisible(0))
                    },
                    "dataTypes": [
                      {
                        "propertyPath": "default",
                        "type": "slot"
                      },
                      {
                        "propertyPath": "gutter",
                        "type": "bind"
                      },
                      {
                        "propertyPath": "classNameType",
                        "type": "bind"
                      },
                      {
                        "propertyPath": "_visible",
                        "type": "bind"
                      }
                    ]
                  },
                  "x-index": 0,
                  "properties": {
                    "default": {
                      "key": "default",
                      "properties": {
                        "id74": {
                          "key": "id74",
                          "x-component": "gsd-h5-react:slot",
                          "x-props": {
                            "sourceKey": "gsd-h5-react:Slot",
                            "data": {
                              "name": "slot0",
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
                        }
                      }
                    }
                  }
                },
                "id63": {
                  "key": "id63",
                  "x-component": "cloudbase_standard:col",
                  "x-props": {
                    "sourceKey": "CLOUDBASE_STANDARD:Col",
                    "data": {
                      "default": ""
                    },
                    "dataBinds": {
                      "gutter": () => this.$WEAPPS_COMP.props.data.gutter,
                      "classNameType": (forItems) => (this.$WEAPPS_COMP.handler.getColClass(1)),
                      "_visible": (forItems) => (this.$WEAPPS_COMP.handler.getColVisible(1))
                    },
                    "dataTypes": [
                      {
                        "propertyPath": "default",
                        "type": "slot"
                      },
                      {
                        "propertyPath": "gutter",
                        "type": "bind"
                      },
                      {
                        "propertyPath": "classNameType",
                        "type": "bind"
                      },
                      {
                        "propertyPath": "_visible",
                        "type": "bind"
                      }
                    ]
                  },
                  "properties": {
                    "default": {
                      "key": "default",
                      "properties": {
                        "id75": {
                          "key": "id75",
                          "x-component": "gsd-h5-react:slot",
                          "x-props": {
                            "sourceKey": "gsd-h5-react:Slot",
                            "data": {
                              "name": "slot1",
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
                        }
                      }
                    }
                  }
                },
                "id64": {
                  "key": "id64",
                  "x-component": "cloudbase_standard:col",
                  "x-props": {
                    "sourceKey": "CLOUDBASE_STANDARD:Col",
                    "data": {
                      "default": ""
                    },
                    "dataBinds": {
                      "gutter": () => this.$WEAPPS_COMP.props.data.gutter,
                      "classNameType": (forItems) => (this.$WEAPPS_COMP.handler.getColClass(2)),
                      "_visible": (forItems) => (this.$WEAPPS_COMP.handler.getColVisible(2))
                    },
                    "dataTypes": [
                      {
                        "propertyPath": "default",
                        "type": "slot"
                      },
                      {
                        "propertyPath": "gutter",
                        "type": "bind"
                      },
                      {
                        "propertyPath": "classNameType",
                        "type": "bind"
                      },
                      {
                        "propertyPath": "_visible",
                        "type": "bind"
                      }
                    ]
                  },
                  "properties": {
                    "default": {
                      "key": "default",
                      "properties": {
                        "id76": {
                          "key": "id76",
                          "x-component": "gsd-h5-react:slot",
                          "x-props": {
                            "sourceKey": "gsd-h5-react:Slot",
                            "data": {
                              "name": "slot2",
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
                        }
                      }
                    }
                  }
                },
                "id65": {
                  "key": "id65",
                  "x-component": "cloudbase_standard:col",
                  "x-props": {
                    "sourceKey": "CLOUDBASE_STANDARD:Col",
                    "data": {
                      "default": ""
                    },
                    "dataBinds": {
                      "gutter": () => this.$WEAPPS_COMP.props.data.gutter,
                      "classNameType": (forItems) => (this.$WEAPPS_COMP.handler.getColClass(3)),
                      "_visible": (forItems) => (this.$WEAPPS_COMP.handler.getColVisible(3))
                    },
                    "dataTypes": [
                      {
                        "propertyPath": "default",
                        "type": "slot"
                      },
                      {
                        "propertyPath": "gutter",
                        "type": "bind"
                      },
                      {
                        "propertyPath": "classNameType",
                        "type": "bind"
                      },
                      {
                        "propertyPath": "_visible",
                        "type": "bind"
                      }
                    ]
                  },
                  "properties": {
                    "default": {
                      "key": "default",
                      "properties": {
                        "id77": {
                          "key": "id77",
                          "x-component": "gsd-h5-react:slot",
                          "x-props": {
                            "sourceKey": "gsd-h5-react:Slot",
                            "data": {
                              "name": "slot3",
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
                        }
                      }
                    }
                  }
                },
                "id66": {
                  "key": "id66",
                  "x-component": "cloudbase_standard:col",
                  "x-props": {
                    "sourceKey": "CLOUDBASE_STANDARD:Col",
                    "data": {
                      "default": ""
                    },
                    "dataBinds": {
                      "gutter": () => this.$WEAPPS_COMP.props.data.gutter,
                      "classNameType": (forItems) => (this.$WEAPPS_COMP.handler.getColClass(4)),
                      "_visible": (forItems) => (this.$WEAPPS_COMP.handler.getColVisible(4))
                    },
                    "dataTypes": [
                      {
                        "propertyPath": "default",
                        "type": "slot"
                      },
                      {
                        "propertyPath": "gutter",
                        "type": "bind"
                      },
                      {
                        "propertyPath": "classNameType",
                        "type": "bind"
                      },
                      {
                        "propertyPath": "_visible",
                        "type": "bind"
                      }
                    ]
                  },
                  "properties": {
                    "default": {
                      "key": "default",
                      "properties": {
                        "id78": {
                          "key": "id78",
                          "x-component": "gsd-h5-react:slot",
                          "x-props": {
                            "sourceKey": "gsd-h5-react:Slot",
                            "data": {
                              "name": "slot4",
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
                        }
                      }
                    }
                  }
                },
                "id67": {
                  "key": "id67",
                  "x-component": "cloudbase_standard:col",
                  "x-props": {
                    "sourceKey": "CLOUDBASE_STANDARD:Col",
                    "data": {
                      "default": ""
                    },
                    "dataBinds": {
                      "gutter": () => this.$WEAPPS_COMP.props.data.gutter,
                      "classNameType": (forItems) => (this.$WEAPPS_COMP.handler.getColClass(5)),
                      "_visible": (forItems) => (this.$WEAPPS_COMP.handler.getColVisible(5))
                    },
                    "dataTypes": [
                      {
                        "propertyPath": "default",
                        "type": "slot"
                      },
                      {
                        "propertyPath": "gutter",
                        "type": "bind"
                      },
                      {
                        "propertyPath": "classNameType",
                        "type": "bind"
                      },
                      {
                        "propertyPath": "_visible",
                        "type": "bind"
                      }
                    ]
                  },
                  "properties": {
                    "default": {
                      "key": "default",
                      "properties": {
                        "id79": {
                          "key": "id79",
                          "x-component": "gsd-h5-react:slot",
                          "x-props": {
                            "sourceKey": "gsd-h5-react:Slot",
                            "data": {
                              "name": "slot5",
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
                        }
                      }
                    }
                  }
                },
                "id68": {
                  "key": "id68",
                  "x-component": "cloudbase_standard:col",
                  "x-props": {
                    "sourceKey": "CLOUDBASE_STANDARD:Col",
                    "data": {
                      "default": ""
                    },
                    "dataBinds": {
                      "gutter": () => this.$WEAPPS_COMP.props.data.gutter,
                      "classNameType": (forItems) => (this.$WEAPPS_COMP.handler.getColClass(6)),
                      "_visible": (forItems) => (this.$WEAPPS_COMP.handler.getColVisible(6))
                    },
                    "dataTypes": [
                      {
                        "propertyPath": "default",
                        "type": "slot"
                      },
                      {
                        "propertyPath": "gutter",
                        "type": "bind"
                      },
                      {
                        "propertyPath": "classNameType",
                        "type": "bind"
                      },
                      {
                        "propertyPath": "_visible",
                        "type": "bind"
                      }
                    ]
                  },
                  "properties": {
                    "default": {
                      "key": "default",
                      "properties": {
                        "id80": {
                          "key": "id80",
                          "x-component": "gsd-h5-react:slot",
                          "x-props": {
                            "sourceKey": "gsd-h5-react:Slot",
                            "data": {
                              "name": "slot6",
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
                        }
                      }
                    }
                  }
                },
                "id69": {
                  "key": "id69",
                  "x-component": "cloudbase_standard:col",
                  "x-props": {
                    "sourceKey": "CLOUDBASE_STANDARD:Col",
                    "data": {
                      "default": ""
                    },
                    "dataBinds": {
                      "gutter": () => this.$WEAPPS_COMP.props.data.gutter,
                      "classNameType": (forItems) => (this.$WEAPPS_COMP.handler.getColClass(7)),
                      "_visible": (forItems) => (this.$WEAPPS_COMP.handler.getColVisible(7))
                    },
                    "dataTypes": [
                      {
                        "propertyPath": "default",
                        "type": "slot"
                      },
                      {
                        "propertyPath": "gutter",
                        "type": "bind"
                      },
                      {
                        "propertyPath": "classNameType",
                        "type": "bind"
                      },
                      {
                        "propertyPath": "_visible",
                        "type": "bind"
                      }
                    ]
                  },
                  "properties": {
                    "default": {
                      "key": "default",
                      "properties": {
                        "id81": {
                          "key": "id81",
                          "x-component": "gsd-h5-react:slot",
                          "x-props": {
                            "sourceKey": "gsd-h5-react:Slot",
                            "data": {
                              "name": "slot7",
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
                        }
                      }
                    }
                  }
                },
                "id70": {
                  "key": "id70",
                  "x-component": "cloudbase_standard:col",
                  "x-props": {
                    "sourceKey": "CLOUDBASE_STANDARD:Col",
                    "data": {
                      "default": ""
                    },
                    "dataBinds": {
                      "gutter": () => this.$WEAPPS_COMP.props.data.gutter,
                      "classNameType": (forItems) => (this.$WEAPPS_COMP.handler.getColClass(8)),
                      "_visible": (forItems) => (this.$WEAPPS_COMP.handler.getColVisible(8))
                    },
                    "dataTypes": [
                      {
                        "propertyPath": "default",
                        "type": "slot"
                      },
                      {
                        "propertyPath": "gutter",
                        "type": "bind"
                      },
                      {
                        "propertyPath": "classNameType",
                        "type": "bind"
                      },
                      {
                        "propertyPath": "_visible",
                        "type": "bind"
                      }
                    ]
                  },
                  "properties": {
                    "default": {
                      "key": "default",
                      "properties": {
                        "id82": {
                          "key": "id82",
                          "x-component": "gsd-h5-react:slot",
                          "x-props": {
                            "sourceKey": "gsd-h5-react:Slot",
                            "data": {
                              "name": "slot8",
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
                        }
                      }
                    }
                  }
                },
                "id71": {
                  "key": "id71",
                  "x-component": "cloudbase_standard:col",
                  "x-props": {
                    "sourceKey": "CLOUDBASE_STANDARD:Col",
                    "data": {
                      "default": ""
                    },
                    "dataBinds": {
                      "gutter": () => this.$WEAPPS_COMP.props.data.gutter,
                      "classNameType": (forItems) => (this.$WEAPPS_COMP.handler.getColClass(9)),
                      "_visible": (forItems) => (this.$WEAPPS_COMP.handler.getColVisible(9))
                    },
                    "dataTypes": [
                      {
                        "propertyPath": "default",
                        "type": "slot"
                      },
                      {
                        "propertyPath": "gutter",
                        "type": "bind"
                      },
                      {
                        "propertyPath": "classNameType",
                        "type": "bind"
                      },
                      {
                        "propertyPath": "_visible",
                        "type": "bind"
                      }
                    ]
                  },
                  "properties": {
                    "default": {
                      "key": "default",
                      "properties": {
                        "id83": {
                          "key": "id83",
                          "x-component": "gsd-h5-react:slot",
                          "x-props": {
                            "sourceKey": "gsd-h5-react:Slot",
                            "data": {
                              "name": "slot9",
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
                        }
                      }
                    }
                  }
                },
                "id72": {
                  "key": "id72",
                  "x-component": "cloudbase_standard:col",
                  "x-props": {
                    "sourceKey": "CLOUDBASE_STANDARD:Col",
                    "data": {
                      "default": ""
                    },
                    "dataBinds": {
                      "gutter": () => this.$WEAPPS_COMP.props.data.gutter,
                      "classNameType": (forItems) => (this.$WEAPPS_COMP.handler.getColClass(10)),
                      "_visible": (forItems) => (this.$WEAPPS_COMP.handler.getColVisible(10))
                    },
                    "dataTypes": [
                      {
                        "propertyPath": "default",
                        "type": "slot"
                      },
                      {
                        "propertyPath": "gutter",
                        "type": "bind"
                      },
                      {
                        "propertyPath": "classNameType",
                        "type": "bind"
                      },
                      {
                        "propertyPath": "_visible",
                        "type": "bind"
                      }
                    ]
                  },
                  "properties": {
                    "default": {
                      "key": "default",
                      "properties": {
                        "id84": {
                          "key": "id84",
                          "x-component": "gsd-h5-react:slot",
                          "x-props": {
                            "sourceKey": "gsd-h5-react:Slot",
                            "data": {
                              "name": "slot10",
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
                        }
                      }
                    }
                  }
                },
                "id73": {
                  "key": "id73",
                  "x-component": "cloudbase_standard:col",
                  "x-props": {
                    "sourceKey": "CLOUDBASE_STANDARD:Col",
                    "data": {
                      "default": ""
                    },
                    "dataBinds": {
                      "gutter": () => this.$WEAPPS_COMP.props.data.gutter,
                      "classNameType": (forItems) => (this.$WEAPPS_COMP.handler.getColClass(11)),
                      "_visible": (forItems) => (this.$WEAPPS_COMP.handler.getColVisible(11))
                    },
                    "dataTypes": [
                      {
                        "propertyPath": "default",
                        "type": "slot"
                      },
                      {
                        "propertyPath": "gutter",
                        "type": "bind"
                      },
                      {
                        "propertyPath": "classNameType",
                        "type": "bind"
                      },
                      {
                        "propertyPath": "_visible",
                        "type": "bind"
                      }
                    ]
                  },
                  "properties": {
                    "default": {
                      "key": "default",
                      "properties": {
                        "id85": {
                          "key": "id85",
                          "x-component": "gsd-h5-react:slot",
                          "x-props": {
                            "sourceKey": "gsd-h5-react:Slot",
                            "data": {
                              "name": "slot11",
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
    }
  }
};
    const widgetContext = {
  "id74": {
    "name": "slot0",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id62"
  },
  "id62": {
    "default": "",
    "style": {},
    "classList": [],
    "widgetType": "CLOUDBASE_STANDARD:Col",
    "_parentId": "id61"
  },
  "id75": {
    "name": "slot1",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id63"
  },
  "id63": {
    "default": "",
    "style": {},
    "classList": [],
    "widgetType": "CLOUDBASE_STANDARD:Col",
    "_parentId": "id61"
  },
  "id76": {
    "name": "slot2",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id64"
  },
  "id64": {
    "default": "",
    "style": {},
    "classList": [],
    "widgetType": "CLOUDBASE_STANDARD:Col",
    "_parentId": "id61"
  },
  "id77": {
    "name": "slot3",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id65"
  },
  "id65": {
    "default": "",
    "style": {},
    "classList": [],
    "widgetType": "CLOUDBASE_STANDARD:Col",
    "_parentId": "id61"
  },
  "id78": {
    "name": "slot4",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id66"
  },
  "id66": {
    "default": "",
    "style": {},
    "classList": [],
    "widgetType": "CLOUDBASE_STANDARD:Col",
    "_parentId": "id61"
  },
  "id79": {
    "name": "slot5",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id67"
  },
  "id67": {
    "default": "",
    "style": {},
    "classList": [],
    "widgetType": "CLOUDBASE_STANDARD:Col",
    "_parentId": "id61"
  },
  "id80": {
    "name": "slot6",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id68"
  },
  "id68": {
    "default": "",
    "style": {},
    "classList": [],
    "widgetType": "CLOUDBASE_STANDARD:Col",
    "_parentId": "id61"
  },
  "id81": {
    "name": "slot7",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id69"
  },
  "id69": {
    "default": "",
    "style": {},
    "classList": [],
    "widgetType": "CLOUDBASE_STANDARD:Col",
    "_parentId": "id61"
  },
  "id82": {
    "name": "slot8",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id70"
  },
  "id70": {
    "default": "",
    "style": {},
    "classList": [],
    "widgetType": "CLOUDBASE_STANDARD:Col",
    "_parentId": "id61"
  },
  "id83": {
    "name": "slot9",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id71"
  },
  "id71": {
    "default": "",
    "style": {},
    "classList": [],
    "widgetType": "CLOUDBASE_STANDARD:Col",
    "_parentId": "id61"
  },
  "id84": {
    "name": "slot10",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id72"
  },
  "id72": {
    "default": "",
    "style": {},
    "classList": [],
    "widgetType": "CLOUDBASE_STANDARD:Col",
    "_parentId": "id61"
  },
  "id85": {
    "name": "slot11",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "gsd-h5-react:Slot",
    "_parentId": "id73"
  },
  "id73": {
    "default": "",
    "style": {},
    "classList": [],
    "widgetType": "CLOUDBASE_STANDARD:Col",
    "_parentId": "id61"
  },
  "id61": {
    "child": "",
    "reverse": false,
    "flexWrap": "nowrap",
    "alignItems": "stretch",
    "justifyContent": "flex-start",
    "_visible": true,
    "style": {},
    "classList": [],
    "widgetType": "CLOUDBASE_STANDARD:Row",
    "_parentId": "id60"
  },
  "id60": {
    "title": "",
    "_visible": true,
    "style": {},
    "classList": [
      "lcap-grid-layout",
      "wa-comp-CLOUDBASE_STANDARD-GridLayout"
    ],
    "widgetType": "gsd-h5-react:Container"
  }
}
    const dataBinds = {
  "id62": {
    "gutter": () => this.$WEAPPS_COMP.props.data.gutter,
    "classNameType": (forItems) => (this.$WEAPPS_COMP.handler.getColClass(0)),
    "_visible": (forItems) => (this.$WEAPPS_COMP.handler.getColVisible(0))
  },
  "id63": {
    "gutter": () => this.$WEAPPS_COMP.props.data.gutter,
    "classNameType": (forItems) => (this.$WEAPPS_COMP.handler.getColClass(1)),
    "_visible": (forItems) => (this.$WEAPPS_COMP.handler.getColVisible(1))
  },
  "id64": {
    "gutter": () => this.$WEAPPS_COMP.props.data.gutter,
    "classNameType": (forItems) => (this.$WEAPPS_COMP.handler.getColClass(2)),
    "_visible": (forItems) => (this.$WEAPPS_COMP.handler.getColVisible(2))
  },
  "id65": {
    "gutter": () => this.$WEAPPS_COMP.props.data.gutter,
    "classNameType": (forItems) => (this.$WEAPPS_COMP.handler.getColClass(3)),
    "_visible": (forItems) => (this.$WEAPPS_COMP.handler.getColVisible(3))
  },
  "id66": {
    "gutter": () => this.$WEAPPS_COMP.props.data.gutter,
    "classNameType": (forItems) => (this.$WEAPPS_COMP.handler.getColClass(4)),
    "_visible": (forItems) => (this.$WEAPPS_COMP.handler.getColVisible(4))
  },
  "id67": {
    "gutter": () => this.$WEAPPS_COMP.props.data.gutter,
    "classNameType": (forItems) => (this.$WEAPPS_COMP.handler.getColClass(5)),
    "_visible": (forItems) => (this.$WEAPPS_COMP.handler.getColVisible(5))
  },
  "id68": {
    "gutter": () => this.$WEAPPS_COMP.props.data.gutter,
    "classNameType": (forItems) => (this.$WEAPPS_COMP.handler.getColClass(6)),
    "_visible": (forItems) => (this.$WEAPPS_COMP.handler.getColVisible(6))
  },
  "id69": {
    "gutter": () => this.$WEAPPS_COMP.props.data.gutter,
    "classNameType": (forItems) => (this.$WEAPPS_COMP.handler.getColClass(7)),
    "_visible": (forItems) => (this.$WEAPPS_COMP.handler.getColVisible(7))
  },
  "id70": {
    "gutter": () => this.$WEAPPS_COMP.props.data.gutter,
    "classNameType": (forItems) => (this.$WEAPPS_COMP.handler.getColClass(8)),
    "_visible": (forItems) => (this.$WEAPPS_COMP.handler.getColVisible(8))
  },
  "id71": {
    "gutter": () => this.$WEAPPS_COMP.props.data.gutter,
    "classNameType": (forItems) => (this.$WEAPPS_COMP.handler.getColClass(9)),
    "_visible": (forItems) => (this.$WEAPPS_COMP.handler.getColVisible(9))
  },
  "id72": {
    "gutter": () => this.$WEAPPS_COMP.props.data.gutter,
    "classNameType": (forItems) => (this.$WEAPPS_COMP.handler.getColClass(10)),
    "_visible": (forItems) => (this.$WEAPPS_COMP.handler.getColVisible(10))
  },
  "id73": {
    "gutter": () => this.$WEAPPS_COMP.props.data.gutter,
    "classNameType": (forItems) => (this.$WEAPPS_COMP.handler.getColClass(11)),
    "_visible": (forItems) => (this.$WEAPPS_COMP.handler.getColVisible(11))
  },
  "id61": {
    "gutter": () => this.$WEAPPS_COMP.props.data.gutter
  }
}
    const defaultProps = {
  "columnRatio": "3:3:3:3",
  "gutter": 20,
  "slot0": "",
  "slot1": "",
  "slot2": "",
  "slot3": "",
  "slot4": "",
  "slot5": "",
  "slot6": "",
  "slot7": "",
  "slot8": "",
  "slot9": "",
  "slot10": "",
  "slot11": ""
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
