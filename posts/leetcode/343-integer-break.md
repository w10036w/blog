## [343. Integer Break](https://leetcode.com/problems/integer-break/)
Given a positive integer n, break it into the sum of at least two positive integers and maximize the product of those integers. Return the maximum product you can get.

Example 1:
```js
Input: 2
Output: 1
Explanation: 2 = 1 + 1, 1 × 1 = 1.
```
Example 2:
```js
Input: 10
Output: 36
Explanation: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36.
```
**Note**: You may assume that n is not less than 2 and not larger than 58.

My solution

```js
/**
 * @param {number} n
 * @return {number}
 */
var integerBreak = function(n) {
  // best
  // as 3*3>2*2*2, use 3 as much as possible
  if (n<4>) return n-1
  var res = 1
  while (n!==0) {
    if (n===4||n===2) {
      res *= n
      break;
    } else {
      res *= 3
      n -= 3
    }
  }
  return res

  // my own
  // let f = []
  // f[2] = 1 // n=2
  // f[3] = 2 // n=3
  // f[4] = 4 // n=4
  // f[5] = 6
  // f[6] = 9
  // let i = 6
  // while(++i<=n) {
  //   f[i] = Math.max(f[i-2]*2, f[i-3]*3)
  // }
  // return f[n]
};
```
DP in JAVA
```java
class Solution {
  public int integerBreak(int n) {
    //dp[i] means output when input = i, e.g. dp[4] = 4 (2*2),dp[8] = 18 (2*2*3)...
    int[] dp = new int[n + 1];
    dp[1] = 1;
    // fill the entire dp array
    for (int i = 2; i <= n; i++) {
      //let's say i = 8, we are trying to fill dp[8]:if 8 can only be broken into 2 parts, the answer could be among 1 * 7, 2 * 6, 3 * 5, 4 * 4... but these numbers can be further broken. so we have to compare 1 with dp[1], 7 with dp[7], 2 with dp[2], 6 with dp[6]...etc
      for (int j = 1; j <= i / 2; j++) {
        // use Math.max(dp[i],....)  so dp[i] maintain the greatest value
        dp[i] = Math.max(dp[i],Math.max(j, dp[j]) * Math.max(i - j, dp[i - j]));
      }
    }
    return dp[n];
  }
}
```
