# 前端深水区（Deepsea）状态管理库研究

## 前言

由于近年来前端大框架之争已趋于稳定，三大框架（React, Vue, Angular）在很多方面殊途同归，就目前的时间点看框架选择已经不再是前端人员的主要问题，绝大部分业务需求任一框架都能胜任。

状态管理一直是前端的核心问题，能够和团队的技术风格和开发的思维模式互相影响，并决定应用的上下限。
像评价或比较框架一样，对于有一定流行度的状态管理库，没有一个简单的好坏之分，它们只是在不同的维度上做了取舍。

但作为业务工程师，我们期望的还是有一种瑞士军刀型状态管理库，能够胜任绝大多数需求。

本文的目标是分析代表性的开源状态管理库，供一线开发者和技术管理选型参考。

> my js state management library: `{}`
>
> [*TJ Holowaychuk*](https://twitter.com/tjholowaychuk/status/957853652483416064?lang=en)

## 比较维度

- **性能**：性能一般是大多数开发者选择库的第一考量，也是众多框架激烈取舍的重点。如需考虑弱网络环境下应用的初始加载速度，包和必需组件包的大小（如redux+react-redux）也会有一定影响。包大小也能粗略反映其功能，库越大 ≈ 实现的功能越多 ≈ 业务要做的越少
- **功能**：复杂的应用可能会有特殊功能需求，如时间回溯（撤销与重现），和其他库（路由等）联动；另外，部分库可能有破坏式更新，也会影响功能的实现或增加更新的成本。
- **心智模型**：指一般程序员对于该库的理解成本，有些类似于学习曲线。与库的原始理论模型（如flux，有限状态机，响应式编程等）理解难度呈正相关。模型复杂度和下一项，接口设计复杂度不一定有关，心智模型复杂的库也可能接口设计语义清晰，业务代码量少。
- **接口设计**：接口设计得越好，会使语义表现力越强，意味着库的使用者能用越少的代码完成同样的逻辑，实现相同的功能。反之，就需要写大量格式雷同的样板代码。一些包装层次高，内藏“黑魔法”或者做了大量”脏活“的库会在这一项有优势，比如 rematch 之于 redux，mobx 之于 redux。接口设计和心智模型共同决定了可维护性。
- **跨框架性**：当下有很多库是针对某个框架开发的，或者某个库是针对特定平台（如针对webkit浏览器）或语言开发的，这些库在一开始并没有考虑跨平台的可能性，但其中也有后续加入对其他环境的支持，无论是官方还是非官方。当然，也有很多一开始就是为跨平台而设计的。无疑，后者能够有更广泛的适用性，虽然可能牺牲了灵活性和性能。
- **生态环境**：一个好的库离不开社区支持和文档支持。我们使用库的过程中不可避免地会碰到各种问题，好消息是对于一个非常流行的库，你几乎不可能是第一个遇到这个问题的人：）一个较成熟的，被更广泛应用的库无疑会有较好的社区交流（github, stackoverflow, 语雀，slack, discuz，各大框架官网等）可供参考，并由更可靠的开发者更新源码，维护文档和开发中间件、浏览器debug插件（如[redux devtools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)）。当然最重要的是，你能找到足够多有相关经验的工程师加入团队！

## Redux (Flux) 系

> Redux is a predictable state container for JavaScript apps.

Redux是React官方推荐且最受欢迎的库。自redux的官网介绍，显然redux希望能够做到跨平台应用，目前已经通过社区插件 [@angular-redux/store](https://github.com/angular-redux/store)，[vuejs-redux](https://www.npmjs.com/package/vuejs-redux) 实现

**redux+react-redux 基于flux和函数式编程**。

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

- 源代码简约
- flux类库特点：单一数据源，单向数据流。
- 不可变数据（immutable）

库的代码写得优雅简约，没有内藏黑魔法也没干”脏活“，在极大提升自由度（无太多约束）和确定性（全靠手写显式控制）的同时，把非常多的问题（缓存，异步，订阅，记录/重放等）留给开发者或者中间件解决。

单一数据源要求全局单一的store，优点是所有状态都可以零成本互相访问，子组件父组件访问的是同一数据源无需同步，缺点是命名冲突和性能问题，原因是无关变量变更引起不必要的更新。

单向数据流相比双向，能对数据变化有更好的记录、追踪，通过显式调用更直观，没有”黑魔法“，但也以增加代码量，在处理大量局部状态（用户交互等）时全部需要**极为繁琐地显式声明**为代价。事实上单向数据流已经被绝大多数库使用，并在处理用户交互组件的状态时能通过多写代码”变“成双向数据流。这种情况下，单双向数据流的区别也只是显式/隐式声明数据变化的操作而已[2]。由此，本文不作更多讨论。

不可变数据要求对store的改变必须通过统一位置预定义的**纯函数**生成新store，实现了稳定可预测，可时间回溯，易测试，隔离“副作用”（用户交互和网络交互）；但同时导致业务工程师需要做”额外“的工作，既要 1) 为保证更新返回全新JS对象(参考immer)， 2）为防止更新缓存”相同”的对象（参考reselect），3) 实现纯函数必须分离副作用(redux-thunk, redux-saga)；另外，替换式更新也会消耗更多内存并损失性能。

