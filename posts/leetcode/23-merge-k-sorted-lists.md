## [23. Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)
> bytedance

Merge k sorted linked lists and return it as one sorted list. Analyze and describe its complexity.

Example:

Input:
[
  1->4->5,
  1->3->4,
  2->6
]
Output: 1->1->2->3->4->4->5->6
## solution

```js
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
  if (lists.length===0) return null
  // stack
  while(lists.length>1) {
    let [a,b]=[lists.shift(), lists.shift()]
    lists.push(mergeLists(a, b))
  }
  return lists[0]
  
  // recursive
  // if (lists.length===1) return lists[0];
  // if (lists.length===2) return mergeLists(lists[0], lists[1])
  // var m=lists.length>>1, l1=[], l2=[]
  // for(let i=0; i<m; i++) l1.push(lists[i])
  // for(let i=m; i<lists.length; i++) l2.push(lists[i])
  // return mergeLists(mergeKLists(l1), mergeKLists(l2))
};
function mergeLists(a, b) {
  const prehead=new ListNode()
  let curr=prehead
  while (a&&b) {
    if (a.val<b.val) {
      curr.next=a
      a=a.next
    } else {
      curr.next=b
      b=b.next
    }
    curr=curr.next
  }
  if(a) curr.next=a
  if(b) curr.next=b
  return prehead.next
}
```
