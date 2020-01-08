## [169. Majority Element](https://leetcode.com/problems/majority-element/)
> top100

Given an array of size n, find the majority element. The majority element is the element that appears more than ⌊ n/2 ⌋ times.

You may assume that the array is non-empty and the majority element always exist in the array.

Example 1:
```js
Input: [3,2,3]
Output: 3
```
Example 2:
```js
Input: [2,2,1,1,1,2,2]
Output: 2
```

## solution
hashtable, O(n) + O(n)
```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
  var m={}, i=-1, n=nums.length
  while(++i<n) {
    var k=nums[i]
    m[k]=m[k]?m[k]+=1:1
    if (m[k]>n/2) return k
  }
};
```
多数投票算法 (Boyer-Moore Majority Vote Algorithm), O(n) + O(1)

[思路参考](https://blog.csdn.net/kimixuchen/article/details/52787307)
```js
var majorityElement = function(nums) {
  var i=0, r=nums[0], count=1
  while(++i<nums.length) {
    if (r===nums[i]) count++
    else count--
    if (count===0) {
      r=nums[i]
      count=1
    }
  }
  return r
};
```
