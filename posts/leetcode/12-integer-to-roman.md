# [12. Integer to Roman](https://leetcode.com/problems/integer-to-roman/)

> My Solution (`scalable + minimum codes`)
>
> 2019-11-20

```js
/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function(num) {
    const start1 = ['M', 'C', 'X', 'I']
    const start5 = ['D', 'L', 'V']
    const nums = (num+'').padStart(4,0).split('')
    const l = nums.length
    let r = ''
    let i = -1
    while(++i<l) {
        const n = Number(nums[i])
        // order is based on Benford's Law
        if (n===0) continue;
        if (n<4) r+= start1[i].repeat(n)
        else if (n===4) r+= start1[i]+start5[i-1]
        else if (n>4&&n<9) r+= start5[i-1] + start1[i].repeat(n-5)
        else r += start1[i] + start1[i-1] // 9
    }
    return r
};
```

`brutal force` inspired by [solution](https://leetcode.com/problems/integer-to-roman/discuss/6273/Share-My-Python-Solution-96ms)

```js
var intToRoman = function(num) {
  M = ["", "M", "MM", "MMM"];
  C = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
  X = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
  I = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
  return M[num/1000>>0] + C[(num%1000)/100>>0] + X[(num%100)/10>>0] + I[num%10>>0];
}
```

`calculation [maybe best]` inspired by [comment](https://leetcode.com/problems/integer-to-roman/discuss/6273/Share-My-Python-Solution-96ms/7542)

```js
var intToRoman = function(num) {
  const strs = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']
  const nums = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
  let ret = ""
  nums.forEach((e, i) => {
    while(num>=e) {
      ret += strs[i]
      num -= e
    }
    if (num === 0) return ret
  })
}
```
