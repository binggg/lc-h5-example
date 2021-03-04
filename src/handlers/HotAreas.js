import * as React from 'react';
import { HotAreaActionHandler } from './actionHandler';

function percent(p) {
  return `${p}%`;
}

export function HotAreas({ instance, global, meta }) {
  const { hotAreas } = instance.data;
  if (!hotAreas || !hotAreas.length) {
    return null;
  }

  return hotAreas.map((hotArea, index) => {
    const { size, position } = hotArea;

    return (
      <HotAreaActionHandler
        key={index}  // eslint-disable-line
        instance={instance}
        hotArea={hotArea}
        meta={meta}
        global={global}
        style={{
          width: percent(size.width),
          height: percent(size.height),
          left: percent(position.x),
          top: percent(position.y),
          cursor: 'pointer',
          position: 'absolute',
          zIndex: 20,
        }}
      />
    );
  });
}
