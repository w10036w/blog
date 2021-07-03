# interview - engineer

## dependency inversion principle

该设计原则指出高层策略性的代码不应该依赖实现底层细节的代码，恰恰相反，那些实现底层细节的代码应该依赖高层策略性的代码。​
依赖倒置原则的最重要问题就是确保应用程序或框架的主要组件从非重要的底层组件实现细节解耦出来，这将确保程序的最重要的部分不会因为低层次组件的变化修改而受影响。

## clean code principals

- “If it isn’t tested, it’s broken”
- Choose meaningful names
- Classes and functions should be small and obey the Single Responsibility Principle (SRP)
- Functions should have no side effects

## ESLint

### 原理

ESLint 使用 [espree](https://link.zhihu.com/?target=https%3A//github.com/eslint/espree) 来解析我们的 JS 语句，来生成抽象语法树 AST

根据 rules 定义

```js
// { `no-debugger`: 'error }
module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "disallow the use of `debugger`",
      category: "Possible Errors",
      recommended: true,
      url: "https://eslint.org/docs/rules/no-debugger"
    },
    fixable: null,
    schema: [],
    messages: {
      unexpected: "Unexpected 'debugger' statement."
    }
  },
  create(context) {
    return {
      DebuggerStatement(node) {
        context.report({
          node,
          messageId: "unexpected"
        });
      }
    };
  }
};
```

### extends 写法
```js
{
  extends: [
    'eslint-config-airbnb-base',
    './rules/react',
    './rules/react-a11y',
  ].map(require.resolve),
  // OR
  extends: "airbnb"
};
```

## API 测试
### Rest
- https://jikan.moe/ most active online anime + manga community and database” — MyAnimeList
