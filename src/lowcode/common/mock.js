import { app, $page } from '../../app/global-api';
/*
 * 函数里面访问：通过 app.common.[name].xxx 访问这里定义的方法或值
 * 函数外面访问：通过 import（如在页面的 handler 引用的例子：import { xxx } from '../../common/[name]'）
 */

const candidate = [
  {
    _id: '203d4e0e5fe9dce9001ad02105bdd82e',
    id: 'Ida',
    name: 'Ida',
    avator:
      'https://imgcache.qq.com/qcloud/tcloud_dtc/static/low_code/7a0e63e7-95be-412e-9907-d870c1167155.svg',
    tags: ['前端开发', '硕士', '深圳', '6年工作经验'],
    description: '曾负责品牌部门相关业务的前端开发及维护',
    invitations:  1,
    type: { text: '高级工程师' },
    background:
      'https://cdn.eventfinda.co.nz/uploads/events/transformed/1450876-637357-34.png',
    info: [
      {
        title: '擅长领域',
        description:
          '过年商业产品、交易产品、和社区产品研发管理经验，算法背景出身，多次完成产品结合业务占领市场的绝对Margin',
        tags: [],
      },
      {
        title: '个人经历',
        description:
          '拥有十几年的技术开发和前端团队管理经验，正在不同的大型平台管理核心商业产品和用户产品，为搞成管理核心技术人员曾友自主创业经历，历任交易性大型互联网公司，对内容型产品的理解也非常深入。',
        tags: [],
      },
      { title: '标签', tags: ['研发管理', '项目管理', '产品管理'] },
    ],
    isFavorite: false,
  },
  {
    _id: '203d4e0e5fe9ddbf001ad02226309ddb',
    id: 'Zek',
    name: 'Zek',
    avator:
      'https://imgcache.qq.com/qcloud/tcloud_dtc/static/low_code/566bba12-f1fc-4a7c-ab75-4335e9340c6e.svg',
    tags: ['项目管理', '本科', '上海', '7年工作经验'],
    description: '具备良好的解决能力，使命必达',
    invitations: 1,
    type: { text: '高级项目经理' },
    background:
      'https://cdn.eventfinda.co.nz/uploads/events/transformed/1450876-637357-34.png',
    info: [
      {
        title: '擅长领域',
        description:
          '过年商业产品、交易产品、和社区产品研发管理经验，算法背景出身，多次完成产品结合业务占领市场的绝对Margin',
        tags: [],
      },
      {
        title: '个人经历',
        description:
          '拥有十几年的技术开发和前端团队管理经验，正在不同的大型平台管理核心商业产品和用户产品，为搞成管理核心技术人员曾友自主创业经历，历任交易性大型互联网公司，对内容型产品的理解也非常深入。',
        tags: [],
      },
      { title: '标签', tags: ['研发管理', '项目管理', '产品管理'] },
    ],
    isFavorite: false,
  },
]

