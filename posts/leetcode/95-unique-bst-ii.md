## [95. Unique Binary Search Trees II](https://leetcode.com/problems/unique-binary-search-trees-ii/)
Given an integer n, generate all structurally unique BST's (binary search trees) that store values 1 ... n.

Example:
```js
Input: 3
Output:
[
  [1,null,3,2],
  [3,2,null,1],
  [3,1,null,null,2],
  [2,1,3],
  [1,null,2,null,3]
]
Explanation:
The above output corresponds to the 5 unique BST's shown below:

   1         3     3      2      1
    \       /     /      / \      \
     3     2     1      1   3      2
    /     /       \                 \
   2     1         2                 3
```
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
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function(n) {
  return gTree(1, n)

  function gTree(start, end) {
    if (start>end) return [null]
    const res = []
    for (let i = start; i<= end; i++) {
      const l = gTree(start, i-1)
      const r = gTree(i+1, end)
      // TODO: understand
      l.forEach(le => {
        r.forEach(re => {
          const root = new TreeNode(i)
          root.left = le
          root.right = re
          res.push(root)
        })
      })
    }
    return res
  }
};
```
