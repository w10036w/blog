## [572. Subtree of Another Tree](https://leetcode.com/problems/subtree-of-another-tree/)
> easy,

Given two non-empty binary trees s and t, check whether tree t has exactly the same structure and node values with a subtree of s. A subtree of s is a tree consists of a node in s and all of this node's descendants. The tree s could also be considered as a subtree of itself.

Example 1:
```js
Given tree s:

     3
    / \
   4   5
  / \
 1   2
Given tree t:
   4
  / \
 1   2
Return true, because t has the same structure and node values with a subtree of s.
```
Example 2:
```js
Given tree s:

     3
    / \
   4   5
  / \
 1   2
    /
   0
Given tree t:
   4
  / \
 1   2
Return false.
```
## solution

```js
/**
 * @param {TreeNode} s
 * @param {TreeNode} t
 * @return {boolean}
 */
var isSubtree = function(s, t) {
  if (!s && !t) return true
  if (!s || !t) return false
  if (subroot(s, t)) return true
  return isSubtree(s.left, t) || isSubtree(s.right, t)
};
function subroot(s, t) {
  if (!s && !t) return true
  if (!s || !t || s.val!==t.val) return false
  return subroot(s.left, t.left) && subroot(s.right, t.right)
}
```
