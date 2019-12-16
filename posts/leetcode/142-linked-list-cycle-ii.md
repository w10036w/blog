## [142. Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii/)
Given a linked list, return the node where the cycle begins. If there is no cycle, return null.

[CSDN analysis](https://blog.csdn.net/willduan1/article/details/50938210)

My solution

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
 * @return {ListNode}
 */
var detectCycle = function(head) {
  if (!head || !head.next) return null
  let [slow, fast] = [head, head]
  while(fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
    if (slow===fast) break
  }
  if (!fast || !fast.next) return null
  slow=head
  while (fast!==slow) {
    fast = fast.next
    slow = slow.next
  }
  return slow
};
```
Note: this can be used to identify whether 2 linked lists are crossed and the crossed node.
