## [90. Subsets II](https://leetcode.com/problems/subsets-ii/)
Given a collection of integers that might contain duplicates, nums, return all possible subsets (the power set).

Note: The solution set must not contain duplicate subsets.

Example:
```js
Input: [1,2,2]
Output:
[
  [2],
  [1],
  [1,2,2],
  [2,2],
  [1,2],
  []
]
```
My solution

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function(nums) {
  nums.sort((a,b)=>a-b)
  const res = []
  dfs(0, [])
  return res
  function dfs(p, used) {
    res.push(used.slice())
    if (p===nums.length) return;
    for(var i=p;i<nums.length;i++) {
      if (i>p && nums[i]===nums[i-1]) continue;
      used.push(nums[i])
      dfs(i+1, used)
      used.pop()
    }
  }
};
```