另外，过于细致的分层和对样板代码的需求导致redux使用者即使实现简单的功能也需写繁琐的代码。

进入 hooks 时代后，react-redux通过新的API [useSelector](https://react-redux.js.org/api/hooks#using-hooks-in-a-react-redux-app) 一方面省去了高阶组件(HOC)，一方面改变了触发渲染的比较模式。

绝大多数的功能性缺点已被社区插件所完善，工程性缺陷也由以下redux的高级封装库提供了解决方案：

### [Rematch](https://github.com/rematch/rematch)

> Rematch is Redux best practices without the boilerplate

Rematch 相当于给 redux 包装了语法糖，大大简化了store、action、reducer的创建过程，采用原生async/await处理异步，同时又可以使用redux生态的各种中间件。详情可见[对比](https://rematch.gitbook.io/handbook/mu-de)

[Count示例](https://codesandbox.io/s/3kpyz2nnz6)

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

### [Dva](https://github.com/dvajs/dva)

> dva 首先是一个基于 redux 和 redux-saga 的数据流方案，然后为了简化开发体验，dva 还额外内置了 react-router 和 fetch，所以也可以理解为一个轻量级的应用框架。

把dva放在第二位，是因为其本质上已经不是一个状态管理库，而是一个综合性应用框架。在状态管理方面如简介所言，集成了redux-saga来处理异步，同时语法上和rematch类似，都减少了使用redux需要写的脚手架代码，经过阿里团队的大力支持已经有很多插件和成熟的应用可供参考。当然，**集成度越高，约束性越强，自由度越低。**

其他没有提到的还有mirror,react-coat 等相对小众的方案，在状态管理方面基本是在约束强弱上来回摇摆

## 响应式库

简单一般基于proxy，代表有mobx，vuex.

复杂的有rx.js，cycle.js（框架）

### [Mobx](https://github.com/mobxjs/mobx)

mobx 是受欢迎程度仅次于 redux 的解决方案，性能非常好，现在程序员神器之一的 codesandbox 就使用 mobx。

mobx 的用法举例: [TodoMVC](https://github.com/mweststrate/mobx-todomvc)

```js
// 核心代码
// appstate.js
import { observable, computed, transaction } from 'mobx'

export const SHOW_ALL = 'show_all'
export const SHOW_COMPLETED = 'show_completed'
export const SHOW_ACTIVE = 'show_active'

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
}

export default class AppState {
  @observable filter = SHOW_ALL;
  @observable todos;

  constructor(initialTodos) {
    this.todos = initialTodos || []
  }

  @computed get visibleTodos() {
    return this.todos.filter(TODO_FILTERS[this.filter])
  }

  @computed get completedCount() {
    return this.todos.filter(todo => todo.completed).length
  }

  findTodo(id) {
    return this.todos.find(todo => todo.id === id)
  }

  addTodo(text) {
    const todo = {
      id: this.todos.length,
      text,
      completed: false,
      other: null
    }
    this.todos.unshift(todo)
    return todo
  }

  deleteTodo(id) {
    this.todos.remove(this.findTodo(id))
  }

  editTodo(id, text) {
    this.findTodo(id).text = text
  }

  completeTodo(id) {
    const todo = this.findTodo(id)
    todo.completed = !todo.completed
  }

  completeAll() {
    transaction(() => {
      const allCompleted = this.completedCount === this.todos.length
      this.todos.forEach(todo => todo.completed = !allCompleted)
    })
  }

  clearCompleted() {
    this.todos.replace(this.todos.filter(todo => !todo.completed))
  }
  
  setFilter(filter) {
    this.filter = filter
  }
}
```

要注意的是mobx在面对异步的时候也需要[特殊处理](https://cn.mobx.js.org/best/actions.html)

另一个显著的问题是，如果不用装饰器（@decorator），代码会变得[较为繁琐](https://mobx.js.org/best/decorators.html)。其主要竞争对手redux虽然用decorator会更简单，但不用也没有增加多少代码量。

官方出品的脚手架 CRA(create-react-app) 并不支持 decorator，除非 [eject](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject) 使用或者转向其他框架（Next.js等）。

mobx 采用可变数据（mutable），不原生提事务化（transactional）的状态管理，因此较进行时间旅行和状态快照，优点是性能稍强，心智模型直观简单，更”JavaScript“，相比之下，Redux更“[Elm](https://elm-lang.org/)“（函数式编程语言）。因此可以看到一般都会推荐在中小型应用中使用mobx以简化开发成本，在大型应用中用redux以简化维护成本。

然而，小型、中型、大型应用的临界点在哪就是另一个问题了。

为此mobx的作者又推出了mobx-state-tree，致力于将redux和mobx的优点合并，

-----

## 基于 React 独有特性的库

其实通过之前redux系 和mobx的例子可以看出，React环境下的状态管理实现很多基于Context，因此自`React@16.3`发布新`Context()`能够直接透（过多层组件）传context后，出现了 `unstated`、`react-waterfall`等库。

其中 [unstated](https://github.com/jamiebuilds/unstated) 由广受欢迎的 [react-loadable](https://github.com/jamiebuilds/react-loadable) 作者所写，其 Container 使用了 setState 写法代替了，同时用render props注入状态，写起来比redux "更像" React官方出品的方案[5]。

随着 `React@16.8` [react hooks](https://reactjs.org/docs/hooks-intro.html) 的发布，关于其对状态管理的影响又催生了大批新鲜出炉的状态管理库，有结合 rxjs 的 [rxjs-hooks](https://github.com/LeetCode-OpenSource/rxjs-hooks) 和 [useObservable](https://github.com/streamich/react-use/blob/master/docs/useObservable.md) 等。[unstated]的作者也推出了 [unstated-next](https://github.com/jamiebuilds/unstated-next)，用 "React" 的方式再一次做出示范；另外，[constate](https://github.com/diegohaz/constate) 的作者也实现了类似的API，笔者也参照其思路实现了API更简化的 [noctx](https://github.com/w10036w/noctx)

[iostore](https://github.com/yisbug/iostore) 虽然也基于 `Proxy` 代理对象，但在和React交互的部分利用React hooks的新API `useState()` 和 `useEffect()`，同时封装一点异步状态的逻辑，API设计简洁方便


iostore 的用法举例

```js
// language switch
// messages
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
import messages from '../i18n';

// 关于 loading
// 获取store中有没有异步方法正在执行：Store.loading，返回 true/false
// 获取store中某个异步方法的 loading 状态：Store.asyncFunction.loading，返回 true/false
// function to create a one second delay
const delay = (time) => new Promise(resolve => setTimeout(() => resolve(), time));

export default createStore({
  namespace: 'IntlStore', // 独立命名空间，多个stores
  locale: 'en-gb',        // observable 型变量，除了 loading, namespace 等保留字段
  m() {                   // computed 型变量
    return messages[this.locale]
  },
  setLocale(locale) {     // 同步方法
    this.locale = locale
  },
  async asyncSetLocale(locale) {  // 异步方法,
    await delay(1000)
    this.locale = locale
  },
  getAnotherStore() {     // 与其他store通信，只推荐取值/get，不推荐修改/set或产生副作用的方法
    return this.stores.AnotherStore.value // 需另行创建store
  },
})

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

### Vuex




## 有限状态机

有限状态机（finite-state machine，FSM）类方案源于
以 xstate 为代表，由于需要在一开始显式声明所有状态和变化方式，代码十分繁琐，

<!-- ### React Hooks / useContext -->

### Rx.js

rxjs cycle.js

### Effector


## One More Thing

对于和后端有复杂交互的应用，不仅需要考虑 1)客户端内部的状态，2)用户交互部分的状态，也要考虑 3)和后端的状态（查找，修改，订阅）同步。在 [Restful](https://www.ruanyifeng.com/blog/2011/09/restful.html) 时代，应用状态和服务器状态是割裂的，对于以上状态处理也是五花八门。随着 [GraphQL](https://graphql.cn/learn/) 和 [Falcor](https://netflix.github.io/falcor/) 的兴起，受到新序列化格式的启发，GraphQL 阵营中
[Apollo](https://blog.apollographql.com/) 对客户端状态使用 `@client` 的 directive 标记，希望用统一的GraphQL语法（或data graph）实现上述三种不同状态的序列化存储；而 [Relay](https://relay.dev/docs/en/local-state-management) 则继续沿着 flux 的道路管理本地状态。Falcor 阵营中，也有一些非开源的库借鉴了Falcor的设计统一格式化不同的状态，在此不多做展开。

此种类型类似 cycle.js 一般和框架深度结合，拥有最强的约定，学习成本高，如果团队已经深入相关生态建议采用。

## 结论

// 做个瀑布图

如果追求简约，希望写”React"式的状态管理，那么选 `unstated` 十分适合

| 状态管理库比较 | 包大小 (minified+gzipped) | 3G下载速度 | 备注 |
| :--- | ---: | ---: | :--- |
| redux + redux-react | 2.6kB + 5.5kB | 52ms + 111ms | React社区最流行，社区实践丰富文档齐全，基于flux，全局状态，最开始只是React的官方解决方案，但借助第三方插件（[ng-redux](https://www.npmjs.com/package/ng-redux), [vuejs-redux](https://www.npmjs.com/package/vuejs-redux)）也可以跨框架，但由于相对底层和简单，在项目中使用需要写很多样板代码，以及各种插件的支持，来保证基本的功能, 比如使用[immer](https://github.com/immerjs/immer), [immutable.js](https://github.com/immutable-js/immutable-js), [reselect](https://github.com/reduxjs/reselect)控制性能, 使用redux-thunk, redux-saga, redux-observable来处理异步 |
| [rematch](https://github.com/rematch/rematch) + redux-react | [5.1kB](https://bundlephobia.com/result?p=@rematch/core@1.2.0) + [5.5kB](https://bundlephobia.com/result?p=react-redux@7.1.1) | 103ms + 111ms | 基于redux的高级封装，极大地减少了样板代码，享受全部redux的插件和生态，同时也继承了很多redux的优缺点|
| [xstate](https://github.com/davidkpiano/xstate) + @xstate/react | 16.2kB | 323ms | finite state machine solution, complex to understand, alternative/newer: [robot](https://github.com/matthewp/robot)
| [iostore](https://www.npmjs.com/package/iostore) | 1kB | 20ms | React hooks specific solution
| [Effector](https://github.com/zerobias/effector) | 8kB | 161ms | multi store, cross-framework JS solution |
| [unstated](https://github.com/jamiebuilds/unstated) | 1.8kB | 36ms | from the author of [react-loadable](https://github.com/jamiebuilds/react-loadable), [unstated-next](https://github.com/jamiebuilds/unstated-next) with hook support, alternative [noctx](https://www.npmjs.com/package/noctx) by me |
| 响应式
| mobx + mobx-react | 19.8kB | 396ms | React specific solution, for Vue [vuex](https://github.com/vuejs/vuex) is a follower |
| mobx-state-tree | 19.7kB | |
| rx.js | <10.8kB | <217ms | low-level |

参考资料

- Kent C. Doods [Application State Management with React](https://kentcdodds.com/blog/application-state-management-with-react)
- [2]kuitos的回答 - 知乎[单向数据绑定和双向数据绑定的优缺点，适合什么场景？](https://www.zhihu.com/question/49964363/answer/136022879)
- [3]知乎 敖玄 [react-redux设计结构变迁](https://zhuanlan.zhihu.com/p/86336676)
- [4]知乎 字节跳动技术团队[React新Context API在前端状态管理的实践](https://zhuanlan.zhihu.com/p/47390835)
- [5]知乎 程墨Morgan [unstated: 可能是简单状态管理工具中最好的](https://zhuanlan.zhihu.com/p/48219978)
- [支付宝前端应用架构的发展和选择](https://github.com/sorrycc/blog/issues/6)
- [Why do I choose Effector instead of Redux or MobX?](https://dev.to/lessmess/why-i-choose-effector-instead-of-redux-or-mobx-3dl7)
- [The 12 Things You Need to Consider When Evaluating Any New JavaScript Library](https://www.freecodecamp.org/news/the-12-things-you-need-to-consider-when-evaluating-any-new-javascript-library-3908c4ed3f49/)