## [94. Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/)

Given a binary tree, return the inorder traversal of its nodes' values.

Example:

```js
Input: [1,null,2,3]
   1
    \
     2
    /
   3

Output: [1,3,2]

```

see [binary-tree](../algorithms/binary-tree.md)

My solution

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
  const res = []
  var traversal = function (node) {
    if (node === null) return;
    traversal(node.left)
    res.push(node.val)
    traversal(node.right)
  }
  traversal(root)
  return res
};
```
