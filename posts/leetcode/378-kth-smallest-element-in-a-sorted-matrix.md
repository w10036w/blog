## [378. Kth Smallest Element in a Sorted Matrix](https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/)
> medium

Given a n x n matrix where each of the rows and columns are sorted in ascending order, find the kth smallest element in the matrix.

Note that it is the kth smallest element in the sorted order, not the kth distinct element.

Example:
```js
matrix = [
  [ 1,  5,  9],
  [10, 11, 13],
  [12, 13, 15]
],
k = 8,

return 13.
```
Note:
You may assume k is always valid, `1 ≤ k ≤ n2`.

## solution
best
```js
/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
const getLessEqual = (matrix, mid) => {
  const n = matrix.length
  let count = 0
  let i = n - 1
  let j = 0
  while (0 <= i && j < n) {
    if (matrix[i][j] > mid) {
      i--
    } else {
      count += i + 1
      j++
    }
  }
  return count
}

var kthSmallest = function (matrix, k) {
  const n = matrix.length
  let low = matrix[0][0]
  let high = matrix[n - 1][n - 1]
  while (low < high) {
    const mid = (low+high)>>1
    const count = getLessEqual(matrix, mid)
    if (count < k) low = mid + 1
    else high = mid
  }
  return low
};
```

lazy
```js
var kthSmallest = function(matrix, k) {
  var n=matrix.length
  if (n===0) return null
  var arr=[]
  for(var i=0;i<n;i++) arr.push(...matrix[i])
  return arr.sort((a,b)=>a-b)[k-1]
};
```
