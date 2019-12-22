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
- 异步 http 请求线程
  - 浏览器有一个单独的线程用于处理 AJAX 请求
  - 当请求完成时，若有回调函数，通知事件触发线程

尽量不使用 document.write()，知道 [passive 的事件监听器](https://zjy.name/passive-event-listeners/)是什么

## 浏览器渲染

DOM -> CSSOM -> Render Tree -> Layout -> Paint -> Composite
- 构建 DOM 树: 1) 页面初次加载, 获取 `html`, 构建 `DOM` 树; 2) js 修改了节点, 再次构建;
- 构建渲染树: 根据 `css` 生成 `CSSOM`, 和 `DOM` 合并构建为 `render` 树，render 树中不包含 定位和几何信息
- 构建布局树: `layout`，含有元素的定位和几何信息, 可能随 JS 指令重新计算, 称为 回流 (reflow)
- 绘制 (paint): 遍历渲染树，调用渲染器的 paint() 方法在屏幕上绘制出节点内容，本质上是一个像素填充的过程。这个过程也出现于回流或一些不影响布局的 CSS 修改引起的屏幕局部重画，这时候它被称为重绘（Repaint）。实际上，绘制过程是在多个层上完成的，这些层我们称为渲染层（RenderLayer）
- 渲染层合成 (Composite) :多个绘制后的渲染层按照恰当的重叠顺序进行合并，而后生成位图，最终通过显卡展示到屏幕上

`渲染层 (RenderLayer)`: 浏览器创建新渲染层的情况:
  - DOM 根元素 `document`
  - CSS `position（relative、fixed、sticky、absolute）`, `opacity < 1`, `filter`, `mask`, `mix-blend-mode` 不为 `normal`, `transform` 非 `none`, `backface-visibility: hidden`, `reflection`, `column-count` 值不为 auto, `column-width` 属性且值不为 auto, `overflow` 不为 `visible`
  - 当前有对于 `opacity`, `transform`, `fliter`, `backdrop-filter` 应用动画

`重绘(repaint)`: **绘制阶段**, 改变每个元素外观时所触发的浏览器行为，比如颜色，背景等样式发生了改变而进行的重新构造新外观的过程。重构不会引发页面的重新布局，不一定伴随着回流

`回流(reflow)`: **构建布局阶段**, 浏览器为了重新渲染页面的需要而进行的重新计算元素的几何大小和位置的，他的开销是非常大的，回流可以理解为渲染树需要重新进行计算，一般最好触发元素的重构，避免元素的回流；比如通过通过添加类来添加 css 样式，而不是直接在 DOM 上设置，当需要操作某一块元素时候，最好使其脱离文档流，这样就不会引起回流了，比如设置 position：absolute 或者 fixed，或者 display：none，等操作结束后在显示。

## 浏览器缓存
> https://www.geekjc.com/post/5d37f67480c18e4071ccc440

浏览器缓存分为强缓存和协商缓存。当客户端请求某个资源时，获取缓存的流程如下 (命中协商缓存 `304`, 命中强缓存 `200`)

1. 先根据这个资源的一些 `http` `header` 判断它是否命中强缓存，如果命中，则直接从本地获取缓存资源，不会发请求到服务器；
2. 当强缓存没有命中时，客户端会发送请求到服务器，服务器通过另一些 `request header` 验证这个资源是否命中协商缓存，称为 `http 再验证`，如果命中，服务器将请求返回，但不返回资源，而是告诉客户端直接从缓存中获取，客户端收到返回后就会从缓存中获取资源；
3. 强缓存和协商缓存共同之处在于，如果命中缓存，服务器都不会返回资源； 区别是，**强缓存对发送请求到服务器，但协商缓存会**。
4. 当协商缓存也没命中时，服务器就会将资源发送回客户端。
5. 当 `ctrl+f5` 强制刷新网页时，直接从服务器加载，跳过强缓存和协商缓存；
6. 当 `f5` 刷新网页时，跳过强缓存，但是会检查协商缓存；

### 强缓存
通过默认 http 请求发送, 命中时 `200`, 优先级从高到低

