var fn = function (strs) {
  var m = new Map()
  var i = -1
  var l = strs.length
  while(++i<l) {
    const key = strs[i].split('').sort().join('')
    if (m.has(key)) m.get(key).push(strs[i])
    else m.set(key, [strs[i]])
  }
  return [...m.values()]
};

const test = ["eat","tea","tan","ate","nat","bat"]
// const test = [1,2,3,4,7]

const res = fn(test)
console.log(res)
