## [205. Isomorphic Strings](https://leetcode.com/problems/isomorphic-strings/)
> easy

Given two strings s and t, determine if they are isomorphic.

Two strings are isomorphic if the characters in `s` can be replaced to get `t`.

All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character but a character may map to itself.

Example 1:
```js
Input: s = "egg", t = "add"
Output: true
```
Example 2:
```js
Input: s = "foo", t = "bar"
Output: false
```
Example 3:
```js
Input: s = "paper", t = "title"
Output: true
```
## solution

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function(s, t) {
  if (s.length!==t.length) return false
  var m=new Map() // or use 2 Map easier to identify
  for(var i=0; i<s.length; i++) {
    var kt='s'+s[i], ks='t'+t[i]
    if (!m.has(kt) && !m.has(ks)) m.set(kt, t[i]).set(ks, s[i])
    else if (m.get(kt)!==t[i] || m.get(ks)!==s[i]) return false
  }
  return true
};
```
simplify
```js
var isIsomorphic = function(s, t) {
  if (s.length!==t.length) return false
  var m={}
  for(var i=0; i<s.length; i++) {
    if (!m['s'+s[i]]) m['s'+s[i]]=t[i]
    if (!m['t'+t[i]]) m['t'+t[i]]=s[i]
    if (m['s' + s[i]]!==t[i] || m['t' + t[i]]!==s[i]) return false
  }
  return true
}
```
