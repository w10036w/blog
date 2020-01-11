# daily questions

TODO
## numbers to chinese
Example
```js
console.table({
  0: num2cn(0), // '零'
  12: num2cn(12), // '十二'
  105349: num2cn(105349), // 十万零五千三百四十九
  1000005600454456: num2cn(1000005600454456), // '一千万零五十六亿零四十五万四千四百五十六'
  2000000000000000: num2cn(2000000000000000), // '二千万亿'
})
```

```js
var num2cn = num => {
  if (num===0) return '零'
  num+=''
  let s = helper(num)
  s = s
    .replace(/零+/g, '零').replace(/^零|零$/g, '').replace(/零万/g, '万').replace(/零亿/g, '亿') // merge 0s
    .replace(/^一十/, '十') // edge case
    .replace(/亿万$/, '亿') // e.g. 1,0000,0000
  return s
}
function helper(str){
  const len = str.length
  if (len<4) return helper(str.padStart(4, 0))
  const nums = '零一二三四五六七八九'
  const units = ['千', '百', '十', '']
  const largeNum = [ [12, '万'], [8, '亿'], [4, '万'] ]
  let s = ''
  for(let [d, u] of largeNum) {
    if (len>d)
      return helper(str.slice(0, len-d)) + u + helper(str.slice(-d))
  }
  for(let i=0;i<len;i++) {
    s+= nums[str[i]] + (str[i]==='0' ? '':units[i])
  }
  return s
}

// test cases

```
