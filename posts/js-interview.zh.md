# 前端面试基础 (TODO) 待分类

- [掘金: 自检清单](https://juejin.im/post/5cc1da82f265da036023b628)
- [底层协议](interview/protocols.md)
- [设施硬件层](interview/infrastructure.md)
- [JS 语言基础](interview/js.md)
- [regex](interview/regex.md)
- [ES6 ES7 新特性](interview/es6.md)
- [浏览器](interview/browser.md)
- [typescript](interview/typescript.md)
- [系统设计](interview/system-design.md)

待整理
- [这儿有 20 道大厂面试题等你查收](https://juejin.im/post/5d124a12f265da1b9163a28d)

## CSS + HTML

### CSS
- BFC (Block Formatting Context) 块级格式化上下文, 触发条件
  - 根元素或其它包含它的元素
  - 浮动元素 (元素的 float 不是 none)
  - 绝对定位元素 (元素具有 position 为 absolute 或 fixed)
  - 内联块 (元素具有 display: inline-block)
  - 表格单元格 (元素具有 display: table-cell，HTML 表格单元格默认属性)
  - 表格标题 (元素具有 display: table-caption, HTML 表格标题默认属性)
  - 具有 overflow 且值不是 visible 的块元素
  - 弹性盒（flex 或 inline-flex）
  - display: flow-root
  - column-span: all
- `box model 盒模型`: 页面在渲染时，DOM 元素所采用的布局模型，一个元素占用的空间大小由几个部分组成，内容 (content)、内边距 (padding)，边框 (border) 和外边距 (margin)。可以通过 box-sizing 来进行设置，其中 IE 盒模型的 content 包含了 padding 和 border，这是区别于 W3C 标准盒模型的地方。
- 各种边界奇葩现象，margin 上下的合并
- display: block, inline*, flex, grid, table*, contents, none, initial, inherit, run-in, list-item
- flex 布局: align-items, justify-content, flex, flex-grow,
- 伪元素，状态元素
- selector 优先度: !important > inline > id > class > tag > * > inherit > initial
- pre-css (sass, stylus, 或 jss) + post-css
- 清除浮动 `.clearfix`, `clear:both`, (同容器相邻元素) `overflow: hidden` (同容器内)
  ```css
  .clearfix:after {
      visibility: hidden;
      display: block;
      font-size: 0;
      content: " ";
      clear: both;
      height: 0;
    }
  ```
- [文本溢出](https://juejin.im/post/5dc15b35f265da4d432a3d10)
- [CSS 图形](https://github.com/qq449245884/xiaozhi/issues/42)
- 动画
  
  transition 过渡动画：
  - transition-property：属性名称
  - transition-duration: 间隔时间
  - transition-timing-function: 动画曲线
  - transition-delay: 延迟

  animation 关键帧动画：
  - animation-name：动画名称
  - animation-duration: 间隔时间
  - animation-timing-function: 动画曲线
  - animation-delay: 延迟
  - animation-iteration-count：动画次数
  - animation-direction: 方向
  - animation-fill-mode: 禁止模式
- 性能杀手:
  ```css
  filter: blur(10px) // 高斯模糊
  ```

- GPU 加速: [硬件加速 CSS 提升性能](https://blog.teamtreehouse.com/increase-your-sites-performance-with-hardware-accelerated-css)
  ```css
  transform: translateZ (0);
  /* OR */
  will-change: transform;
  ```
  
### HTML
- 标签语义化，比如 header，footer，nav，aside，article，section 等，利于开发/阅读模式/SEO，新增了很多表单元素，入 email，url 等，除去了 center 等样式标签，还有除去了有性能问题的 frame，frameset 等标签
- video，audio
- 新接口，如 navigator.geoloaction
- docType
  - 混杂模式
  - 标准模式
  - 准标准模式

## CSS HTML 性能优化
- DOM 缓存 / VDOM
- 回流(优先), 重绘 (合并修改, 修改前指定宽高 / 脱离正常文档流, avoid recalculate)
- 事件委托
- css / dom / js 尽量扁平
- CSS3 动画 + GPU 加速

## 系统内核
- [零拷贝](https://www.jianshu.com/p/2581342317ce) + [NIO channel](https://www.jianshu.com/p/a869c406e0ce)

## 后端知识面试整理
- [消息队列](https://www.jianshu.com/p/85d3d9908a78)
- [数据库 普通索引和唯一索引](https://www.jianshu.com/p/195c77ee7f93)
- [设计模式](https://www.jianshu.com/p/cc6a7341289e)
- [JVM](https://www.jianshu.com/p/7ce417286608)
- java HashMap
- [SQL 锁](https://www.jianshu.com/p/8403206e8e8d)

## Yarn & NPM

> 参考 https://juejin.im/post/5da9c6b0e51d4524d67486e2

- [综合前端知识集锦](https://juejin.im/post/5ae95f17f265da0b93481dec)

一些题目
- [ ] https://github.com/dwqs/blog/issues/17
- [ ] https://juejin.im/post/5dac5d82e51d45249850cd20

- [ ] https://juejin.im/post/5dc20a4ff265da4d4e30040b
- [x] https://juejin.im/post/5db556376fb9a0207a6ddce7

## Q & A

### 从输入 URL 到页面加载发生了什么
1. 浏览器查找当前 URL 缓存
2. DNS 逐层查找缓存解析 URL 对应的 IP
3. 路由, 网关寻址, CDN 层分发, 缓存
4. 根据 IP 建立 TCP 连接, 逐层加头拆头
5. HTTP 握手, HTTPS 握手, 应用层协议确认
6. HTTP 发起请求
7. 服务器处理请求，浏览器接收 HTTP 响应, 合并包
8. 浏览器解析 html, 加载 link, js 资源, 构建 DOM 树 (DOMContentLoaded), 加载图片等资源, 构建渲染树, 渲染页面, 加载完毕 (onload)
9. 根据脚本执行各种异步任务如 ServiceWorker
10. 关闭 TCP 连接（四次挥手）

### 你有什么想问我的

- 公司常用的技术栈是什么？
- 你们如何测试代码？
- 你们如何解决线上故障？
- 你们如何准备故障恢复？是否有完善的发布机制？
- 公司是否有技术分享交流活动？有的话，多久一次呢？
- 一次迭代的流程是怎么样的？从 PRD 评审开始到发布这一整个流程。
- 公司技术团队的架构和人员组成？
- 有公司级别的学习资源吗？比如电子书订阅或者在线课程？
- 你们认为和竞品相比有什么优势？