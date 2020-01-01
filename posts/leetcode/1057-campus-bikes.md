## [1057. Campus Bikes](https://leetcode.com/problems/campus-bikes)
> bytedance,

On a campus represented as a 2D grid, there are Nworkers and Mbikes, with N <= M. Each worker and bike is a 2D coordinate on this grid.

Our goal is to assign a bike to each worker. Among the available bikes and workers, we choose the (worker, bike) pair with the shortest Manhattan distance between each other, and assign the bike to that worker. (If there are multiple (worker, bike) pairs with the same shortest Manhattan distance, we choose the pair with the smallest worker index; if there are multiple ways to do that, we choose the pair with the smallest bike index). We repeat this process until there are no available workers.

The Manhattan distance between two points p1 and p2 is

`Manhattan(p1, p2) = |p1.x - p2.x| + |p1.y - p2.y|`

Return a vector ansof length N, where `ans[i]` is the index (0-indexed) of the bike that the i-th worker is assigned to.

Example 2
```js
Input:
workers = [[0,0],[1,1],[2,0]],
bikes = [[1,0],[2,2],[2,1]]
Output:
[0,2,1]
Explanation:

Worker 0 grabs Bike 0 at first. Worker 1 and Worker 2 share the same distance to Bike 2, thus Worker 1 is assigned to Bike 2, and Worker 2 will take Bike 1. So the output is [0,2,1].
```
Note:
- `0 <= workers[i][j], bikes[i][j] < 1000`
- All worker and bike locations are distinct.
- `1 <= workers.length <= bikes.length <= 1000`
## solution
> [参考链接](https://blog.csdn.net/qq_17550379/article/details/89305804)
>
> 由于是从小到大取，所以不难想到通过排序优化。我们可以将通过数组存储这样的 (距离,x,y) 结构，然后对其排序。接着对排好序的数据从前往后取，取得过程中同样要剔除相应访问过的横纵坐标。
```js
/**
 * @param {number[][]} workers
 * @param {number[][]} bikes
 * @return {number[]}
 */
var assignBikes = function(workers, bikes) {
  var res=[], m=[], usedBikes=new Set()
  for(var i=0;i<workers.length;i++) {
    for(var j=0;j<bikes.length;j++) {
      m.push([mhd(workers[i], bikes[j]), i, j])
    }
  }
  m.sort((a,b)=> {
    if(a[0]===b[0]) return a[1]-b[1] // 如果距离相同, 按工号排序
    return a[0]-b[0] // 距离最小在最前
  })
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
```
