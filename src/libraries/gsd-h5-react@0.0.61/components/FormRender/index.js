/*
 * @Description: 动态表单渲染组件
 * @Author: smileswlin
 * @LastEditor: smileswlin
 * @Date: 2020-09-27 14:35:38
 * @LastEditTime: 2020-11-01 18:14:35
 */
import * as React from "react";
import {
  fieldsList,
  layoutList,
  Form,
  FormItem,
} from "@govcloud/formily-react-weui";
import {
  createFormActions,
  LifeCycleTypes,
  setAllState,
  FormRender as RFormRender,
} from "@govcloud/form-render-react";

function isEmptyObj(obj) {
  return JSON.stringify(obj || {}) === "{}";
}
function deepCloneByJson(obj) {
  if (typeof obj === "object") {
    return JSON.parse(JSON.stringify(obj));
  } else {
    return obj;
  }
}
function FormRender(props) {
  const { id, data, style, className, $node } = props;
  const {
    formHost,
    formId,
    defaultValue,
    linkConditions,
    effects,
    schema,
    globalConfig,
    globalHead,
    isAllDisabled,
  } = data;

  const actions = createFormActions();
  if ($node) {
    $node.extends("getSetAllStateFn", () => {
      return setAllState;
    });
    $node.extends("getLifeCycleTypes", () => {
      return LifeCycleTypes;
    });
    $node.extends("getActions", () => actions);
  }
  const handleEffects = ($, {}) => {
    $(LifeCycleTypes.ON_FIELD_MOUNT).subscribe(() => {
      if (isAllDisabled) {
        setAllState && setAllState(actions, "editable", false);
      }
    });
  };
  return (
    <RFormRender
      fields={fieldsList}
      virtualFields={layoutList}
      formComponent={Form}
      formItemComponent={FormItem}
      id={id}
      style={style}
      className={className}
      actions={actions}
      effects={isEmptyObj(effects) ? handleEffects : effects}
      formHost={formHost}
      formId={formId}
      defaultValue={deepCloneByJson(defaultValue || {})}
      linkConditions={deepCloneByJson(linkConditions || {})}
      schema={deepCloneByJson(schema || {})}
      globalConfig={deepCloneByJson(globalConfig || {})}
      globalHead={deepCloneByJson(globalHead || {})}
    />
  );
}
export default FormRender;
