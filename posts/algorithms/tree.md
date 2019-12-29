# Algorithm - Tree
> [数据结构中各种树](https://www.cnblogs.com/maybe2030/p/4732377.html#_label7)

## Binary Tree 二叉树
> https://blog.csdn.net/qq_40772692/article/details/79343914

### 二叉树遍历

#### 深度优先
前序 pre-order 根 -> 左 -> 右
```js
var preorder = function(root) {
  const res = []
  // 递归
  // var traversal = function (node) {
  //   if (node === null) return;
  //   res.push(node.val)
  //   traversal(node.left)
  //   traversal(node.right)
  // }
  // traversal(root)

  // 非递归
  const res = []
  let [node, stack] = [root, []]
  while (node || stack.length) {
    if (node) {
      res.push(node.val)
      stack.push(node)
      node = node.left
    } else {
      node = stack.pop().right
    }
  }
  return res
}
```

中序 in-order 左 -> 根 -> 右
```js
var inorder = function (root) {
  // 递归
  const res = []
  var traversal = function (node) {
    if (node === null) return;
    traversal(node.left)
    res.push(node.val)
    traversal(node.right)
  }
  traversal(root)

  // 非递归 入栈 stack
  // const res = []
  // let [node, visit] = [root, []]
  // while (node!==null || visit.length) {
  //   if (node !== null) {
  //     visit.push(node)
  //     node = node.left
  //   } else {
  //     node = visit.pop()
  //     res.push(node.val)
  //     node = node.right
  //   }
  // }

  return res
}
```

后序 post-order 左 -> 右 -> 根
```js
var postorder = function (root) {
  // 递归
  const res = []
  var traversal = function (node) {
    if (node === null) return;
    traversal(node.left)
    traversal(node.right)
    res.push(node.val)
  }
  traversal(root)
  return res
}
```

#### 广度优先 (Breadth-first search) / 层次遍历
```js
var visit = () => {}
var levelorder = function (root) {
  var q = [root]
  while (q.length!==0) {
    node = q.shift()
    visit(node)
    if (node.left !== null) q.push(node.left)
    if (node.right !== null) q.push(node.right)
  }
}
```
#### AVL 平衡二叉树 [CSDN](https://blog.csdn.net/Travelerwz/article/details/52186357)

> 平衡因子： 某个结点的左子树的高度减去右子树的高度得到的差值。
>
> AVL: 所有结点的平衡因子的绝对值都不超过 1 的二叉树.
>
> 平衡二叉树的每个节点的平衡因子只能是 -1, 0, 1. -1 表左子树比右子树高.
>

```js
// AVL TreeNode
function TreeNode(val) {
  this.val = val
  this.left = null
  this.right = null
}
// 计算高度
function calcHeight(node, rewrite=false) {
  if (!rewrite && typeof node.height === 'number') return node.height
  let r = 0
  if (node!==null)
    r = Math.max(calcHeight(node.left), calcHeight(node.right)) + 1
  if (rewrite) node.height = r
  return r
}
// 计算平衡因子
function balanceFactor(node) {
  if (node===null) return 0
  return calcHeight(node.left) - calcHeight(node.right)
}
// 当平衡因子的绝对值大于 1 时，就会触发树的修正
const unbalanceCb = fn => node => balanceFactor(node)>1 &&fn(node)
// 前序遍历或其他方式
const preorderAVL = (node, fn) => {
  if (node!==null) {
    fn(node)
    preorderAVL(node.left)
    preorderAVL(node.right)
  }
}
preorderAVL(root, unbalanceCb(console.log))
```
两种二叉树旋转, 从失去平衡的最小子树根结点开始
```js
// 二叉树基础右旋
function rotateRight(node) {
  const left = node.left
  node.left = left.right
  left.right = node
  left.height = calcHeight(left, true)
  node.right.height = calcHeight(node.right, true)
  return left
}

```

四种平衡二叉树旋转 

[参考 AVL 树的旋转图解和简单实现](https://www.jianshu.com/p/6988699625d5)
| 插入方式 | 描述 | 旋转方式 |
| :-- | :-- | :-- |
| LL | 在 a 的左子树根节点的左子树上插入节点而破坏平衡 | 右旋转
| RR | 在 a 的右子树根节点的右子树上插入节点而破坏平衡 | 左旋转
| LR | 在 a 的左子树根节点的右子树上插入节点而破坏平衡 | 先左旋后右旋
| RL | 在 a 的右子树根节点的左子树上插入节点而破坏平衡 | 先右旋后左旋

1. `LL`
  ```js
  function rotateLL(node) {
    var root = findUnbalRoot(node)
    root.parent.left = root.left
    var originRight = root.left.right
    root.left.right = root
    root.right = right = originRight
  }
  ```

## Trie 树
字典树，又称单词查找树，Trie 树，是一种树形结构，是一种哈希树的变种。典型应用是用于统计，排序和保存大量的字符串（但不仅限于字符串），所以经常被搜索引擎系统用于文本词频统计。它的优点是：利用字符串的公共前缀来减少查询时间，最大限度地减少无谓的字符串比较，查询效率比哈希树高。

### Tire 树的三个基本性质
1. 根节点不包含字符，除根节点外每一个节点都只包含一个字符；
2. 从根节点到某一节点，路径上经过的字符连接起来，为该节点对应的字符串；
3. 每个节点的所有子节点包含的字符都不相同。

### Trie 树的应用
1- 串的快速检索

给出 N 个单词组成的熟词表，以及一篇全用小写英文书写的文章，请你按最早出现的顺序写出所有不在熟词表中的生词。

在这道题中，我们可以用数组枚举，用哈希，用字典树，先把熟词建一棵树，然后读入文章进行比较，这种方法效率是比较高的。

2- “串” 排序

给定 N 个互不相同的仅由一个单词构成的英文名，让你将他们按字典序从小到大输出。用字典树进行排序，采用数组的方式创建字典树，这棵树的每个结点的所有儿子很显然地按照其字母大小排序。对这棵树进行先序遍历即可。

3- 最长公共前缀

对所有串建立字典树，对于两个串的最长公共前缀的长度即他们所在的结点的公共祖先个数，于是，问题就转化为求公共祖先的问题。
