## [49. Group Anagrams](https://leetcode.com/problems/group-anagrams/)
Given an array of strings, group anagrams together.

Example:
```js
Input: ["eat", "tea", "tan", "ate", "nat", "bat"],
Output:
[
  ["ate","eat","tea"],
  ["nat","tan"],
  ["bat"]
]
```
Note:

- All inputs will be in lowercase.
- The order of your output does not matter.

My solution
```js
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
  var m = new Map()
  var i = -1
  var l = strs.length
  while(++i<l) {
    const key = strs[i].split('').sort().join('')
    if (m.has(key)) m.get(key).push(strs[i])
    else m.set(key, [strs[i]])
  }
  return [...m.values()]
};
```
