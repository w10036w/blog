## [122. Best Time to Buy and Sell Stock II](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/)
Say you have an array for which the ith element is the price of a given stock on day i.

Design an algorithm to find the maximum profit. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times).

Note: You may not engage in multiple transactions at the same time (i.e., you must sell the stock before you buy again).

Example 1:
```js
Input: [7,1,5,3,6,4]
Output: 7
Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.
             Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.
```
Example 2:
```js
Input: [1,2,3,4,5]
Output: 4
Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
             Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are
             engaging multiple transactions at the same time. You must sell before buying again.
```
Example 3:
```js
Input: [7,6,4,3,1]
Output: 0
Explanation: In this case, no transaction is done, i.e. max profit = 0.
```
My solution

```js
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  if (prices.length<2) return 0
  var r=0, b=prices[0]
  for(var i=1;i<prices.length;i++) {
    if(prices[i-1]>prices[i]) { // 一旦下跌, 立刻在 i-1 卖出 在 i 买入
      r += Math.max(0, prices[i-1]-b)
      b = prices[i]
    } else if (i===prices.length-1) {  // 最后一天还在涨, 但必须卖掉
      r += prices[i]-b
    }
  }
  return r
};
```
只要还在上涨就累加利润, 一旦下跌立刻卖出
```js
var maxProfit = function(prices) {
  var r=0, i=0
  while(++i<prices.length) r+=Math.max(0, prices[i]-prices[i-1])
  return r
};
```
