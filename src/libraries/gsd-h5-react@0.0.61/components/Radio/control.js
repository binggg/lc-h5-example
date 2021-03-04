/**
 * @desc Button EditorComponent
 */

import { formName } from "../../lib/utils/config";

/**
 * @desc component dataForm
 * @type {JsonSchemaProperties}
 */
const dataForm = {
  name: {
    ...formName,
    default: 'thisIsRadioKey',
  },
  "value": {
    "title": "radio标识",
    "type": "string"
  },
  "disabled": {
    "title": "是否禁用",
    "type": "boolean",
    "default": false
  },
  "checked": {
    "title": "当前是否选中",
    "type": "boolean",
    "default": false
  },
  "color": {
    "title": "checkbox的颜色",
    "type": "color",
    "default": '#09BB07'
  },
};


export default {
  dataForm
};
