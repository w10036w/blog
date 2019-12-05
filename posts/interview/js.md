# JS 语言基础

## 类型
[基本数据类型 primitive](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)：
Null Undefined Boolean String Number Symbol BigInt

引用数据类型: 对象 Object
- 一般对象 - Object
- 数组对象 - Array
- 正则对象 - RegExp
- 日期对象 - Date
- 数学函数 - Math (浏览器全局对象)
- 函数对象 - Function

`typeof` 可以判断 primitive, 不适合判断引用数据类型 object
对一个值使用 typeof 操作符可能会返回下列某个字符：
- “undefined”：如果这个值未定义
- “boolean”：如果这个值是布尔值
- “number”：如果这个值是数值
- “string”：如果这个值是字符串
- “object”：如果这个值是 对象 或 Array 或 null
- “function”：如果这个值是函数

`instanceof` 是查询原型链，因此不适合判断 primitive 类型。

```js
var str1 = 'hello world';
str1 instanceof String // false
```

判断对象（object）的类型最好用 `Object.prototype.toString.call`
Object.prototype.toString.call(arg)==="[object Array]"

instanceof 可以借助 Symbol 判断 primitive 类型：

```js
class PrimitiveNumber {
  static [Symbol.hasInstance](x) {
    return typeof x === 'number'
  }
}
console.log(111 instanceof PrimitiveNumber) // true
```

## Number 数值

最小的数值为：Number.MIN_VALUE，在大多数浏览器中该数值为 5e-324；
最大的数值为：Number.MIN_VALUE ，在大多数浏览器中该数值为 1.7976931348623157e+308

如果某次计算的结果值超出了数值范围，就会转换成特殊的 Infinity 值（ -Infinity 负无穷或 Infinity 正无穷）

可以使用 isFinite () 函数判断是否为无穷数。

有三个函数可以把非数值转换为数值：

- Number()
- parseInt()
- parseFloat()

Number () 可以用于任何数据类型，parseInt 和 parseFloat 专门用于把字符串转换成数值

Number () 函数在转换时规则比较复杂且不够合理，所以更常用的是 parseInt () 函数

parseInt () 函数在转换字符串时有几个规则
- 它会忽略字符串前面的空格，直至找到第一个非空字符串。
- 如果第一个字符不是数字字符或负数，parseInt () 就会返回 NaN。
- 如果第一个字符是数字字符，parseInt 会继续解析第二个字符，知道解析完所有的字符或遇到一个非数字字符。
- 可以在转换时，指定第二个参数即转换使用的基数（即多少进制），来消除 parseInt () 在进制方面的困惑。

```js
var num1 = parseInt("10", 2);   // 2（二进制）
var num2 = parseInt("10", 8);   // 8（八进制）
var num3 = parseInt("10", 10);  // 10（十进制）
var num4 = parseInt("10", 16);  // 16（十六进制）
```

parseFloat 也会从第一个字符开始解析每个字符，也是一直解析到字符末尾，或者解析到遇见一个无效的浮点数字字符为止。也就是说第一个小数点是有效的，第二个就是无效的，后面的字符会被忽略。

parseFloat 还有一个特点是会忽略前导的零。它只能解析十进制数值

## String 字符串
字符字面量 escape value
- \n：换行
- \t：横向tab缩进
- \v: 纵向缩进
- \b：退格
- \r：回车
- \f：换页
- \：换行再续string，不一定被广泛支持，弃用

## ==, ===

"==" 两边的类型是否相同，相同的话就比较值的大小，例如 1==2，返回 false
 判断的是否是 null 和 undefined，是的话就返回 true
 判断的类型是否是 String 和 Number，是的话，把 String 类型转换成 Number，再进行比较
判断其中一方是否是 Boolean，是的话就把 Boolean 转换成 Number，再进行比较
如果其中一方为 Object，且另一方为 String、Number 或者 Symbol，会将 Object 转换成字符串，再进行比较

因此

```js
[]==![] // [] -> 0, ![] -> false -> 0
{a: 1} == "[object Object]") //true

Object.is(NaN, NaN) // true
Object.is(+0, -0) // false

```

## 计算

### 位运算符 (bitwise operator)

