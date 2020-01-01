## [226. Invert Binary Tree]()

Invert a binary tree.

Example:
```js
Input:

     4
   /   \
  2     7
 / \   / \
1   3 6   9
Output:

     4
   /   \
  7     2
 / \   / \
9   6 3   1
```
Trivia:

This problem was inspired by this original tweet by Max Howell:

> Google: 90% of our engineers use the software you wrote (Homebrew), but you can’t invert a binary tree on a whiteboard so f*** off.
## solution

```js
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
  visit(root)
  return root
};
function visit(root) {
  if (!root) return;
  [root.left, root.right]=[root.right, root.left]
  visit(root.left)
  visit(root.right)
}
```
