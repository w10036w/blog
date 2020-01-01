## [344. Reverse String](https://leetcode.com/problems/reverse-string/)
Write a function that reverses a string. The input string is given as an array of characters char[].

Do not allocate extra space for another array, you must do this by modifying the input array in-place with O(1) extra memory.

You may assume all the characters consist of printable ascii characters.

Example 1:
```js
Input: ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]
```
Example 2:
```js
Input: ["H","a","n","n","a","h"]
Output: ["h","a","n","n","a","H"]
```
## solution
2 pointers
```js
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
  var l=-1, r=s.length
  while(++l<--r) [s[l], s[r]]=[s[r], s[l]]
};
var reverseString = s => s.reverse()
```
