/**
 * 数据源摘要描述数组
 */
export default [
  {
    "id": "data-3s1rx48p",
    "name": "logUser",
    "type": "database",
    "config": {
      "kind": "tcb",
      "methods": [
        "create",
        "delete",
        "update",
        "getItem",
        "getList"
      ]
    },
    "methods": []
  },
  {
    "id": "data-jkjzyr47",
    "name": "o2oFavorite",
    "type": "database",
    "config": {
      "methods": [
        "create",
        "delete",
        "update",
        "getItem",
        "getList"
      ]
    },
    "methods": [
      {
        "name": "getFavorites",
        "type": "cloud-function"
      }
    ]
  },
  {
    "id": "data-4t3o3a51",
    "name": "o2oInvatation",
    "type": "database",
    "config": {
      "methods": [
        "create",
        "delete",
        "update",
        "getItem",
        "getList"
      ]
    },
    "methods": [
      {
        "name": "getInvatations",
        "type": "cloud-function"
      },
      {
        "name": "createInvatation",
        "type": "local-function"
      }
    ]
  },
  {
    "id": "data-eium2aae",
    "name": "o2oCandidate",
    "type": "database",
    "config": {
      "methods": [
        "create",
        "delete",
        "update",
        "getItem",
        "getList"
      ]
    },
    "methods": [
      {
        "name": "getCandidate",
        "type": "cloud-function"
      },
      {
        "name": "updateInvitation",
        "type": "cloud-function"
      },
      {
        "name": "getCandidateListByIds",
        "type": "cloud-function"
      }
    ]
  },
  {
    "id": "data-0v2j36h1",
    "name": "o2oJob",
    "type": "database",
    "config": {
      "methods": [
        "create",
        "delete",
        "update",
        "getItem",
        "getList"
      ]
    },
    "methods": [
      {
        "name": "getCategories",
        "type": "cloud-function"
      },
      {
        "name": "getJob",
        "type": "cloud-function"
      }
    ]
  },
  {
    "id": "34",
    "name": "test",
    "type": "database",
    "config": {
      "methods": [
        "create",
        "delete",
        "update",
        "getItem",
        "getList"
      ]
    },
    "methods": []
  }
]
