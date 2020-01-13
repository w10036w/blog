## [25. Reverse Nodes in k-Group](https://leetcode.com/problems/reverse-nodes-in-k-group/)
> bytedance, linkedlist

Given a linked list, reverse the nodes of a linked list k at a time and return its modified list.

k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes in the end should remain as it is.

Example:
```js
Given this linked list: 1->2->3->4->5

For k = 2, you should return: 2->1->4->3->5

For k = 3, you should return: 3->2->1->4->5
```
Note:

- Only constant extra memory is allowed.
- You may not alter the values in the list's nodes, only nodes itself may be changed.

## solution

```js
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function(head, k) {
  var tmp=head
  for(var i=1;i<k&&tmp;i++) tmp=tmp.next
  if (!tmp) return head // if rest.length<k, do nothing
  var next=tmp.next // nextHead
  tmp.next=null
  var newHead=reverse(head)
  var nextHead=reverseKGroup(next, k)
  head.next=nextHead // head is the newTail right now, link to nextHead
  return newHead
};
function reverse(head) {
  var pre=null, cur=head
  while(cur) [cur.next, pre, cur]=[pre, cur, cur.next] // keep the order
  return pre
}
```