- `Cache-Control:max-age`: 定义于 `http1.1`，利用其 `max-age` 值来判断缓存资源的最大生命周期，它的值单位为 `秒`
  ```js
  Cache-control: max-age=30 // 30s 后过期
  // 'no-store': 不需要缓存的资源
  // 'no-cache' + Etag: 频繁变动
  // 'max-age=31536000' + Etag: 代码文件, 一旦文件名变动即重新下载
  ```
- `Expires`: 定义于 `http1.0`，值为 `GMT字符串`，代表缓存资源的过期时间
  ```js
  Expires: Wed, 22 Oct 2018 08:41:00 GMT // 此时间后过期; 受本地时间影响
  ```

### 协商缓存
通过新的 http 请求发送, 命中时 `304`, 优先级从高到低

- `ETag` + `If-None-Match`: `Etag` 表资源唯一标识，客户端如发现 (资源) 有 `Etag` (之前自服务器发来), 通过 `If-None-Match` 将其发送给服务端, 如服务端发现 `Etag` 不一致则发更新的资源，否则命中
- `Last-Modified` + `If-Modified-Since`: `Last-Modified` 为本地文件最后修改日期 (之前服务端发来). 客户端如发现有 `Last-Modified`, 通过 `If-Modified-Since` 将其发送至服务端, 如服务端发现此日期后有更新则发资源, 否则命中. 但是如果在 `本地打开缓存文件`， `Last-Modified` 会被修改

## CORS 跨域
同源策略：浏览器安全策略，同协议、ip、端口的脚本才会执行。
只要协议、域名、端口有任何一个不同，都被当作是不同的域
1. `NGINX 反向代理`: `proxy_pass http://xxx.xxx.xxx`
2. 服务端 如 `express`, `koa` 配置 `cors`
3. 通过 `jsonp` 跨域
jsonp在页面上引入不同域上的 js 脚本文件实现请求不同域上的数据
  - 通过 `script` 标签引入一个 js 文件
  - js 文件载入成功后会执行我们在url参数中指定的函数，并且会把我们需要的json数据作为参数传入
    注：需要服务器端的页面进行相应的配合
4. 通过修改document.domain来跨子域
5. 使用 `window.name` 来进行跨域
window对象有个name属性，该属性有个特征：即在一个窗口(window)的生命周期内,窗口载入的所有的页面都是共享一个window.name的，每个页面对window.name都有读写的权限，window.name是持久存在一个窗口载入过的所有页面中的，并不会因新页面的载入而进行重置。

## 跨页面通讯
- [`BroadcastChannel()`](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API): `.postMessage()`, `.onmessage()`, `.close()`
- `ServiceWorker`
- `WebSocket` (可无痕模式用)
- `locatStorage` + `window.onstorage`
- `IndexedDB / cookies / Worker` + `setInterval()`
- window.open + window.postMessage

## WebSocket
> https://zhuanlan.zhihu.com/p/23386938

H5新协议, 在单个 TCP 连接上建立客户端到服务端的全双工通信 (Full Duplex, 单工通信只能 A->B, 半双工可A->B或B->A, 不能同时进行), 这就意味着服务器端可以主动推送数据到客户端. 一开始借助 http 请求 (一次握手) 完成.

客户端握手请求 `connection: upgrade` 表示开始准备进行 websocket 通信, 服务端如支持 upgrade, sec-webscoket-version, `sec-websocket-key` + `sec-websocket-accept` 即返回 `101 switching protocols`
![handshake](../../assets/img/interview-browser-websocket-handshake.png)

```js
ws = new WebSocket("wss://127.0.0.1:1000/application")
// listeners: ws.
ws.onopen, ws.onmessage, ws.onclose, ws.onerror
ws.send() // client sends msg
ws.readyState // current status
```

## DNS 原理

DNS (Domain Name System, 域名系统)，作为域名和 IP 地址相互映射的一个分布式数据库。

当浏览器访问一个域名的时候，需要解析一次 DNS，获得对应域名的 ip 地址。在解析过程中，按照`浏览器缓存`、`系统缓存`、`路由器缓存`、`ISP(运营商)DNS缓存`、`根域名服务器`、`顶级域名服务器`、`主域名服务器`的顺序，逐步读取缓存，直到拿到 IP 地址。

