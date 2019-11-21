function isType (target, type) {
  const t = Object.prototype.toString.call(target)
  if (Array.isArray(type)) {
    return type.some(e => `[object ${e}]` === t)
  }
  return t === `[object ${type}]`
}

// or use @babel/plugin-proposal-optional-chaining
// https://babeljs.io/docs/en/babel-plugin-proposal-optional-chaining
const get = (obj, path, defaultValue) => {
  const result = String.prototype.split.call(path, /[,[\].]+?/)
    .filter(Boolean)
    .reduce((res, key) => (res !== null && res !== undefined) ? res[key] : res, obj);
  return (result === undefined || result === obj) ? defaultValue : result;
}

// naive clone (no circular, no symbol/set/map/other complexåß types)
const clone = target => {
  if (typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {};
    for (const key in target) {
        cloneTarget[key] = clone(target[key]);
    }
    return cloneTarget;
  } else {
    return target;
  }
}

const baseMerge = (target, source) => {
  if (!isType(target, 'Object') || !isType(source, 'Object')) {
    return source === undefined ? target : source
  }
  return Object.keys({
    ...target,
    ...source,
  }).reduce((acc, key) => {
    acc[key] = baseMerge(target[key], source[key])
    return acc
  }, Array.isArray(source) ? [] : {})
}
// accept sources and other options.
// return new merged object
// defaultOptions = {
//   unique: false
// }
const merge = (sources) => {
  if (!Array.isArray(sources)) return sources
  let o = {}
  sources.forEach(src => {
    if (isType(src, ['Object', 'Array'])) {
      o = baseMerge(o, src)
    }
  })
  return o
}

console.log('merge', merge([{a:1}, {b:2}]))
console.log('merge', merge([ {a: {b:1}, b: [2]}, {b:[3],c:1}, {a: {a:1}, d:2} ]))