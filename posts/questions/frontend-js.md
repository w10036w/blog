# interview questions 趣题

## numbers2chinese
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
    .replace(/^一十/, '十') // e.g. 12
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
```

## commafy
Example
```js
console.table({
  0: commafy(0), // 0
  1200: commafy(1200), // 1,200
  -1200.1: commafy(-1200.1), // -1,200.1
  12000000.11: commafy(12000000.11), // 12,000,000.11
})
```

```js
// return string
function commafy(num) {
  if (num<1000 && num>-1000) return num+''
  num=(num+'').split('')
  var dot=num.indexOf('.')
  var end=(dot>-1 ? dot:num.length)-1
  var start=num[0]==='-'?1:0
  while(end-start>2) {
    end-=3
    num.splice(end+1, 0, ',')
  }
  return num.join('')
}
```
follow-up
- only need to cut integer part
- `for(let i = a.length - 3; i > 0; i=i-3)`

## hexToRGB
Example
```js
hexToRGB('#F0F0F0') // => rgb(240, 240, 240)
hexToRGB('#9fc') // => rgb(153, 255, 204)
hexToRGB('无效颜色') // => null
```

```js
function hexToRGB(hex) {
  if (!/^#([0-9A-Fa-f]{3})?[0-9A-Fa-f]{3}$/.test(hex)) return null
  var a,b,c
  if (hex.length===4) {
    a=h2n(hex[1]+hex[1]), b=h2n(hex[2]+hex[2]), c=h2n(hex[3]+hex[3])
  } else {
    a=h2n(hex[1]+hex[2]), b=h2n(hex[3]+hex[4]), c=h2n(hex[5]+hex[6])
  }
  return `rgb(${a},${b},${c})`
}
const h2n = hex => parseInt(hex, 16)
```

## camelCase
Example
```js
camelCase('Is_1000_number-good-enough') // isGoodEnough
```

```js
function camelCase(s) {
  return s ? s.replace(/^\w/, l => l.toLowerCase())
    .replace(/[_\-](\w)/g, (_, l) => l.toUpperCase()) : ''
}
```

## isPrime
Example
```js
isPrime(2) // true
isPrime(10) // false
```

核心: 6n+1, 6n-1, 平方根简化
```js
function isPrime(num) {
  if (num<=3) return num>1
  if (num%6!==1 && num%6!==5) return false
  var sqrt = Math.floor(Math.sqrt(num))
  for (var i=5; i<sqrt; i+=6) {
    if (num%i===0 || num%(i+2)===0) return false
  }
  return true
}
```
