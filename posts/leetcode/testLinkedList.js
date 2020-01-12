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



var fn = function([l1, l2]) {
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
    const head = new ListNode(temp);
    head.next = curr;
    curr = head;
    sum = temp;
  }
  if (curr.val === 0) return curr.next;
  return curr;
}



const input = [
  [[6,2,4,3], [5,6,4]],
]
const table={}
const flow = e => JSON.stringify(output2List(fn(inputs2Lists(e))))
const output = input.forEach(e => {
  table[JSON.stringify(e)] = flow(e)
})


console.table(table)
