## [17. Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/)

Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent.<br>
A mapping of digit to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

```js
Input: "23"
Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
```

### Note
Although the above answer is in lexicographical order, your answer could be in any order you want.

<details>
<summary>hint</summary>
backtracking <br>
用回溯和循环递归重复运行内部函数，设置终止条件
</details>

My solution @2019-11-23  [better answer](https://github.com/Hongbo-Miao/leetcode/blob/master/JavaScript/0017.%20Letter%20Combinations%20of%20a%20Phone%20Number.js)

```js
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
  // backtracking way
  if (digits == null || digits.length === 0) return [];
  const map = {
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'pqrs',
    8: 'tuv',
    9: 'wxyz',
  }
  let i = 0
  const len = digits.length
  const res = []
  function bt(cur, pos) {
    if (cur.length===len) return res.push(cur.slice())
    for (let i=pos; i<len; i++) {
      let letters = map[digits[i]]
      for (let j=0; j<letters.length; j++) {
        bt(cur+letters[j], i+1)
      }
    }
  }
  bt('', 0)
  return res

  // my naive solution
  // if (digits == null || digits.length === 0) return [];
  // const mapping = {
  //   2:['a', 'b', 'c'],
  //   3:['d', 'e', 'f'],
  //   4:['g', 'h', 'i'],
  //   5:['j', 'k', 'l'],
  //   6:['m', 'n', 'o'],
  //   7:['p', 'q', 'r', 's'],
  //   8:['t', 'u', 'v'],
  //   9:['w', 'x', 'y', 'z'],
  // }
  // let i = 0
  // const len = digits.length
  // let r = mapping[digits[i]]
  // while (++i<len) {
  //   const temp = []
  //   r.forEach(e => {
  //     mapping[digits[i]].forEach(el => {
  //       temp.push(e+el)
  //     })
  //   })
  //   r = temp
  // }
  // return r
};
```
