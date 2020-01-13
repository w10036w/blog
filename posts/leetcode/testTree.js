function TreeNode(val, left=null, right=null) {
  this.val=val;
  this.left=left;
  this.right=right
}

var fn = function(root) {
  var res=[]
  dfs(root)
  res.forEach(e => print(e))

  var dfs=function(n, lvl=0) {
    if (!n) return
    if (!res[lvl]) res[lvl]=[n.val]
    else res[lvl].push(n.val)
    dfs(n.left, lvl+1)
    dfs(n.right, lvl+1)
  }
}

var print=console.log


const arr2tree = arr => {

}
const arr2bst = arr => {
  // arr.sort((a,b) =>a-b)
  var i=0, ROOT
  var left=new TreeNode(arr[i])
  var root=new TreeNode(i+1)
  var right=new TreeNode(i+2)
  root.left=left
  root.right=right
  visit(root)
  function visit(node) {

  }
  return root
}
const arrs2trees = arrs => arrs.map(e => arr2tree(e))

const tree2arr = root => {

}
const bst2arr = root => {

}

const input = [1,2,3,4,5]
const treefy = arr2bst(input)
const output = fn(treefy)

console.log(bst2arr(output))
