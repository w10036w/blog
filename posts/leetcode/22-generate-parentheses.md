## [22. Generate Parentheses](https://leetcode.com/problems/generate-parentheses/)

Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

For example, given n = 3, a solution set is:
```js
[
  "((()))",
  "(()())",
  "(())()",
  "()(())",
  "()()()"
]
```

My solution

```js
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
  const res = []
  bs(n)
  return res
  
  function bs(n, open=0,str='') {
    if (n===0) return res.push(str+')'.repeat(open))
    if (open>0) bs(n, open-1, str+')')
    bs(n-1, open+1, str+'(')
  }
};
```
stack solution from [Python](https://leetcode.com/problems/generate-parentheses/discuss/10283/Python-simple-stack-solution-without-recursion)
```js
var generateParenthesis = function(n) {
  const res =[]
  const s = [['(', 1, 0]]
  while (s.length!==0) {
    let [str, l, r] = s.pop()
    if (l-r<0 || l>n || r>n) continue
    if (l===n && r===n) res.push(str)
    s.push([ x+'(', l+1, r ])
    s.push([ x+')', l, r+1 ])
  }
  return res
};

```
