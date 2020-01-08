# Permutation 排列类问题
可用 回溯, 动态规划解决

## 购买商品组合
> 自[小红书](https://www.coordinate.wang/index.php/archives/2592/#directory0097503885018403121) 原创改编

要求: 尽可能多地用完钱
输入: 总金额, 各商品价格(未排序, 各不相同)
输出: 所有购买方式

```js
I: 10, [5, 3, 2]
O: [
  [ 2, 2, 2, 2, 2 ],
  [ 2, 2, 2, 3 ],
  [ 2, 2, 3, 3 ],
  [ 2, 2, 5 ],
  [ 2, 3, 5 ],
  [ 3, 3, 3 ],
  [ 5, 5 ]
]

I: 11, [3,2,5]
O: [
  [ 2, 2, 2, 2, 2 ],
  [ 2, 2, 2, 2, 3 ],
  [ 2, 2, 2, 5 ],
  [ 2, 2, 3, 3 ],
  [ 2, 3, 3, 3 ],
  [ 2, 3, 5 ],
  [ 3, 3, 5 ],
  [ 5, 5 ]
]
```
回溯
```js
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number[[]]}
 */
var fn=function(target, nums) {
  nums.sort((a,b)=>a-b)
  var res=[], min=nums[0]
  bs(0, target, [])
  return res
  function bs(p, target, tmp) {
    if(target===0) return res.push([...tmp])
    for(var i=p;i<nums.length;i++) {
      if (target-nums[i]>=0) {
        tmp.push(nums[i])
        bs(i, target-nums[i], tmp)
        tmp.pop()
      } else {
        if (target-min<0) {
          res.push([...tmp])
          break;
        }
      }
    }
  }
}
```
动规 TODO
```js
var fn=function(target, nums) {

}
```
