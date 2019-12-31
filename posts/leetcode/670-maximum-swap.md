## [670. Maximum Swap](https://leetcode.com/problems/maximum-swap/)
> bytedance

Given a non-negative integer, you could swap two digits at most once to get the maximum valued number. Return the maximum valued number you could get.

Example 1:
```js
Input: 2736
Output: 7236
Explanation: Swap the number 2 and the number 7.
```
Example 2:
```js
Input: 9973
Output: 9973
Explanation: No swap.
```
Note:
The given number is in the range [0, 10^8]

## solution

```js
/**
 * @param {number} num
 * @return {number}
 */
var maximumSwap = function(num) {
  var s=[...(num+'')], sorted=[...s].sort((a,b)=>b-a), j=-1
  for(var i=0;i<s.length-1;i++) {
    if (s[i]!==sorted[i] && j===-1) {
      j=i
      break;
    }
  }
  if (j===-1) return num
  for(var i=s.length-1; i>=0; i--) {
    if (s[i]!==sorted[i] && sorted[j]===s[i]) {
      [s[i], s[j]] = [s[j], s[i]];
      return Number(s.join(''))
    }
  }
};
```
