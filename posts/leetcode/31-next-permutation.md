## [31. Next Permutation](https://leetcode.com/problems/next-permutation/)

Implement next permutation, which rearranges numbers into the lexicographically next greater permutation of numbers.

If such arrangement is not possible, it must rearrange it as the lowest possible order (ie, sorted in ascending order).

The replacement must be in-place and use only constant extra memory.

Here are some examples. Inputs are in the left-hand column and its corresponding outputs are in the right-hand column.
```js
1,2,3 → 1,3,2
3,2,1 → 1,2,3
1,1,5 → 1,5,1
```
### [idea](https://leetcode.com/problems/next-permutation/discuss/13867/C%2B%2B-from-Wikipedia)
1. From tail find the largest index `k` that `nums[k] < nums[k + 1]`. If no such index exists, just reverse nums and done.
2. Find the largest index `l` > `k` such that `nums[k] < nums[l]`.
3. Swap `nums[k]` and `nums[l]`.
4. Reverse the sub-array `nums[k + 1:]`.

best solution
```js
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums) {
  function swap(i, j) {
    const tmp = nums[i];
    nums[i] = nums[j];
    nums[j] = tmp;
  }
  function reverse(i, j) {
    for (let k = i; k < i + j - k; k++) {
      swap(k, i + j - k);
    }
  }

  let i = nums.length - 1;
  while (i >= 1) {
    if (nums[i] > nums[i - 1])
      break;
    i--;
  }
  if (i === 0) {
    reverse(0, nums.length - 1);
    return;
  }
  for (let j = i; j < nums.length; j++) {
    if (nums[j] > nums[i - 1]
      && (nums[j + 1] <= nums[i - 1] || nums[j + 1] === undefined)) {
      swap(i - 1, j);
      break;
    }
  }
  reverse(i, nums.length - 1);
};
```
Solution
```js
var nextPermutation = function(nums) {
  var last = nums.length-1
  var used = []
  for(let i=last;i>=0;i--) {
    if (i===0) return nums.sort((a,b)=>a-b)
     if (nums[i]<=nums[i-1]) {
      used.push(nums[i])
      continue
    } else {
      pushAndSort(used, nums[i])
      const p = nums[i-1]
      const poped = pushAndSort(used, p, true)
      nums.splice(i-1, last-i+2, ...[poped, ...used])
      break;
    }
  }
  return nums
};
// better from end
var pushAndSort = (arr, n, pop=false) => {
  const l = arr.length
  for(let i=0;i<l;i++) {
    if (n<arr[i]) {
      const p = pop ? 1:0
      const poped = arr[i]
      arr.splice(i, p, n)
      return poped
    }
  }
  arr.push(n)
};
```
