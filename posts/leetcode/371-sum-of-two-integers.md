## [371. Sum of Two Integers](https://leetcode.com/problems/sum-of-two-integers/)
> easy, topInterview

Calculate the sum of two integers a and b, but you are not allowed to use the operator + and -.

Example 1:
```js
Input: a = 1, b = 2
Output: 3
```
Example 2:
```js
Input: a = -2, b = 3
Output: 1
```

## solution
bitwise
```js
/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var getSum = function(a, b) {
  // test every round
  // console.log(a.toString(2).padStart(5,0),b.toString(2).padStart(5,0))
  return b===0 ? a : getSum(a^b, (a&b)<<1)
}
```

if is integer just `a.toString(2)`
follow up: convert float number to binary
```js
/**
 * @param {number} a
 * @return {string}
 */
var convert = function(num) {
  return (num|0).toString(2) // if not integer
}
```

convert binary to integer
```js
/**
 * @param {string} a
 * @return {number}
 */
var convert = function(s) {
  // 1
  return parseInt(s, 2)
  // 2
  return Number('0b'+s)
}
```
