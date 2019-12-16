## [60. Permutation Sequence](https://leetcode.com/problems/permutation-sequence/)
The set [1,2,3,...,n] contains a total of n! unique permutations.

By listing and labeling all of the permutations in order, we get the following sequence for n = 3:
```js
"123"
"132"
"213"
"231"
"312"
"321"
```
Given n and k, return the kth permutation sequence.

Note:

Given n will be between 1 and 9 inclusive.
Given k will be between 1 and n! inclusive.
Example 1:
```js
Input: n = 3, k = 3
Output: "213"
```
Example 2:
```js
Input: n = 4, k = 9
Output: "2314"
```

My solution (non-recursive)
```js
/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getPermutation = function(n, k) {
  const arr = '123456789'.split('').slice(0, n)
  const fact = [1]
  for (let i=1; i<n; i++) {
    fact[i] = arr[i]*fact[i-1]
  }
  const res = []
  let num = n+1
  let curK = k
  while (--num >0) {
    let i=0
    if (num===1) {
      res.push(arr[0])
      break;
    }
    const div = fact[num-2]
    while((i+1)*div<curK) i += 1;
    res.push(arr.splice(i, 1))
    curK -= i*div
  }
  return res.join('')
};
```
backtrack
```js
var getPermutation = function(n, k) {
  const arr = '123456789'.split('').slice(0, n)
  const fact = [1]
  for (let i=1; i<n; i++) {
    fact[i] = arr[i]*fact[i-1]
  }
  let res = ''
  bs(n, k)
  return res
  function bs(n, k) {
    if (k === 1||k===0) return res += arr.join('')
    const div = fact[n-2]
    let i = n
    while(--i*div>=k);
    res += arr.splice(i, 1)
    bs(n-1, k-i*div)
  }
}
```

JAVA
```java
public class Solution {
    public String getPermutation(int n, int k) {
        StringBuilder sb = new StringBuilder();
        ArrayList<Integer> num = new ArrayList<Integer>();
        int fact = 1;
        for (int i = 1; i <= n; i++) {
            fact *= i;
            num.add(i);
        }
        for (int i = 0, l = k - 1; i < n; i++) {
            fact /= (n - i);
            int index = (l / fact);
            sb.append(num.remove(index));
            l -= index * fact;
        }
        return sb.toString();
    }
}
```
