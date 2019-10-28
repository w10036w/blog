# 前端深水区（Deepsea）React 状态管理库研究

TODO:

- [ ] 加入 detail/summary 展开代码：dva例子，mobx 异步
- [ ] rxjs, cycle.js
- [ ] 状态机
- [ ] effector
- [ ] 结论比较
- [ ] 换主题

## 前言

由于近年来前端大框架之争已趋于稳定，三大框架（React, Vue, Angular）在很多方面殊途同归，就目前的时间点看框架选择已经不再是前端人员的主要问题，绝大部分业务需求任一框架都能胜任。

状态管理一直是前端的核心问题，能够和团队的技术风格和开发的思维模式互相影响，并决定应用的上下限。
像评价或比较框架一样，对于有一定流行度的状态管理库，没有一个简单的好坏之分，它们只是在不同的维度上做了取舍。

但作为业务工程师，我们期望的还是有一种瑞士军刀库，能够胜任绝大多数需求。

本文的目标是分析代表性的 React 开源状态管理库，供一线开发者和技术管理选型参考。

> my js state management library: `{}`
>
> [*TJ Holowaychuk*](https://twitter.com/tjholowaychuk/status/957853652483416064?lang=en)

## 比较维度
> [A smooth development experience is everything.](https://medium.com/skillshare-team/how-we-ditched-redux-for-mobx-a05442279a2b)
- **开发体验**
  对于开发者来讲，最重要的是开发体验。开发体验差的库必然会被更好的替代。开发体验包括：
  - **学习曲线**：一般程序员对于该库的理解成本，近似于学习曲线。与库的原始理论模型（如flux，有限状态机，响应式编程等）理解难度正相关，和接口设计无关；学习曲线复杂的库可能接口设计语义清晰，业务代码量少。
  - **接口设计**：接口设计越好，语义表现力越强，意味着库的使用者能用越少的代码完成同样的逻辑，实现相同的功能。反之，就需要写大量格式雷同的样板代码。一些包装层次高，内藏“黑魔法”或者做了大量”脏活“的库会在这一项有优势，比如 rematch 之于 redux，mobx 之于 redux。接口设计和学习曲线共同决定了学习曲线和可维护性。
  - **可扩展性**：随着应用复杂度上升、代码堆积和不同风格的程序员加入，库应该能够提供高效的组织结构使性能等不受太大，和优良的模式来定位错误并便于测试。
  - **生态环境**：好的库离不开社区支持和文档支持。使用库的过程中总会遇到各种问题，但流行的库有大量前人踩坑经验，并由可靠的开发者更新**源码**，维护**文档**和开发**中间件**、各种**插件**（如浏览器，编辑器语法高亮或智能提示，命令行工具甚至第三方平台服务），也有较好的社区交流（github, stackoverflow, 语雀，slack, spectrum等）可供参考。当然最重要的是，你能找到足够多有相关经验的开发者。
- **性能**：性能也是重要考量之一，也是众多库竞争的重点。如需考虑弱网络环境下应用的初始加载速度，包和必需组件包的大小（如redux+react-redux）也会有一定影响。
- **功能**：复杂的应用可能会有特殊功能需求，如时间回溯（撤销与重现），和其他库（路由等）联动；另外，部分库可能有破坏式更新，也会影响功能的实现或增加更新的成本。
- **跨框架性**：当下有很多库是针对某个框架开发的，或者某个库是针对特定平台（如针对webkit浏览器）或语言开发的，这些库在一开始并没有考虑跨平台的可能性，但其中也有后续加入对其他环境的支持，无论是官方还是非官方。当然，也有很多一开始就是为跨平台而设计的。无疑，后者能够有更广泛的适用性，虽然可能牺牲了灵活性和性能。

## 结论

// 做个瀑布图

如果追求简约，希望写”React"式的状态管理，那么选 `unstated` 十分适合

| 状态管理库比较 | 包大小 (minified+gzipped) | 3G下载速度 | 评价 |
| :--- | ---: | ---: | :--- |
| [redux](https://redux.js.org/introduction/getting-started) + redux-react | 2.6kB + 5.5kB | 52ms + 111ms | 开发体验⭐⭐⭐ <br>性能⭐⭐⭐⭐ <br>功能⭐⭐⭐⭐⭐ <br>跨框架性⭐⭐⭐⭐⭐ |
| [rematch](https://github.com/rematch/rematch) + redux-react | 5.1kB + 5.5kB | 103ms + 111ms | 开发体验⭐⭐⭐⭐ <br>性能⭐⭐⭐⭐ <br>功能⭐⭐⭐⭐ <br>跨框架性⭐ |
| [dva](https://github.com/rematch/rematch) + redux-react | 36kB | 720ms | |
| [xstate](https://github.com/davidkpiano/xstate) + @xstate/react | 16.2kB | 323ms |  |
| [iostore](https://www.npmjs.com/package/iostore) | 1kB | 20ms | React hooks specific solution
| [Effector](https://github.com/zerobias/effector) | 8kB | 161ms | multi store, cross-framework JS solution |
| [unstated](https://github.com/jamiebuilds/unstated) | 1.8kB | 36ms | |
| 响应式
| mobx + mobx-react | 15.2kB + 4.6kB | 396ms |  |
| mobx-state-tree | 19.7kB | |
| [rxjs](https://rxjs-dev.firebaseapp.com/guide/overview) | <10.8kB | <217ms |  |

## Redux (Flux) 系

> Redux is a predictable state container for JavaScript apps.

Redux 基于 flux 和函数式编程，是 React 官方推荐且最受欢迎的库。redux 本身可以跨平台应用，目前通过社区插件 [@angular-redux/store](https://github.com/angular-redux/store)，[vuejs-redux](https://www.npmjs.com/package/vuejs-redux) 实现。

**redux + react-redux 基于flux和函数式编程**。

redux 的实现可以直接看源码，或者这个很棒的[从零实现](https://github.com/brickspert/blog/issues/22)。

[flux](https://facebook.github.io/flux/docs/in-depth-overview/) 的经典流程模型：
![flux flow from facebook](https://facebook.github.io/flux/img/overview/flux-simple-f8-diagram-with-client-action-1300w.png)

在[react hooks](https://reactjs.org/docs/hooks-intro.html) 出现前：

1. redux **作为不关心框架实现的库**把全部状态作为子节点挂载于一个`store`树下(**单一数据源**)，提前注册全部的 `actions` 和 `reducers`。
2. react-redux 利用React 官方的 `Context API`[3]，由 `Provider` 将 store 注入APP顶层。
3. 各组件使用高阶函数 API `connect()` 拿到 `context(=store)` 并筛选所需的状态子节点传入 `props`。
4. 由于库的强约束，各组件能并只能发送（`dispatch`）action 通过 reducer 修改 store。
5. 因为store是不可变对象（**状态只读**），此修改必须为替换式修改（子节点对象可为浅拷贝），新store通过对应的reducer（**由纯函数改变**）生成新store对象，触发React更新通知全部组件，然后各组件按照各自对子节点的订阅决定是否更新。

react hooks 使函数组件能能访问本地组件状态 `useState()`，执行副作用`useEffect()`等。
在 react hooks 出现后，redux

### Redux 特性
- 单一数据源 (single source of truth)
- 不可变数据 (state is read-only)
- 纯函数操作 (changes are made with pure functions)

库的代码写得优雅简约，没有内藏黑魔法也没干”脏活“，在极大提升自由度（无太多约束）和确定性（全靠手写显式控制）的同时，把非常多的问题（缓存，异步，订阅，记录/重放等）留给开发者或者中间件解决。比如使用[immer](https://github.com/immerjs/immer), [immutable.js](https://github.com/immutable-js/immutable-js), [reselect](https://github.com/reduxjs/reselect)控制性能, 使用redux-thunk, redux-saga, redux-observable来处理异步。

单一数据源要求全局单一的store，优点是所有状态都可以零成本互相访问，子组件父组件访问的是同一数据源无需同步，缺点是命名冲突和性能问题，原因是无关变量变更引起不必要的更新。

单向数据流相比双向，能对数据变化有更好的记录、追踪，通过显式调用更直观，没有”黑魔法“，但也以增加代码量，在处理大量局部状态（用户交互等）时全部需要**极为繁琐地显式声明**为代价。事实上单向数据流已经被绝大多数库使用，并在处理用户交互组件的状态时能通过多写代码”变“成双向数据流。这种情况下，单双向数据流的区别也只是显式/隐式声明数据变化的操作而已[2]。由此，本文不作更多讨论。

不可变数据要求对store的改变必须通过统一位置预定义的**纯函数**生成新store，实现了稳定可预测，可时间回溯，易测试，隔离“副作用”（用户交互和网络交互）；但同时导致业务工程师需要做”额外“的工作，既要 1) 为保证更新返回全新JS对象(参考immer)， 2）为防止更新缓存”相同”的对象（参考reselect），3) 实现纯函数必须分离副作用(redux-thunk, redux-saga)；另外，替换式更新也会消耗更多内存并损失性能。

另外，细致的分层（action, reducer, store）和样板代码导致 redux 使用者即使实现简单的功能也需写繁琐的代码。

进入 hooks 时代后，react-redux通过新的API [useSelector](https://react-redux.js.org/api/hooks#using-hooks-in-a-react-redux-app) 一方面省去了高阶组件(HOC)，一方面改变了触发渲染的比较模式。

绝大多数的功能性缺点已被社区插件所完善，工程性缺陷也由以下redux的高级封装库提供了解决方案：

### [Rematch](https://github.com/rematch/rematch)
> Rematch is Redux best practices without the boilerplate

Rematch 相当于给 redux 包装了语法糖，大大简化了store、action、reducer的创建过程，采用原生async/await处理异步，同时又可以使用redux生态的各种中间件。详情可见[对比](https://rematch.gitbook.io/handbook/mu-de)

<details>
<summary>
<a href="https://codesandbox.io/s/3kpyz2nnz6" target="_blank">Count示例</a></summary>

```js
// 核心代码
// models
const delay = (time) => new Promise(resolve => setTimeout(() => resolve(), time));
// count model
export const count = {
  state: 0,
  reducers: {
    addBy(state, payload) {
      return state + payload
    }
  },
  effects: (dispatch) => ({
    async addByAsync(payload, state) {
      await delay(1000)
      dispatch.count.addBy(1) // "count" 来自于本对象名
    }
  })
};
// store
import { init } from '@rematch/core'
import * as models from './models'

const store = init({
  models,
})

export const { dispatch } = store // state = { count: 0 }
// reducers
dispatch({ type: 'count/addBy', payload: 1 }) // state = { count: 1 }
dispatch.count.addBy(1)                       // state = { count: 2 }

// effects
dispatch({ type: 'count/addByAsync', payload: 1 }) // state = { count: 3 } after delay
dispatch.count.addByAsync(1)                       // state = { count: 4 } after delay
// view 层和纯redux一致
```

</details>

### [Dva](https://github.com/dvajs/dva)
> dva 首先是一个基于 redux 和 redux-saga 的数据流方案，然后为了简化开发体验，dva 还额外内置了 react-router 和 fetch，所以也可以理解为一个轻量级的应用框架。

把 dva 放在第二位，是因为其本质上已经不是一个状态管理库，而是一个综合性应用框架。在状态管理方面如简介所言，集成了 redux-saga 来处理异步，同时语法上和rematch类似，都减少了使用redux需要写的脚手架代码，已经有很多成熟大规模应用和插件，十分可靠。当然，**集成度越高，约束性越强，自由度越低。**

其他还有mirror,react-coat 等相对小众的方案。

---

## 响应式库
现代JS 响应式库一般基于 [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)，代表有 mobx，vuex（受mobx启发的vue官方状态管理）。<br>
更加函数式、流式、侵入性强的解决方案有 [rxjs](https://rxjs-dev.firebaseapp.com/guide/overview)，[cycle.js](https://cycle.js.org/)（框架）等。

### [Mobx](https://github.com/mobxjs/mobx)

> Anything that can be derived from the application state, should be derived. Automatically.

mobx 是受欢迎程度仅次于 redux 的解决方案（[You Might Not Need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)）。现在程序员神器之一的 codesandbox 就在使用它。mobx “通过透明的函数响应式编程 (transparently applying functional reactive programming - TFRP) 使得状态管理变得简单和可扩展”。它的哲学非常简单也值得欣赏：一切源自状态的东西都应该自动被获得。

#### mobx 特性
- 可观测的状态
- 响应式改变（可观测的状态 observable，计算值 computed，反应 reaction
- 可变数据 mutable
- 多store

响应式库如 mobx 能够自动收集依赖并响应式改变相关状态，能极大节约开发者的代码量和时间，易学易用，且能防止低水平开发者写出有性能问题的代码（多做多错），其实用极低的优化成本也能得到较好的性能。

当然，代价是数据可变，无法做到纯函数，内部实现复杂“黑魔法”，库的大小较 redux 大。由于多 store 的关系，考虑哪个状态该放在那个 store，store 间的交互也是额外的成本。

![mobx model](https://cn.mobx.js.org/flow.png)

关于 mobx 的性能，可以参考这篇[文章](https://hackernoon.com/an-artificial-example-where-mobx-really-shines-and-redux-is-not-really-suited-for-it-1a58313c0c70)以及[redux、immutablejs 和 mobx 性能对比](https://www.cnblogs.com/kwzm/p/9884955.html)。

结论：
> 由于 Mobx 利用 getter 和 setter（未来可能会出现一个平行的基于 Proxy 的版本【注：Mobx@5 以后应用】）去收集组件实例的数据依赖关系，因此每单当一个点发生更新的时候，Mobx 知道哪些组件需要被更新，决定哪个组件更新的过程的时间复杂度是 O (1) 的，而 Redux 通过脏检查每一个 connect 的组件去得到哪些组件需要更新，有 n 个组件 connect 这个过程的时间复杂度就是 O (n)，最终反映到 Perf 工具上就是 JavaScript 的执行耗时。
>
> **虽然在经过一系列优化后，Redux 的版本可以获得不输 Mobx 版本的性能，但是 Mobx 不用任何优化就可以得到不错的性能。而 Redux 最完美的优化是为每一个点建立单独的 store，这与 Mobx 等一众精确定位数据依赖的方案在思想上是相同的。**<br>
> [有赞前端](https://juejin.im/post/5a1e25ad5188253d681756a5)

示例项目 [react-mobx-realworld-example-app](https://github.com/gothinkster/react-mobx-realworld-example-app)

mobx 需要[特殊处理异步](https://cn.mobx.js.org/best/actions.html)，其中值得推荐的是 `async/await + runInAction()` 的组合（原生自然）和 `flows + generator` 的组合（类似 redux-saga）；另一个问题是，如果不用装饰器（decorator），[其简洁性大打折扣](https://mobx.js.org/best/decorators.html)。其主要竞争对手 redux 虽然用 decorator 会更简单，但不用也没多少影响（已足够繁琐）。

官方出品的脚手架 [CRA(create-react-app)](https://github.com/facebook/create-react-app) 并不支持 decorator，除非 [eject](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject) 或者转向其他框架（[Next.js](https://nextjs.org/)等）。

mobx 采用可变数据（mutable），不原生提供事务化（transactional）的状态管理，因此较难进行时间旅行、状态回溯，测试等，优点是性能稍强，心智模型直观简单，更”JavaScript“，相比之下，Redux更“[Elm](https://elm-lang.org/)“（函数式编程语言）。因此可以看到一般都会推荐在中小型应用中使用mobx以简化开发成本，在大型应用中用redux以简化维护成本。

然而，小型、中型、大型应用的临界点在哪，就是另一个问题了。社区中关于 redux 和 mobx 的比较汗牛充栋，选取一篇近期不错的[文章](https://www.bacancytechnology.com/blog/redux-vs-mobx)作为参考。

为此 mobx 的作者又推出了[mobx-state-tree](https://github.com/mobxjs/mobx-state-tree)，将redux和mobx的优点合并，通过定义各子节点类型实现单一可变状态树（tree），复杂度较 mobx 上升，但能做到运行时类型安全检查，时间旅行，追踪（`snapshot`）等功能。

参考代码

```js
import { flow } from 'mobx';
import { types } from 'mobx-state-tree';

export const TagsStoreModel = types
  .model('TagsStore', {
    results: types.array(types.string),
    isLoading: types.boolean,
    query: types.string,
  })
  .actions((self) => ({
    loadTags: flow(function* (query: string) {
      self.query = query;
      self.isLoading = true;
      try {
        const tags = yield fetch('http://somewhere.com/api/tags');
        self.tags = tags;
      } catch (err) {
        self.err = err;
      }
      self.isLoading = false;
    }
  }));

export const StoreModel = types
  .model('Store', {
      tags: TagsStoreModel,
  });

export type Store = typeof StoreModel.Type;
```

---

## 基于 React 独有特性的库

其实通过之前redux系 和mobx的例子可以看出，React环境下的状态管理实现很多基于Context，因此自 `React@16.3` 发布新 `Context()` 能够直接透（过多层组件）传 context 后，`unstated`、`react-waterfall` 等应运而生。

### [unstated](https://github.com/jamiebuilds/unstated)
由广受欢迎的 [react-loadable](https://github.com/jamiebuilds/react-loadable) [作者](https://github.com/jamiebuilds)所写，其 Container 作为高阶组件只用 `setState()` 存储状态，同时用 render props 注入状态，写起来比 redux "更像" React 的原生解决方案[5]。

### [unstated-next](https://github.com/jamiebuilds/unstated-next)，[constate](https://github.com/diegohaz/constate)
随着 `React@16.8` [react hooks](https://reactjs.org/docs/hooks-intro.html) 的发布，关于其对状态管理的影响又催生了大批新鲜出炉的状态管理库，有结合 rxjs 的 [rxjs-hooks](https://github.com/LeetCode-OpenSource/rxjs-hooks) 和 [useObservable](https://github.com/streamich/react-use/blob/master/docs/useObservable.md) 等。unstated 的作者也推出了 [unstated-next](https://github.com/jamiebuilds/unstated-next)，用 "React" 的方式再一次做出示范；笔者也参照其思路实现了 API 更简化的 [noctx](https://github.com/w10036w/noctx)。另外，[constate](https://github.com/diegohaz/constate) 的作者提供了另一种思路，源码同样简洁高效。

### [iostore](https://github.com/yisbug/iostore)
虽然也基于 `Proxy` 代理对象，但在和 React 交互的部分利用 hooks 的新API `useState()` 和 `useEffect()`，同时封装异步逻辑，API设计简洁方便，类似 dva / rematch, 让人眼前一亮。

笔者写了一个切换语言的例子：

```jsx
// i18n.js
export default {
  "zh-cn": {
    demo: "演示"
  },
  "en-gb": {
    demo: "demo"
  }
}

// intl.store.js
import { createStore } from 'iostore';
import messages from './i18n';

// 关于 loading
// 获取store中有没有异步方法正在执行：Store.loading，返回 true/false
// 获取store中某个异步方法的 loading 状态：Store.asyncFunction.loading，返回 true/false
// function to create a one second delay
const delay = (time) => new Promise(resolve => setTimeout(() => resolve(), time));
export default createStore({
  namespace: 'IntlStore', // 独立命名空间，多 store
  locale: 'en-gb',        // observable 型变量，除了 loading, namespace 等保留字段
  m() {                   // 计算值
    return messages[this.locale]
  },
  setLocale(locale) {     // 同步方法
    this.locale = locale
  },
  async asyncSetLocale(locale) {  // 异步方法示例
    await delay(1000)
    this.locale = locale
  },
  // getAnotherStore() {     // 与其他store通信，只推荐取值/get，不推荐修改/set或产生副作用的方法
  //   return this.stores.AnotherStore.value // 需另行创建store
  // },
})

// app root file
import './intl.store'

// component
import { useStore } from 'iostore'
export default () => {
  const {
    IntlStore: {
      locale, setLocale, m,
      getAnotherStore
    }
  } = useStore()
  return (
    <View>
      <Text>value from Another Store: {getAnotherStore()}</Text>
      <Text>demo message: {m()['demotext']}</Text>
      <Button onPress={() => setLocale('zh-cn')}>change to CN</Button>
      <Button onPress={() => setLocale('en-gb')}>change to EN</Button>
    </View>
  )
}
```

### hox

## [rxjs](https://rxjs-dev.firebaseapp.com/guide/overview)

rxjs cycle.js

## 有限状态机
有限状态机（finite-state machine，FSM）方案核心思路
- 符合状态是有限的
- 某一时刻，只有一种状态
- 到达某个时刻，会转变另一种状态。

此类库最大的优势是显示声明所有状态和变化条件，代码虽然繁琐但更具有整体性、一致性

以 [xstate](https://github.com/davidkpiano/xstate)， [robot](https://github.com/matthewp/robot) 为代表，由于需要在一开始显式声明所有状态和变化方式，代码较繁琐，

<!-- ### React Hooks / useContext -->

### Effector


## One More Thing

对于和后端有复杂交互的应用，不仅需要考虑 1)客户端内部的状态，2)用户交互部分的状态，也要考虑 3)和后端的状态（查找，修改，订阅）同步。在 [Restful](https://www.ruanyifeng.com/blog/2011/09/restful.html) 时代，应用状态和服务器状态是割裂的，对于以上状态处理也是五花八门。随着 [GraphQL](https://graphql.cn/learn/) 和 [Falcor](https://netflix.github.io/falcor/) 的兴起，受到新序列化格式的启发，GraphQL 阵营中
[Apollo](https://blog.apollographql.com/) 对客户端状态使用 `@client` 的 directive 标记，希望用统一的GraphQL语法（或data graph）实现上述三种不同状态的序列化存储；而 [Relay](https://relay.dev/docs/en/local-state-management) 则继续沿着 flux 的道路管理本地状态。Falcor 阵营中，也有一些非开源的库借鉴了Falcor的设计统一格式化不同的状态，在此不多做展开。

此种类型类似 cycle.js 一般和框架深度结合，拥有最强的约定，学习成本高，如果团队已经深入相关生态建议采用。

参考资料

- Kent C. Doods [Application State Management with React](https://kentcdodds.com/blog/application-state-management-with-react)
- Michel Weststrate [Becoming fully reactive: an in-depth explanation of MobX](https://medium.com/hackernoon/becoming-fully-reactive-an-in-depth-explanation-of-mobservable-55995262a254)
- [2]kuitos的回答 - 知乎[单向数据绑定和双向数据绑定的优缺点，适合什么场景？](https://www.zhihu.com/question/49964363/answer/136022879)
- [3]知乎 敖玄 [react-redux设计结构变迁](https://zhuanlan.zhihu.com/p/86336676)
- [4]知乎 字节跳动技术团队[React新Context API在前端状态管理的实践](https://zhuanlan.zhihu.com/p/47390835)
- [5]知乎 程墨Morgan [unstated: 可能是简单状态管理工具中最好的](https://zhuanlan.zhihu.com/p/48219978)
- [支付宝前端应用架构的发展和选择](https://github.com/sorrycc/blog/issues/6)
- [MVVM 框架的数据状态管理的发展与探索](https://github.com/farzer/blog/issues/1)
- [Why do I choose Effector instead of Redux or MobX?](https://dev.to/lessmess/why-i-choose-effector-instead-of-redux-or-mobx-3dl7)
- [The 12 Things You Need to Consider When Evaluating Any New JavaScript Library](https://www.freecodecamp.org/news/the-12-things-you-need-to-consider-when-evaluating-any-new-javascript-library-3908c4ed3f49/)]