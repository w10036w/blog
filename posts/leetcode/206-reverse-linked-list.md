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
  let [prev, curr]=[null, head]
  while(curr) [curr.next, prev, curr]=[prev, curr, curr.next];
  return prev
};
```
笨递归 每次记终点和前一个, 断开前一个, 终点next 指向前一个, 循环 O(n^2)
```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
  if (!head) return null
  if (!head.next) return head
  var last=head, prev=null, tmp=last.next
  while (tmp) {
    // if (prev && !prev.next) prev.next=last
    prev=last
    last=last.next
    tmp = last.next
    last.next=prev
    prev.next=null
  }
  return last
}
```
