## [543. Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/)
> top100

Given a binary tree, you need to compute the length of the diameter of the tree. The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

Example:
```js
Given a binary tree
          1
         / \
        2   3
       / \
      4   5
Return 3, which is the length of the path [4,2,1,3] or [5,2,1,3].
```

Note: The length of path between two nodes is represented by the number of edges between them.

## solution

```js
/**
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function(root) {
  var res=0
  dfs(root)
  return res;
  function dfs(node) {
    if (!node) return 0;
    var l=dfs(node.left)
    var r=dfs(node.right)
    res=Math.max(res, l+r); // update diameter at every node
    return 1+Math.max(l, r); // update the largest number of edge so far
  }
}
```
non-recursive

思路

- 自下向上累加推导, 因此要有栈, 进行 (左/右-> 右/左 -> 根) 深度遍历后, 从最后一个弹出开始上溯, 注意访问另一侧节点并排除已遍历节点
- 全局变量: 历史最大值(结果), 节点栈, 已遍历kv对 节点->最大长度
- 计数遍历时, 不断更新历史最大值

```js
var diameterOfBinaryTree = function(root) {
  if(!root) return 0
  var res=0, stack=[root], used=new Map()
  while (stack.length) {
    var n=stack[stack.length-1]
    if (n.left && !used.has(n.left)) stack.push(n.left)
    else if (n.right && !used.has(n.right)) stack.push(n.right)
    else {
      n=stack.pop()
      var l=used.get(n.left)||0
      var r=used.get(n.right)||0
      var max=1+Math.max(l, r)
      used.set(n, max)
      res=Math.max(res, l+r)
    }
  }
  return res
}
```
