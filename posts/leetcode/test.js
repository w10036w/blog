if (typeof window==='undefined') {
  performance = require('perf_hooks').performance
}
var fn = function(s, pairs) {
  var res=s.split(''), arr=[]
  for(var i=0;i<s.length;i++) arr[i]=i
  function find(x) {
    while(arr[x]!==x) x=arr[x]
    return arr[x]
  }
  function union(x, y) {
    var [x,y]=[find(x), find(y)]
    if (x!==y) arr[x]=y
  }
  for (var [x, y] of pairs) union(x, y)
  return arr
}
// const test = ["eat","tea","tan","ate","nat","bat"]
const test = 'yvvy'

const pairs=[[0,3],[1,2],[0,2]]
// const pairs=[[0,3],[0,2]]

const start=performance.now()
const res = fn(test, pairs)
const t= parseInt(performance.now()-start)
console.log(res)
console.log('time: '+t+'ms')