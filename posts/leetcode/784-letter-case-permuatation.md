## [784. Letter Case Permutation](https://leetcode.com/problems/letter-case-permutation/)
Given a string S, we can transform every letter individually to be lowercase or uppercase to create another string.  Return a list of all possible strings we could create.

Examples:
```js
Input: S = "a1b2"
Output: ["a1b2", "a1B2", "A1b2", "A1B2"]

Input: S = "3z4"
Output: ["3z4", "3Z4"]

Input: S = "12345"
Output: ["12345"]
```
Note:
- S will be a string with length between 1 and 12.
- S will consist only of letters or digits.

My solution
```js
/**
 * @param {string} S
 * @return {string[]}
 */
var letterCasePermutation = function(S) {
  var re = /[a-zA-Z]/
  var l = S.length
  var res = []
  
  function bs(i, tmp) {
    if (tmp.length===l) return res.push(tmp)
    var cur = S[i]
    if (!re.test(cur)) {
      bs(i+1, tmp+cur)
    } else {
      bs(i+1, tmp+cur.toLowerCase())
      bs(i+1, tmp+cur.toUpperCase())
    }
  }
  
  bs(0, '')
  
  return res
};
```
