## [812. Largest Triangle Area](https://leetcode.com/problems/largest-triangle-area/)
> google,

You have a list of points in the plane. Return the area of the largest triangle that can be formed by any 3 of the points.

Example:
```js
Input: points = [[0,0],[0,1],[1,0],[0,2],[2,0]]
Output: 2
```
Explanation:

The five points are show in the figure below. The red triangle is the largest.

Notes:
- `3 <= points.length <= 50`.
- No points will be duplicated.
- `-50 <= points[i][j] <= 50`.
- Answers within `10^-6` of the true value will be accepted as correct.
## solution

纯数学公式:
https://leetcode.com/problems/largest-triangle-area/discuss/122711/C%2B%2BJavaPython-Solution-with-Explanation-and-Prove

`S = .5*(p[0][0]*p[1][1]+p[0][1]*)`
```js
/**
 * @param {number[][]} points
 * @return {number}
 */
var largestTriangleArea = function(points) {
  var r=0, len=points.length
  for(var i=0; i<len-2; i++) {
    for (var j=i+1; j<len-1; j++) {
      for(var k=j+1; k<len; k++) {
        var tri=calc(points[i], points[j], points[k])
        if (tri>r) r=tri
      }
    }
  }
  return r
};

function calc(i, j, k) {
  return .5*(Math.abs(
    i[0]*j[1]+j[0]*k[1]+k[0]*i[1]-j[0]*i[1]-k[0]*j[1]-i[0]*k[1]
  ))
}
```
