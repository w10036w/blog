## [306. Additive Number](https://leetcode.com/problems/additive-number/)
Additive number is a string whose digits can form additive sequence.

A valid additive sequence should contain at least three numbers. Except for the first two numbers, each subsequent number in the sequence must be the sum of the preceding two.

Given a string containing only digits '0'-'9', write a function to determine if it's an additive number.

Note: Numbers in the additive sequence cannot have leading zeros, so sequence 1, 2, 03 or 1, 02, 3 is invalid.

Example 1:
```js
Input: "112358"
Output: true
Explanation: The digits can form an additive sequence: 1, 1, 2, 3, 5, 8.
1 + 1 = 2, 1 + 2 = 3, 2 + 3 = 5, 3 + 5 = 8
```
Example 2:
```js
Input: "199100199"
Output: true
Explanation: The additive sequence is: 1, 99, 100, 199.
1 + 99 = 100, 99 + 100 = 199
```

Constraints:

`num` consists only of digits `'0'-'9'`.
1 <= `num.length` <= 35

solution

```js
/**
 * @param {string} num
 * @return {boolean}
 */
var isAdditiveNumber = function(num) {
  const l = num.length
  for (let i=1; i<l; i++) {
    for (let j=i+1; j<l; j++) { // j<l -> l-j-1>=Math.max(i+1, j-i)
      var a = parse(num.slice(0, i))
      if (a===-1) continue
      var b = parse(num.slice(i, j))
      if (b===-1) continue
      if (dfs(num.slice(j), a, b)) return true
    }
  }
  return false
}
function dfs(s, a, b) {
  const l = s.length
  if (l === 0) return true
  for (let i=0; i<l; i++) {
    var c = parse(s.slice(0, i+1))
    if (c===-1) continue
    if (a+b ===c && dfs(s.slice(i+1), b, c)) return true
  }
  return false
}
function parse(s) {
  if (s !== '0' && s.startsWith('0')) return -1
  return Number(s)
}
```

best
```js
var isAdditiveNumber = function (num) {
  var len = num.length
  if (len < 3) return false
  for (var i=0; i<len; i++) {
    for (var j=i+1; len-j-1>=Math.max(i+1, j-i); j++) {
      var offset = j+1;
      var a = num.slice(0, i+1), b = num.slice(i+1, j+1);
      while (offset < len) {
        if ((a[0]==='0' && a.length>1) || (b[0]==='0' && b.length>1)) break
        var sum = Number(a) + Number(b) + '';
        if (!num.startsWith(sum, offset)) break
        a = b;
        b = sum;
        offset += sum.length;
      }
      if (offset===len) return true
    }
  }
  return false;
};
```
