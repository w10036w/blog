# interview - `es6 es7` 新特性

[ES6 参考书](http://es6.ruanyifeng.com/)

[js 实现斐波那契数列 (数组缓存、动态规划、尾调用优化)](https://www.jianshu.com/p/bbc7e54a98d6)

## Object
Object.freeze / Object.isFrozen

Object.seal / Object.isSealed: 密封一个对象，阻止添加新属性并将所有现有属性标记为不可配置。当前属性的值只要可写就可以改变。

## Class

实现私有变量可以靠 `WeakMap` (无引用即被回收) 或 `Symbol`

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

Promise 化 ajax
```js
function myXHR(method, url, data) {
  var requset = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    requset.onreadystatechange = function () {
      if (requset.readyState === 4) {
        if (requset.status === 200) resolve(requset.responseText)
        else reject(requset.status)
      }
    }
    requset.open(method, url);
    requset.send(data);
  });
}

var p = myXHR('GET', 'url');
p.then(responseText => {
  console.log(responseText);
}).catch(status => {
  console.log(new Error(status));
})
```