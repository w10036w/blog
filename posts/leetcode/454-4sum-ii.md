## [454. 4Sum II](https://leetcode.com/problems/4sum-ii/)
> topInterview

Given four lists A, B, C, D of integer values, compute how many tuples (i, j, k, l) there are such that A[i] + B[j] + C[k] + D[l] is zero.

To make problem a bit easier, all A, B, C, D have same length of N where 0 ≤ N ≤ 500. All integers are in the range of -228 to 228 - 1 and the result is guaranteed to be at most 231 - 1.

Example:
```js
Input:
A = [ 1, 2]
B = [-2,-1]
C = [-1, 2]
D = [ 0, 2]

Output:
2

Explanation:
The two tuples are:
1. (0, 0, 0, 1) -> A[0] + B[0] + C[0] + D[1] = 1 + (-2) + (-1) + 2 = 0
2. (1, 1, 0, 0) -> A[1] + B[1] + C[0] + D[0] = 2 + (-1) + (-1) + 0 = 0
```

## solution

```js
/**
 * @param {number[]} A
 * @param {number[]} B
 * @param {number[]} C
 * @param {number[]} D
 * @return {number}
 */
var fourSumCount = function(A, B, C, D) {
  var res=0, m1=new Map()
  A.forEach(a => {
    B.forEach(b => {
      if (m1.has(a+b)) m1.set(a+b, m1.get(a+b)+1)
      else m1.set(a+b, 1)
    })
  })
  C.forEach(c => {
    D.forEach(d => {
      if (m1.has(-c-d) res+=m1.get(-c-d)
    })
  })
  return res
};
```

screwed by this [solution](https://leetcode.com/problems/4sum-ii/discuss/93917/Easy-2-lines-O(N2)-Python)
```py
def fourSumCount(self, A, B, C, D):
  AB = collections.Counter(a+b for a in A for b in B)
  return sum(AB[-c-d] for c in C for d in D)
```
