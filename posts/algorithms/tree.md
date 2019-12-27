# Algorithm - Tree

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
