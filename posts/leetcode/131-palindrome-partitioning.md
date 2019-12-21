## [131. Palindrome Partitioning](https://leetcode.com/problems/palindrome-partitioning/)
Given a string s, partition s such that every substring of the partition is a palindrome.

Return all possible palindrome partitioning of s.

Example:
```js
Input: "aab"
Output:
[
  ["aa","b"],
  ["a","a","b"]
]
```
My solution: DFS
```js
/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function(s) {
  if (!s.length) return []
  var r = []
  dfs(0, [])
  return r
  function dfs(p, arr) {
    // if (p>s.length) return
    if (p===s.length) return r.push(arr.slice())
    var count = 1
    while(p+count<=s.length) {
      if (isPalindrome(s.substr(p, count))) {
        arr.push(s.substr(p, count))
        dfs(p+count, arr)
        arr.pop()
      }
      count++
    }
  }
  function isPalindrome(str) {
    if (str.length===1) return true
    var l = -1, r = str.length
    while(++l<--r) {
      if (str[l]!==str[r]) return false
    }
    return true
  }
};
```
DP (todo)
```js
var partition = function(s) {

}
```