### 总结
如果浏览器最近将一个域名解析为 IP 地址，所属的操作系统将会缓存，下一次 DNS 解析时间可以低至 0-1ms。 如果结果不在系统本地缓存，则需要读取路由器的缓存，则解析时间的最小值大约为 15ms。如果路由器缓存也不存在，则需要读取 ISP（运营商）DNS 缓存，一般像 taobao.com、baidu.com 这些常见的域名，读取 ISP（运营商）DNS 缓存需要的时间在 80-120ms，如果是不常见的域名，平均需要 200-300ms。一般的网站在运营商这里都能查询的到，所以普遍来说 DNS Prefetch 可以给一个域名的 DNS 解析过程带来 15-300ms 的提升，尤其是一些大量引用很多其他域名资源的网站，提升效果就更加明显了。
<hr>

## [serviceWorker vs webWorker](https://stackoverflow.com/questions/38632723/what-can-service-workers-do-that-web-workers-cannot)
> 参考 https://bitsofco.de/web-workers-vs-service-workers-vs-worklets/

`web worker` 目的是**不阻塞主线程的平行运行**, 多对一(tab), 生命周期和对应 tab 相同, 是后台运行的单独线程, 无需 UI 即可完成任务, 如发送 `网络请求`. 可执行复杂的数据操作后通过 `postMessage` 传递给 js 主线程.

`service worker` 目的是**离线或基于网络连接状态变化的用户体验**, 一对多(tab), 独立生命周期, 作为 `各 web 应用, 浏览器和网络` 的代理服务器. 其同样支持消息推送和后台同步 API.

## link

- DNS 预加载 `dns-prefetch`
  > https://www.geekjc.com/post/5d762123c15afd63c91f4862
  > https://bubkoo.com/2015/11/19/prefetching-preloading-prebrowsing/

  DNS Prefetch 根据浏览器定义的规则，提前解析之后可能会用到的域名，使解析结果缓存到系统缓存中，缩短 DNS 解析时间，来提高网站的访问速度。

  Chromium 不使用浏览器的网络堆栈，直接使用操作系统的缓存。通过 8 个异步线程执行预解析，每个线程处理一个队列，来等待域名的响应，最终操作系统会响应一个 DNS 结果给线程，然后线程丢弃它，等待下一个预解析请求。

  这似乎是一个非常微小的性能优化，显得也并非那么重要，但事实并非如此 – Chrome 一直都做了类似的优化。当在浏览器的地址栏中输入 URL 的一小段时，Chrome 就自动完成了 DNS 预解析（甚至页面预渲染），从而为每个请求节省了至关重要的时间。

  `自动解析`: 当遇到 a 标签，Chromium 会自动将 href 中的域名解析为 IP 地址，这个解析过程是与用户浏览网页并行处理的。但是为了确保安全性，在 HTTPS 页面中不会自动解析。

  当我们希望在 HTTPS 页面开启自动解析功能时，添加如下标记
  ```html
  <meta http-equiv="x-dns-prefetch-control" content="on"> <!-- off 为关闭 -->
  ```
  `手动解析`:
  ```html
  <link rel="dns-prefetch" href="//delai.me">
  <!-- use chrome://histograms/DNS.PrefetchQueue to check cache hit-->
  ```
- 预加载 `preload`, 声明式 `fetch`, 不阻塞 `onload`
  ```html
  <link rel="preload" href="https://www.geekjc.com">
  ```
- 预连接 `preconnect`, DNS 预解析 + TCP 握手 + 建立传输层协议
  ```html
  <link rel="preconnect" href="http://example.com">
  ```
  > 现代浏览器都试着预测网站将来需要哪些连接，然后预先建立 socket 连接，从而消除昂贵的 DNS 查找、TCP 握手和 TLS 往返开销。然而，浏览器还不够聪明，并不能准确预测每个网站的所有预链接目标。好在，在 Firefox 39 和 Chrome 46 中我们可以使用 preconnect 告诉浏览器我们需要进行哪些预连接。
