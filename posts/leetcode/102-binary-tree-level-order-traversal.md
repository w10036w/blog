## [102. Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)

Given a binary tree, return the level order traversal of its nodes' values. (ie, from left to right, level by level).

For example:

```js
Given binary tree [3,9,20,null,null,15,7],
    3
   / \
  9  20
    /  \
   15   7
return its level order traversal as:
[
  [3],
  [9,20],
  [15,7]
]
```

## solution

```js
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
  if (!root) return []
  var res=[], q=[root], q2=[], tmp=[]
  while (q.length) {
    for(var i=0; i<q.length; i++) {
      tmp.push(q[i].val)
      if (q[i].left) q2.push(q[i].left)
      if (q[i].right) q2.push(q[i].right)
    }
    res.push(tmp);
    [q, q2, tmp]=[q2, [], []]
  }
  return res
};
```

recursive

```js
var levelOrder = function(root) {
  var res=[]
  bfs(root, 0, res)
  return res
};
function bfs(root, l, res) {
  if (!root) return;
  if (!res[l]) res[l]=[]
  res[l].push(root.val)
  bfs(root.left, res)
  bfs(root.right, res)
}
```
