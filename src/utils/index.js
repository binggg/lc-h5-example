export function createComputed(funcs, bindContext = null) {
  const obj = {};
  for (const name in funcs) {
    Object.defineProperty(obj, name, {
      get: bindContext ? funcs[name].bind(bindContext) : funcs[name],
    });
  }
  return obj;
}
