## [141. Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/)

Given a linked list, determine if it has a cycle in it.

My solution: 2 pointers + set all visited next to head

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
  if (!head || !head.next) return false
  var fast = head
  var slow = head
  while (fast && fast.next && slow) {
    slow = slow.next
    fast = fast.next.next
    if (slow === fast) return true
  }
  return false
};
// all next to head
var hasCycle = function(head) {
  if (!head || !head.next) return false
  var node = head
  var tmp
  while (node) {
    if (node.next === head) return true
    tmp = node.next
    node.next = head
    node = tmp
  }
  return false
}
```
