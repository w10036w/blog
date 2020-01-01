## [88. Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/)
Given two sorted integer arrays nums1 and nums2, merge nums2 into nums1 as one sorted array.

Note:

- The number of elements initialized in nums1 and nums2 are m and n respectively.
- You may assume that nums1 has enough space (size that is greater or equal to m + n) to hold additional elements from nums2.
Example:

Input:
```js
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6],       n = 3

Output: [1,2,2,3,5,6]
```
## solution

```js
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
// common merge sorted lists
var merge = function(nums1, m, nums2, n) {
  var i1=m-1, i2=n-1, i=m+n-1
  while (i2>=0 && i1>=0) {
    if (nums1[i1]<nums2[i2]) nums1[i--]=nums2[i2--]
    else nums1[i--]=nums1[i1--]
  }
  while(i2>=0) nums1[i--]=nums2[i2--]
};

// concise version
var merge = function(nums1, m, nums2, n) {
  while (n>0) nums1[m+n-1]=
    m>0&&nums1[m-1]>nums2[n-1] ? nums1[--m] : nums2[--n]
};
```
