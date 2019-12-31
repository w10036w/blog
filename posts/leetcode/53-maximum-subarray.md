## [53. Maximum Subarray](https://leetcode.com/problems/maximum-subarray/)
> bytedance,

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

DP O(n) 原始版
```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  var res=nums[0], dp=[nums[0]]
  for(var i=1;i<nums.length;i++) {
    dp[i]=Math.max(dp[i-1]+nums[i], nums[i])
    res=Math.max(res, dp[i])
  }
  return res
};
```
省空间版
```js
var maxSubArray = function(nums) {
  var res=nums[0], prev=nums[0], next
  for(var i=1;i<nums.length;i++) {
    next=Math.max(prev+nums[i], nums[i])
    res=Math.max(res, next)
    prev=next
  }
  return res
}
```
分治法 O(nlogn) from [lucifier](https://github.com/azl397985856/leetcode/blob/master/problems/53.maximum-sum-subarray-cn.md)

数组nums以中间位置（m)分为左（left)右(right)两部分. 那么有， left = nums[0]...nums[m - 1] 和 right = nums[m + 1]...nums[n-1]

最大子序列和的位置有以下三种情况：
1. 考虑中间元素nums[m], 跨越左右两部分，这里从中间元素开始，往左求出后缀最大，往右求出前缀最大, 保持连续性。
2. 不考虑中间元素，最大子序列和出现在左半部分，递归求解左边部分最大子序列和
3. 不考虑中间元素，最大子序列和出现在右半部分，递归求解右边部分最大子序列和

分别求出三种情况下最大子序列和，三者中最大值即为最大子序列和。
```js
var maxSubArray = function(nums) {
  return maxSubArr(nums, l, nums.length-1)
}
function maxSubArr(nums, l, r) {
  if (l===r) return nums[l]
  var mid=(l+r)>>1, suml=0, sumr=0, maxl=-Infinity, maxr=-Infinity
  for (var i=mid; i>=l; i--) {
    suml+=nums[i]
    maxl=Math.max(maxl, suml)
  }
  for (var i=mid+1; i<=r; i++) {
    sumr+=nums[i]
    maxr=Math.max(maxr, sumr)
  }
  var a=maxl + maxr
  var b=maxSubArr(nums, l, mid) // KEY: NOT mid-1, or have to deal with l>r
  var c=maxSubArr(nums, mid+1, r)
  return Math.max(a, b, c)
}

```
