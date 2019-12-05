# interview - browser 浏览器

## 基础知识
- `进程` process 是 CPU 资源分配的最小单位；
- `线程` thread 是 CPU 调度的最小单位，一个进程可有多个线程；
- 不同 `进程` 间可通信，但代价大；
- `单线程` 与 `多线程` ，指在一个 `进程` 内的情况

### 浏览器进程

- 主进程
  - 控制其他进程（创建销毁协调）
  - 界面 UI 显示，用户交互，前进后退收藏
  - 将渲染进程得到的内存中的 Bitmap，绘制到用户界面上 ？？？
  - 处理网络请求，文件访问等
- 第三方插件进程：每插件一个进程
- GPU进程：3D绘图
- 渲染进程（浏览器内核）
  - 页面渲染，脚本执行，事件处理
  - **每 tab 创建一个独立进程**

对于 `渲染进程`，其多线程如下：
- GUI 渲染线程
  - 负责渲染页面，布局和绘制
  - 页面需要重绘和回流时，该线程就会执行
  - 与 js 引擎线程互斥，防止渲染结果不可预期
- JS引擎线程
  - 负责处理解析和执行 javascript 脚本程序
  - 只有一个 JS 引擎线程（单线程）
  - 与 GUI 渲染线程互斥，防止渲染结果不可预期
- 事件触发线程
  - 用来控制事件循环（鼠标点击、setTimeout、ajax 等）
  - 当事件满足触发条件时，将事件放入到 JS 引擎所在的执行队列中
- 定时触发器线程
  - setInterval 与 setTimeout 所在的线程
  - 定时任务并不是由 JS 引擎计时的，是由定时触发线程来计时的
  - 计时完毕后，通知事件触发线程
- 异步http请求线程
  - 浏览器有一个单独的线程用于处理 AJAX 请求
  - 当请求完成时，若有回调函数，通知事件触发线程

考查知识点：知道要尽量不使用 document.write()，知道 [passive 的事件监听器](https://zjy.name/passive-event-listeners/)是什么

## CSRP 跨域

1. 通过jsonp跨域
jsonp在页面上引入不同域上的js脚本文件实现请求不同域上的数据
(1) 通过script标签引入一个js文件
(2) js文件载入成功后会执行我们在url参数中指定的函数，并且会把我们需要的json数据作为参数传入
注：需要服务器端的页面进行相应的配合
2. 通过修改document.domain来跨子域
3. 使用window.name来进行跨域
window对象有个name属性，该属性有个特征：即在一个窗口(window)的生命周期内,窗口载入的所有的页面都是共享一个window.name的，每个页面对window.name都有读写的权限，window.name是持久存在一个窗口载入过的所有页面中的，并不会因新页面的载入而进行重置。

## 跨页面通讯
`WebSocket` (唯一可在无痕模式用), `locatStorage`, `cookies`

## serviceWorker

## Debug

### devtools
> https://zhuanlan.zhihu.com/p/80366959

在调试页面中的 JavaScript 代码时，Chrome DevTools 的断点功能是必不可少的，Chrome DevTools 有很多强大的自动断点功能（即你不需要手动找到想要加断点的那行代码），但下面有一个是杜撰的，请挑出它来（本题以 Chrome 当前稳定版 V72 为准）：

A. 在遇到死循环代码的时候自动断点<br>
B. 在每个 `<script>` 标签第一句代码执行时自动断点<br>
C. 在某个指定的 DOM 方法被调用时自动断点<br>
D. 在未捕获的异常抛出时自动断点<br>
E. 在匹配指定 URL 的 XHR/fetch 请求发起时自动断点<br>
F. 在指定的节点被删除时自动断点

参考答案：A

考查知识点：页面调试能力。A 为错误项，Chrome 开发者工具目前还没有该能力，B 在 Sources 面板中右下角的 `Event Listener Breakpoints > Script > Script First Statement`，C 用 Console 面板上的 debug() 函数，比如 `debug(alert)` ，然后所有调用 alert() 的地方都会自动中断。D 在 Sources 面板右上角的 Pause on exceptions 按钮。E 在  Sources 面板右下角的 XHR/fetch Breakpoints。F 在 Elements 面板中元素上右键 -> Break on -> node removal.

## 浏览器本地存储 local storage

[localForage: IndexedDB/WebSQL or localStorage](https://localforage.docschina.org/)

