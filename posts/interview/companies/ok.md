# OK

### JS

- Engine
    - memory heap, call stack(single thread, single call stack, so event loop)
    - V8: hidden class infer, inline cache
    - workflow: js source → parser → abstract syntax tree → compiler / interpreter ( AOT, JIT) → machine code
- Runtime
- Web API
    - DOM
    - AJAX
    - setTimeout, setInterval
    - Observers: MutationObserver, IntersectionObserver, PerformanceObserver, ResizeObserver
    - webSocket
        - need heartbeat to detect health
    - webRTC
    - postMessage(message, targetOrigin, transfer)
- worker
    - concurrency: apply rate limit (job queue, input activeCount to limit maximum concurrency requests)
- web worker(in window):
    - serviceWorker / Share Worker,
        - feat: push notifications and background sync, periodic sync or geofencing
    - PushManager (for push & notification)
        - 3 steps: UI register to subscribe, send msg, receive msg
- Node API
    - path,
- Browser
    - process, thread
- Cutting Edge
    - JSCore, Bun.js, Fresh.js

### HTML

### CSS

- [grid](https://juejin.cn/post/6854573220306255880)

### Framework

- React
    - Fiber
    - optimization

### Engineering
- life cycle
- Unit testing
    - [好处总结](https://juejin.cn/post/7129634778592051214)

      单测可以确保程序得到预期的结果，验证功能完备性
      促使开发者写可测试的代码和整洁的代码结构，易测试的代码间接说明代码质量的好坏
      提前发现Bug和边界值处理，降低风险
      重构时能保证重构的正确性
      测试可以作为其他开发人员理解代码行为的方式之一

      因为作为业务开发且前端是作为和用户最近的一层，特别是交互和视觉上对于前端来说极其不稳定的。所以在我们决定要写单测时，应该考虑我们的优先级：公共方法 > 核心逻辑 > 公共组件 > 业务组件。对于UI层的多变上，我们应该尽量满足我们的公共方法和核心逻辑的测试覆盖，UI上若有强烈需求再进行覆盖，因为在业务开发中，UI上的单测投入回报率并不高且是多变的并不需要刻意为了单测而单测。
    - coverage 
      %stmts：语句覆盖率，指是否每个语句都覆盖到了

      %branch：分支覆盖率，指是否每个if代码块都覆盖到了

      %funcs：函数覆盖率，指是否每个函数都覆盖到了

      %lines：行覆盖率，是否每一行都覆盖到了

      我们可以通过查看报告来发现我们未覆盖的代码
    - [方案搭建](https://juejin.cn/post/6844903654294716423)
    - [实践总结](https://juejin.cn/post/7129634778592051214)
    - e2e: cypress
    - snapshot: in a watch mode, prevent user changing the DOM / render output
    - [shallow render](https://www.robinwieruch.de/jest-snapshot-shallow-render/)
- Image lazyload
    - current best: IntersectionObserver or libs rely on it
    
    ```jsx
    document.addEventListener("DOMContentLoaded", function() {
      var images = [...document.querySelectorAll("img.lazy")] // specify images that need to be lazy-loaded
      
      let ob = new IntersectionObserver((entries, observer) => {
        entries.forEach(e => {
          if (!e.isIntersecting) return; // key line
          const img = e.target // key line
          img.src = img.dataset.src // === img.src = img.getAttribute("data-src")
          img.srcset = img.dataset.srcset
          img.classList.remove("lazy")
          ob.unobserve(img)
        })
      })
      images.forEach(e => ob.observe(e))
    })
    ```
    
    - or non-standarded `loading="lazy"`
    
    ```html
    <img loading="lazy" src="example.com/a.jpg" /> /** iframe can use too **/
    ```
    
    - for CSS `background-image`, with tailwind can apply `hidden` by default to its container, then use `IntersectionObserver` to check
    - issue: need to preset the height/width or ratio to prevent element moving; affecting Largest Contentful Paint(LCP); not lazy load initial screen’s images — *Never*
     lazy load images that are visible in the viewport during startup.
    - if consider Lazyload SEO, detect userAgent
    libs: [lozad.js](https://github.com/ApoorvSaxena/lozad.js) for lightweight, [lazysizes](https://github.com/aFarkas/lazysizes) for SEO & iframe support as well, if use CDN, use `async=""`
- Webpack
    - [https://www.zhihu.com/question/484158055/answer/2551897278](https://www.zhihu.com/question/484158055/answer/2551897278)
    - thread-loader, cache-loader (no need in v5 as has persistent cache)
    - production nosources-source-map or no source map
    - bundle analyzer
    - excludes libs(React), can use CDN import / Module Federation to reuse libs/bundles
    - loading on demand
    - lazyload lib, route,
    - gzip / compression
    - purgecss-webpack-plugin for css
    - Enable optimization.splitChunks: 'all' with split-chunks-plugin. This would make webpack automatically code-split your entry bundles for better caching.
    - Set optimization.runtimeChunk: true. This would move webpack’s runtime into a separate chunk — and would also improve caching.
    - google-fonts-webpack-plugin downloads font files, so you can serve them from your server.
    - workbox-webpack-plugin allows you to generate a service worker with a precaching setup for all of your webpack assets. Also, check Service Worker Packages, a comprehensive guide of modules that could be applied right away. Or use preload-webpack-plugin to generate preload/prefetch for all JavaScript chunks.
    - speed-measure-webpack-plugin measures your webpack build speed, providing insights into which steps of the build process are most time-consuming.
    - duplicate-package-checker-webpack-plugin warns when your bundle contains multiple versions of the same package.
- Project build optimization — always define priorities, spot quick wins
    - [https://www.smashingmagazine.com/2021/01/front-end-performance-build-optimizations/](https://www.smashingmagazine.com/2021/01/front-end-performance-build-optimizations/)
    - anaylze: network waterfall, timing, profile, lighthouse, `console.time/timeEnd`, `performance.timing`, PerformanceObserver, identify the bottleneck
    - cache strategy, http caching + persistent/browser cache, memory cache
    - script streaming: `<script>` defer/async/type=”module”
    - tree shaking, scope hoisting, code splitting
    - assets optimization
    - **offload JavaScript into a Web Worker / module workers**, can use for polling new version
    - legacy long run: **Identify and rewrite / remove legacy code with incremental decoupling**
    - **[Bundlephobia](https://bundlephobia.com/), npm trends, vscode import cost, webpack-analyzer compare and conquer**
    - island like astro / fresh.js, partial hydration
    - **predictive** prefetching / preconnect for DNS, link (static resources), JS chunks
    - **prefer to self-host third-party assets, CDN libs, images, …**
    - network communication optimization / minimize, reduce CORS, proxy
    - setTimeout, requestIdleCallback
    - delivery optimizations
    - asset optimization
    

Framework

- React, Vue, Node, Angular