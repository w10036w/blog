# 前端深水区（Deepsea）前端状态管理库研究

## 前言

由于近年来前端大框架之争已趋于稳定，三大框架（React, Vue, Angular）在很多方面殊途同归，就目前的时间点看框架选择已经不再是前端人员的痛点，绝大部分业务需求任一框架都能胜任。

状态管理一直是前端的核心问题，能够和团队的技术风格和开发的思维模式互相影响，并决定应用的上下限。
像评价或比较框架一样，对于有一定流行度的状态管理库，没有一个简单的好坏之分，它们只是在同的维度上做了取舍。

> 状态管理库没有简单的好坏之分，只有在不同方向上的取舍
> <br>*笔者*

本文的目标是分析比较几种常见的开源前端状态管理库，供一线开发者和技术管理选型参考。

## 比较维度

- **性能**：虽然没必要过早优化性能，但性能一般是大多数项目选择库的第一考量。也是众多框架激烈取舍的重点。
- **模块物理大小**：包和常用插件包大小，比如使用 redux 要计算 react-redux的成本。此项对应用的初始加载速度有影响。
- **心智模型复杂度**：指一般程序员对于该库的理解成本以及API设计的易用性。一般取决于其原始理论模型，比如flux，有限状态机，响应式编程等。注意模型复杂度和下一项表现力不一定有相关性。
- **业务表现力**：表现力强，意味着库的使用者能用少量的代码实现相同的功能。反之，就需要写大量格式雷同的样板代码，一些包装层次高，内藏“黑魔法”或者做了大量”脏活“的库会在这一项有优势，比如 rematch 之于 redux，mobx 之于 redux。
- **跨平台支持**：当下有很多库是针对某个框架开发的，或者某个库是针对特定平台（如针对webkit浏览器）或语言开发的，这些库在一开始并没有考虑跨平台的可能性，但其中也有后续加入对其他环境的支持，无论是官方还是非官方。当然，也有很多一开始就是为跨平台而设计的。无疑，后者能够有更广泛的适用性，虽然可能牺牲了灵活性和性能。

?️ Features
? Stability
⚡ Performance
? Package Ecosystem
? Community
? Learning Curve
? Documentation
? Tooling
?️ Track Record
? Team
⚖️ Compatibility
? Momentum

### Redux 家族

Redux 作为 React 状态管理界的龙头，在React状态管理库中占统治性优势。
flux的经典流程模型：

Redux 是基于flux的理论，在前hooks时代利用React 官方的 Context API，把整个app的状态整合为一个大对象(store)存放于外部，然后作为props注入最顶层Provider，此时各组件能够访问到其需要的子节点，同时能并只能发送action（由于库的强约束）来发起对这个store的修改。因为redux的store是不可变对象，此修改必须为替换式修改（浅拷贝），新store通过层层reducer再组装，相比于旧store已经是一个新对象，因此可以触发React自上而下的更新通知到全部组件，然后各组件按照各自对子节点订阅决定是否更新。通过这种方法redux可以追溯历史变化（因为可以选择不回收旧store，借助redux的logger插件），进行有副作用

Redux 的特点，或者说flux类库的特点是单一数据源，单向数据流

Redux 解决了以下问题：



rematch 的用法举例 [Count](https://codesandbox.io/s/3kpyz2nnz6)

```js
// key codes
// models.js
// function to create a one second delay
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
```

### 响应式

简单一般基于proxy，代表有mobx
复杂的有rx.js，cycle.js

mobx 是受欢迎程度仅次于 redux 的解决方案，性能非常好，现在程序员神器之一的 codesandbox 就使用 mobx。

mobx 的用法举例: [TodoMVC](https://github.com/mweststrate/mobx-todomvc)

```js
// key codes
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

iostore是基于 Proxy 代理对象，利用React hooks特性，同时封装了一点异步状态的逻辑
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

### 有限状态机

以 xstate 为代表，由于需要在一开始显式声明所有状态和变化方式，代码十分繁琐，

### Proxy

有限状态机（finite-state machine，FSM）类方案源于

| 状态管理库成本分析 | 包大小 (minified+gzipped) | 3G下载速度 | 备注 |
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

### 部分非开源库的启发

参考资料

- Kent C. Doods [Application State Management with React](https://kentcdodds.com/blog/application-state-management-with-react)
- [Why do I choose Effector instead of Redux or MobX?](https://dev.to/lessmess/why-i-choose-effector-instead-of-redux-or-mobx-3dl7)