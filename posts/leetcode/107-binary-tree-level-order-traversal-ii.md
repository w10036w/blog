## [107. Binary Tree Level Order Traversal II](https://leetcode.com/problems/binary-tree-level-order-traversal-ii/)
Given a binary tree, return the bottom-up level order traversal of its nodes' values. (ie, from left to right, level by level from leaf to root).

For example:
```js
Given binary tree [3,9,20,null,null,15,7],
    3
   / \
  9  20
    /  \
   15   7
return its bottom-up level order traversal as:
[
  [15,7],
  [9,20],
  [3]
]
```
## solution
reverse the res of [102. Binary Tree Level Order Traversal](102-binary-tree-level-order-traversal.md)
```js
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrderBottom = function(root) {
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
var levelOrderBottom = function(root) {
  var res=[]
  visit(root, 0, res)
  return res.reverse()
};
function visit(root, l, res) {
  if (!root) return;
  if (!res[l]) res[l]=[]
  res[l].push(root.val)
  visit(root.left, res)
  visit(root.right, res)
}
```
