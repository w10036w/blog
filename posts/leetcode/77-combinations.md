## [77. Combinations](https://leetcode.com/problems/combinations/)
Given two integers n and k, return all possible combinations of k numbers out of 1 ... n.

Example:
```js
Input: n = 4, k = 2
Output:
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]
```

My solution

```js
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
  var res = []
  if (n<1 || k>n) return res
  bt(1, k)
  return res
  
  function bt(p, k, used=[]) {
    if (k<0) return
    if (k===0) return res.push(used.slice())
    for (let i=p; i<=n; i++) {
      used.push(i)
      bt(i+1, k-1, used)
      used.pop()
    }
  }
};
```
