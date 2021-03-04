let instances = null;
const componentInstanceIndexMap = new Map();

export function initComponentInstanceIndexMap(componentInstances) {
  instances = componentInstances;
  return generateComponentInstanceIndexMap(instances);
}

function generateComponentInstanceIndexMap() {
  componentInstanceIndexMap.clear();
  instances.forEach(({ key, children }, index) => {
    if (children) {
      children.forEach(({ key }, childIndex) => setComponentInstanceIndex(key, childIndex, index));
    }
    setComponentInstanceIndex(key, index);
  });

  function setComponentInstanceIndex(key, index, parentIndex) {
    return componentInstanceIndexMap.set(key, { index, parentIndex });
  }
}

export function getComponentInstanceIndex(key) {
  return componentInstanceIndexMap.get(key);
}

export function getComponentInstance(key) {
  const iIndex = getComponentInstanceIndex(key);
  if (!iIndex) {
    return null;
  }

  const { index, parentIndex } = iIndex;
  let componentInstances = instances;
  if (typeof parentIndex === 'number') {
    componentInstances = componentInstances[parentIndex].children;
  }
  return componentInstances[index];
}
