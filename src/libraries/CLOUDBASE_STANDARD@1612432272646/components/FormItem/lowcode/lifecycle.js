import { app } from 'app/global-api'
      // import { formComponent } from '../state'
export default {
  onAttached() {
    const form = this.$WEAPPS_COMP.handler.getForm()
    if (!form) {
      console.warn('FormItem 应当放在 Form 中')
      return
    }
    form.formItems = form.formItems || []
    form.formItems.push(this.$WEAPPS_COMP.node)
  },
  onDetached() {
    const form = this.$WEAPPS_COMP.handler.getForm()
    if (!form) return
    if (form.formItems && form.formItems.length) {
      // 按ID查找, 避免出错
      const idx = form.formItems.findIndex(item => this.$WEAPPS_COMP.node === item)
      if (idx > -1) {
        form.formItems.splice(idx, 1)
      }
    }
  },
  onReady() {
    // const children = this.$WEAPPS_COMP.node.children
    // if (children.length > 1) {
    //   console.error(`FormItem 中只能包含一个元素`)
    // }

    // const formComponent = ['Input', 'Textarea', 'Number', 'Selector', 'MultiSelector',
      // 'Time', 'Date', 'Region', 'CheckboxGroup', 'RadioGroup', 'Switch', 'Slider', 'Uploader']
    // this.$WEAPPS_COMP.handler.getFormChild()
    // const getElement = () => this.$WEAPPS_COMP.node.children[0]
    const getElement = () => (this.$WEAPPS_COMP.handler.getFormChild() || {})
    // const element = getElement()
    // const isFormComp = formComponent.includes(element && element.widgetType.split(":")[1])
    // if (!isFormComp) {
    //   console.error(`FormItem 中必须有且只有一个 表单元素 ${formComponent.join(',')}`)
    // }

    // 必须通过 getElement 方法才能保证取到的是最新的 element，不要用上面的 element 对象
    this.$WEAPPS_COMP.node.getField = () => {
      const { name: oldName, value: originalValue } = getElement()
      // 使用转换器转换表单提交时的数据格式
      const value = typeof this.$WEAPPS_COMP.props.data.submitFormatter === 'function' ? this.$WEAPPS_COMP.props.data.submitFormatter(originalValue) : originalValue
      const name = this.$WEAPPS_COMP.props.data.name || oldName
      return { name, value }
    }
    this.$WEAPPS_COMP.node.reset = () => this.$WEAPPS_COMP.handler.setValue('')
    this.$WEAPPS_COMP.node.setValue = this.$WEAPPS_COMP.handler.setValue
    this.$WEAPPS_COMP.node.validate = this.$WEAPPS_COMP.handler.handleValidate
    this.$WEAPPS_COMP.node.setValidateState = this.$WEAPPS_COMP.handler.setValidateState
    const { triggerType } = this.$WEAPPS_COMP.props.data
    getElement()[triggerType] = () => {
      //校验
      this.$WEAPPS_COMP.handler.handleValidate()
    }
  }
} ;