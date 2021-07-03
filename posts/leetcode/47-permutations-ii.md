## [47. Permutations II](https://leetcode.com/problems/permutations-ii/)

Given a collection of numbers that might contain duplicates, return all possible unique permutations.

Example:

```js
Input: [1,1,2]
Output:
[
  [1,1,2],
  [1,2,1],
  [2,1,1]
]

```

My solution

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
  const len = nums.length
  if (len===1) return [nums]
  nums.sort((a,b)=>a-b)
  const res = []
  const used = [] // KEY
  
  function dfs(tmp, nums, used) {
    if (tmp.length===len) return res.push(tmp.slice())
    for (let i=0; i<len; i++) {
      if (used[i]) continue;
      if (i>0 && nums[i]===nums[i-1] && !used[i-1]) continue; // KEY
      tmp.push(nums[i])
      used[i] = true
      dfs(tmp, nums, used)
      tmp.pop()
      used[i]=false
    }
  }
  dfs([], nums, used)
  
  return res
};
```
