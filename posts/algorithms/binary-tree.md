# Algorithm - Binary Tree
> https://blog.csdn.net/qq_40772692/article/details/79343914

## Node
```js
function TreeNode(val, l=null, r=null) {
  this.val = val
  this.left = l
  this.right = r
}
```
## 二叉树遍历

### 深度优先
前序 pre-order 根 -> 左 -> 右
```js
var preorder = function(root) {
  // 递归
  const res = []
  var traversal = function (node) {
    if (node === null) return;
    res.push(node.val)
    traversal(node.left)
    traversal(node.right)
  }
  traversal(root)

  // 非递归
  // const res = []
  // let [node, visit] = [root, []]
  // while (node || visit.length) {
  //   if (node) {
  //     res.push(node.val)
  //     visit.push(node)
  //     node = node.left
  //   } else {
  //     node = visit.pop().right
  //   }
  // }

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

### 广度优先 (Breadth-first search) / 层次遍历
```js
var levelorder = function (root) {
  var res = []
  var q = [root]
  while (q.length!==0) {
    node = q.shift()
    res.push(node)
    if (node.left !== null) q.push(node.left)
    if (node.right !== null) q.push(node.right)
  }
}
```
