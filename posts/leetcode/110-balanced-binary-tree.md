## [110. Balanced Binary Tree](https://leetcode.com/problems/balanced-binary-tree/)
> easy

Given a binary tree, determine if it is height-balanced.

For this problem, a height-balanced binary tree is defined as:

a binary tree in which the left and right subtrees of every node differ in height by no more than 1.

Example 1:
```js
Given the following tree [3,9,20,null,null,15,7]:

    3
   / \
  9  20
    /  \
   15   7
Return true.
```
Example 2:

Given the following tree [1,2,2,3,3,null,null,4,4]:
```js
       1
      / \
     2   2
    / \
   3   3
  / \
 4   4
Return false.
```

## solution

```js
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {
  var res=true
  dfs(root)
  return res
  function dfs(root) {
    if (!res) return
    if (!root) return -1
    var l=dfs(root.left)+1
    var r=dfs(root.right)+1
    if (Math.abs(l-r)>1) res=false
    return Math.max(l, r)
  }
};
```
