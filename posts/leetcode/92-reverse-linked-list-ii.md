## [92. Reverse Linked List II](https://leetcode.com/problems/reverse-linked-list-ii)
> medium,

Reverse a linked list from position m to n. Do it in one-pass.

Note: `1 ≤ m ≤ n ≤ length` of list.

Example:
```js
Input: 1->2->3->4->5->NULL, m = 2, n = 4
Output: 1->4->3->2->5->NULL
```

## Solution
- add a dummy pref to consider `m = 1`, return pref.next
- if `head === null` or `m === n`, do nothing and return

```js
/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
var reverseBetween = function(head, m, n) {
  if (!head || m===n) return head
  var pref=new ListNode(), dist=n-m+1, step=0, prev=pref
  pref.next=head
  while(++step<m) prev=prev.next
  var curr=prev.next, preHead=prev, subTail=curr
  prev=null
  while(dist) {
    [curr.next, prev, curr]=[prev, curr, curr.next]
    dist--
  }
  preHead.next=prev // prev is the new head of the sub-list
  subTail.next=curr // curr is the new postTail
  return pref.next
};
```
