## [40. Combination Sum II](https://leetcode.com/problems/combination-sum-ii/)
Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sums to target.

Each number in candidates may only be used once in the combination.

Note:

All numbers (including target) will be positive integers.
The solution set must not contain duplicate combinations.

Example 1:
```js
Input: candidates = [10,1,2,7,6,1,5], target = 8,
A solution set is:
[
  [1, 7],
  [1, 2, 5],
  [2, 6],
  [1, 1, 6]
]
```
Example 2:
```js
Input: candidates = [2,5,2,1,2], target = 5,
A solution set is:
[
  [1,2,2],
  [5]
]
```

My solution

```js
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
  candidates.sort((a,b) => a-b)
  const res = []
  const len = candidates.length
  gSum(candidates, 0, target)
  
  function gSum(nums, p, sum, used=[]) {
    if (sum===0) return res.push(used.slice())
    if (sum<0) return;
    for (let i=p;i<len;i++) {
      if (i>p && nums[i]===nums[i-1]) continue // KEY, remove duplicate
      used.push(nums[i])
      gSum(nums, i+1, sum-nums[i], used)
      used.pop()
    }
  }
  return res
};
```
