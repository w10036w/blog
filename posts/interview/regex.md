# interview - regex

## 声明 (ES6)
```js
var re = new RegExp('xyz', 'i');
re = new RegExp(/xyz/i);
re = new RegExp(/xyz/ig, 'i'); // re.flags === 'i'
```
## 方法
- match()
- replace()
- search()
- split()

## 标记 (除 `i`, `g`)
`s`: 正则表达式中 `.` 匹配除回车外的任何单字符，标记 `s` 改变这种行为，**允许行终止符的出现**
```js
/hello.world/.test('hello\nworld');  // false
/hello.world/s.test('hello\nworld'); // true
```
`u`
1. `Unicode` 转义, 处理大于 `\uFFFF` 的 `UTF-16` 编码
2. `.` 识别 `UTF-16`
3. 新增大括号识别 `Unicode`
4. `UTF-16` 数量正确识别
5. 预定义模式
```js
// 1
/^\uD83D/u.test('\uD83D\uDC2A') // false
/^\uD83D/.test('\uD83D\uDC2A') // true
// 2
var s = '𠮷';
/^.$/u.test(s) // true
// 3
/\u{61}/u.test('a') // true
/\u{20BB7}/u.test('𠮷') // true
// 4
/𠮷{2}/.test('𠮷𠮷') // false
/𠮷{2}/u.test('𠮷𠮷') // true
// 5
/^\S$/.test('𠮷') // false // \S 匹配所有非空白
/^\S$/u.test('𠮷') // true
```
