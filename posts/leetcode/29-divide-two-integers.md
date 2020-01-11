## [29. Divide Two Integers](https://leetcode.com/problems/divide-two-integers/)
> topInterview

Given two integers dividend and divisor, divide two integers without using multiplication, division and mod operator.

Return the quotient after dividing dividend by divisor.

The integer division should truncate toward zero.

Example 1:
```js
Input: dividend = 10, divisor = 3
Output: 3
```
Example 2:
```js
Input: dividend = 7, divisor = -3
Output: -2
```
Note:

- Both dividend and divisor will be 32-bit signed integers.
- The divisor will never be 0.
- Assume we are dealing with an environment which could only store integers within the 32-bit signed integer range: [−231,  231 − 1]. For the purpose of this problem, assume that your function returns 231 − 1 when the division result overflows.

## Notice
位运算是针对 2^31 的如果遇到除数大于 `2^31` 的情况会在位运算时溢出, 因此要特殊处理, 或不使用位运算

## solution

binary search
```js
/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function(dividend, divisor) {
  var res=0, sign=1, MAX=2**31-1
  if (divisor===0) { // add handler though not required
    if (dividend===0) return NaN;
    else return dividend>0?Infinity:-Infinity
  }
  if (dividend<0) {
    sign=-sign
    dividend=-dividend
  }
  if (divisor<0) {
    sign=-sign
    divisor=-divisor
  }
  while (dividend >= divisor) {
    var shift=0, div=divisor
    while (div < dividend>>1) {
      shift++;
      div<<=1
    }
    res += 1<<shift
    dividend -= div
  }
  res=sign * res
  var overflow=res>MAX || res<-MAX-1
  return overflow ? MAX-1 : res
};
```

```js
var divide = function(dividend, divisor) {
  var sign=dividend>0 === divisor>0 ? 1:-1
  var res=sign*Math.floor(Math.abs(dividend)/Math.abs(divisor))
  var MAX=2**31-1
  if (res>MAX) return MAX
  if (res<-MAX-1) return MAX
  return res
};
```
