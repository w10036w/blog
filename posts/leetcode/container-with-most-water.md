# [Container with most water](https://leetcode.com/problems/container-with-most-water/)

> My Answer (double pointers)<br>
> Runtime: 52 ms, faster than 96.22% of JavaScript online submissions for Container With Most Water.<br>
> Memory Usage: 35.6 MB, less than 48.48% of JavaScript online submissions for Container With Most Water.

beat the [solution](https://github.com/Hongbo-Miao/leetcode/blob/master/JavaScript/0011.%20Container%20With%20Most%20Water.js) for caching but higher memory.

>Runtime: 72 ms, faster than 43.06% of JavaScript online submissions for Container With Most Water.<br>
Memory Usage: 35.4 MB, less than 93.94% of JavaScript online submissions for Container With Most Water.

```js
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let result = 0
    let leftHigher
    let l = 0
    let r = height.length - 1
    while(r>l) {
        leftHigher = height[l]>=height[r]
        result = Math.max((leftHigher?height[l]:height[r])*(r-l), result)
        if(leftHigher) r--
        else l++
    }
    return result
};
```
