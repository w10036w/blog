# [27. Remove Element](https://leetcode.com/problems/remove-element)

Given an array nums and a value val, remove all instances of that value in-place and return the new length.

Do not allocate extra space for another array, you must do this by **modifying the input array** in-place with O(1) extra memory.

The order of elements can be changed.

example:

```js
Input: [3,2,2,3], 3
Output: 2 (and modify nums)
```
solution 1 ([].indexOf + [].splice) & 2 (2 pointers)

```js
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
  // solution 1
  while(nums.indexOf(val)>-1) {
    nums.splice(nums.indexOf(val), 1)
  }
  return nums.length

  // solution 2 (2 pointers)
  // let i = -1
  // const l = nums.length
  // let n = 0
  // while (++i<l) {
  //   if (nums[i]!==val) nums[n++] = nums[i]
  // }
  // return n
};
```

thoughts: `[].splice(start[, deleteCount[, item1[, item2[, ...]]]])`
