if (typeof window==='undefined') {
  performance = require('perf_hooks').performance
}

var fn = function hexToRGB(hex) {
  if (!/^#([0-9A-Fa-f]{3})?[0-9A-Fa-f]{3}$/.test(hex)) return null
  var a,b,c
  if (hex.length===4) {
    a=h2n(hex[1]+hex[1]), b=h2n(hex[2]+hex[2]), c=h2n(hex[3]+hex[3])
  } else {
    a=h2n(hex[1]+hex[2]), b=h2n(hex[3]+hex[4]), c=h2n(hex[5]+hex[6])
  }
  return `rgb(${a},${b},${c})`
}
const h2n = hex => parseInt(hex, 16)

const start=performance.now()

const input = [
  '#f0f0F0',
  '#9fc',
  'sdf'
]
const expect = [
  'rgb(240,240,240)',
  'rgb(153,255,204)',
  null,
]

// test cases
console.time('test')

const o = {}
const l=input.map(e => o[e] = fn(e))
// https://developer.mozilla.org/zh-CN/docs/Web/API/Console/table
console.table(o)
console.assert(l.every((e,i) => e===o[input[i]]))

console.timeEnd('test')