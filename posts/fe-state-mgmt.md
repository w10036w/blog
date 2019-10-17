


> There is no simple GOOD or BAD state management library, only different trade-offs.
> <br>*by ME*



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
