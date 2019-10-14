# 前端状态管理研究

## 前言

由于近年来前端大框架之争已趋于稳定，三大框架（React, Vue, Angular）在很多方面殊途同归，就目前的时间点看框架选择已经不再是前端人员的痛点，前端面临的绝大部分业务需求任一框架都能胜任。
状态管理一直是前端的核心问题，强相关于整个团队的技术风格和开发的思维模式，而且是双向影响。并且很大程度上能决定应用的上下限。

### Redux

### 响应式

### 有限状态机

有限状态机（finite-state machine，FSM）类方案源于

| 状态管理库成本分析 | 包大小 (minified+gzipped) | 3G下载速度 | 备注 |
| :--- | ---: | ---: | :--- |
| redux + redux-react | 2.6kB + 5.5kB | 52ms + 111ms | React社区最流行，社区实践丰富文档齐全，基于flux，全局状态，最开始只是React的官方解决方案，但借助第三方插件（[ng-redux](https://www.npmjs.com/package/ng-redux), [vuejs-redux](https://www.npmjs.com/package/vuejs-redux)）也可以跨框架，但由于相对底层和简单，在项目中使用需要写很多样板代码，以及各种插件的支持，来保证基本的功能, 比如使用[immer](https://github.com/immerjs/immer), [immutable.js](https://github.com/immutable-js/immutable-js), [reselect](https://github.com/reduxjs/reselect)控制性能, 使用redux-thunk, redux-saga, redux-observable来处理异步 |
| [rematch](https://github.com/rematch/rematch) + redux-react | [5.1kB](https://bundlephobia.com/result?p=@rematch/core@1.2.0) + [5.5kB](https://bundlephobia.com/result?p=react-redux@7.1.1) | 103ms + 111ms | 基于redux的高级封装，极大地减少了样板代码，享受全部redux的插件和生态，同时也继承了很多redux的优缺点|
| [xstate](https://github.com/davidkpiano/xstate) + @xstate/react | 16.2kB | 323ms | finite state machine solution, complex to understand, alternative/newer: [robot](https://github.com/matthewp/robot)
| iostore | 1kB | 20ms | React hooks specific solution
| [Effector](https://github.com/zerobias/effector) | 8kB | 161ms | multi store, cross-framework JS solution |
| [unstated](https://github.com/jamiebuilds/unstated) | 1.8kB | 36ms | from the author of [react-loadable](https://github.com/jamiebuilds/react-loadable), [unstated-next](https://github.com/jamiebuilds/unstated-next) with hook support, alternative [noctx](https://www.npmjs.com/package/noctx) by me |
| 响应式
| mobx + mobx-react | 19.8kB | 396ms | React specific solution, for Vue [vuex](https://github.com/vuejs/vuex) is a follower |
| mobx-state-tree | 19.7kB | |
| rx.js | <10.8kB | <217ms | low-level |
