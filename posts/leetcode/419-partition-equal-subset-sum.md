## [416. Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum/)

Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent.<br>
A mapping of digit to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

```js
Input: "23"
Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
```

### Note
Although the above answer is in lexicographical order, your answer could be in any order you want.

<details>
<summary>hint</summary>
dp

transition:<br>
2d: f(n, sum) = f(n-1, sum) || f(n-1, sum-nums[i])<br>
1d: f(sum) = f(sum) \<previous sum\> || f(sum-nums[i])<br>

</details>

```js
var fn = function (nums) {
  if (nums.length <= 1) return false
  const len = nums.length
  let sum = 0
  for (let i=0;i<len;i++) {
    sum += nums[i]
  }
  if (sum&1===1) return false
  sum /= 2

  // dp - 1d
  const dp = new Array(sum+1)
  dp[0] = true;
  for (let n = 0; n<len; n++) {
    const num = nums[n]
    for (let i = sum; i > 0; i--) {
      if (i >= num) {
        dp[i] = dp[i] || dp[i-num];
      }
    }
  }
  return dp[sum] || false
  
  // dp - 2d
  // const dp = (new Array(len+1)).fill([])
  // dp[0][0] = true

  // for (let i = 1; i< len+1; i++) {
  //   dp[i][0] = true
  // }
  // for (let i = 1; i< sum+1; i++) {
  //   dp[0][i] = false
  // }

  // for (let i = 1; i< len+1; i++) {
  //   for (let j = 1; j< sum+1; j++) {
  //     dp[i][j] = dp[i-1][j]
  //     if (j >= nums[i-1]) dp[i][j] = (dp[i][j] || dp[i-1][j-nums[i-1]]);
  //     else dp[i][j] = dp[i-1][j]
  //   }
  // }
  // return dp[len-1][sum]
};
```
