## [912. Sort an Array](https://leetcode.com/problems/sort-an-array/)

quick sort
see [algorithms-sort](../algorithms/sort.md)
```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(arr, l=0, r=arr.length-1) {
  if (l>=r) return
  const p = arr[l]
  let [il, ir] = [l, r]
  while (il<ir) {
    while(il<ir && arr[ir]>=p) ir--
    arr[il] = arr[ir]
    while(il<ir && arr[il]< p) il++
    arr[ir] = arr[il]
  }
  arr[il] = p
  sortArray(arr, l, il-1)
  sortArray(arr, il+1, r)
  return arr
};
```
