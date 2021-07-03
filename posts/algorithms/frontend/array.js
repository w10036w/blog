/**
 * @description 
 * ? array 相关前端题目集锦
 * 
 * @format fn = function
 * @format t = test case
 * @returns  console.log(fn(t))
 */

/**
 * ? 取重复出现的数字
 */
// function fn(arr) {
//   var m=new Map()
//   var res = []
//   arr.forEach(e => {
//     if (m.get(e)===1) {
//       res.push(e)
//     }
//     m.set(e, (m.get(e)||0) +1)
//   })
//   return res
// }

// const t = [1,2,2,2,4,5,6,7,4,1,1,1,1,1]
// ! end

/**
 * ? 取 出现最多次的数字
 */
// function fn(arr) {
//   var m=new Map()
//   var maxOccur = 0
//   var idx = -1
//   arr.forEach((e, i) => {
//     var tmpmax = (m.get(e)||0) +1
//     m.set(e, tmpmax)
//     if (tmpmax>maxOccur) {
//       maxOccur = tmpmax
//       idx = i
//     }
//   })
//   if (idx===-1) return null // arr.length===0
//   return arr[idx]
// }

// const t = [1,2,2,2,4,5,6,7,4,1,1,1,1,1]
// ! end

/**
 * ? 输入一个正数N, 输出所有和为N的连续正数序列. 
 * ? 输入 15
 * ? 结果: [[1, 2, 3, 4, 5], [4, 5, 6], [7, 8]].
 */
// function fn(n) {
//   var i=2, res=[]
//   while(i*(i-1)/2<n) {
//     var tmp = n- i*(i-1)/2
//     if (tmp%i===0) {
//       var start = tmp/i
//       var arr = new Array(i).fill(start).map((e, i) => e+i)
//       res.push(arr)
//     }
//     i++
//   }
//   return res
// }

// const t = 15
// ! end



/**
 * ? 实现一个 lodash range, 
 * ? e.g. range(1, 5) = [1,2,3,4]
 * ? e.g. range(5) = [0,1,2,3,4]
 */
function fn(s, e, d) {
  var start=s, end = e, dist=d
  if (typeof d!=='number') {
    dist = 1
  }
  if (typeof e!=='number') {
    start = 0
    end = s
  }
  console.log(start, end, d,dist)
  const len = Math.floor(end-start)/dist
  return new Array(len).fill(start).map((e, i) => e+i*dist)
}
let t = 0
// ! end

console.log(fn(0,30)) // ? 