if (typeof window==='undefined') {
  performance = require('perf_hooks').performance
}

var fn = function(arrs) {
  var r=[...new Set(arrs[0])]
  arrs.forEach((arr, i) => {
    if (i===0) return
    r=r.filter(e => arr.includes(e))
  })
  return r
}

var fn = function(arrs) {
  var m=new Map(), n=arrs.length-1
  for (let e of new Set(arrs[0])) {
    m.set(e, 0)
  }
  arrs.forEach((arr, i) => {
    if (i===0) return
    for (let e of arr) {
      if (m.get(e)===i-1) m.set(e, i)
    }
  })
  for (let [k, v] of m) {
    if (v!==n) m.delete(k)
  }
  return [...m.keys()]
}

const input = [
  [[1,1,1,2,2,3,4,5,5],[1,2,3],[2,3,4],[6,9,2]],
  [[1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6]],
]
const expect = [
  'rgb(240,240,240)',
  'rgb(153,255,204)',
  null,
]

// test cases
console.time('test')

const o = {}
const l=input.map(e => o[e] = JSON.stringify(fn(e)))
// https://developer.mozilla.org/zh-CN/docs/Web/API/Console/table
console.table(o)
// console.assert(l.every((e,i) => e===o[input[i]]))

console.timeEnd('test')