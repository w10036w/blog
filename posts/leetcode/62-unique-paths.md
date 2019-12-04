## [62. Unique Paths](https://leetcode.com/problems/unique-paths/)
A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).

The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).

How many possible unique paths are there?

Example:

```js
Input: m=3, n=2
Output: 3

Input: m=7, n=3
Output: 28
```

Follow up: [63. Unique Paths II](https://leetcode.com/problems/unique-paths-ii/)

```js
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    if (m===1 || n===1) return 1
  let M = (new Array(m)).fill([])
  let i = 0
  let j = 0
  while(++i<m) {
    while(++j<n) {
      M[i][j] = (M[i-1][j]||1) + (M[i][j-1]||1)
    }
    j = 0 // ! DON'T forget reset j in the end
  }
  return M[m-1][n-1]
};
```
