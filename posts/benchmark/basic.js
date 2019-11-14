
const { performance } = require('perf_hooks')

function benchmark(funcs) {
  let res
  if (Array.isArray(funcs)) {
    res = funcs.forEach(fn => measure(fn))
    console.table
  } else {
    res = measure(funcs)
  }
  console
}

// fn is either [function, args] or function
function measure(fn) {
  let tsStart
  if (Array.isArray(fn)) {
    // function with arguments
    tsStart = performance.now()
    fn[0](fn[1])
  } else {
    tsStart = performance.now()
    fn()
  }
  const tsEnd = performance.now()
  return `time: ${tsEnd - tsStart}ms`
}
// console.time is not as accurate as performance.now()
// in node.js, either upgrade to 

// const scope = 'scope'
// const item = 'item'

// console.time(`${scope}/${item}`)

// console.timeEnd(`${scope}/${item}`)

// console.log(performance.now())
console.table([performance.now(), 2,1])