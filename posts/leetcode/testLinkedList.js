function ListNode(val) {
    this.val = val;
    this.next = null;
}

var fn = function() {
  
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

const input = [[1,4,5],[1,3,4],[2,6]]
const output = fn(inputs2Lists(input))

console.log(output2List(output))