- 预渲染 `prerender`, 确保该页面一定会被打开时使用; 预加载页面的全部资源
  ```html
  <link rel="prerender" href="https://www.geekjc.com">
  ```
  使用 [Page Visibility API](http://www.w3.org/TR/page-visibility/) 可以防止页面真正可见前被执行。
- 预获取 `prefetch`, 确保该资源一定会被用到时使用; 没有同源策略的限制; 对 `webfonts` 性能提升明显
  ```html
  <link rel="prefetch" href="image.png">
  ```
- 最高优先级预获取 `subresource`, 在所有 `prefetch` 前运行
  ```html
  <link rel="subresource" href="styles.css">
  ```
  > `rel=prefetch` 为将来的页面提供了一种低优先级的资源预加载方式，而 `rel=subresource` 为当前页面提供了一种高优先级的资源预加载。

## 常用事件/变量/函数
### 高度/宽度
> https://segmentfault.com/a/1190000010746091

1. `document.documentElement.clientWidth / clientHeight`: 屏幕可视区域的宽高, 不含滚动条和工具条
2. `window.innerWidth / innerHeight`: 可视区域的宽高
3. `window.outerWidth / outerHeight`: `innerWidth` 加上相应的工具条和滚动条窗口
4. `screen.availWidth / availHeight`: 屏幕的可用宽高, 如 mac 下顶部状态工具栏高 23px, `availHeight` = monitorResolution - 23px

以下为 DOMElement 所拥有

5. `clientWidth / clientHeight`: 内容的宽高
6. `offsetHeight / offsetWidth`: e.g. `document.body.offsetHeight`, DOM 元素本身的宽高, 如长段文字会超出屏幕
7. `offsetLeft / offsetTop`: 所有 HTML 元素拥有 offsetLeft 和 offsetTop 属性来返回元素的 X 和 Y 坐标
   1. 相对于已定位元素的后代元素和一些其他元素（表格单元），这些属性返回的坐标是相对于父元素
   2. 一般元素，则是相对于文档，返回的是文档坐标
   3. `offsetParent` 指其相对的父元素, `null` 表示是一般元素, Left/Top 为相对文档坐标.
8. `scrollWidth / scrollHeight`: 元素的内容区域加上内边距，在加上任何溢出内容的尺寸.<br>没有溢出时 = `client*`, 溢出时 = `offset*`
9. `scrollLeft & scrollTop`: 元素的滚动条的位置, 修改其让元素中的内容滚动

### 移动浏览器
#### 手机 平板 判断
```js
var deviceFix = function() {
  var pixelRatio = window.devicePixelRatio;
  var screenWidth  = screen.width;
  //Retina
  if( pixelRat >= 2 ){}
  //iPhone 3gs, 3g, Edge
  if( pixelRat < 2 && screenWidth === 320 ){}
  // etc.
}
```
#### 方向变化
> https://davidwalsh.name/orientation-change
JS 处理
```js
// experimental
window.addEventListener("deviceorientation", handleOrientation, true);

// Listen for orientation changes
window.addEventListener("orientationchange", function() {
  // Announce the new orientation number
  alert(screen.orientation.angle); // -90 means landscape rotated to the right
}, false);

// Listen for resize changes, works better
window.addEventListener("resize", function() {
}, false);
```
CSS Media Queries
```css
/* portrait */
@media screen and (orientation:portrait) {
  /* portrait-specific styles */
}
/* landscape */
@media screen and (orientation:landscape) {
  /* landscape-specific styles */
}
/* to determine orientation you will have a problem with when keyboard is showing height will be smaller the with I will recommend to use: */
/* portrait */
@media screen and (max-aspect-ration: 13/9) {
  /* portrait-specific styles */
}
/* landscape */
@media screen and (min-aspect-ration: 13/9) {
  /* landscape-specific styles */
}
```

<hr>

## 性能优化 performance
- DNS 预解析: dns-prefetch
- 浏览器缓存: html 协商缓存, css/js/img 强缓存 + hash (cache-control + etag)
- 使用 http2: 多路复用, 压缩 head
- 预加载等 `Link` 特性 (preload, prefetch, subresouce)
- 懒执行懒加载
- 文件优化: 图片 `compression` `webp`, fontawesome, 小图 base64/svg; JS: server compression, `defer/async`, `Worker`
- [CDN](infrastructure.md)
- webpack uglify + tree shaking + code splitting

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
