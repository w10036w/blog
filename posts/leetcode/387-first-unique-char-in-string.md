## [387. First Unique Character in a String](https://leetcode.com/problems/first-unique-character-in-a-string/submissions/)
Given a string, find the first non-repeating character in it and return it's index. If it doesn't exist, return -1.

Examples:
```js
s = "leetcode"
return 0.

s = "loveleetcode",
return 2.
```
Note: You may assume the string contain only lowercase letters.

Ideas:
```js
1. {}
2. Map()
3. indexOf(char, fromIndex) // fastest
```
My solution

fastest, no space
```js
/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
  for (var i=0; i<s.length; i++) {
    var c = s[i];
    if (s.indexOf(c)===i && s.indexOf(c, i+1)===-1) return i
  }
  return -1;
};
```
map, space O(n)
```js
var firstUniqChar = function(s) {
  var m = new Map()
  for(let i=0;i<s.length;i++) {
    const k = s[i]
    if (m.has(k)) {
      if (m.get(k) !== -1) m.set(k, -1)
    } else m.set(k, i)
  }
  for (v of m) {
    if (v[1]!==-1) return v[1]
  }
  // // iteratee values
  // const iter = m.values()
  // let itee = iter.next()
  // while (!itee.done) {
  //   if (itee.value!==-1) return itee.value
  //   itee = iter.next()
  // }
  return -1
}
```
Object {}
```js
var firstUniqChar = function(s) {
  var used = {}
  for(let i=0;i<s.length;i++) {
    const k = s[i]
    if (typeof used[k] === 'undefined') used[k] = 1
    else used[k]++
  }
  var arr = Object.keys(used)
  for (let i=0; i<arr.length; i++) {
    if (used[arr[i]]===1) return s.indexOf(arr[i])
  }
  return -1
};
```
