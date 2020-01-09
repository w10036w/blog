## [41. First Missing Positive](https://leetcode.com/problems/first-missing-positive)
> bytedance

Given an unsorted integer array, find the smallest missing positive integer.

Example 1:
```js
Input: [1,2,0]
Output: 3
```
Example 2:
```js
Input: [3,4,-1,1]
Output: 2
```
Example 3:
```js
Input: [7,8,9,11,12]
Output: 1
```
Note:

Your algorithm should run in O(n) time and uses constant extra space.

## solution

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function(nums) {
  var i=0, len=nums.length
  while (i<len) {
    if (nums[i]>0 && nums[i]<=len && nums[nums[i]-1]!==nums[i]) {
      [nums[nums[i] - 1], nums[i]] = [nums[i], nums[nums[i] - 1]];
    } else i++;
  }
  for(i=0; i<len; i++) {
    if(nums[i]!==i+1) return i+1
  }
  return i+1
};
```

js native...
```js
var firstMissingPositive = function(nums) {
  var arr=new Set(nums), i=1
  while(arr.has(i)) i++
  return i
}
```
