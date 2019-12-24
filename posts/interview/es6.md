# interview - `es6-10` 新特性

[ES6 参考书](http://es6.ruanyifeng.com/)

[js 实现斐波那契数列 (数组缓存、动态规划、尾调用优化)](https://www.jianshu.com/p/bbc7e54a98d6)

## String
新方法
- `String.fromCodePoint()`: 弥补 `String.fromCharCode()`(从 Unicode 码点返回对应字符，但是这个方法不能识别码点大于 `0xFFFF` 的字符), 识别全部 Unicode, 和 `codePointAt()` 互反;
- `String.raw()`: 不对 `\n` 等转义字符转义(如换行等), 原样返回

### unicode
```js
'\u0061' // 'a'
'\u{6F}' // 'o'
"\u{20BB7}" // "𠮷"
let hello = 123; hell\u{6F}===123 // !!!
'\u{1F680}' === '\uD83D\uDE80'
'z' === '\z' ==='\172' === '\x7A' === '\u007A' === '\u{7A}'
```

### 字符串遍历 (可识别 UTF-16, for loop 不可以)
```js
for (let codePoint of 'foo') {
  console.log(codePoint) // "f", "o", "o"
}
```

## Object
Object.freeze / Object.isFrozen

Object.seal / Object.isSealed: 密封一个对象，阻止添加新属性并将所有现有属性标记为不可配置。当前属性的值只要可写就可以改变。

## Class

实现私有变量可以靠 `WeakMap` (无引用即被回收) 或 `Symbol`

## Reflect & Proxy
`Reflect`
1. **Object 语言内部方法**: 将 Object 对象的一些属于语言内部的方法如 `Object.defineProperty`, 放到 Reflect 对象上。现阶段，某些方法同时在 Object 和 Reflect 对象上部署，未来的新方法将只部署在 Reflect 对象上。也就是说，从 Reflect 对象上可以拿到语言内部的方法。
2. **Object 部分方法的返回值改变**: 让其变得更合理。比如，`Object.defineProperty(obj, name, desc)` 在无法定义属性时，会抛出一个错误，而 Reflect.defineProperty(obj, name, desc) 则会返回 `false`.
3. **object 操作函数化**: 如 `name in obj` -> `Reflect.has(obj, name)`, `delete obj[name]` -> `Reflect.deleteProperty(obj, name)`
4. **与 `Proxy` 方法一一对应**: 让 Proxy 对象可以方便地调用对应的 Reflect 方法，完成默认行为，作为修改行为的基础。也就是说，不管 Proxy 怎么修改默认行为，你总可以在 Reflect 上获取默认行为。

`Proxy`
- 修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种 “元编程”（meta programming），即对编程语言进行编程。
- 在目标对象之前架设一层 “拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写.

基本用法 basic usage
```js
var proxy = new Proxy(target={}, handler={});
```

```js
// all handlers
var obj = new Proxy({}, {
  // 拦截: 该对象属性的读取
  // !! 如果一个属性不可配置（configurable）且不可写（writable），则 Proxy 不能修改该属性，否则通过 Proxy 对象访问该属性会报错。
  get(target, propKey, receiver) {
    console.log(`getting ${propKey}!`);
    return Reflect.get(target, propKey, receiver);
  },
  // 拦截: 该对象属性的设置
  set(target, propKey, value, receiver) {
    console.log(`setting ${propKey}!`);
    return Reflect.set(target, propKey, value, receiver);
  },
  // 拦截: propKey in obj
  has(target, propKey) {},
  // 拦截: delete obj[propKey]
  deleteProperty(target, propKey){
    // 例子: 不允许删除
    // throw new TypeError()
  },
  // 拦截 Proxy 实例作为函数调用的操作
  // proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)
  apply(target, object, args){},
  // 拦截 Proxy 实例作为构造函数调用的操作, new proxy(...args)
  construct(target, args) {},
  // 拦截 Object.defineProperty(proxy, propKey, propDesc), Object.defineProperties(proxy, propDescs)
  // 返回一个布尔值
  defineProperty(target, propKey, propDesc) {},
  //拦截 Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in 循环，返回一个数组。
  // 该方法返回目标对象所有自身的属性的属性名，而 Object.keys() 的返回结果仅包括目标对象自身的 可遍历 属性。
  ownKeys(target){},
  // -------------------------------------------
  // 拦截 Object.setPrototypeOf(proxy, proto)，返回一个布尔值。
  // 如果目标对象是函数，那么还有两种额外操作可以拦截。
  setPrototypeOf(target, proto) {},
  // 拦截 Object.preventExtensions(proxy)，返回一个布尔值。
  preventExtensions(target) {},
  // 拦截 Object.getPrototypeOf(proxy)，返回一个对象。
  getPrototypeOf(target) {},
  // 拦截 Object.isExtensible(proxy)，返回一个布尔值
  isExtensible(target){},
});
```
1. 安全枚举类型 safe enumerable type
```js
export default function enum(object) {
  return new Proxy(object, {
    get(target, prop) {
      if (target[prop]) {
        return Reflect.get(target, prop)
      } else {
        throw new ReferenceError(`Unknown enum '${prop}'`)
      }
    },
    set() {
      throw new TypeError('Enum is readonly')
    },
    deleteProperty() {
      throw new TypeError('Enum is readonly')
    }
  })
}
```
<hr>

## Symbol

## Function
### name

```js
var f = function () {};
var ff = f
// ES5
f.name // ""
// ES6
f.name // "f"
ff.name // 'f'
(new Function).name // "anonymous"
function foo() {};
foo.bind({}).name // "bound foo"
(function(){}).bind({}).name // "bound "
```

### 参数默认值, ...rest
- 对 `length` (函数预期传入的参数个数) 的影响: 指定默认值的参数及之后的参数都不计入, `...` 参数也不会计入。
```js
(function (a, b = 5, c) {}).length // 1
(function (a, ...args) {}).length // 1
```
- 对 `作用域`, 一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的。
```js
var x = 1;
(function f(x, y = x) {
  console.log(y);
})(2) // 2
(function f(y = x) {
  let x = 2;
  console.log(y);
})() // 1
(function foo(x = x) {})() // ReferenceError: x is not defined
// 上面代码 "x = x" 形成一个单独作用域。实际执行的是 let x = x，由于暂时性死区，这行代码会报错 ”x 未定义 “。
(function foo(x, y = function() { x = 2; }) {
  var x = 3;
  y();
  console.log(x);
})() // 3
x // 1
```

## Array
```js
.from(arrayLike) // convert arrayLike to array
```
Q & A
```js
// Reflect 会返回 symbol 属性 key, getOwnPropertyNames 会返回不可枚举的属性 key
Reflect.ownKeys(obj).length ≥ Object.getOwnPropertyNames(obj).length ≥ Object.keys(obj).length
```

`Proxy` 可以实现很多以前只有魔改 JS 引擎底层才能实现的效果，请找出下面是利用 Proxy 实现了的神奇效果：

A. 原型就是自己的对象 —— Object.getPrototypeOf(obj) === obj // true

B. 任意属性都存在的对象 ——  "任意名字的属性" in obj // true

C. 任意值都是它的实例的对象，甚至 null 和 undefined  ——  undefined instanceof obj // true

D. 用 Object.prototype.toString() 检测出来的对象类型是 haha 的对象  —— Object.prototype.toString.call(obj) === "[object haha]" // true 

E. 一元加后的值与加 0 后的值分别恒等于两个不同的数字  ——  比如 +obj 始终 === 1，但 obj + 0 始终等于 === 10

F. 亦假又亦真的对象  ——  if (obj) {alert("执行不到")} 但 if (obj.length) {alert("能执行到")}

参考答案：AB

A:
```js
obj = new Proxy({}, {getPrototypeOf(){return obj}})
```
B:
```js
obj = new Proxy({}, {has(){return true}})
```
C:
```js
obj = {[Symbol.hasInstance](){return true}}
```
D:
```js
obj = {[Symbol.toStringTag]: "haha"}
```
E:
```js
obj = {[Symbol.toPrimitive](hint){return hint === "number" ? 1 : 10}} 
```

F: `document.all` 具有其性质

## Promise

[实现](https://github.com/forthealllight/promise-achieve/blob/master/myPromise.js)<br>
[实现2](https://juejin.im/post/5b83cb5ae51d4538cc3ec354)

实现要点
- status = 'pending' | 'resolved' | 'rejected';
- value = undefined, reason = undefined, 分别在 resolve / reject 后赋值给参数
- onFullfilledArray = [], onRejectedArray = [], 分别在 resovle / reject 时依次执行
- resolve 后 return 一个 myPromise
- 入参检查 (resolve, reject)
- then 绑在 prototype 上, 用递归把 全部 then 的回调绑在 onFullfilledArray, onRejectedArray 上
- 定义 resolvePromise

注意事项
- 在 Pending 转为另外两种之一的状态时候，状态不可在改变..
- Promise 的 then 为异步。而 (new Promise()) 构造函数内为同步
- Promise 的 `catch` **不能捕获任意情况的错误** (比如 then 里面的 setTimout 内手动抛出一个 Error)
- Promise 的 then 返回 Promise.reject() 会中断链式调用
- Promise 的 resolve 若是传入值而非函数，会发生值穿透的现象
- Promise 的 `catch, then`,return 的都是一个新的 `Promise`(在 Promise 没有被中断的情况下)
