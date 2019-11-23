/**
 * @param {string} digits
 * @return {string[]}
 */
var fn = function(digits) {
  if (digits == null || digits.length === 0) return [];
  const mapping = {
    2:['a', 'b', 'c'],
    3:['d', 'e', 'f'],
    4:['g', 'h', 'i'],
    5:['j', 'k', 'l'],
    6:['m', 'n', 'o'],
    7:['p', 'q', 'r', 's'],
    8:['t', 'u', 'v'],
    9:['w', 'x', 'y', 'z'],
  }
  let i = 0
  const len = digits.length
  let r = mapping[digits[i]]
  while (++i<len) {
    const temp = []
    r.forEach(e => {
      mapping[digits[i]].forEach(el => {
        temp.push(e+el)
      })
    })
    r = temp
  }
  return r
};
// test
const test = "23"

console.log(fn(test))