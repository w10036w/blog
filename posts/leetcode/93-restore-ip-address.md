## [93. Restore IP Addresses](https://leetcode.com/problems/restore-ip-addresses/)
Given a string containing only digits, restore it by returning all possible valid IP address combinations.

Example:
```js
Input: "25525511135"
Output: ["255.255.11.135", "255.255.111.35"]
```

My solution
```js
/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function(s) {
  var res = [], l = s.length
  if (l<4||l>12) return res
  bt(0, [])
  return res
  function bt(p, arr) {
    if (arr.length===4) {
      if (p<l || p>l) return
      if (p===l) return res.push(arr.slice().join('.'))
    } else if (arr.length < 4 && p>=l) return
    arr.push(s[p])
    bt(p+1, arr)
    arr.pop()
    if (s[p]==='0') return
    arr.push(s.substr(p, 2))
    bt(p+2, arr)
    arr.pop()
    if (Number(s.substr(p, 3))>=256) return
    arr.push(s.substr(p, 3))
    bt(p+3, arr)
    arr.pop()
  }
};
```
