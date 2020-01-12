## [445. Add Two Numbers II](https://leetcode.com/problems/add-two-numbers-ii/)
> medium, linked_list,

You are given two non-empty linked lists representing two non-negative integers. The most significant digit comes first and each of their nodes contain a single digit. Add the two numbers and return it as a linked n.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Follow up:
What if you cannot modify the input lists? In other words, reversing the lists is not allowed.

Example:
```js
Input: (7 -> 2 -> 4 -> 3) + (5 -> 6 -> 4)
Output: 7 -> 8 -> 0 -> 7
```

## solution
stack + carry digit + move pointer
```js
var addTwoNumbers = function(l1, l2) {
  let s1 = [], s2 = [], sum = 0;
  while (l1) {
    s1.push(l1.val);
    l1 = l1.next;
  }
  while (l2) {
    s2.push(l2.val);
    l2 = l2.next;
  }
  let curr = new ListNode(null);
  while (s1.length || s2.length) {
    if (s1.length) sum += s1.pop();
    if (s2.length) sum += s2.pop();
    curr.val = sum % 10;
    const temp = Math.floor(sum/10);
    const n = new ListNode(temp);
    n.next = curr;
    curr = n;
    sum = temp;
  }
  if (curr.val === 0) return curr.next;
  return curr;
}
```

give up...
```js
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  const sum = (helper(l1) + helper(l2)).toString();
  let dummy = new ListNode(-1);
  let res = dummy;
  for (let char of sum) {
    let node = new ListNode(Number(char));
    dummy.next = node;
    dummy = dummy.next;
  }
  return res.next;
};

const helper = n => {
  let result = '';
  while(n) {
    result += n.val;
    n = n.next;
  }
  return BigInt(result);
}
```
