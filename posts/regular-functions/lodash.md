# lodash / ramda functions replacement
> refer to [you don't need lodash](https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore)

## get
> Gets the value at path of object. If the resolved value is `undefined`, the `defaultValue` is returned in its place.

**NOTE: or use [@babel/plugin-proposal-optional-chaining](https://babeljs.io/docs/en/babel-plugin-proposal-optional-chaining) example: const baz = obj?.foo?.bar?.baz **

```js
const get = (obj, path, defaultValue) => {
  const result = String.prototype.split.call(path, /[,[\].]+?/)
    .filter(Boolean)
    .reduce((res, key) => (res !== null && res !== undefined) ? res[key] : res, obj);
  return (result === undefined || result === obj) ? defaultValue : result;
}
```

## merge
> recursively merges own and inherited enumerable string keyed properties of source objects into the destination object.

**NOTE: highly used in graphql, e.g. merge resolvers(Query, Mutations)**

```js
function isType (target, type) {
  const t = Object.prototype.toString.call(target)
  if (Array.isArray(type)) {
    return type.some(e => `[object ${e}]` === t)
  }
  return t === `[object ${type}]`
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
```

## compact
> Creates an array with all falsey values removed. The values `false`, `null`, `0`, `""`, `undefined`, and `NaN` are falsey.

**NOTE: if input is confirmed to be an array, use `arr.filter(Boolean)` instead**

```js
const compact = (arr) => {
  if (!Array.isArray(arr)) return []
  return arr.filter(Boolean)
}
```

## isEmpty

```js
const isEmpty = (obj) => {
  if (type)
}
```
