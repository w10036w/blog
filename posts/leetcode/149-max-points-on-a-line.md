## [149. Max Points on a Line](https://leetcode.com/problems/max-points-on-a-line/)

Given n points on a 2D plane, find the maximum number of points that lie on the same straight line.

Example 1:
```js
Input: [[1,1],[2,2],[3,3]]
Output: 3
Explanation:
^
|
|        o
|     o
|  o  
+------------->
0  1  2  3  4
```
Example 2:
```js
Input: [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]
Output: 4
Explanation:
^
|
|  o
|     o        o
|        o
|  o        o
+------------------->
0  1  2  3  4  5  6
```

## solution
思路:
暴力对每个点都建立一个 map
注意处理除数为 `0` 导致的 `Infinity` 和 `-Infinity`

> remix for [this solu](https://leetcode.com/problems/max-points-on-a-line/discuss/431375/JavaScript-Solution)
```js
/**
 * @param {number[][]} points
 * @return {number}
 */
var maxPoints = function(points) {
  if (points.length<=2) return points.length
  var res=2, n=points.length
  for(var i=0;i<n-1;i++) {
    var m={_:0}, dup=1, r // KEY avoid when map = {}, the max value is -Infinity
    for(var j=i+1;j<n;j++) {
      var [[x1, y1], [x2, y2]]=[points[i], points[j]]
      if (x1===x2 && y1===y2) dup++ // KEY
      else {
        var k=(x1-x2)/(y1-y2)
        if (k===-Infinity) t=Infinity // KEY
        m[k]=m[k]?m[k]+1:1
      }
    }
    r=Math.max(...Object.values(m))+dup
    res=Math.max(res, r)
  }
  return res
};
```
