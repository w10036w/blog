## [108. Convert Sorted Array to Binary Search Tree](https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/)
> top100

Given an array where elements are sorted in ascending order, convert it to a height balanced BST.

For this problem, a height-balanced binary tree is defined as a binary tree in which the depth of the two subtrees of every node never differ by more than 1.

Example:
```js
Given the sorted array: [-10,-3,0,5,9],

One possible answer is: [0,-3,9,-10,null,5], which represents the following height balanced BST:

      0
     / \
   -3   9
   /   /
 -10  5
```

## solution

```js
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums) {
  return dac(0, nums.length-1)
  function dac(l, r) {
    if (l>r) return null
    var m=(l+r)>>1
    var root=new TreeNode(nums[m])
    root.left=dac(l, m-1)
    root.right=dac(m+1, r)
    return root
  }
};
// non-recurisve
var sortedArrayToBST = function(nums) {
  if (!nums.length) return null // KEY
  var l=0, r=nums.length-1, m=r>>1
  var root=new TreeNode(nums[m])
  var stack=[[root, l, m, r]]
  while(stack.length) {
    var [n, l, m, r]=stack.pop()
    if (l>m||m>r) continue
    var lm=(l+m-1)>>1, rm=(m+1+r)>>1
    if (lm>=l&&m>lm) {
      n.left=new TreeNode(nums[lm])
      stack.push([n.left, l, lm, m-1])
    }
    if (r>=rm&&rm>m){
      n.right=new TreeNode(nums[rm])
      stack.push([n.right, m+1, rm, r])
    }
  }
  return root
};
```
