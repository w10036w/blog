## [3. Longest Substring without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters)
> medium,

Given a string, find the length of the longest substring without repeating characters.

**Examples**

```js
Given "abcabcbb", the answer is "abc", which the length is 3.
Given "bbbbb", the answer is "b", with the length of 1.
Given "pwwkew", the answer is "wke", with the length of 3.
Note that the answer must be a substring, "pwke"is a subsequence
and not a substring.
```

## Solution
string slice (actual hashtable)
```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  if (s.length<2) return s.length
  var res=1, tmp=''
  for(var i=0;i<s.length;i++) {
    var idx=tmp.indexOf(s[i])
    if (idx===-1) tmp+=s[i]
    else {
      res=Math.max(res, tmp.length)
      tmp=tmp.slice(idx+1)+s[i]
    }
  }
  return Math.max(res, tmp.length)
}
```
pointer + hastable from this [anwser](https://leetcode.com/problems/longest-substring-without-repeating-characters/discuss/2291/9-line-JavaScript-solution/144632)
```js
var lengthOfLongestSubstring = function(s) {
  let res=0, m={}, i=0 // i means index that the substring starts from
  for(let j=0;j<s.length;j++) {
    if(m[s[j]]) i = Math.max(m[s[j]], i);
    res = Math.max(res, j-i+1);
    m[s[j]] = j+1;
  }
  return res;
}
```

## Test cases
```js
┌──────────┬────────┐
│ (index)  │ Values │
├──────────┼────────┤
│   abba   │   2    │
│ abcabcbb │   3    │
│  bbbbb   │   1    │
│  pwwkew  │   3    │
└──────────┴────────┘
```
