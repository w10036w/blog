## [46. Permutations](https://leetcode.com/problems/permutations/)

Given a collection of distinct integers, return all possible permutations.

Example:

```js
Input: [1, 2, 3];
Output: [
  [1, 2, 3],
  [1, 3, 2],
  [2, 1, 3],
  [2, 3, 1],
  [3, 1, 2],
  [3, 2, 1]
];
```

My solution

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  var r = [];
  function go(curr, rest) {
    if (!rest.length) return r.push(curr);
    const l = rest.length;
    for (let i = 0; i < l; i++) {
      go([...curr, rest[i]], [...rest].splice(i, 1));
    }
  }
  go([], nums);
  return r;
};
```
**best for this case only but not general** (backtracking pointer)
```js
var permute = function(nums) {
  let res = [];
  permutation(nums, 0, nums.length - 1, res);
  return res;
};

function permutation(arr, pos, n, res) {
  if (pos === n) {
    res.push(arr.slice());
  } else {
    for (let x = pos; x <= n; x++) {
      swap(arr, x, pos)
      permutation(arr, pos + 1, n, res);
      swap(arr, x, pos)
    }
  }
}
function swap(arr,index1,index2){
  let temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}
```
