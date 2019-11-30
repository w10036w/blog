## [21. Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)

tags: LinkedList

Solution: start with a new empty Node (preHead) and "attach" (.next to Nodes) Nodes in order; finally return the preHead.next

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
  let l = new ListNode(0)
  const prehead = l
  while(l1 && l2) {
    if (l1.val<=l2.val) {
      l.next = l1
      l1 = l1.next
    } else {
      l.next = l2
      l2 = l2.next
    }
    l = l.next
  }
  l.next = l1||l2
  return prehead.next
};
```
