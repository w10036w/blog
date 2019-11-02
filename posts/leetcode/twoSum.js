// Given an array of integers, return indices of the two numbers such that they add up to a specific target.
//
// You may assume that each input would have exactly one solution, and you may not use the same element twice.
//
// Example:
//
// Given nums = [2, 7, 11, 15], target = 9,
//
// Because nums[0] + nums[1] = 2 + 7 = 9,
// return [0, 1].
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

function twoSum(nums, target) {
  const memo = []
  let res
  nums.some((e, i) => {
    const match = memo.some((em, index) => {
      if (em[1] === e) {
        res = [index, i]
        return true
      }
    })
    if (match) return true
    const diff = target - e
    memo.push([i, diff])
  })
  return res
}
// exp: use {} to store key-value pair
// improved:
function twoSum(nums, target) {
  const memo = {}
  const l = nums.length
  let i = 0
  while (i<l) {
    const diff = target-nums[i]
    if (typeof memo[diff] === 'number') {
      return [memo[diff], i]
    }
    memo[nums[i]] = i
    i++
  }
}
// test
console.log(twoSum([8,7,11,15,0,10,9], 9))