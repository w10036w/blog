# [26. Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array)

Given an array nums and a value val, remove all instances of that value in-place and return the new length.

Do not allocate extra space for another array, you must do this by **modifying the input array** in-place with O(1) extra memory.

The order of elements can be changed.

example:

```js
Input: [0,0,1,1,1,2,2,3,3,4]
Output: 5 (and modify nums)
```
solution (2 pointers)

```js
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeDuplicates = function(nums) {
  let [l, r, len] = [0, 0, nums.length]
  while (++r<len) {
    if (nums[l]!==nums[r]) nums[++l] = nums[r]
  }
  return l+1
};
```

thoughts: `[].splice(start[, deleteCount[, item1[, item2[, ...]]]])`
