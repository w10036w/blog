## [39. Combination Sum](https://leetcode.com/problems/combination-sum/)
Given a **set** of candidate numbers (candidates) (without duplicates) and a target number (target), find all unique combinations in candidates where the candidate numbers sums to target.

The same repeated number may be chosen from candidates unlimited number of times.

Note:

All numbers (including target) will be positive integers.
The solution set must not contain duplicate combinations.
Example 1:
```js
Input: candidates = [2,3,6,7], target = 7,
A solution set is:
[
  [7],
  [2,2,3]
]
```
Example 2:
```js
Input: candidates = [2,3,5], target = 8,
A solution set is:
[
  [2,2,2,2],
  [2,3,3],
  [3,5]
]
```
My solution

```js
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
  candidates.sort((a,b)=> a-b)
  const res = []
  const len = candidates.length
  bs(0, target)
  return res
  
  function bs(p, target, used=[]) {
    if (target===0) return res.push(used.slice())
    for (let i=p; i<len; i++) {
      const e = candidates[i]
      if (target-e<0) break;
      used.push(e)
      bs(i, target-e, used)
      used.pop()
    }
  }
};
```
