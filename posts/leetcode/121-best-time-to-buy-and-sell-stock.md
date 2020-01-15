## [121. Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock)
Say you have an array for which the ith element is the price of a given stock on day i.

If you were only permitted to complete at most one transaction (i.e., buy one and sell one share of the stock), design an algorithm to find the maximum profit.

Note that you cannot sell a stock before you buy one.

Example 1:
```js
Input: [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.

Not 7-1 = 6, as selling price needs to be larger than buying price.
```
Example 2:
```js
Input: [7,6,4,3,1]
Output: 0
Explanation: In this case, no transaction is done, i.e. max profit = 0.
```
## solution

Kadane's Algorithm from [here](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/discuss/39038/Kadane's-Algorithm-Since-no-one-has-mentioned-about-this-so-far-:)-(In-case-if-interviewer-twists-the-input)/36808)
> All the straight forward solution should work, but if the interviewer twists the question slightly by giving the difference array of prices, Ex: for {1, 7, 4, 11}, if he gives {0, 6, -3, 7}, you might end up being confused.

```js
var maxProfit = function(prices) {
  var r=0, i=0, min=prices[0]
  while (++i<prices.length) {
    r = Math.max(r, prices[i]-min)
    min = Math.min(prices[i], min)
  }
  return r
}
```

DP
```js
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  var len = prices.length
  if (!len || len===1) return 0
  var min=prices[0]
  var m = [0]
  for(var i=1; i<len; i++) {
    var p = prices[i]
    m[i] = Math.max(m[i-1], p-min)
    min = Math.min(min, p)
  }
  return m[len-1]
};
```
one of fastest & save space
```js
var maxProfit = function(prices) {
  if (prices.length < 2) return 0;
  var min = prices[0];
  var profit = 0;
  for (var i=1; i<prices.length; i++) {
    var p = prices[i];
    if (p>min && p-min>profit) profit = p-min;
    else if (p<min) min = p;
  }
  return profit;
};
```
Brutal Force
```js
var maxProfit = function(prices) {
  var len = prices.length
  if (!len || len===1) return 0
  var res = 0
  for (var i=0; i<len-1; i++) {
    for (var j=i+1; j<len; j++) {
      if (prices[j]>prices[i]) res = Math.max(res, prices[j]-prices[i])
    }
  }
  return res
};
```