const jobs = [
  {
    "_id": "eb0c51035fe9b6a500d2aedf44ed80b7",
    "background": "https://cdc-old-dcloud-migrate-1258344706.cos.ap-guangzhou.myqcloud.com/data2/material/thumb/1/1191225000/VCG41N1127729345.jpg/thumb",
    "id": "TE",
    "text": "技术族",
    "jobs": [
      {
        "title": "云开发全栈工程师",
        "info": [
          {
            "title": "岗位要求",
            "items": [
              "计算机或相关专业、本科及以上学历；基础扎实，熟悉常用的数据结构和算法；掌握操作系统、计算机网络、软件工程等专业知识",
              "熟悉Node.js/PHP/Python/Java/C++等编程语言中的一种或几种，有服务端编程经验；对服务可用性及大规模服务相关知识有一定的了解",
              "熟悉Javasript/HTML/CSS等前端开发技术，使用过至少一款当下主流的前端框架(react/vue/angular等)"
            ]
          },
          {
            "title": "岗位职责",
            "items": [
              "负责腾讯云小程序云开发产品的 SDK 及服务的架构设计及开发；",
              "负责腾讯云小程序云开发相关业务方案设计及研发；",
              "保障服务的高性能及高稳定性。"
            ]
          }
        ]
      },
      {
        "title": "微信小程序云开发前端工程师",
        "info": [
          {
            "title": "岗位要求",
            "items": [
              "大学本科或以上学历；",
              "熟练掌握前端开发知识体系，熟悉前端工程的构建、打包、部署，能熟练运用各类前端工具；",
              "熟悉业界常见的框架，能熟练的使用React、Angular、Vue等框架中的一种，并对其原理有过深入理解；"
            ]
          },
          {
            "title": "岗位职责",
            "items": [
              "负责小程序·云开发基础能力接口设计、开发，以及其相关的开发者调试能力支持。"
            ]
          }
        ]
      }
    ],
    "jobTypes": ["前端开发", "后台开发", "运营开发", "测试开发", "数据分析"]
  },
  {
    "_id": "85ff8afa5fe9b70700d4dbc93edc8909",
    "background": "https://cdc-old-dcloud-migrate-1258344706.cos.ap-guangzhou.myqcloud.com/data2/material/thumb/1/1007325000/VCG41617585588.jpg/thumb",
    "text": "产品族",
    "id": "PD",
    "jobs": [
      {
        "title": "产品管理高级产品经理",
        "info": [
          {
            "title": "岗位要求",
            "items": [
              "本科以上学历，5年以上相关行业经验，对toB业务的产品销售业务模式有深刻的理解，对产品管理、产品设计、成本构成、产品定价、产品实施交付等环节有深刻的体会和理解",
              "熟悉互联网产品的需求挖掘方法及策划方法，会使用交互稿设计工具，理解互联网产品的交互，可独立完成从需求策划到系统最终上线的全流程",
              "学习能力、执行能力强，有优秀的逻辑思维能力及数据分析能力，并能通过数据驱动系统的演进和优化"
            ]
          },
          {
            "title": "岗位职责",
            "items": [
              "负责产品生命周期管理系统、物料库等产品的相关策划工作",
              "负责挖掘用户的业务需求，对相关需求进行分析调研、数理逻辑、输出高质量的交互原型及需求文档，协调和推动开发自有完成产品开发，推动系统落地",
              "负责在产品功能上线以后根据数据情况进行产品模块的功能改进及推动相关业务团队的流程建设及持续改进"
            ]
          }
        ]
      },
      {
        "title": "数据产品经理",
        "info": [
          {
            "title": "岗位要求",
            "items": [
              "全日制大学本科以上学历，计算机、数据挖掘、统计学等相关专业优先；",
              "三年以上互联网内容产品或大数据产品策划运营经验，有BI或数仓等数据产品经验者优先；",
              "思路清晰、逻辑性强，对数据敏感，认真细致，熟练掌握SQL、数据分析、效果评估等工具和方法；"
            ]
          },
          {
            "title": "岗位职责",
            "items": [
              "负责腾讯新闻数据平台的产品运营;",
              "对接业务需求方和数据开发/分析工程师，抽象业务的数据需求，规划和建设能够有效衡量业务现状、描绘业务过程的标准化指标维度体系和数据产品体系，跟进产品和需求的流转，参与数据分析模型的设计；"
            ]
          }
        ]
      }
    ],
    "jobTypes": ["技术产品", "游戏策划", "项目管理", "内容运营"]
  },
  {
    "_id": "85ff8afa5fe9c75000d65a663b4eadbe",
    "background": "https://cdc-old-dcloud-migrate-1258344706.cos.ap-guangzhou.myqcloud.com/data2/material/thumb/1/811534000/VCG41476804949.jpg/thumb",
    "id": "DG",
    "text": "设计族",
    "jobs": [
      {
        "title": "高级游戏UI设计师",
        "info": [
          {
            "title": "岗位要求",
            "items": [
              "美术相关教育背景，5年以上游戏行业UI设计从业经验，有次世代项目经验优先考虑；",
              "具备良好的视觉审美能力，一定得造型能力，对游戏UI表现，UI动效有丰富经验；",
              "紧跟时下流行设计元素，并能运用到设计当中，在游戏GUI设计领域有系统性的认知和创造性思维，平面领域也需具备基本知识，有运营平面设计经验者优先；"
            ]
          },
          {
            "title": "岗位职责",
            "items": [
              "负责游戏中的整体UI风格的设计,以及根据UI风格制作游戏中的UI界面；",
              "制定UI设计规范，字体字色规范；",
              "与策划沟通UI交互问题，制定资源相关制作规范；"
            ]
          }
        ]
      },
      {
        "title": "交互设计师",
        "info": [
          {
            "title": "岗位要求",
            "items": [
              "本科及以上学历，设计类相关专业；具备成功的商业化产品的项目经验与丰富的整体交互设计方案落地经验；有电商类交互设计经验者优先；",
              "逻辑思维严密，可以在复杂约束条件下快速找到平衡方案并推动落地；",
              "可通过高质量的交互原型清晰的表达设计理念，在项目中形成共识；"
            ]
          },
          {
            "title": "岗位职责",
            "items": [
              "负责智慧零售 C 端产品的交互设计，高效输出有效的产品原型方案，验证方案质量并推动落地，保证产品的可用性及易用性，为产品体验及增长负责；",
              "参与产品的前期规划与用户研究，能够合理洞察用户真实需求，并系统化的提出解决方案，可以清晰制定设计规划，并推动方案在项目中的实施；"
            ]
          }
        ]
      }
    ],
    "jobTypes": ["视觉设计", "交互设计", "用户研究", "游戏美术"]
  },
  {
    "_id": "673028725fe9d9520010c2b815f5989d",
    "background": "https://cdc-old-dcloud-migrate-1258344706.cos.ap-guangzhou.myqcloud.com/data2/material/thumb/1/1168459000/VCG41N1040981748.jpg/thumb",
    "id": "MA",
    "text": "市场营销",
    "jobs": [
      {
        "title": "腾讯云华北区域销售",
        "info": [
          {
            "title": "岗位要求",
            "items": [
              "本科及以上学历，在北京区域内从事传统IT或云服务相关业务销售经验5年以上，有丰富的客户资源和合作伙伴资源；",
              "熟悉信息化、云计算、大数据、互联网+、新基建，有独立开拓、跟踪并完成项目经验和能力；",
              "具备良好的团队合作精神，勇于承担高强度的工作压力；"
            ]
          },
          {
            "title": "岗位职责",
            "items": [
              "负责区域行业客户的商务拓展工作；",
              "负责大客户关系管理、合作伙伴关系管理，市场策略制定； ",
              "整合公司及合作伙伴资源，为客户提供最佳互联网+公安行业解决方案；"
            ]
          }
        ]
      },
      {
        "title": "游戏发行业务商业分析",
        "info": [
          {
            "title": "岗位要求",
            "items": [
              "扫描监控国内外游戏市场，持续关注产品、研发、发行、运营、平台等模块动态；",
              "诊断国内发行业务商业模式，规划战略地图，针对问题提供有效的解决方案，并推动落地；",
              "针对重点项目，从产品、市场、用户、商业数据等多个维度进行分析，输出分析报告，提供决策依据。"
            ]
          },
          {
            "title": "岗位职责",
            "items": [
              "2年及以上市场分析或战略规划工作经验，优先考虑大型互联网公司战略规划/行业分析部门，或投资/咨询机构TMT行业背景从业者；",
              "热爱游戏，喜欢尝试多类型游戏，有丰富游戏经历优先；"
            ]
          }
        ]
      }
    ],
    "jobTypes": ["商业互联网营销", "商业分析", "市场研究"]
  },
  {
    "_id": "203d4e0e5fe9da41001acff5457cabdd",
    "background": "https://cdc-old-dcloud-migrate-1258344706.cos.ap-guangzhou.myqcloud.com/data2/material/thumb/3/15048000/qj8252664200.jpg/thumb",
    "id": "CS",
    "text": "专业族",
    "jobs": [
      {
        "title": "CSIG应收管理",
        "info": [
          {
            "title": "岗位要求",
            "items": [
              "本科以上学历，财会及相关专业，理论基础扎实、操作能力强、有不断学习的意识和工作激情；",
              "5年以上相关工作经验，有互联网企业工作经验优先；",
              "正直、责任心强，具有良好的沟通技巧和团队合作精神，推动力强且能承担较大工作压力；"
            ]
          },
          {
            "title": "岗位职责",
            "items": [
              "负责共享中心BG收入应收核算相关的日常工作，保证财务服务高质量支撑业务发展；",
              "负责建立和持续优化收入应收相关业务流程，建立和维护相应的信息系统与会计核算制度；",
              "负责设计完成各类业务核算流程，参与制定新业务的账务规则，推动相关的流程落地，确保财务流程的内部控制完善；"
            ]
          }
        ]
      },
      {
        "title": "腾讯音乐干部管理经理",
        "info": [
          {
            "title": "岗位要求",
            "items": [
              "全日制本科以上学历，熟悉互联网产品及相关行业；",
              "三年以上公共事务或青年工作的经历，有粤港澳工作经验者优先；",
              "沟通能力佳，具有较强的社会活动能力、良好的人际交往与协调能力、逻辑思维与表达能力；"
            ]
          },
          {
            "title": "岗位职责",
            "items": [
              "策划和组织开展青年工作；",
              "支持公司针对大湾区内青年双创、青年活动的规划；"
            ]
          }
        ]
      }
    ],
    "jobTypes": ["组织发展", "薪酬福利", "秘书", "法务", "公共事务"]
  }
]

const invitations = [
  {
    label: '面试邀约',
    id: "Ida",
    name:'Ida',
    avator:'https://imgcache.qq.com/qcloud/tcloud_dtc/static/low_code/7a0e63e7-95be-412e-9907-d870c1167155.svg',
    response: '已发出面试邀约，于2020年12月31日面试',
    types:['前端开发','产品策划'],
    createdTime: '2020-02-15'
  },
  {
    label: '面试邀约',
    id: "Zek",
    name:'Zek',
    avator:'https://imgcache.qq.com/qcloud/tcloud_dtc/static/low_code/566bba12-f1fc-4a7c-ab75-4335e9340c6e.svg',
    response: '已发出面试邀约，于2020年12月31日面试',
    types:['项目管理'],
    createdTime: '2020-02-15'
  }
]

export const data = {
  candidate: candidate,
  jobs: jobs,
  invitations: invitations,
  favorites: candidate,
}

export async function fetch(data, time){
  console.log('fetch',data,time)
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data)
    }, time || 200)
  })
}
