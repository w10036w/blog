## [206. Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)
Reverse a singly linked list.

Example:
```js
Input: 1->2->3->4->5->NULL
Output: 5->4->3->2->1->NULL
```
Follow up:

A linked list can be reversed either iteratively or recursively. Could you implement both?

## Solution
思路: 双指针, 一前一后

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
  var prev=null, curr=head
  while(curr) [curr.next, prev, curr]=[prev, curr, curr.next];
  return prev
};
```

recursive
```js
var reverseList = function(head) {
  return reverse(head, null)
}
function reverse(head, newHead) {
  if (head===null) return newHead
  var next=head.next
  head.next=newHead
  return reverse(next, head)
}
```
