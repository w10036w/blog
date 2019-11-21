
const { performance } = require('perf_hooks')

// function benchmark(funcs) {
//   let res
//   if (Array.isArray(funcs)) {
//     res = funcs.forEach(fn => measure(fn))
//     console.table
//   } else {
//     res = measure(funcs)
//   }
//   console
// }

// cases must be array
function measure(fn, cases) {
  let tsStart
  if (cases) {
    let i = -1
    let l = cases.length
    // function with arguments
    tsStart = performance.now()
    while(++i<l) {
      fn(cases[i])
    }
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
// console.table([performance.now(), 2,1])
