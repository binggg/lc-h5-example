/**
 * 全局及页面的数据源变量定义文件
 */

export default {
  "$global": {
    "state": {
      "isMock": {
        "name": "isMock",
        "label": "使用mock数据",
        "varType": "state",
        "dataType": "boolean",
        "initialValue": true
      },
      "userInfo": {
        "name": "userInfo",
        "label": "userInfo",
        "varType": "state",
        "dataType": "object",
        "initialValue": null
      }
    }
  },
  "index": {
    "state": {
      "list": {
        "name": "list",
        "label": "list",
        "varType": "state",
        "dataType": "array",
        "initialValue": []
      },
      "types": {
        "name": "types",
        "label": "分类",
        "varType": "state",
        "dataType": "array",
        "initialValue": []
      },
      "sortOptions": {
        "name": "sortOptions",
        "label": "sortOptions",
        "varType": "state",
        "dataType": "array",
        "initialValue": [
          {
            "text": "综合排序",
            "value": "complex"
          },
          {
            "text": "同城优先",
            "value": "sameCity"
          },
          {
            "text": "邀约量",
            "value": "invitation"
          }
        ]
      },
      "selectedType": {
        "name": "selectedType",
        "label": "selectedType",
        "varType": "state",
        "dataType": "string",
        "initialValue": "recommend"
      },
      "selectedSortIndex": {
        "name": "selectedSortIndex",
        "label": "selectedSortIndex",
        "varType": "state",
        "dataType": "number",
        "initialValue": 0
      }
    }
  },
  "graph": {
    "state": {
      "fakelist": {
        "name": "fakelist",
        "label": "list",
        "varType": "datasource",
        "dataType": "record-collection",
        "initMethod": {
          "name": "getList",
          "params": {}
        },
        "updateMethod": {
          "params": {}
        },
        "dataSourceName": "o2oJob"
      }
    }
  },
  "user": {
    "state": {}
  },
  "graphDetail": {
    "state": {
      "referance": {
        "name": "referance",
        "label": "referance",
        "varType": "datasource",
        "dataType": "new-record",
        "initMethod": {
          "params": {}
        },
        "updateMethod": {
          "name": "create",
          "params": {}
        },
        "dataSourceName": "o2oJob"
      }
    },
    "params": {
      "id": {
        "name": "id",
        "label": "id",
        "required": true,
        "sampleValue": "TE"
      }
    }
  },
  "about": {
    "state": {}
  },
  "expertDetail": {
    "state": {
      "data": {
        "name": "data",
        "label": "data",
        "varType": "state",
        "dataType": "object",
        "initialValue": {}
      }
    },
    "params": {
      "id": {
        "name": "id",
        "label": "id",
        "required": true,
        "sampleValue": "Ida"
      }
    }
  },
  "classification": {
    "state": {
      "list": {
        "name": "list",
        "label": "list",
        "varType": "state",
        "dataType": "array",
        "initMethod": {},
        "initialValue": []
      },
      "selectedType": {
        "name": "selectedType",
        "label": "selectedType",
        "varType": "state",
        "dataType": "string",
        "initialValue": ""
      }
    }
  },
  "invacations": {
    "state": {}
  },
  "favorites": {
    "state": {}
  },
  "category": {
    "state": {
      "list": {
        "name": "list",
        "label": "list",
        "varType": "datasource",
        "dataType": "record-collection",
        "initMethod": {
          "name": "getList",
          "params": {}
        },
        "dataSourceName": "o2oCandidate"
      },
      "selectedType": {
        "name": "selectedType",
        "label": "selectedType",
        "varType": "state",
        "dataType": "string"
      }
    },
    "params": {
      "tag": {
        "name": "tag",
        "label": "tag",
        "sampleValue": "前端开发"
      },
      "type": {
        "name": "type",
        "label": "type",
        "required": true,
        "sampleValue": "TE"
      }
    }
  }
}
