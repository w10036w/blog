## [53. Maximum Subarray](https://leetcode.com/problems/maximum-subarray/)
Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

Example:

```js
Input: [-2,1,-3,4,-1,2,1,-5,4],
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.
```

Follow up:

If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.

[reference](https://leetcode.com/problems/maximum-subarray/discuss/20193/DP-solution-and-some-thoughts)

<details>
<summary>hint</summary>
粘连型一维 dp[], 需要在子问题多一层转化<br>

<b>最优解</b> 为 最大值<br>
<b>子函数</b> dp[i] 构成为 前i个以nums[i]结尾的数组(例: i=2时, dp[i] 代表以-3 为最终数的所有数组[-2, 1, -3], [1, -3], [-3]的最优解)<br>

<b>关系式</b>为<br>
dp[i] = nums[i] + Math.max(dp[i-1],0)<br>

<b>首项</b>为<br>
dp[0] = nums[0]

<b>限制条件</b>已包含在分解子函数中, 无<br>

然后 在所有解 `dp[]` 中搜索最优解(可与一维dp数组同步循环进行), 搜索结果即为最终解<br>
</details>

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  const len = nums.length
  const dp = new Array(len)
  dp[0] = nums[0]
  let max = dp[0]
  for (let i=1; i<len; i++) {
    dp[i] = nums[i] + Math.max(dp[i-1],0)
    max = Math.max(max, dp[i])
  }
  return max
};
```
