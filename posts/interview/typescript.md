# interview - typescript

## 文档
- [中文入门](https://ts.xcatliu.com/)

## 常用特性枚举

类型检查, 私有/保护变量, 装饰器 (方法/属性/参数/工厂) +[元数据反射](https://zhuanlan.zhihu.com/p/42220487)(reflect metadata)

### 泛型
能接受多种类型的 repeat()
```ts
function repeat<T>(item: T, count: number): T[] {
  let result: T[] = [];
  for (let i = 0; i < count; i++) {
    result.push(item);
  }
  return result;
}
let arr: number[] = repeat<number>(13, 4);
let arr2: string[] = repeat<string>('aaa', 4);
```

### 类型推测
泛型的例子, 不传类型也可以自行推断
```ts
// ...
let arr: number[] = repeat(13, 4);
```
### 装饰器 decorator


![util functions](../../assets/img/interview-typescript-utils.png)

## react 中使用 typescript
- [优雅的在 react 中使用 TypeScript](https://juejin.im/post/5bed5f03e51d453c9515e69b)
- [TypeScript 在 React 中使用总结](https://juejin.im/post/5bab4d59f265da0aec22629b)
- [typescript 函数类型](https://juejin.im/post/5d10e242f265da1b6b1ce24b)
- [ts 最佳实践](https://juejin.im/post/5e095ddb6fb9a016391d5d58)

