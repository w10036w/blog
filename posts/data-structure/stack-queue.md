# Interview - Stack & Queue

队列和栈都是线性表 (linear list) ，栈先进后出，队列先进先出

> <https://blog.csdn.net/qq_35888875/article/details/78667423>

## stack

> 限定仅能在表尾进行插入或删除操作的线性表。对栈来说，表尾称为栈顶、表头称为栈底，不含元素的空表称为空栈。
>
> 应用例子：进制转换、括号匹配检验、行编辑程序、迷宫求解、表达式求值、递归实现

在 Java 中继承 Vector 类

```js
.empty()
.peek() // 查看堆顶，但不操作
.pop() // 移除堆顶，并返回
.push() // 入栈
.search(o) // 返回对线在堆栈的位置，以 1 为基数
```

## queue
