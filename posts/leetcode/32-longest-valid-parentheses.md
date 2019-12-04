## [32. Longest Valid Parentheses](https://leetcode.com/problems/longest-valid-parentheses/)

Given a string containing just the characters '(' and ')', find the length of the longest valid (well-formed) parentheses substring.

Example 1:
```js
Input: "(()"
Output: 2
Explanation: The longest valid parentheses substring is "()"
```
Example 2:
```js
Input: ")()())"
Output: 4
Explanation: The longest valid parentheses substring is "()()"
```
Solution DP

```js
// refer to https://blog.csdn.net/accepthjp/article/details/52439449
/**
 * dp[i] represents the longest string length that ends with s[i]
 * if s[i] === '(' continue
 *   the previous lenght is dp[i], so x = s[i - dp[i-1] -1 ] means '...x(length = dp[i-1])i', if x === '(', then dp[i] = dp[i-1]+2
 * whatever the previous result is, remember to sum the result of 0...i-dp[i]
 */
var longestValidParentheses = function(s) {
  let l = s.length
  if (l<=1) return 0
  let res = 0
  let dp = new Array(l).fill(0)
  let i = 0
  while (++i<l) {
    if (s[i]==='(') continue; // skip '(' because it is always 0
    if (s[i-1-dp[i-1]] == '(') dp[i] = dp[i-1]+2
    if (i>=dp[i]) dp[i] += dp[i-dp[i]]
    res = Math.max(res, dp[i])
  }
  return res
};
```

Solution (stack) ???
```js
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
  const len = s.length
  if (len<=1) return 0
  const stack = []
  let last = -1
  let res = 0
  let i = -1
  while (++i<len) {
    if (s[i] === '(') stack.push(i)
    else {
      if (stack.length===0) last = i
      else {
        stack.pop()
        if (stack.length === 0) max = Math.max(max, i - last)
        else max = Math.max(max, i - stack[stack.length-1])
      }
    }
  }
};
```
