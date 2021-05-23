# interview - typescript

## 文档

- [中文入门](https://ts.xcatliu.com/)

## 常用特性，关键词

### 运算 & 操作符

非空断言运算符 !
这个运算符可以用在 **变量名** 或者 **函数名** 之后，用来强调对应的元素是非null|undefined的

```ts
function onClick(callback?: () => void) {
  callback!();                // 参数是可选入参，加了这个感叹号!之后，TS编译不报错
}
```

这个符号的场景，特别适用于我们已经明确知道不会返回空值的场景，从而减少冗余的代码判断，如React的Ref

```ts
function Demo(): JSX.Elememt {
  const divRef = useRef<HTMLDivElement>();
  useEffect(() => {
    divRef.current!.scrollIntoView();         // 当组件Mount后才会触发useEffect，故current一定是有值的
  }, []);
  return <div ref={divRef}>Demo</div>
}```


### 泛型 & 泛型工具

```ts
Partial<T>, Extract<K, T>, Pick<T, K>, Exclude<T, U>, Omit<T, K>, ReturnType<T>, Required<T>

// ! Partial,  将泛型中全部属性变为可选
type PT = Partial<T> //
// 相当于 
type PT = {
  [key in keyof T]?: T[P]
}

// !Pick, 是将T类型中的K键列表提取出来，生成新的子键值对类型
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]          
}

/* e.g. */
type TypeA = {
  id: number
  name: string
  email: string
}
type TypeB = Partial<TypeA> 
// equal to
type TypeB = {
  id?: number
  name?: string
  email?: string
}
type TypeC = Extract<keyof TypeA, number>
// equal to
type TypeC === {
  id: number
}

type TypeD = Pick<TypeA, 'id' | 'name'> 
// equal to
type TypeD = {
  id: number
  name: string
}


```


类型检查, 私有/保护变量, 装饰器 (方法/属性/参数/工厂) +[元数据反射](https://zhuanlan.zhihu.com/p/42220487)(reflect metadata)

### `type` vs `interface` 区别

- 写法略有不同

```ts
type user = {
  name: string
  age: number
}
interface IUser {
  name: string
  age: number
}
```

- `interface` can be named as the same and will be **auto-merged**, while `type` need to use `&`

  重名的 `interface` 会自动合并, `type` 则必须独立命名并相交

```ts
interface IA {
  a: number
}
interface IA {
  b: number
}
const TE: IA = {
  a: 1,
  b: 2
}

type TA = {
  a: number
}
type TB = {
  b: number
}
const TE: TA & TB = {
  a: 1,
  b: 2
}
```

- `interface` 应该用于 `实现`，即和 `implements` 结合使用。

```ts
interface serializeable {
  tostring(): string
  fromString(str: string): void
}

class SendData implements serializeable {
  name: string
  age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
  public tostring() {
    return JSON.stringify({
      name: this.name,
      age: this.age
    })
  }
  public fromString(str: string) {
    let data = JSON.parse(str)
    this.name = data.name
    this.age = data.age
  }
}

function sendToServer(obj: serializeable) {}

sendToServer(new SendData("name", 18))
```

### keyof

1. 取 `interface` 的键名

```ts
interface Point {
  x: number
  y: number
}
type keys = keyof Point // 'x' | 'y'
const a: keys = 'z' // 'z' is not assignable to 'x' | 'y'
```

1. 取 `type` 所有键名，可配合 `Extract<>` 使用过滤对应属性

```ts
const c = "c";
const d = 10;
const e = Symbol();

const enum E1 { A, B, C }
const enum E2 { A = "A", B = "B", C = "C" }

type Foo = {
  a: string;       // String-like name
  5: string;       // Number-like name
  [c]: string;     // String-like name
  [d]: string;     // Number-like name
  [e]: string;     // Symbol-like name
  [E1.A]: string;  // Number-like name
  [E2.A]: string;  // String-like name
}

type K1 = keyof Foo;  // "a" | 5 | "c" | 10 | typeof e | E1.A | E2.A
type K2 = Extract<keyof Foo, string>;  // "a" | "c" | E2.A
type K3 = Extract<keyof Foo, number>;  // 5 | 10 | E1.A
type K4 = Extract<keyof Foo, symbol>;  // typeof e
```

### Dictionary & Many

```ts
interface Dictionary<T> {
  [index: string]: T
}

interface NumericDictionary<T> {
  [index: number]: T
}

const data: Dictionary<number> = {
  a: 3,
  b: 4
}
```

### 函数声明 function declaration

```ts
function sum(x: number, y: number): number {
  return x + y
}
```

### 泛型

```ts
```

能接受多种类型的 repeat()

```ts
function repeat<T>(item: T, count: number): T[] {
  let result: T[] = []
  for (let i = 0; i < count; i++) {
    result.push(item)
  }
  return result
}
let arr: number[] = repeat<number>(13, 4)
let arr2: string[] = repeat<string>("aaa", 4)
```

### 类型推测

泛型的例子, 不传类型也可以自行推断

```ts
// ...
let arr: number[] = repeat(13, 4)
```

### 装饰器 decorator

![util functions](../../assets/img/interview-typescript-utils.png)

### this (todo)

[详解 Typescript 里的 This](https://zhuanlan.zhihu.com/p/104565681)

## react 中使用 typescript

- [优雅的在 react 中使用 TypeScript](https://juejin.im/post/5bed5f03e51d453c9515e69b)
- [TypeScript 在 React 中使用总结](https://juejin.im/post/5bab4d59f265da0aec22629b)
- [typescript 函数类型](https://juejin.im/post/5d10e242f265da1b6b1ce24b)
- [ts 最佳实践](https://juejin.im/post/5e095ddb6fb9a016391d5d58)

参考 [在 React 项目中优雅地使用 Typescript](https://segmentfault.com/a/1190000020536678)

```js
interface IProps {
  // CSSProperties提供样式声明的类型信息
  // 用户传入style的时候就能够获得类型检查和代码补全
  style?: React.CSSProperties;
  // 使用@types/react提供的事件类型定义，这里指定event.target的类型是HTMLButtonElement
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
  // ...
}

// IProps 无需声明 children 属性的类型。React.FC 会自动为 props 添加这个属性类型。
const MyComponent: React.FC<IProps> = props => {
  const { children, ...restProps } = props // props 无需做类型标注
  return <div {...restProps}>{children}</div>
}

// 类组件
interface IProps {
  message: string;
}
interface IState {
  count: number;
}
export class MyComponent extends React.Component<IProps, IState> {
  state: IState = {
    // duplicate IState annotation for better type inference
    count: 0
  }
  render() {
    return (
      <div>
        {this.props.message} {this.state.count}
      </div>
    )
  }
}

// renderNodeType
type ReactText = string | number
type ReactChild = ReactElement | ReactText
interface ReactNodeArray extends Array<ReactNode> {}
type ReactFragment = {} | ReactNodeArray
type ReactNode =
  | ReactChild
  | ReactFragment
  | ReactPortal
  | boolean
  | null
  | undefined

// 组件类型
// React.ComponentType<Props> (ComponentClass<P> | FunctionComponent<P>)
// HOC
const withSomething = <P extends WrappedComponentProps>(
  WrappedComponent: React.ComponentType<P>,
) => {}

```

## 参考资料

- [typescript 高级技巧](https://zhuanlan.zhihu.com/p/103209639)
- [typescript 高级用法](https://juejin.cn/post/6964692485415108645)
