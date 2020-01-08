## [448. Find All Numbers Disappeared in an Array](https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/)
> top100

Given an array of integers where 1 ≤ a[i] ≤ n (n = size of array), some elements appear twice and others appear once.

Find all the elements of [1, n] inclusive that do not appear in this array.

Could you do it without extra space and in `O(n)` runtime? You may assume the returned list does not count as extra space.

Example:
```js
Input:
[4,3,2,7,8,2,3,1]

Output:
[5,6]
```

## solution
as required
```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function(nums) {
  var res=[]
  nums.forEach(n => {
    var i=Math.abs(n)-1
    if (nums[i]>0) nums[i]=-nums[i]
  })
  nums.forEach((n, i) => {
    if (n>0) res.push(i+1)
  })
  return res
};
```
simple but space O(n)
```js
var findDisappearedNumbers = function(nums) {
  var res=Array.from(nums.keys(), e=>e+1)
  nums.forEach(n => {
    res[n-1]=0
  })
  return res.filter(e => e)
}
```
