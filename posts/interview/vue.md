# interview - vue

## computed 实现
[引用来源](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/291#issuecomment-545818527)

computed 本身是通过代理的方式代理到组件实例上的，所以读取计算属性的时候，执行的是一个内部的 getter，而不是用户定义的方法。

computed 内部实现了一个惰性的 watcher，在实例化的时候不会去求值，其内部通过 dirty 属性标记计算属性是否需要重新求值。当 computed 依赖的任一状态（不一定是 return 中的）发生变化，都会通知这个惰性 watcher，让它把 dirty 属性设置为 true。所以，当再次读取这个计算属性的时候，就会重新去求值。

## Vue3.0
![vue3.0 reactive](../../assets/img/interview-vue-reactive.png)
