## [216. Combination Sum III](https://leetcode.com/problems/combination-sum-iii/)
Find all possible combinations of k numbers that add up to a number n, given that only numbers from 1 to 9 can be used and each combination should be a unique set of numbers.

Note:

All numbers will be positive integers.
The solution set must not contain duplicate combinations.
Example 1:
```js
Input: k = 3, n = 7
Output: [[1,2,4]]
```
Example 2:
```js
Input: k = 3, n = 9
Output: [[1,2,6], [1,3,5], [2,3,4]]
```

My solution

```js
/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function(k, n) {
  let res = []
  bt(k, n)
  return res
  function bt(k, n, arr=[], last=0) {
    if (n<0 || k<0) return
    if (n===0 && k===0) return res.push(arr.slice())
    while(++last<10) {
      arr.push(last)
      bt(k-1, n-last, arr, last)
      arr.pop()
    }
  }
};
```
