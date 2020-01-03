## [5. Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring)
> top100

Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.

Example 1:
```js
Input: "babad"
Output: "bab"
Note: "aba" is also a valid answer.
```
Example 2:
```js
Input: "cbbd"
Output: "bb"
```

## solution

DP [参考](https://github.com/azl397985856/leetcode/blob/master/problems/5.longest-palindromic-substring.md)

> 如果一个字符串是回文串，那么在它左右分别加上一个相同的字符，那么它一定还是一个回文串
>
> 如果一个字符串不是回文串，或者在回文串左右分别加不同的字符，得到的一定不是回文串

let `dp[i][j]=true` mean `s.slice(i, j+1)` is palindrome

thus the formula is:

`dp[i][j] = s[i]===s[j] && dp[i+1][j-1]`

base cases:
if `substring.length===1` (i===j), `dp[i][j]=true`
else if `substring.length===2` (i===j-1), `dp[i][j]= s[i]===s[j]`
else the formula

```js
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  if (s.length<=1) return s
  var l=s.length, dp=[], r=s[0]
  for(var i=l-1;i>=0;i--) {
    dp[i]=[]
    for(var j=i;j<l;j++) {
      var s1=j===i, s2=s[i]===s[j]&&j-i===1
      dp[i][j]=s1|| s2|| (s[i]===s[j]&&dp[i+1][j-1])
      if (dp[i][j] && j-i+1>r.length) r=s.slice(i,j+1)
    }
  }
  return r
}
```
`[Manacher's Algorithm](https://blog.csdn.net/hk2291976/article/details/51107886)` from [discuss](https://leetcode.com/problems/longest-palindromic-substring/discuss/461806/JavaScript-or-DP-or-~-52ms-or-beats-99.86)
```js
var longestPalindrome = function(s) {
  if (s.length<=1) return s
  var len=s.length, L=0, R=0, i=0, l, r
  while (i<len) {
    l=r=i
    while (r<len-1 && s[r]===s[r+1]) r++
    i=r+1 // set our iterator for the next iteration
    while (l>0 && r<len-1 && s[l-1]===s[r+1]) {
      l--;
      r++;
    }
    if (r-l>R-L) [L,R]=[l,r] // optimize: if (R+1-L===len) return s
  }
  return s.slice(L, R+1)
}
```
