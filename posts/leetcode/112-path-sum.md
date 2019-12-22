## [112. Path Sum](https://leetcode.com/problems/path-sum/)
Given a binary tree and a sum, determine if the tree has a root-to-leaf path such that adding up all the values along the path equals the given sum.

Note: A leaf is a node with no children.

Example:
```js
Given the below binary tree and sum = 22,

      5
     / \
    4   8
   /   / \
  11  13  4
 /  \      \
7    2      1
```
return true, as there exist a root-to-leaf path `5->4->11->2` which sum is 22.

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
 * @param {number} sum
 * @return {boolean}
 */
var hasPathSum = function(root, sum) {
  if (!root) return false
  return dfs(root, sum)
};
function dfs(node, sum) {
  if (sum===node.val && !node.left && !node.right) return true
  let l = false
  let r = false
  if (node.left) l = dfs(node.left, sum-node.val)
  if (node.right) r = dfs(node.right, sum-node.val)
  return l||r
}
```
or shorter & fastest
```js
var hasPathSum = function(root, sum) {
  if (!root) return false
  if (!root.left && !root.right) return sum===root.val
  return hasPathSum(root.left, sum-root.val)
    || hasPathSum(root.right, sum-root.val)
};
```
or cache result & save memory
```js
var hasPathSum = function(root, sum) {
  var res = false
  function dfs(root, sum) {
    if (!root) return
    const diff = sum - root.val
    if (diff===0 && root.right===null && root.left===null) return res = true
    if (root.right) dfs(root.right, diff)
    if (root.left) dfs(root.left, diff)
  }
  dfs(root, sum)
  return res
};
```
