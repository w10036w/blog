### Longest Substring without Repeating Characters
Given a string, find the length of the longest substring without repeating characters.
**Examples**
```
Given "abcabcbb", the answer is "abc", which the length is 3.
Given "bbbbb", the answer is "b", with the length of 1.
Given "pwwkew", the answer is "wke", with the length of 3. 
Note that the answer must be a substring, "pwke"is a subsequence 
and not a substring.
```
**Solution (96.38%, 142ms) JS**
```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  if(s.length <=1) return s.length;
  var n = s.length-1;
  var p = 0, pre = '', suf = '', index;
  while(p<=n){
    var cur = s.charAt(p);
    if(!pre) pre += cur;
    if(pre && !suf){
      index = pre.indexOf(cur);
      if(index === -1) {
        pre += cur;
      } else {
        suf += (pre.substr(index+1) + cur);
      }
    }
    if(suf) {
      index = suf.indexOf(cur);
      if(index === -1) {
        suf += cur;
      } else {
        if(suf.length > pre.length) {
          pre = suf;
        }
        suf = (suf.substr(index+1) + cur);
      }
    }
    p++;
  }
  return suf.length > pre.length ? suf.length : pre.length;
};
```
[**Existing Solution (96.38%, 142ms) JS**](https://github.com/paopao2/leetcode-js/blob/master/Longest%20Substring%20Without%20Repeating%20Characters.js)
```js
var lengthOfLongestSubstring = function(s) {
  var len = s.length,
  max = 0,
  chars = new Set(),
  leftBound = 0,
  ch,
  i;
  for (i = 0; i < len; i++) {
    ch = s.charAt(i);
    if (chars.has(ch)) {
      //find the repeating character
      //only store the latest version, async with 'max'
      while (leftBound < i && s.charAt(leftBound) !== ch) {
        chars.delete(s.charAt(leftBound));
        leftBound++;
      }  
      leftBound++;
    } else {
      chars.add(ch);
      //always keep the longest
      max = Math.max(max, i - leftBound + 1);
    }
  }
  return max;
};
```

