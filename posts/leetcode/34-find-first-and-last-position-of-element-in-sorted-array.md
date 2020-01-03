## [34. Find First and Last Position of Element in Sorted Array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/)
> top100,

Given an array of integers nums sorted in ascending order, find the starting and ending position of a given target value.

Your algorithm's runtime complexity must be in the order of O(log n).

If the target is not found in the array, return [-1, -1].

Example 1:
```js
Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]
```
Example 2:
```js
Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]
```
## solution

二分法查找
```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
  var res=[-1,-1]
  dac(nums, 0, nums.length-1, res, target)
  return res
  
};
function dac(nums, l, r, res, target) {
  if (l>r)return
  var m=(l+r)>>1
  if (nums[m]>target) return dac(nums, l, m-1, res, target)
  if(nums[m]<target) return dac(nums, m+1, r, res, target)
  res[0]=res[0]===-1 ? m : Math.min(res[0], m)
  res[1]=Math.max(res[1], m)
  dac(nums, l, m-1, res, target)
  dac(nums, m+1, r, res, target)
}
```
