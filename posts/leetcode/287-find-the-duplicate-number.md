# [287. Find the Duplicate Number](https://leetcode.com/problems/find-the-duplicate-number/)

Given an array nums containing n + 1 integers where each integer is between 1 and n (inclusive), prove that at least one duplicate number must exist. Assume that there is only one duplicate number, find the duplicate one.

Example 1:
```js
Input: [1,3,4,2,2]
Output: 2
```
Example 2:
```js
Input: [3,1,3,4,2]
Output: 3
```
Note:

- You must not modify the array (assume the array is read only).
- You must use only constant, O(1) extra space.
- Your runtime complexity should be less than O(n2).
- There is only one duplicate number in the array, but it could be repeated more than once.

solution:
```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {
  // set
  let set = new Set();
  let i =-1
  let l = nums.length
  while (++i<l) {
    let cur = nums[i]
    if (set.has(cur)) return cur
    set.add(cur)
  }
  
  // Floyd's tortoise and hare algorithm
  // var slow = 0;
  // var fast = 0;
  // var p = 0;
  // while (true) {
  //   slow = nums[slow];
  //   fast = nums[nums[fast]];
  //   if (slow === fast) {
  //     while (p !== fast) {
  //       p = nums[p]
  //       fast = nums[fast]
  //     }
  //     return p;
  //   }
  // }

  // sort and find
  // nums.sort() // hint: no need to specify a,b => a-b
  // let i = 0
  // while (nums[++i] !== nums[i-1]);
  // return nums[i]
};
```
