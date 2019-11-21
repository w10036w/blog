# [14. Longest Common Prefix](https://leetcode.com/problems/longest-common-prefix/)
>Write a function to find the longest common prefix string amongst an array of strings.<br>
>If there is no common prefix, return an empty string "".
>
>All given inputs are in lowercase letters a-z.

My Solution (`single pointer`) @2019-11-21

```js
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    let r = ''
    let temp = ''
    let curr = ''
    let i = 0
    let pointer = 0
    const l = strs.length
    while(true) {
        curr = strs[i] && strs[i][pointer]
        if (!curr) return r
        while(++i<l) {
            temp = strs[i]&& strs[i][pointer]
            if(!temp || temp!==curr) return r
        }
        i=0
        r+=curr
        pointer++
    }
};
```
