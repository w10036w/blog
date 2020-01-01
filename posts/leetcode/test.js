var fn = function(workers, bikes) {
  var res=[], lw=workers.length, lb=bikes.length, m=[], usedBikes=new Set()
  for(var i=0;i<lw;i++) {
    for(var j=0;j<lb;j++) {
      m.push([mhd(workers[i], bikes[j]), i, j])
    }
  }
  m.sort((a,b)=> a[0]-b[0])
  for(var e of m) {
    var [, w, b]=e
    if (res[w]===undefined && !usedBikes.has(b)) {
      usedBikes.add(b)
      res[w]=b
    }
  }
  return res
}
var mhd=(a, b)=>Math.abs(a[0]-b[0])+Math.abs(a[1]-b[1])

// const test = ["eat","tea","tan","ate","nat","bat"]
const test = [1,2,3,4,7]
// nums1 = [1,3,5,7,9,0,0,0,0], m = 5
// nums2 = [2,4,6,8,10],       n = 5
// const res = fn([[0,0],[1,1],[2,0]], [[1,0],[2,2],[2,1]])
const res = fn([[0,0],[2,1]], [[1,2],[3,3]])
console.log(res)
