# dynamic programming

## 01 knapsack

Given weights and values of `n` items, put these items in a knapsack of capacity `C` to get the maximum total value in the knapsack. In other words, given two integer arrays `v`[0..n-1] and `w`[0..n-1] which represent values and weights associated with `n` items respectively.

Find out the maximum value subset of `v` such that sum of the weights of this subset is smaller than or equal to `w`. You cannot break an item, either pick the complete item, or don’t pick it (0-1 property).

Example:

```js
Input: v = [2, 4, 6], w = [2, 4, 6], C = 10
Output: 10
```

Solution

```js
var fn
```

most powerful `fibonacci` js function

```js
function fib(n) {
  let [curr, next] = [0, 1]
  while(n-- >0) {
    [curr, next] = [next, curr + next];
  }
  return curr;
}
```
