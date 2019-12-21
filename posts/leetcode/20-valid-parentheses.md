## [20. Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)
Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

- Open brackets must be closed by the same type of brackets.
- Open brackets must be closed in the correct order.
Note that an empty string is also considered valid.

My solution

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  var stack = []
  for(var i=0;i<s.length;i++) {
    if (s[i]===')') {
      if (stack.pop()!=='(') return false
    } else if (s[i]==='}') {
      if (stack.pop()!=='{') return false
    } else if (s[i]===']') {
      if (stack.pop()!=='[') return false
    } else stack.push(s[i])
  }
  return stack.length===0
};
```
