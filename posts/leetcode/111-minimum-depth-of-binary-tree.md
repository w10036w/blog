## [111. Minimum Depth of Binary Tree](https://leetcode.com/problems/minimum-depth-of-binary-tree/)
Given a binary tree, find its minimum depth.

The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.

Note: A leaf is a node with no children.

Example:
```js
Given binary tree [3,9,20,null,null,15,7],

    3
   / \
  9  20
    /  \
   15   7
```
return its minimum depth = 2.

Note: [1,2] => 2

## solution
bfs
```js
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function(root) {
  if (!root) return 0
  if (!root.left) return minDepth(root.right)+1
  if (!root.right) return minDepth(root.left)+1
  return Math.min(minDepth(root.right),minDepth(root.left))+1
}
```
