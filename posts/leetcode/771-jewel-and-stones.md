## [771. Jewels and Stones](https://leetcode.com/problems/jewels-and-stones/)
```js
Input: J = "aA", S = "aAAbbbb"
Output: 3

Input: J = "z", S = "ZZ"
Output: 0
```
Solution
```js
/**
 * @param {string} J
 * @param {string} S
 * @return {number}
 */
var numJewelsInStones = function(J, S) {
  var j = new RegExp('['+J+']', 'g')
  return (S.match(j) ||[]).length
  // or use dict / hash table
};
```
