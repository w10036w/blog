## [136. Single Number](https://leetcode.com/problems/single-number/)
> top100

Given a non-empty array of integers, every element appears twice except for one. Find that single one.

Note:

Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?

Example 1:
```js
Input: [2,2,1]
Output: 1
```
Example 2:
```js
Input: [4,1,2,1,2]
Output: 4
```
## solution
bitwise
```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
  return nums.reduce((res, cur)=>res^cur)
};
```
math
```js
var singleNumber = function(nums) {
  var unique=[...new Set(nums)],
      sum1=nums.reduce((sum, cur)=>sum+=cur, 0),
      sum2=unique.reduce((sum, cur)=>sum+=cur, 0)
  return sum2*2-sum1
};
```
