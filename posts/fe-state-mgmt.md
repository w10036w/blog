# Frontend Deepsea -- state management libraries study in late 2019

## Introduction

Nowadays the flaming battle of frontend framework has gone, and the "Major Three"(React, Vue, Angular) share many conceptions and implementations. From the point of view in late 2019, the choice of framework is not a major problem for frontend developers. Most business requirements can be fulfilled nicely with any of the three.

The state management, however, is always a core concern of frontend. It affects both the mindset of the team, and the bound of the application. Like infinite comments/analysis of the frontend frameworks, for most popular state management libraries ("**libs**" in the article), there is no single "good" or "bad" solution, but tradeoffs in different ways.

This article is to provide an overview and comparsion among the presentive open source state management libraries for frontend developers and tech leads, to make better decision.

## Comparison Level

- **Performance**:
- **Feature**:
- **Mental Model**:
- **API Design**:
- **Cross Framework**:
- **Ecosystem**:

## Redux (Flux) family

> Redux is a predictable state container for JavaScript apps.

[Redux](https://github.com/reduxjs/redux) is the offical recommendation and the most popular lib. Though it is primarily designed for React, from the above official claim, it clearly targets cross-framework solution. And this has been done thanks to community for [@angular-redux/store](https://github.com/angular-redux/store) and [vuejs-redux](https://www.npmjs.com/package/vuejs-redux).

**Redux (+react-redux) is based upon flux and functional programming**. Before [react hooks](https://reactjs.org/docs/hooks-intro.html), it utilizes Context API 
利用 React 官方的 Context API，把整个app的状态整合为一个store树(**单一数据源**)，作为props注入最顶层Provider。此时各组件能够访问到其需要的子节点，同时能并只能发送action（由于库的强约束）来发起对这个store的修改，之后通过reducer。因为redux的store是不可变对象（**状态只读**），此修改必须为替换式修改（浅拷贝），新store通过对应的reducer（**由纯函数改变**）生成新store对象，触发React更新通知全部组件，然后各组件按照各自对子节点的订阅决定是否更新。

进入hook时代后，react-redux通过新的API [useSelector](https://react-redux.js.org/api/hooks#using-hooks-in-a-react-redux-app) 一方面省去了高阶组件(HOC)，一方面改变了触发渲染的比较模式。

[flux](https://facebook.github.io/flux/docs/in-depth-overview/) 的经典流程模型：
![flux flow from facebook](https://facebook.github.io/flux/img/overview/flux-simple-f8-diagram-with-client-action-1300w.png)

### [Rematch](https://github.com/rematch/rematch)

> Rematch is Redux best practices without the boilerplate

Rematch is like adding syntax sugar to redux, significantly simplify the creation of store, action and reducer, etc. It uses async/await for async actions, and fully opens to most middlrewares of redux. Check [Purpose of rematch](https://rematch.github.io/rematch/#/purpose) for details.

[Count Example](https://codesandbox.io/s/3kpyz2nnz6)

```js
// key codes
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
      dispatch.count.addBy(1) // "count" from the model definition
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
// view is similar to pure Redux
```

### [dva](https://github.com/dvajs/dva)

> React and redux based, lightweight and elm-style framework.

---

### [Mobx](https://github.com/mobxjs/mobx)

> Anything that can be derived from the application state, should be derived. Automatically.

![mobx model](https://mobx.js.org/assets/flow.png)


---

| cost analysis | bundle size (minified+gzipped) | 3G download time | Note |
| :--- | ---: | ---: | :--- |
| redux + redux-react | 2.6kB + 5.5kB | 52ms + 111ms | flux based, an React-only solution but can be a cross-framework JS solution by [ng-redux](https://www.npmjs.com/package/ng-redux) and [vuejs-redux](https://www.npmjs.com/package/vuejs-redux), the most popular for React, but in most apps requires extra plugins, e.g. [immer](https://github.com/immerjs/immer), [immutable.js](https://github.com/immutable-js/immutable-js), [reselect](https://github.com/reduxjs/reselect), redux-thunk, redux-saga, redux-observable; low-level and too much boilplate codes |
| [rematch](https://github.com/rematch/rematch) + redux-react | [5.1kB](https://bundlephobia.com/result?p=@rematch/core@1.2.0) + [5.5kB](https://bundlephobia.com/result?p=react-redux@7.1.1) | 103ms + 111ms | redux based, higher and simpler, open to all redux plugins and share many pros and cons with redux |
| [xstate](https://github.com/davidkpiano/xstate) + @xstate/react | 16.2kB | 323ms | finite state machine solution, alternative/newer: [robot](https://github.com/matthewp/robot)
| iostore | 1kB | 20ms | React hooks specific solution
| [Effector](https://github.com/zerobias/effector) | 8kB | 161ms | multi store, cross-framework JS solution |
| [unstated](https://github.com/jamiebuilds/unstated) | 1.8kB | 36ms | from the author of [react-loadable](https://github.com/jamiebuilds/react-loadable), [unstated-next](https://github.com/jamiebuilds/unstated-next) with hook support, alternative [noctx](https://www.npmjs.com/package/noctx) by me |
| REACTIVE
| mobx + mobx-react | 19.8kB | 396ms | React specific solution, for Vue [vuex](https://github.com/vuejs/vuex) is a follower |
| mobx-state-tree | 19.7kB | |
| rx.js | <10.8kB | <217ms | low-level |

Is the thought of React team the truth? Not really

there are no best state management in frontend, only the most suitable for your case. The factors are the preference of the team

Reference:

- [Why do I choose Effector instead of Redux or MobX?](https://dev.to/lessmess/why-i-choose-effector-instead-of-redux-or-mobx-3dl7)
