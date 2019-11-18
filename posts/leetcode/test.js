/**
 * @param {number[]} height
 * @return {number}
 */
var fn = function(height) {
  let result = 0
  let leftHigher
  let l = 0
  let r = height.length - 1
  while(r>l) {
      leftHigher = height[l]>=height[r]
      result = Math.max((leftHigher?height[r]:height[l])*(r-l), result)
      if(leftHigher) {
          r--
      } else {
          l++
      }
  }
  return result
};
// test
const test = [1,8,6,2,5,4,8,3,7]

console.log(fn(test))