## [58. Length of Last Word](https://leetcode.com/problems/length-of-last-word/)
Given a string s consists of upper/lower-case alphabets and empty space characters ' ', return the length of last word in the string.

If the last word does not exist, return 0.

Note: A word is defined as a character sequence consists of non-space characters only.

Example:
```js
Input: "Hello World"
Output: 5
```

My solution

```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
  var word = ''
  for(var i=s.length-1;i>=0;i--) {
    if (s[i]===' ') {
      if (word==='') continue;
      break;
    }
    word = s[i]+word
  }
  return word.length
};
```
