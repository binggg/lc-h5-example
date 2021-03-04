/**
 * @desc Button EditorComponent
 */

/**
 * @desc component dataForm
 * @type {JsonSchemaProperties}
 */
import { mapPosition, requiredConfig } from '../../lib/utils/config'


const dataForm = {
  longitude: {
    title: '中心经度',
    type: 'number',
    default: 116.39694614768342,
  },
  latitude: {
    title: '中心纬度',
    type: 'number',
    default: 39.909666770172194,
  },
  scale: { // 取值范围为3-20
    type: 'number',
    title: '缩放级别',
    default: 16,
    'x-component-props': {
      min: 3,
      max: 20
    }
  },
  minScale: {
    type: 'number',
    title: '最小缩放级别',
    default: 3,
    'x-component-props': {
      min: 3,
      max: 20
    }
  },
  maxScale: {
    type: 'number',
    title: '最大缩放级别',
    default: 20,
    'x-component-props': {
      min: 3,
      max: 20
    }
  },
  showLocation: {
    type: 'boolean',
    title: '是否显示带有方向的当前定位点',
    default: false,
  },
  markers: {
    type: 'array',
    title: '标记点',
    default: [],
    description: '每个marker的id、longitude、latitude、iconPath必填',
    items: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          title: '标记点 id',
          ...requiredConfig
        },
        longitude: {
          type: 'number',
          title: '经度',
          ...requiredConfig
        },
        latitude: {
          type: 'number',
          title: '纬度',
          ...requiredConfig
        },
        iconPath: {
          type: 'image',
          title: '显示的图标',
          ...requiredConfig
        },
        clusterId: {
          type: 'number',
          title: '聚合簇的 id',
        },
        joinCluster: {
          type: 'boolean',
          title: '是否参与点聚合',
          default: false
        },
        title: {
          type: 'string',
          title: '标注点名',
        },
        zIndex: {
          type: 'number',
          title: '显示层级',
        },
        width: {
          type: 'number',
          title: '标注图标高度',
        },
        height: {
          type: 'number',
          title: '标注图标高度',
        },
        rotate: {
          type: 'number',
          title: '旋转角度',
          default: 0,
          'x-component-props': {
            min: 0,
            max: 360
          }
        },
        alpha: {
          type: 'number',
          title: '标注的透明度',
          default: 1,
          'x-component-props': {
            min: 0,
            max: 1
          }
        },
        callout: {
          type: 'Object',
          title: '自定义标记点上方的气泡窗口',
          properties: {
            content: {
              type: 'string',
              title: '文本',
            },
            color: {
              type: 'color',
              title: '文本颜色',
            },
            fontSize: {
              type: 'number',
              title: '文字大小',
            },
            borderRadius: {
              type: 'number',
              title: '边框圆角',
            },
            borderWidth: {
              type: 'number',
              title: '边框宽度',
            },
            borderColor: {
              type: 'color',
              title: '边框颜色',
            },
            bgColor: {
              type: 'color',
              title: '背景色',
            },
            padding: {
              type: 'number',
              title: '文本边缘留白',
            },
            display: {
              type: 'string',
              title: '显示方式',
              'x-component': 'radio',
              enum: [
                { value: 'BYCLICK', label: '点击显示' },
                { value: 'ALWAYS', label: '常显' },
              ],
            },
            textAlign: {
              type: 'string',
              title: '文本对齐方式',
              'x-component': 'radio',
              enum: [
                { value: 'left', label: 'left' },
                { value: 'right', label: 'right' },
                { value: 'center', label: 'center' },
              ],
            },
            anchorX: {
              type: 'number',
              title: '横向偏移量',
              description: '向右为正数'
            },
            anchorY: {
              type: 'number',
              title: '纵向偏移量',
              description: '向下为正数'
            }
          }
        },
        label: {
          type: 'Object',
          title: '为标记点旁边增加标签',
          properties: {
            content: {
              type: 'string',
              title: '文本',
            },
            color: {
              type: 'color',
              title: '文本颜色',
            },
            fontSize: {
              type: 'number',
              title: '文字大小',
            },
            anchorX: {
              type: 'number',
              title: 'label的X坐标',
              description: '原点是 marker 对应的经纬度'
            },
            anchorY: {
              type: 'number',
              title: 'label的Y坐标',
              description: '原点是 marker 对应的经纬度'
            },
            borderRadius: {
              type: 'number',
              title: '边框圆角',
            },
            borderWidth: {
              type: 'number',
              title: '边框宽度',
            },
            borderColor: {
              type: 'color',
              title: '边框颜色',
            },
            bgColor: {
              type: 'string',
              title: '背景色',
            },
            padding: {
              type: 'color',
              title: '文本边缘留白',
            },
            textAlign: {
              type: 'string',
              title: '文本对齐方式',
              'x-component': 'radio',
              enum: [
                { value: 'left', label: 'left' },
                { value: 'right', label: 'right' },
                { value: 'center', label: 'center' },
              ],
            }
          }
        },
        anchor: {
          type: 'Object',
          title: '经纬度在标注图标的锚点，默认底边中点',
          properties: {
            x: {
              type: 'number',
              title: '横向',
              'x-component-props': {
                min: 0,
                max: 1
              }
            },
            y: {
              type: 'number',
              title: '竖向',
              'x-component-props': {
                min: 0,
                max: 1
              }
            }
          }
        }

      },
    }
  },
  polyline: {
    type: 'array',
    title: '路线',
    default: [],
    items: {
      type: 'object',
      properties: {
        points: {
          title: '经纬度数组',
          type: 'array',
          items: {
            ...mapPosition
          },
          ...requiredConfig
        },
        color: {
          type: 'color',
          title: '线的颜色',
        },
        width: {
          type: 'number',
          title: '线的宽度',
        },
        dottedLine: {
          type: 'boolean',
          title: '是否虚线',
          default: false
        },
        arrowLine: {
          type: 'boolean',
          title: '带箭头的线',
          default: false,
          description: '开发者工具暂不支持该属性',
          "x-linkages": [
            {
              "type": "value:visible",
              "target": 'arrowIconPath',
              "condition": "{{ $self.value }}"
            },
          ],
        },
        arrowIconPath: {
          type: 'image',
          title: '更换箭头图标',
        },
        borderColor: {
          type: 'color',
          title: '线的边框颜色',
        },
        borderWidth: {
          type: 'number',
          title: '线的厚度',
        }
      },
    }
  },
  polygons: {
    type: 'array',
    title: '多边形',
    default: [],
    items: {
      type: 'object',
      properties: {
        points: {
          title: '经纬度数组',
          type: 'array',
          items: {
            ...mapPosition
          },
          ...requiredConfig
        },
        strokeWidth: {
          type: 'number',
          title: '描边的宽度',
        },
        strokeColor: {
          type: 'color',
          title: '描边的颜色',
        },
        fillColor: {
          type: 'color',
          title: '填充颜色',
        },
        zIndex: {
          type: 'number',
          title: '设置多边形Z轴数值',
        },
      },
    }
  },
  circles: {
    type: 'array',
    title: '圆',
    default: [],
    items: {
      type: 'object',
      properties: {
        longitude: {
          type: 'number',
          title: '经度',
          ...requiredConfig
        },
        latitude: {
          type: 'number',
          title: '纬度',
          ...requiredConfig
        },
        radius: {
          type: 'number',
          title: '半径',
        },
        color: {
          type: 'color',
          title: '线的颜色',
        },
        fillColor: {
          type: 'color',
          title: '填充颜色',
        },
        strokeWidth: {
          type: 'number',
          title: '描边的宽度',
        }
      },
    }
  },
  includePoints: {
    type: 'array',
    title: '缩放视野以包含所有给定的坐标点',
    default: [],
    items: {
      ...mapPosition
    }
  },
  subkey:{
    type: 'string',
    title: '个性化地图使用的key',
    default: '',
  },
  layerStyle: {
    type: 'number',
    title: '个性化地图配置的 style',
    default: 1
  },
  rotate: {
    type: 'number',
    title: '旋转角度',
    default: 0,
    'x-component-props': {
      min: 0,
      max: 360
    }
  },
  skew: {
    type: 'number',
    title: '旋转角度',
    default: 0,
    'x-component-props': {
      min: 0,
      max: 40
    }
  },
  enable3D: {
    type: 'boolean',
    title: '展示3D楼块',
    default: false,
  },
  showCompass: {
    type: 'boolean',
    title: '显示指南针',
    default: false,
  },
  showScale: {
    type: 'boolean',
    title: '显示比例尺',
    default: false,
  },
  enableOverlooking: {
    type: 'boolean',
    title: '开启俯视',
    default: false,
  },
  enableZoom: {
    type: 'boolean',
    title: '是否支持缩放',
    default: true,
  },
  enableScroll: {
    type: 'boolean',
    title: '是否支持拖动',
    default: true,
  },
  enableRotate: {
    type: 'boolean',
    title: '是否支持旋转',
    default: false,
  },
  enableSatellite: {
    type: 'boolean',
    title: '是否开启卫星图',
    default: false,
  },
  enableTraffic: {
    type: 'boolean',
    title: '是否开启实时路况',
    default: false,
  },
  setting: {
    type: 'object',
    title: '配置项',
  },
  // divider: {
  //   'x-component': 'divider',
  //   'x-component-props': {
  //     children: '以下配置仅在web端起作用'
  //   },
  // },
  mapKey: {
    type: 'string',
    title: '腾讯地图Key',
    description: '以下配置仅在web端起作用'
  },
  geometry: {
    type: 'boolean',
    default: false,
    title: '是否添加几何运算库',
  },
  tools: {
    type: 'boolean',
    default: false,
    title: '是否添加应用工具库',
  }
};


export default {
  dataForm,
  isContainer: true,
  emitEvents: [
    { eventName: "tap", name: "点击地图时触发" },
    { eventName: "regionchange", name: "视野发生变化时触发" },
    { eventName: "markertap", name: "点击标记点时触发" },
    { eventName: "labeltap", name: "点击label时触发" },
    { eventName: "updated", name: "在地图渲染更新完成时触发" },
    { eventName: "callouttap", name: "点击标记点对应的气泡时触发" },
    { eventName: "poitap", name: "点击地图poi点时触发" },
    { eventName: "controltap", name: "点击控件时触发" },
    { eventName: "anchorpointtap", name: "点击定位标时触发" },
  ],
};
