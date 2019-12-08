
# [75. Sort Colors](https://leetcode.com/problems/sort-colors/)

Given an array with n objects colored red, white or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white and blue.

Here, we will use the integers 0, 1, and 2 to represent the color red, white, and blue respectively.

Note: You are not suppose to use the library's sort function for this problem.

Example:
```js
Input: [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]
```
Follow up:

- A rather straight forward solution is a two-pass algorithm using counting sort.
  
  First, iterate the array counting number of 0's, 1's, and 2's, then overwrite array with total number of 0's, then 1's and followed by 2's.
- Could you come up with a one-pass algorithm using only constant space?

thoughts:
1. set `a, b, c` to save the count of 0,1,2, then rewrite the array
2. iterate nums[i], if 0 move to start/the end of 0, if 2 move to end
3. set `a, b, c` to iterate push(0/1/2), [...a, ...b, ...c]
4. common solution for n>3 colors:
   1. quicksort
solution:
```js
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
  // 2.
  let j = 0
  let i = -1
  let k = nums.length-1
  while (++i<=k) {
    if (nums[i]===0) [ nums[i], nums[j++] ] = [ nums[j], nums[i] ]
    else if (nums[i]===2) [ nums[i--], nums[k--] ] = [ nums[k], nums[i] ]
  }
  return nums

  //  dutch partitioning problem
  // todo
  // https://leetcode.com/problems/sort-colors/discuss/26481/Python-O(n)-1-pass-in-place-solution-with-explanation
};
```
