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

const tests = [
  '#f0f0F0',
  '#9fc',
  'sdf'
]

// test cases
const t= parseInt(performance.now()-start)

const o = {}
tests.forEach(e => {
  o[e] = fn(e)
})
console.table(o)

console.log('time: '+t+'ms')