## [283. Move Zeroes](https://leetcode.com/problems/move-zeroes/)
> top100

Given an array nums, write a function to move all 0's to the end of it while maintaining the relative order of the non-zero elements.

Example:

Input: [0,1,0,3,12]
Output: [1,3,12,0,0]
Note:

You must do this in-place without making a copy of the array.
Minimize the total number of operations.

## solution

2 pointers
```js
var moveZeroes = function(nums) {
  var p=0, i=-1
  while(++i<nums.length) if(nums[i]!==0) nums[p++]=nums[i]
  nums.fill(0, p)
}
```
mine
```js
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
  var not0=-1, is0=[]
  for(var i=0;i<nums.length;i++) {
    if (nums[i]===0) {
      if (not0===-1) is0.push(i)
      else {
        nums[i]=not0
        not0=-1
      }
    } else {
      if (is0.length) {
        nums[is0.shift()]=nums[i]
        is0.push(i)
        nums[i]=0
      }
    }
  }
};
```
