## [215. Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/)

Find the kth largest element in an unsorted array. Note that it is the kth largest element in the sorted order, not the kth distinct element.

Example 1:
```js
Input: [3,2,1,5,6,4] and k = 2
Output: 5
```
Example 2:
```js
Input: [3,2,3,1,2,4,5,5,6] and k = 4
Output: 4
```
Note:
You may assume k is always valid, 1 ≤ k ≤ array's length.

## solution
quick sort
```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
  nums.sort((a,b)=>a-b)
  return nums[nums.length-k]
};
```
[quick select](https://github.com/azl397985856/leetcode/blob/master/problems/215.kth-largest-element-in-an-array.md#%E8%A7%A3%E6%B3%95%E4%B8%89---quick-select)
```js
var findKthLargest = function(nums, k) {
  var target=nums.length-k
  return qs(nums, 0, nums.length-1, target)
}
function qs(nums, l, r, target) {
  if (l>r) return; // FORGET
  var p=nums[l], il=l, ir=r
  while (il<ir) {
    while(il<ir && nums[ir]>=p) ir--
    nums[il]=nums[ir]
    while(il<ir && nums[il]< p) il++
    nums[ir]=nums[il]
  }
  if (il===target) return p
  nums[il]=p
  var lt=qs(nums, l, il-1, target)
  var rt=qs(nums, il+1, r, target)
  return lt===undefined ? rt : lt
}
```
