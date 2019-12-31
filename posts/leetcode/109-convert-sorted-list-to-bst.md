## [109. Convert Sorted List to Binary Search Tree](https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/)
Given a singly linked list where elements are sorted in ascending order, convert it to a height balanced BST.

For this problem, a height-balanced binary tree is defined as a binary tree in which the depth of the two subtrees of every node never differ by more than 1.

Example:
```js
Given the sorted linked list: [-10,-3,0,5,9],

One possible answer is: [0,-3,9,-10,null,5], which represents the following height balanced BST:

      0
     / \
   -3   9
   /   /
 -10  5
```
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
```

solution
核心思路: 二分中点作为 `root` 并**作为返回值**, 不停地递归二分

1. 转化链表为 array, 空间 O(n), 递归传递指针
2. 快慢指针, 无需空间, 但修改了原链表, 因为分治时需要断开条件

转化为 array, 再二分定 root
```js
var sortedListToBST = function(head) {
  var arr=[], curr=head
  while (curr) {
    arr.push(curr.val)
    curr=curr.next
  }
  return tree(0, arr.length-1)
  function tree(l, r) {
    if (l>r) return null
    var mid = (l+r)/2>>0
    var root=new TreeNode(arr[mid])
    root.left=tree(l, mid-1)
    root.right=tree(mid+1, r)
    return root
  }
}
```
快慢指针
```js
var sortedListToBST = function(head) {
  if(!head) return null;
  if(!head.next) return new TreeNode(head.val);
  var slow=head, fast=head, prev=null;
  while(fast&&fast.next){
    prev=slow;
    fast=fast.next.next;
    slow=slow.next;
  }
  prev.next=null;
  var root=new TreeNode(slow.val);
  root.left=sortedListToBST(head);
  root.right=sortedListToBST(slow.next);
  return root;
};
```
