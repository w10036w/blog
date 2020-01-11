## [103. Binary Tree Zigzag Level Order Traversal](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/)
> bytedance,

Given a binary tree, return the zigzag level order traversal of its nodes' values. (ie, from left to right, then right to left for the next level and alternate between).

For example:
```js
Given binary tree [3,9,20,null,null,15,7],
    3
   / \
  9  20
    /  \
   15   7
return its zigzag level order traversal as:
[
  [3],
  [20,9],
  [15,7]
]
```
## solution

```js
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function(root) {
  if (!root) return []
  var res=[], arr=[root], q=[], tmp=[], l2r=true
  while(arr.length) {
    for(var i=0; i<arr.length; i++) {
      var n=arr[i]
      tmp.push(n.val)
      if (n.left) q.push(n.left)
      if (n.right) q.push(n.right)
    }
    res.push(l2r?tmp:tmp.reverse()) // KEY
    l2r=!l2r;
    [tmp, arr, q]=[[], q, []]
  }
  return res
};
```

recursive
```js
var zigzagLevelOrder = function(root) {
  var res=[]
  visit(root, 0, res)
  return res
}
function visit(root, lvl, res) {
  if (!root) return
  if (!res[lvl]) res[lvl]=[]
  if (lvl%2==0) res[lvl].push(root.val)
  else res[lvl].unshift(root.val)
  visit(root.left, lvl+1, res)
  visit(root.right, lvl+1, res)
}
```
