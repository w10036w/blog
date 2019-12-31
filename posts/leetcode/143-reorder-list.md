## [143. Reorder List](https://leetcode.com/problems/reorder-list/)
> bytedance,

Given a singly linked list L: L0→L1→…→Ln-1→Ln,
reorder it to: L0→Ln→L1→Ln-1→L2→Ln-2→…

You may not modify the values in the list's nodes, only nodes itself may be changed.

Example 1:
```js
Given 1->2->3->4, reorder it to 1->4->2->3.
```
Example 2:
```js
Given 1->2->3->4->5, reorder it to 1->5->2->4->3.
```

## solution
```js
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function(head) {
  if (!head || !head.next) return head
  var s=null, f=head
  while(f&&f.next) {
    s=s?s.next:head
    f=f.next.next
  }
  if (f) s=s.next
  var h2 = reverse(s.next), h1=head
  s.next=null
  while(h2){
    [h1.next, h2.next, h1, h2]=[h2, h1.next, h1.next, h2.next]
  }
  return head
}

function reverse(head) {
  let [prev, curr]=[null, head]
  while(curr) [curr.next, prev, curr]=[prev, curr, curr.next];
  return prev
}
```
