const time = Date.now() * 1e3
const start = process.hrtime()

function now() {
  const diff = process.hrtime(start)
  return time + diff[0] * 1e6 + Math.round(diff[1] * 1e-3)
}
console.log(now())
console.log(Date.now())