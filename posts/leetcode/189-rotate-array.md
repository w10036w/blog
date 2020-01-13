## [189. Rotate Array](https://leetcode.com/problems/rotate-array/)
Given an array, rotate the array to the right by k steps, where k is non-negative.

Example 1:
```js
Input: [1,2,3,4,5,6,7] and k = 3
Output: [5,6,7,1,2,3,4]
Explanation:
rotate 1 steps to the right: [7,1,2,3,4,5,6]
rotate 2 steps to the right: [6,7,1,2,3,4,5]
rotate 3 steps to the right: [5,6,7,1,2,3,4]
```
Example 2:
```js
Input: [-1,-100,3,99] and k = 2
Output: [3,99,-1,-100]
Explanation:
rotate 1 steps to the right: [99,-1,-100,3]
rotate 2 steps to the right: [3,99,-1,-100]
```
Note:

- Try to come up as many solutions as you can, there are at least 3 different ways to solve this problem.
- Could you do it in-place with O(1) extra space?

## solution
best 1: reverse 3 times
```js
var rotate = function(nums, k) {
  var len=nums.length, k%=nums.length
  reverse(0, len-1)
  reverse(0, k-1)
  reverse(k, len-1)
  function reverse(start, end) {
    do [nums[start], nums[end]]=[nums[end], nums[start]]
    while(++start<--end)
  }
}
```
best2: Cyclic Replacements 环状替换
```js
var rotate = function(nums, k) {
  var count=0, curr, prev, len=nums.length, reset
  k%=len
  for(var i=0; count<len; i++) {
    [curr, prev]=[i, nums[i]]
    do{
      var next=(curr+k)%len;
      [nums[next], prev, curr]=[prev, nums[next], next];
      count++
    }while(i!==curr)
  }
};
```

JS 语言特性
```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
  // js 语言特性, fastest
  var len=nums.length, arr=nums.slice(len-k)
  nums.unshift(...arr)
  nums.length=len
  
  // alter1
  // nums.unshift(...nums.splice(nums.length - k))

  // alter2
  // while(--k>=0) nums.unshift(nums.pop())
};
```
