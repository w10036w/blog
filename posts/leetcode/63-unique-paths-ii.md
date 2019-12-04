## [62. Unique Paths](https://leetcode.com/problems/unique-paths/)
A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).

The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).

Now consider if some obstacles are added to the grids. How many unique paths would there be?

An obstacle and empty space is marked as 1 and 0 respectively in the grid.

Note: m and n will be at most 100.

Example:

```js
Input:
[
  [0,0,0],
  [0,1,0],
  [0,0,0]
]
Output: 2
Explanation:
There is one obstacle in the middle of the 3x3 grid above.
There are two ways to reach the bottom-right corner:
1. Right -> Right -> Down -> Down
2. Down -> Down -> Right -> Right
```

Follow up: [980. Unique Paths III](https://leetcode.com/problems/unique-paths-iii/)

My solution (one of the best)

```js
/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function(obstacleGrid) {
  if (obstacleGrid[0][0] === 1) return 0
  const m = obstacleGrid.length
  const n = obstacleGrid[0].length
  if(m===1) return obstacleGrid[0].includes(1) ? 0 : 1
  if (n===1) return obstacleGrid.every(e => e[0]===0)) ? 1 : 0
  let i = -1
  let j = -1
  const M = (new Array(m)).fill([])
  const gRes = (a,b, M) => {
    if (a<0||b<0) return 0
    if (obstacleGrid[a][b] ===1) return 0
    if(typeof M[a][b] === 'undefined'){
      if (a===0) return M[a].includes(0) ? 0 : 1
      if (b===0){
        let k = a
        while(--k>0){
          if (M[k][b] === 0) return 0
        }
        return 1
      }
    }
    return M[a][b]
  }
  while (++i<m) {
    while (++j<n) {
      if (obstacleGrid[i][j]===1) M[i][j] = 0
      else if (i===0 && j===0) M[i][j] = 1
      else M[i][j] = gRes(i-1, j, M) + gRes(i, j-1, M)
    }
    j=-1
  }
  return M[m-1][n-1]
};
```
