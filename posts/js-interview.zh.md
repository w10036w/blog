# 前端面试基础 (TODO) 待分类

- [底层协议](interview/protocols.md)
- [设施硬件层](interview/infrastructure.md)
- [JS 语言基础](interview/js.md)
- [ES6 ES7 新特性](interview/es6.md)
- [浏览器](interview/browser.md)
- [typescript](interview/typescript.md)

## CSS + HTML

### CSS
- 盒模型 box model
- 各种边界奇葩现象，margin 上下的合并
- display: block, inline*, flex, grid, table*, contents, none, initial, inherit, run-in, list-item
- flex 布局
- 伪元素，状态元素
- selector 优先度
- pre-css (sass, stylus, 或 jss) + post-css

### HTML
- 标签语义化，比如 header，footer，nav，aside，article，section 等，利于开发/阅读模式/SEO，新增了很多表单元素，入 email，url 等，除去了 center 等样式标签，还有除去了有性能问题的 frame，frameset 等标签
- video，audio
- 新接口，如 navigator.geoloaction
- docType
  - 混杂模式
  - 标准模式
  - 准标准模式

### Promise

[实现](https://github.com/forthealllight/promise-achieve/blob/master/myPromise.js)<br>
要点
- status = 'pending' | 'resolved' | 'rejected';
- value = undefined, reason = undefined, 分别在 resolve / reject 后赋值给参数
- onFullfilledArray = [], onRejectedArray = [], 分别在 resovle / reject 时依次执行
- resolve 后 return 一个 myPromise
- 入参检查 (resolve, reject)
- then 绑在 prototype 上, 用递归把 全部 then 的回调绑在 onFullfilledArray, onRejectedArray 上
- 定义 resolvePromise 

### array 知识点

reducer

> arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])

- websocket 可以让我们建立客户端到服务器端的全双工通信，这就意味着服务器端可以主动推送数据到客户端，
- web worker，web worker 是运行在浏览器后台的 js 程序，他不影响主程序的运行，是另开的一个 js 线程，可以用这个线程执行复杂的数据操作，然后把操作结果通过 postMessage 传递给主线程，这样在进行复杂且耗时的操作时就不会阻塞主线程了。
- 页面间通信: 使用 cookie，使用 web worker，使用 localeStorage 和 sessionStorage
- 浏览器的渲染过程
  - 首先获取 html，然后构建 dom 树
  - 其次根据 css 构建 render 树，render 树中不包含定位和几何信息
  - 最后构建布局数，布局是含有元素的定位和几何信息
- 重绘(repaint): 改变每个元素外观时所触发的浏览器行为，比如颜色，背景等样式发生了改变而进行的重新构造新外观的过程。重构不会引发页面的重新布局，不一定伴随着回流
- 回流(reflow): 浏览器为了重新渲染页面的需要而进行的重新计算元素的几何大小和位置的，他的开销是非常大的，回流可以理解为渲染树需要重新进行计算，一般最好触发元素的重构，避免元素的回流；比如通过通过添加类来添加 css 样式，而不是直接在 DOM 上设置，当需要操作某一块元素时候，最好使其脱离文档流，这样就不会引起回流了，比如设置 position：absolute 或者 fixed，或者 display：none，等操作结束后在显示。

### function, argument 知识点

> https://www.cnblogs.com/yugege/p/5539020.html

我们现在有这样的一个需求，有一个 people 对象，里面存着一些人名，如下：

```js
var people = {
  values: ["Dean Edwards", "Sam Stephenson", "Alex Russell", "Dean Tom"]
};
```

我们希望 people 对象拥有一个 `find` 方法，当不传任何参数时，就会把 people.values 里面的所有元素返回来；当传一个参数时，就把 first-name 跟这个参数匹配的元素返回来；当传两个参数时，则把 first-name 和 last-name 都匹配的才返回来。因为 find 方法是根据参数的个数不同而执行不同的操作的，所以，我们希望有一个 addMethod 方法，能够如下的为 people 添加 find 的重载：

```js
addMethod(people, "find", function() {}); /*不传参*/
addMethod(people, "find", function(a) {}); /*传一个*/
addMethod(people, "find", function(a, b) {}); /*传两个*/
```

这时候问题来了，这个全局的 addMethod 方法该怎么实现呢？John Resig 的实现方法如下，代码不长，但是非常的巧妙：

```js
function addMethod(object, name, fn) {
　var old = object[name]; //把前一次添加的方法存在一个临时变量old里面
　object[name] = function() { // 重写了object[name]的方法
　　// 如果调用object[name]方法时，传入的参数个数跟预期的一致，则直接调用
　　if(fn.length === arguments.length) { // Function.prototype.length 是参数的个数!
　　  return fn.apply(this, arguments);
　　　// 否则，判断old是否是函数，如果是，就调用old
　　} else if(typeof old === "function") {
　　　return old.apply(this, arguments);
　　}
　}
}
```

#### this 指向

```js
const arrayLike = { length: 0 }
const call = [].push.call; // typeof call "function"
call(arrayLike, 1);
console.log(arrayLike); // call is not a function
// because "this" inside `call` points to global "this", thus there is no `call` on window/global/globalThis.
```


## Yarn & NPM

> 参考 https://juejin.im/post/5da9c6b0e51d4524d67486e2

一些题目
- [ ] https://github.com/dwqs/blog/issues/17
- [ ] https://juejin.im/post/5dac5d82e51d45249850cd20

- [ ] https://juejin.im/post/5dc20a4ff265da4d4e30040b
