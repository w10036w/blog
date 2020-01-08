
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

1.
```js
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
  var c0=c1=c2=0
  for(var i=0;i<nums.length;i++) {
    if (nums[i]===0) c0++
    else if (nums[i]===1) c1++
    else c2++
  }
  nums.fill(0, 0, c0).fill(1, c0, c0+c1).fill(2, c0+c1, c0+c1+c2)
};
```
2.
```js
var sortColors = function(nums) {
  var l=0, r=nums.length-1
  for(var i=0;i<=r;i++) {
    if (nums[i]===0) [ nums[i], nums[l++] ]=[ nums[l], nums[i] ]
    else if(nums[i]===2) [ nums[i], nums[r--] ]=[ nums[r], nums[i] ]
  }
}
```

TODO dutch partitioning problem

https://leetcode.com/problems/sort-colors/discuss/26481/Python-O(n)-1-pass-in-place-solution-with-explanation