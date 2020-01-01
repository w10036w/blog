## [199. Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/)
> bytedance,

Given a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.

Example:
```js
Input: [1,2,3,null,5,null,4]
Output: [1, 3, 4]
Explanation:

   1            <---
 /   \
2     3         <---
 \     \
  5     4       <---
```
## solution

```js
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function(root) {
  var res=[]
  visit(root, res, 0)
  return res
};
function visit(root, res, lvl) {
  if (!root) return;
  if (!res[lvl]) res[lvl]=root.val
  visit(root.right, res, lvl+1)
  visit(root.left, res, lvl+1)
}
```
