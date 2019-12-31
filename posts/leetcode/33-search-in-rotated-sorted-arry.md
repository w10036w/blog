## [33. Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)
> bytedance,

Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.

(i.e., [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2]).

You are given a target value to search. If found in the array return its index, otherwise return -1.

You may assume no duplicate exists in the array.

Your algorithm's runtime complexity must be in the order of O(log n).

Example 1:
```js
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
```
Example 2:
```js
Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
```
分析:
1. 二分搜索
2. 找出循环子问题
3. 注意相等

solution
```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
  var l=0, r=nums.length-1
  while (l<=r) {
    var mid=(l+r)/2>>0
    if (nums[mid]===target) return mid
    if (nums[l]<=nums[mid]) { // left is sorted
      if (nums[l]<=target && target<nums[mid]) r=mid-1
      else l=mid+1
    } else { // right is sorted
      if (nums[mid]<target && target<=nums[r]) l=mid+1
      else r=mid-1
    }
  }
  return -1
};
```
