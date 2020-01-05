## [617. Merge Two Binary Trees](https://leetcode.com/problems/merge-two-binary-trees/)
> top100

Given two binary trees and imagine that when you put one of them to cover the other, some nodes of the two trees are overlapped while the others are not.

You need to merge them into a new binary tree. The merge rule is that if two nodes overlap, then sum node values up as the new value of the merged node. Otherwise, the NOT null node will be used as the node of new tree.

Example 1:
```js
Input:
Tree 1                     Tree 2
        1                         2
        / \                       / \
      3   2                     1   3
      /                           \   \
    5                             4   7
Output:
Merged tree:
    3
  / \
  4   5
/ \   \ 
5   4   7
```

Note: The merging process must start from the root nodes of both trees.

## solution

```js
/**
 * @param {TreeNode} t1
 * @param {TreeNode} t2
 * @return {TreeNode}
 */
var mergeTrees = function(t1, t2) {
  if (!t1 && !t2) return null
  var v=(t1?t1.val:0)+(t2?t2.val:0)
  var n=new TreeNode(v)
  n.left=mergeTrees(t1&&t1.left, t2&&t2.left)
  n.right=mergeTrees(t1&&t1.right, t2&&t2.right)
  return n
};
```
[nicer one and save time & space](https://leetcode.com/problems/merge-two-binary-trees/discuss/104325/A-few-lines-of-JavaScript/107185)
```js
var mergeTrees = function(t1, t2) {
  if (t1 && t2) {
    const n=new TreeNode(t1.val+t2.val);
    n.left=mergeTrees(t1.left, t2.left);
    n.right=mergeTrees(t1.right, t2.right);
    return n;
  }
  return t1 || t2;
};
```
