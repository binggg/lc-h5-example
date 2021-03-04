import * as React from 'react';

export default class ReactCanvas extends React.Component {
  ref = this.props.domRef || React.createRef()

  componentDidMount() {
    this.draw()
  }

  componentWillUnmount() {
    const { emit } = this.props;
    emit && emit('renderStop')
    emit && emit('detached')
  }


  draw = () => {
    const { data, emit } = this.props;
    const { type } = data;
    const canvas = this.ref.current
    const ctx = canvas.getContext(type);
    emit && emit('render', { ctx, canvas })
    emit && emit('attached', { ctx, canvas })
  }


  render() {
    const { id, data, style, className, emit } = this.props
    const { type, width, height } = data;

    const fixStyle = {
      ...style,
      height: height + 'px',
      width: width + 'px',
    }

    // 模拟cover-view
    return <canvas ref={this.ref}
      id={id}
      style={fixStyle}
      className={className}
      width={width}
      height={height}
      type={type}
      onClick={(v) => emit('tap', v)}
      onTouchStart={(v) => emit('touchstart', v)}
      onTouchMove={(v) => emit('touchmove', v)}
      onTouchEnd={(v) => emit('touchend', v)}
      onTouchCancel={(v) => emit('touchcancel', v)}
      onError={(e) => emit('error', e)}
    />
  }
}
