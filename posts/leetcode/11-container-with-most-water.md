# [11. Container with most water](https://leetcode.com/problems/container-with-most-water/)

> My Solution (double pointers)
>
> 2019-11-19

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
