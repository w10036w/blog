## [349. Intersection of Two Arrays](https://leetcode.com/problems/intersection-of-two-arrays/)
Given two arrays, write a function to compute their intersection.

Example 1:
```js
Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2]
```
Example 2:
```js
Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [9,4]
```
Note:

- Each element in the result must be unique.
- The result can be in any order.

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
  let s1 = new Set(nums1)
  let s2 = new Set(nums2)
  let output = []
  if (s1.size < s2.size) {
    output = [...s1].filter(x => s2.has(x))
  } else {
    output = [...s2].filter(x => s1.has(x))
  }
  return output
  // nums1.sort((a,b)=>a-b)
  // nums2.sort((a,b)=>a-b)
  // var r = []
  // var i = 0, j = 0
  // while(typeof nums1[i]=== 'number' && typeof nums2[j]=== 'number') {
  //   if (nums1[i] === nums2[j]) {
  //     r.push(nums1[i])
  //     while(nums1[i]===nums1[++i]);
  //     while(nums2[j]===nums2[++j]);
  //   } else if (nums1[i]>nums2[j]) {
  //     while(nums2[j]===nums2[++j]);
  //   } else {
  //     while(nums1[i]===nums1[++i]);
  //   }
  // }
  // return r
};
```
