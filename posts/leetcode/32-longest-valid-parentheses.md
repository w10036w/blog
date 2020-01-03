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

## Solution
黏连型 DP [参考](https://blog.csdn.net/accepthjp/article/details/52439449)

dp[i] 表示以 i 为结尾的最长合法 **连续长度**，默认为0, 只有在 s[i]===')' 时变化

如果 `s[i-1-dp[i-1]]=='('`，说明当前位置可以和 i-1-dp[i-1] 位置匹配，dp[i]=dp[i-1]+2;

然后还要加上匹配位置之前的最长长度 dp [i]+=dp [i-dp [i]];

```js
var longestValidParentheses=function(s) {
  var l=s.length, dp=new Array(l).fill(0), i=0
  while (++i<l) {
    if (s[i]==='(') continue
    if (s[i-1-dp[i-1]] == '(') dp[i]=dp[i-1]+2
    dp[i]+=dp[i-dp[i]]||0
    res=Math.max(res, dp[i])
  }
  return res
};
```
stack存index + 额外指针
```js
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses=function(s) {
  var stack=[], last=-1, res=0, i=-1
  while (++i<s.length) {
    if (s[i]==='(') stack.push(i)
    else {
      if (!stack.length) last=i
      else {
        stack.pop()
        if (!stack.length) res=Math.max(res, i-last)
        else res=Math.max(res, i-stack[stack.length-1])
      }
    }
  }
  return res
};
```
遍历两次
```js
var longestValidParentheses=function(s) {
  var q=[], i=-1, r=0, tmp=0
  while (++i<s.length) {
    if (s[i]==='(') q.push(1)
    else {
      var j=q.lastIndexOf(1)
      if (j>-1) q[j]=2
      else q.push(0)
    }
  }
  for (var n of q) {
    if (n===2) tmp+=2
    else {
      r=Math.max(r, tmp)
      tmp=0
    }
  }
  return Math.max(r, tmp)
};
```
