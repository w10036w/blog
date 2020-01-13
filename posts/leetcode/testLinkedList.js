function ListNode(val) {
    this.val = val;
    this.next = null;
}
const input2List = arr => {
  var head = new ListNode(arr.shift())
  var node = head
  for (var i=0; i<arr.length;i++) {
    node.next=new ListNode(arr[i])
    node = node.next
  }
  return head
}
const inputs2Lists = arrs => arrs.map(e => input2List(e))
const output2List = head => {
  var arr=[]
  while (head) {
    arr.push(head.val)
    head=head.next
  }
  return arr
}



var reverseKGroup = function(head, k) {
  var tmp=head
  for(var i=1;i<k&&tmp;i++) tmp=tmp.next
  if (!tmp) return head // if rest.length<k, do nothing
  var next=tmp.next
  tmp.next=null
  var newHead=reverse(head)
  var newNext=reverseKGroup(next, k)
  head.next=newNext
  return newHead
};
function reverse(head) {
  var pre=null, cur=head
  while(cur) [cur.next, pre, cur]=[pre, cur, cur.next]
  return pre
}



const input = [
  [[1,2,3,4,5], 2],
]
const table={}
const flow = e => JSON.stringify(output2List(reverseKGroup(input2List(e[0]), e[1])))
const output = input.forEach(e => {
  table[JSON.stringify(e)] = flow(e)
})


console.table(table)
