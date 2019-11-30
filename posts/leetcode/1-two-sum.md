# Two Sum

Given an array of integers, return **indices** of the two numbers such that they add up to a specific target.

You may assume that each input would have **_exactly_** one solution.

## Example

>Given nums = [2, 7, 11, 15], target = 9,<br>
Because nums[0] + nums[1] = 2 + 7 = 9,<br>
return [0, 1].

## Solution

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
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
```

```py
class Solution():
  def twoSum(self):
  """
  :type nums: List[int]
  :type target: int
  :rtype: List[int]
  """
  nums = [2,3,4,5,6,7,8]
  target = 9
  look_for = {}
  for n, x in enumerate(nums):
    try:
      return look_for[x], n
    except KeyError:
      look_for.setdefault(target - x, n)
```
