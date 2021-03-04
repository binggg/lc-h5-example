import './index.scss';
import * as React from 'react';

export default function Form ({ value, onChange, UForm, pageInstanceList }) {
  const {
    SchemaForm,
    Field,
    FormButtonGroup,
    Submit,
  } = UForm;
  return (
    <div className="base-action-open-url">
      <SchemaForm
        initialValues={{
          ...value,
        }}
        onSubmit={v => {
          // console.log('v', v);
          onChange({ ...value, ...v });
        }}
        effects={($, { setFieldState }) => {
          $('onFieldChange', 'jumpType').subscribe(fieldState => {
            const isLocalPage = fieldState.value === 1;
            const isUrlPage = fieldState.value === 2;
            const isMiniPage = fieldState.value === 3;
            setFieldState('pageId', state => {
              state.visible = isLocalPage;
            });
            setFieldState('navigateType', state => {
              state.visible = isLocalPage;
            });
            setFieldState('url', state => {
              state.visible = isUrlPage;
            });
            setFieldState('newTable', state => {
              state.visible = isUrlPage;
            });
            setFieldState('deliverParams', state => {
              state.visible = isUrlPage;
            });
            setFieldState('appId', state => {
              state.visible = isMiniPage;
            });
            setFieldState('path', state => {
              state.visible = isMiniPage;
            });
            setFieldState('envVersion', state => {
              state.visible = isMiniPage;
            });
          });

          $('onFieldValueChange', 'navigateType').subscribe(fieldState => {
            setFieldState('pageId', state => {
              state.visible = fieldState.value && fieldState.value !== 'navigateBack';
            });
          })
        }}
      >
        <Field
          type="radio"
          default={1}
          enum={[{
            label: '本站页面',
            value: 1,
          }, {
            label: '链接地址',
            value: 2,
          }, {
            label: '跳转其他小程序',
            value: 3,
          }]}
          title="跳转目标"
          name="jumpType"
        />
        <Field
          type="radio"
          default={'navigateTo'}
          enum={[{
            label: 'navigateTo',
            value: 'navigateTo',
          }, {
            label: 'redirectTo',
            value: 'redirectTo',
          }, {
            label: 'reLaunch',
            value: 'reLaunch',
          }, {
            label: 'navigateBack',
            value: 'navigateBack'
          }]}
          title="跳转类型"
          name="navigateType"
        />
        <Field
          type="string"
          enum={pageInstanceList}
          x-component="tree-select"
          title="选择页面"
          name="pageId"
        />

        <Field
          type="string"
          title="跳转链接地址"
          name="url"
          x-rules="url"
        />
        <Field
          type="boolean"
          title="在新 Tab 中打开"
          name="newTable"
        />
        <Field
          type="boolean"
          title="透传 URL 参数"
          name="deliverParams"
        />
        <Field
          type="string"
          title="要打开的小程序 appId"
          name="appId"
        />
        <Field
          type="string"
          title="要打开的小程序的页面路径"
          name="path"
        />
        {/*<Field*/}
          {/*type="string"*/}
          {/*title="需要传递给目标小程序的数据"*/}
          {/*name="extraData"*/}
        {/*/>*/}
        <Field
          type="string"
          title="要打开的小程序版本"
          name="envVersion"
          default={'release'}
          enum={[
            { label: '开发版', value: 'develop' },
            { label: '体验版', value: 'trial' },
            { label: '正式版', value: 'release' },
          ]}
        />
        <FormButtonGroup>
          <Submit>保存</Submit>
        </FormButtonGroup>
      </SchemaForm>
    </div>
  );
}
