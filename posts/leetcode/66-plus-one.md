## [66. Plus One](https://leetcode.com/problems/plus-one/)
Given a **non-empty** array of digits representing a non-negative integer, plus one to the integer.

The digits are stored such that the most significant digit is at the head of the list, and each element in the array contain a single digit.

You may assume the integer does not contain any leading zero, except the number 0 itself.

Example 1:
```js
Input: [1,2,3]
Output: [1,2,4]
Explanation: The array represents the integer 123.
```
Example 2:
```js
Input: [4,3,2,1]
Output: [4,3,2,2]
Explanation: The array represents the integer 4321.
```
My solution

```js
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
  var curr = digits.length-1
  while (digits[curr]===9 && curr>=0) {
    digits[curr] = 0
    curr--
  }
  if (curr==-1) digits.unshift(1) // KEY
  else digits[curr] += 1
  return digits
};
```
