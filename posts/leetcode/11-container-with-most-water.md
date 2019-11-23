## [11. Container with most water](https://leetcode.com/problems/container-with-most-water/)
>Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of line i is at (i, ai) and (i, 0). Find two lines, which together with x-axis forms a container, such that the container contains the most water.<br>
> Note: You may not slant the container and n is at least 2.
>
> Input: [1,8,6,2,5,4,8,3,7]<br>
> Output: 49

My Solution (double pointers) @2019-11-18

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