[https://juejin.im/entry/57317b2679df540060d5d6c2](我们要不要在 JS 使用二进制位运算？)
[我们要不要在 JS 使用二进制位运算？](https://juejin.im/entry/57317b2679df540060d5d6c2)

首先对性能基本没有负面影响, 纯数字计算更快, 但只能对 Number 使用

& 按位与

| 按位或

^ 按位异或

~ 按位非

<< 左移

\>\> 有符号右移

\>\>\> 无符号右移

位运算时对非 整数 需先转化为 Int32 型整数

#### 位运算符在 js 中的妙用
判断奇偶
```js
// 偶数 & 1 = 0
// 奇数 & 1 = 1
console.log(2 & 1)    // 0
console.log(3 & 1)    // 1
```
使用 `~, >>, <<, >>>, |` 取整
```js
console.log(~~ 6.83)    // 6
console.log(6.83 >> 0)  // 6
console.log(6.83 << 0)  // 6
console.log(6.83 | 0)   // 6, 或随机数取整
// >>>不可对负数取整
console.log(6.83 >>> 0)   // 6
```
使用 `^` 完成值交换  
```js
var a = 5
var b = 8
a ^= b
b ^= a
a ^= b
console.log(a)   // 8
console.log(b)   // 5
```
Linux 权限检查/验证 | 碰撞检测优化 | React effectTag
```js
// 授权时
r = 1|2|4|8
// 鉴权时
r & 4 // 如有权则返回4,否则0
```

<details>
<summary>
大数相加：</summary>
1. 如有小数点，记录各自的小数点后位（如 11.12+34 为 2 0）后，去掉变为整数，补齐空位 （11.12+34 -> 1112+3400）
2. 如有负值，第4步为减法
3. 转化为string并倒转
4. 遍历各对应位置位求和，满十后一位（用临时值）进一【减法若不够则后一位退一】，逢缺位结束并附上另一数多出的数位
5. 倒转，加回小数点
</details>
<hr>
## 闭包

缺点是引用始终存在，占用内存

## 原型链继承

## 常用函数、关键字
```js
// Array shared verification
if (this == null) {
  throw new TypeError(" this is null or not defined");
}
if (Object.prototype.toString.call(fn) != "[object Function]") {
  throw new TypeError(fn + " is not a function");
}
```
Array.map
```js
Array.prototype._map = function(fn, thisArg) {
  const arr = this
  let T
  if (thisArg) T = thisArg
  const res = []

  const l = arr.length
  for(let i = 0; i<l; i++) {
    const r = fn.call(T, arr[i], i, arr)
    res.push(r)
  }
  return res
}
```
Array.reduce
```js
// if reduceRight, amend i
Array.prototype._reduce = function(fn, initValue) {
  const arr = this
  const len = arr.length
  let r = arr[0]
  let i = 0
  if (typeof initValue !== 'undefined') {
    r = initValue
    i--
  }
  while(++i<len) {
    r = fn(r, arr[i], i, arr)
  }
  return r
}
```
Array.filter
```js
Array.prototype._filter = function(fn, thisArg) {
  const arr = this
  const len = arr.length
  const res = []
  let i = -1
  while (++i<len) {
    const r = fn.call(thisArg, arr[i], i, arr)
    if (r) res.push(arr[i])
  }
  return res
}
```

**curry*- function e.g. sum

```js
const sum = (a, b=0) => {
  if (arguments.length === 0) {
    return b
  }
  return n => {
    let res = a+b
    return sum(n, res)
  }
}

console.log(sum(100,200)(300)(400)())
```

Promise / A+

```js
myPromise = function (resolve, reject) {

}
```

**underscore.debounce**

```js
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};
```

**underscore.throttle**

```js
// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
function(func, wait, options) {
  var timeout, context, args, result;
  var previous = 0;
  if (!options) options = {};

  var later = function() {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  var throttled = function() {
    var now = Date.now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };

  throttled.cancel = function() {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
};
```

### `new fn()` 操作代码化演示

```js
var obj = {}; // new 操作符为我们创建一个新的空对象，由此 this 重定向至新对象
obj.__proto__ = fn.prototype; // 空对象的原型指向函数的原型
fn.call(obj);  // 改变构造函数内部的 this 的指向
```

### `this` 和 `call, apply, bind`

bind
```js
// polyfill
// see full in https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind#Polyfill
// Does not work with `new funcA.bind(thisArg, args)`
if (!Function.prototype.bind) (function(){
  var slice = Array.prototype.slice;
  Function.prototype.bind = function() {
    var thatFunc = this, thatArg = arguments[0];
    var args = slice.call(arguments, 1);
    if (typeof thatFunc !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - ' +
        'what is trying to be bound is not callable');
    }
    return function(){
      var funcArgs = args.concat(slice.call(arguments))
      return thatFunc.apply(thatArg, funcArgs);
    };
  };
})();
```

### 为什么 javascript 是单线程的

首先是历史原因，在创建 javascript 这门语言时，多进程多线程的架构并不流行，硬件支持并不好。<br>
其次是因为多线程的复杂性，多线程操作需要加锁，编码的复杂性会增高。<br>
而且，如果同时操作 DOM ，在多线程不加锁的情况下，最终会导致 DOM 渲染的结果不可预期。

当 JS引擎线程执行时 GUI渲染线程会被挂起，GUI 更新则会被保存在一个队列中等待 JS引擎线程空闲时立即被执行。

### 宏任务 & 微任务
我们可以将每次执行栈执行的代码当做是一个`宏任务`（包括每次从事件队列中获取一个事件回调并放到执行栈中执行），
每一个宏任务会从头到尾执行完毕，不会执行其他。

我们前文提到过 JS 引擎线程和 GUI 渲染线程是互斥的关系，浏览器为了能够使 宏任务和 DOM 任务有序的进行，会在一个 `宏任务` 执行结果后，在下一个 `宏任务` 执行前， GUI渲染线程开始工作，对页面进行渲染。

**主代码块，setTimeout，setInterval 等，都属于宏任务**
<hr>
宏任务结束后，会执行渲染，然后执行下一个 宏任务，而微任务可以理解成在当前 宏任务执行后立即执行的任务。

也就是说，当宏任务执行完，会在**渲染前**，将执行期间所产生的所有微任务都执行完。

**Promise，process.nextTick 等，属于 微任务。**

```js
document.body.style = 'background:blue'
console.log(1);
Promise.resolve().then(()={
  console.log(2);
  document.body.style = 'background:black'
});
console.log(3);
```

会打印132，直接变成黑色，因为 Promise 属于微任务，**在渲染前先执行**。

```js
setTimeout(() = {
  console.log(1)
  Promise.resolve(3).then(data = console.log(data))
}, 0)
setTimeout(() = {
  console.log(2)
}, 0)
// print : 1 3 2
```

上面代码共包含两个 setTimeout ，也就是说除主代码块外，共有两个宏任务，
其中第一个宏任务执行中，输出 1 ，并且创建了微任务队列，所以在下一个宏任务队列执行前，
先执行微任务，在微任务执行中，输出 3 ，微任务执行后，执行下一次宏任务，执行中输出 2

#### 顺序总结
- 执行一个 `宏任务`（栈中没有就从事件队列中获取）
- 执行过程中如果遇到 `微任务`，就将它添加到微任务的任务队列中
- 宏任务执行完毕后，立即执行当前 微任务队列中的所有 微任务（依次执行）
- 当前 宏任务执行完毕，开始检查渲染，然后 GUI线程接管渲染
- 渲染完毕后， JS线程继续接管，开始下一个 `宏任务`（从事件队列中获取）

![宏任务 微任务](/assets/img/macromicrotask.webp)

测试：输出结果

```js
async function a1 () {
  console.log('a1 start')
  await a2()
  console.log('a1 end')
}
async function a2 () {
  console.log('a2')
}

console.log('macro1')

setTimeout(() => {
  console.log('setTimeout')
}, 0)

Promise.resolve().then(() => {
  console.log('promise1')
})

a1()

let promise2 = new Promise((resolve) => {
  resolve('promise2.then')
  console.log('promise2')
})

promise2.then((res) => {
  console.log(res)
  Promise.resolve().then(() => {
      console.log('promise3')
  })
})
console.log('macro2')
```

> macro1, a1 start, a2, promise2, macro2, promise1, a1 end, promise2.then, promise3, setTimeout

### 垃圾回收
垃圾回收为`后台` `进程`
垃圾 = 没有被引用的对象 / 根访问不到的循环引用
基础: 标记清除.
优化
- 分代回收
- 增量回收
- 只在 CPU 闲时收集

## QA
- `window, document`: window 对象是指浏览器打开的窗口。document 对象是 HTML 文档对象的一个只读引用，window 对象的一个属性
- 求 [1, 10, 11, -1,'-5',12, 13, 14, 15, 2, 3, 4, 7, 8, 9] 内最大值与最小值之差:
  ```js
  function MaxMinPlus(arr) {
    // 返回最大值与最小值之差
    return Array.isArray(arr) ? Math.max.apply(Math, arr) - Math.min.apply(Math, arr) : console.log('err')
  }
  ```
- `String.trim()`: `str => str.replace(/(^\s+)|(\s+$)/g, '')`
- `setTimeout` 在控制台会返回一个 id.
