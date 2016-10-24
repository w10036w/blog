### Add 2 Numbers

You are given two linked lists representing two non-negative numbers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

**Example**
```
Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
Output: 7 -> 0 -> 8
```
**Analyze**

The question tests the understanding of LinkedList.

**Solution**

_Javascript 1 (recommended)_

> Inspired by https://github.com/paopao2/leetcode-js/blob/master/Add%20Two%20Numbers.js

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 * this.val = val;
 * this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode} 
 */
//perf a bit lower than origin since extra ?...:...
var addTwoNumbers = function(l1, l2) {
  var val=0, node, head, tail;
  while(l1 || l2){
    if(l1) {
      val += l1.val;
      l1 = l1.next;
    }
    if(l2) {
      val += l2.val;
      l2 = l2.next;
    }
    node = new ListNode(val%10);
    head ? tail = tail.next = node
    : head = tail = node;
    val = val >= 10 ? 1 : 0;
  }
  if(val>0){
    node = new ListNode(1);
    tail.next = node;
  }
  return head;
};
```
_Java

> Inspired by: https://github.com/leetcoders/LeetCode-Java/blob/master/AddTwoNumbers.java

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *   int val;
 *   ListNode next;
 *   ListNode(int x) { val = x; }
 * }
 */
public class Solution {
  public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
    ListNode startNode = new ListNode(0);
    ListNode current = startNode;
    int val = 0;
    while (l1 != null || l2 != null || val != 0) {
      if(l1 != null) {
        val += l1.val;
        l1 = l1.next;
      }
      if(l2 != null) {
        val += l2.val;
        l2 = l2.next;
      }
      ListNode node = new ListNode(val%10);
      val /= 10;
      current.next = node;
      current = current.next;
    }
    return startNode.next;
  }
}
```


