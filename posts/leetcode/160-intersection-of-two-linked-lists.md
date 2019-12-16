## [160. Intersection of Two Linked Lists](https://leetcode.com/problems/intersection-of-two-linked-lists/)

Write a program to find the node at which the intersection of two singly linked lists begins.

For example, the following two linked lists:

best solu: there is no circle in each list
```js
var getIntersectionNode = function(headA, headB) {
  if (!headA || !headB) return null
  var a = headA
  var b = headB
  while (a!==b) {
    a = a ? a.next : headB
    b = b ? b.next : headA
  }
  return a
}
```
solution 1: change to 142. cycle-ii
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
  if (!headA || !headB) return null
  var p1 = headA
  while (p1.next) p1 = p1.next;
  p1.next = headA
  var ps = headB
  var pf = headB
  while (pf && pf.next) {
    pf = pf.next.next
    ps = ps.next
    if (pf === ps) break;
  }
  if (!pf || !pf.next) {
    p1.next = null
    return null
  }
  ps = headB
  while (ps!==pf) {
    ps = ps.next
    pf = pf.next
  }
  p1.next = null
  return ps
};
```
solution 2:
> find len(a) len(b), longer - shorter = unsharedLength, start
```js
var getIntersectionNode = function(headA, headB) {
  if (!headA || !headB) return null
  function gLen(p) {
    var l = 0
    while (p) {
      l++; p = p.next
    }
    return l
  }
  function gCross(p1, p2) {
    while (p1 && p2) {
      if (p1===p2) return p1
      p1 = p1.next
      p2 = p2.next
    }
    return null
  }
  var la = gLen(headA), lb = gLen(headB), p1 = headA, p2 = headB
  if (la > lb) for(var i=0;i<la-lb;i++) p1 = p1.next;
  else for(var i=0;i<lb-la;i++) p2 = p2.next;
  return gCross(p1, p2)
}
```
solution3: use `Set()` to store Node
```js
var getIntersectionNode = function(headA, headB) {
  if (!headA || !headB) return null
  let i = 0
  const set = new Set()
  var p = headA
  while(p) {
    set.add(p)
    p = p.next
  }
  p = headB
  while (!set.has(p)) p = p.next
  return null
}
```
