# interview - bytedance 字节跳动

## 参考面经
- [服务端开发](https://www.nowcoder.com/discuss/147325?type=2)
- [今日头条前端三轮面试面经](https://www.nowcoder.com/discuss/105513)

## 流程
> https://www.kanzhun.com/gsmsh11077801.html

笔试一轮，面试三轮，hr 一轮。三年社招岗位，难度很大。

面试难度超过阿里（同时间段面试过两个阿里部门，个人感受全方位难度超过阿里）。

笔试没啥好说的，就是算法 + 算法 + 原理 + 实现。接下来是面试，每一轮面试的面试官都会要求当场手写算法和实现，看着写。

第一轮面试，问的问题主要是 react 实现原理，diff 算法实现机制，redux 实现与数据流向，复杂模数据对象深度对比实现，vue 设计的核心原理 (主要是虚拟 dom 的实现，渲染机制的实现，双向数据监听，模板引擎的具体实现)。node 问了通信机制，内存优化，v8 的垃圾回收（new space 和 old space 的算法实现原理是什么）。最后该问了项目工程化，也就是 webpack，loader 实现机制和原理，项目优化，如何加快打包速度，如何做到 tree shaking。一共面试一个半小时左右。最后手写一个发布者订阅者实现。

二面应该是一个算法面试官老师，只问算法和设计模式，当场就让我手写算法题，一共问了四个算法题，都很难，我只完整写出一个，有两个有点思路说了一下，最后一个一点思路都没有。网上搜索不到，leetcode 变种题。这方面，猎头给我说过，至少刷 400 + 以上 leetcode。接下来就是设计模式，问设计模式会哪些，说的设计模式在工作中怎么用的，都解决了什么问题，为什么要这么用，可否继续优化。一共一小时十五分钟左右。

第三轮，面试官老师特别和蔼可亲，气氛非常轻松。主要考察知识点广度，聊了我做的一些模块，发布的 npm 包，一些程序设计思想。广度方面主要聊了一些前端测试，前沿技术等，重点聊了一下工具链模块开发。还问了一些平常的学习方法这些。一共一小时多一点时间吧。再接下来就是 hr 面试了。感觉只要不作死，基本上都过了。主要是之前在上一家公司都做了些啥，怎么待实习生的，怎么做技术提升的。为何离职自己职业规划。最后通知 offer 发放。

## questions
[题目集合](https://blog.csdn.net/Uupton/article/details/84640146)
Minimum Window Substring
Longest Increasing Path in a Matrix

平衡二叉树

### revert linked list
给定一个单链表的头节点 head, 实现一个调整单链表的函数，使得每 K 个节点之间为一组进行逆序，并且从链表的尾部开始组起，头部剩余节点数量不够一组的不需要逆序。（不能使用队列或者栈作为辅助）
例如：
```js
链表：1->2->3->4->5->6->7->8->null, K = 3。那么 6->7->8，3->4->5，1->2 各位一组。调整后：1->2->5->4->3->8->7->6->null。其中 1，2 不调整，因为不够一组。
```

### Solution
[25. Reverse Nodes in k-Group](https://leetcode.com/problems/reverse-nodes-in-k-group/) 加强版

先全链反转, 再每K翻转, 再全链反转
```js
function reverseLL(head) {
  let newHead = reverse(head)
  newHead = reverseKNode(newHead, 3)
  return reverse(newHead)
}
function reverse(head) {
  var pre=null, cur=head
  while(cur) [pre, cur, cur.next]=[cur, cur.next, pre]
  return pre
}
function reverseKNode(head, k) {
  var tmp=head
  for(var i=1;i<k&&tmp;i++) tmp=tmp.next
  if (!tmp) return head // if rest.length<k, do nothing
  var next=tmp.next
  tmp.next=null
  var newHead=reverse(head)
  var newNext=reverseKNode(next, k)
  head.next=newNext
  return newHead
}
```
