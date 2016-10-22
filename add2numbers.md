### Add 2 Numbers

You are given two linked lists representing two non-negative numbers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

Input: \(2 -&gt; 4 -&gt; 3\) + \(5 -&gt; 6 -&gt; 4\)Output: 7 -&gt; 0 -&gt; 8

**Solution**

_Javascript_

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
var addTwoNumbers = function(l1, l2) {
 var arr1 = [], arr2 = [], result = [];
 while(l1){
   arr1.unshift(l1.val);
   l1 = l1.next;
 }
 while(l2){
   arr2.unshift(l2.val);
   l2 = l2.next;
 }
 var i = 0, c=0, d=0;
 while(arr1.length || arr2.length || d==1) {
   var a = arr1.pop();
   a = a?a:0;
   var b = arr2.pop();
   b = b?b:0;
   c = (a+b+d)%10;
   d = (a+b+d)>=10?1:0;
   result.unshift(c);
 }
 return result.reverse();
};
```
_Python_

