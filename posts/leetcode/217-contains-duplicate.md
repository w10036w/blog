## [217. Contains Duplicate](https://leetcode.com/problems/contains-duplicate/)
>topInterview

Given an array of integers, find if the array contains any duplicates.

Your function should return true if any value appears at least twice in the array, and it should return false if every element is distinct.

Example 1:
```js
Input: [1,2,3,1]
Output: true
```
Example 2:
```js
Input: [1,2,3,4]
Output: false
```
Example 3:
```js
Input: [1,1,1,3,3,4,3,2,4,2]
Output: true
```

## solution
best & short
```js
var containsDuplicate = function(nums) {
  return new Set(nums).size<nums.length;
}
```

best hashtable: Map
```js
var containsDuplicate = function(nums) {
  var used=new Map()
  for(var i=0;i<nums.length;i++){
    if (used.has(nums[i])) return true
    used.set(nums[i], true)
  }
  return false
};
```

