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

function knapsack(w, v, n, C) {
  const m = []
  for (let i = 0; i < n; i++) {
    m[i] = []
    for (let j = 0; j <= C; j++) {
      if (i === 0) {
        m[i][j] = w[i] > j ? 0 : v[i]
        continue
      }
      if (w[i] > j) m[i][j] = m[i - 1][j]
      else m[i][j] = Math.max(m[i - 1][j], m[i - 1][j - w[i]] + v[i])
    }
  }
  return m[n - 1][C]
}

// let w = [4, 6, 2, 2, 5, 1]
// let v = [8, 10, 6, 3, 7, 2]
// let n = w.length
// let C = 12
// console.log(knapsack(w, v, n, C))

```

most powerful `fibonacci` js function

```js
function fibonacci(n) {
  var a=0, b=1
  while(n-- >0) [a, b] = [b, a+b]
  return a;
}
```
