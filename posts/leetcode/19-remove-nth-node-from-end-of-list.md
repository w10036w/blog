# [19. Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)

Given a linked list, remove the n-th node from the end of list and return its head.

Example:
```js
Given linked list: 1->2->3->4->5, and n = 2.

After removing the second node from the end, the linked list becomes 1->2->3->5.
```
Note:

Given n will always be valid.

BEST solution (2 pointers + combine 2 while loops)
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
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
  let counter = 0;
  let toEnd = 0;
  
  let iter = head;
  let toRemove = null;
  let prev = null;
  
  if(head.next === null) {return null}
  
  while(iter) {
      if (counter === n) {
          prev = head;
          toRemove = head.next;
      } else if (counter > n){
          toRemove = toRemove.next;
          prev = prev.next;
      }
      iter = iter.next;
      counter++;
  }
  if(prev === null) head = head.next;
  else if(toRemove.next !==null) prev.next  = toRemove.next;
  else prev.next = null;
  return head;
}
```

MY solution:
```js
var removeNthFromEnd = function(head, n) {
  // 2 pointers
  if (!head || !head.next) return null
  let i = -1
  let start = new ListNode()
  start.next = head
  let fast = start
  let slow = start
  while (fast && ++i<n) {
    fast = fast.next
  }
  while (fast.next) {
    fast = fast.next
    slow = slow.next
  }
  slow.next = slow.next.next
  return start.next

  // original
  // let i = -1
  // let cur = head
  // let pre, nxt
  // const arr = []
  // while(cur) {
  //   arr[++i] = cur
  //   cur = cur.next
  // }
  // const l = arr.length;
  // if (l<n) return null;
  // if (l===n) return head.next;
  // [pre, nxt] = [ arr[l-n-1], arr[l-n+1] ]
  // pre.next = nxt
  
  // return head
};
```
