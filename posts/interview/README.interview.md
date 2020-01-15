# 前端面试基础

- [掘金: 自检清单](https://juejin.im/post/5cc1da82f265da036023b628)
- [底层协议](protocols.md)
- [设施硬件层](infrastructure.md)
- [JS 语言基础](js.md)
- [CSS 基础](css-fundamental.md)
- [JS 常用函数实现](regular-function.md)
- [regex](regex.md)
- [ES6 ES7 新特性](es6.md)
- [浏览器](browser.md)
- [React](react.md)
- [Vue](vue.md)
- [typescript](typescript.md)
- [系统设计](system-design.md)
- [面试技巧](tricks.md)
- [工程](engineering.md)

https://github.com/h5bp/Front-end-Developer-Interview-Questions

TODO
- [这儿有 20 道大厂面试题等你查收](https://juejin.im/post/5d124a12f265da1b9163a28d)

## HTML
- 标签语义化，比如 header，footer，nav，aside，article，section 等，利于开发/阅读模式/SEO，新增了很多表单元素，入 email，url 等，除去了 center 等样式标签，还有除去了有性能问题的 frame，frameset 等标签
- video，audio
- 新接口, 如 navigator.geoloaction
- docType
  - 混杂模式
  - 标准模式
  - 准标准模式

## CSS HTML 性能优化
- DOM 缓存 / VDOM
- 回流(优先), 重绘 (合并修改, 修改前指定宽高 / 脱离正常文档流, avoid recalculate)
- 事件委托
- css / dom / js 尽量扁平
- CSS3 动画 + GPU 加速 (原理则是新建合成层)

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

## Q & A Recap

### 从输入 URL 到页面加载发生了什么
1. 浏览器查找当前 URL 缓存
2. DNS 逐层查找缓存解析 URL 对应的 IP
3. 路由, 网关寻址, CDN 层分发, 缓存
4. 根据 IP 建立 TCP 连接, 逐层加头拆头
5. HTTP 握手, (HTTPS 握手, )应用层协议确认
6. HTTP 发起请求
7. 服务器处理请求，浏览器接收 HTTP 响应, 合并包
8. 浏览器解析 html, 加载 link, js 资源, 构建 DOM 树 (DOMContentLoaded), 加载图片等资源, 构建渲染树, 渲染页面, 加载完毕 (onload)
9. 根据脚本执行各种异步任务如 ServiceWorker
10. 关闭 TCP 连接（四次挥手）

### 高等级架构
#### 1. 源码分析类
详细介绍源码中所用到的经典设计思想，看看大牛是如何写代码的，提升技术审美、提高核心竞争力。

帮助大家寻找分析源码的切入点，在思想上来一次巨大的升华。知其然，并知其所以然。把知识变成自己的

#### 2. 分布式架构
互联网时代，系统架构如何迎接高并发流量的挑战。而作为技术开发者，如何去应对技术变革带来的技能危机。基于传统架构到分布式架构演变过程所带来的技术变革进行全面深入讲解。

在技术深度和技术广度上得到飞跃的提升。成为互联网行业所需要的 T 型人才

#### 3. 微服务架构专题
应对复杂的业务需求变更、用户膨胀，SOA 已成为现在互联网公司标准的解决方案，微服务相关的框架正是为此而生。

#### 4. 性能优化

全面认识性能优化这个理念，理解底层机制，助力科学调优 实战案例让你不再只是旁观者

#### 5. 工程化专题
不管是刚入门的小白，还是才高八斗的资深开发、架构，你都需要从这里开始

掌握自动化部署技能

#### 6. 大数据处理
[百度腾讯参考题目](https://juejin.im/post/5ddb2476f265da7e0a3e2c85)

interesting math questions for frontend
> https://performancejs.com/post/hde6d32/The-Best-Frontend-JavaScript-Interview-Questions-(Written-by-a-Frontend-Engineer

ratelimiter 算法

[高并发的场景下，不能不说的限流算法](https://juejin.im/post/5e00bbe3518825122e0a8b8b)

#### 计数器

限制单位时间内的处理请求数不超过阈值

#### 滑动窗口

一分钟分 6 份，每份 10 秒；每过 10 秒钟，我们的时间窗口就会往右滑动一格，每个格子都有独立的计数器，我们每次都计算时间窗口内的数量，可以解决计数器法中的问题，而且当滑动窗口的格子越多，那么限流的统计就会越精确。

#### 漏桶
一个固定容量的桶，有水流进来，也有水流出去，我们不需要控制流进来的速度，只需要控制流出去的速度，如果水流进来的太快，桶满了，多余的水会溢出去，并不会影响水流出去的速度。

#### 令牌桶
桶里面有 N 个令牌，所有的请求在处理之前都需要拿到一个可用的令牌才会被处理，如果桶里面没有令牌的话，则拒绝服务；令牌桶算法的原理是系统会以一个恒定的速度往桶里放入令牌。
