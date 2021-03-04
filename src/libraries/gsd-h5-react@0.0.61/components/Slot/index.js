
function Container ({ compositeParent, data, id,  style, className, emit }) {
  if(!compositeParent) {
    console.warn('Slot组件只能用于实现复合组件')
    return 'Slot - ' + data.name
  }
  return compositeParent.props.data[data.name] || null;
}

export default Container;
