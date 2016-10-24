### Two Sum

Given an array of integers, return **indices** of the two numbers such that they add up to a specific target.

You may assume that each input would have **_exactly_** one solution.

**Example:**
```
Given nums = [2, 7, 11, 15], target = 9,
Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].
```
**Solution**

*Javascript*

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
 var tmp = {};
 var result;
 nums.some(function(e, i){
   if(typeof tmp[target-e] === 'number'){
     result = [tmp[target-e], i];
     return true;
   } else {
     tmp[e] = i;
     return false;
   }
 });
 return result;
};
```

_Python_

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

