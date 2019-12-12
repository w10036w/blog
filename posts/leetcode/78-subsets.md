
# [78. Subsets](https://leetcode.com/problems/subsets/)
Given a set of distinct integers, nums, return all possible subsets (the power set).

Note: The solution set must not contain duplicate subsets.

Example:
```js
Input: nums = [1,2,3]
Output:
[
  [3],
  [1],
  [2],
  [1,2,3],
  [1,3],
  [2,3],
  [1,2],
  []
]
```
DFS solution:
```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
  let result = []
  function dfs(startIdx, chosen) {
    result.push(chosen.slice())
    for (let i = startIdx; i < nums.length; i++) {
      chosen.push(nums[i])
      dfs(i + 1, chosen)
      chosen.pop()
    }
  }
  dfs(0, [])
  return result

  
};
```
own solution
```js
var subsets = function(nums) {
  const res = []

  function bs (l, pos, tmp) {
    if (l===0) return res.push([])
    if (l===nums.length) return res.push(nums.slice())
    if (tmp.length===l) return res.push(tmp.slice())
    for (let i=pos;i<nums.length;i++) {
      bs(l, i+1, [...tmp, nums[i]])
    }
  }

  for (let i=0;i<=nums.length;i++) {
    bs(i, 0, [], nums)
  }
  return res
}
```
