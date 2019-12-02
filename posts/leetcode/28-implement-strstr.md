# [28. Implement strStr()](https://leetcode.com/problems/implement-strstr/)

Implement strStr().

Return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack. return 0 if needle is empty

Example 1:
```js
Input: haystack = "hello", needle = "ll"
Output: 2
```

solution:
```js
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
  if (!needle) return 0
  // return haystack.indexOf(needle) // built-in solution
  let [i, lh, ln] = [-1, haystack.length, needle.length]
  if (lh === 0 || lh<ln) return -1
  while(++i<lh-ln) { // lh - ln!!!
    if (haystack.substring(i, i+ln)===needle) return i
  }
  return -1
};
```
