# interview - sort

## Quick Sort

best

- 记录一个索引l从数组最左侧开始，记录一个索引r从数组右侧开始
- 在 `l<r` 的条件下，找到右侧小于 target 的值 array[r], 并将其赋值到 array[l]
- 在 `l<r` 的条件下，找到左侧大于target的值 array[l], 并将其赋值到 array[r]
- 这样让 `l=r` 时，左侧的值全部小于target，右侧的值全部小于target，将target放到该位置

```js
// easy, space-consuming
function quickSort(arr) {
  let [len, pivot, l, r, i] = [arr.length, arr[0], [], [], 0]
  if(len<=1) return arr;
  while(++i<len) (arr[i]<pivot ? l : r).push(arr[i]))
  return [...quickSort(l), pivot, ...quickSort(r)]
}
// best
function quickSort(arr, l=0, r=arr.length-1) {
  if (l>=r) return // FORGET
  var p = arr[l], il=l, ir=r
  while (il<ir) {
    while(il<ir && arr[ir]>=p) ir--
    arr[il] = arr[ir]
    while(il<ir && arr[il]< p) il++
    arr[ir] = arr[il]
  }
  arr[il] = p
  quickSort(arr, l, il-1)
  quickSort(arr, il+1, r)
  return arr // or no need to return since it mutates original array
}
// 非递归
function quickSort(arr, l=0, r=arr.length-1) {
  const stack = [[l, r]]
  while(stack[0]) {
    const [l, r] = stack.pop()
    if (l>=r) continue;
    let [il, ir] = [l, r]
    const p = arr[il]
    while (il<ir) {
      while(il<ir && arr[ir]>=p) ir--
      arr[il] = arr[ir]
      while(il<ir && arr[il]< p) il++
      arr[ir] = arr[il]
    }
    arr[il] = p
    stack.push([l, il-1], [il+1, r])
  }
  return arr
}
```

## Merge Sort

> 参考 [ConardLi](https://github.com/ConardLi/awesome-coding-js/blob/master/%E7%AE%97%E6%B3%95%E5%88%86%E7%B1%BB/%E6%8E%92%E5%BA%8F/%E5%BD%92%E5%B9%B6%E6%8E%92%E5%BA%8F.md)

分割：

- 将数组从中点进行分割，分为左、右两个数组
- 递归分割左、右数组，直到数组长度小于2

归并 (治理)

- 如果需要合并，那么左右两数组已经有序了。
- 创建一个临时存储数组temp，比较两数组第一个元素，将较小的元素加入临时数组
- 若左右数组有一个为空，那么此时另一个数组一定大于temp中的所有元素，直接将其所有元素加入temp

```js

// best
function mergeSort(arr, l=0, r=arr.length-1) {
  if (l>=r) return arr; // !!! not return nothing
  var m=(l+r)>>1
  mergeSort(arr, l, m)
  mergeSort(arr, m+1, r)
  merge(arr, l, m, r)
  return arr
}
function merge(arr, l, m, r) {
  var tmp=[], il=l, ir=m+1, i=0
  while (il<=m && ir<=r) {
    if (arr[il]<arr[ir]) tmp[i++]=arr[il++]
    else tmp[i++]=arr[ir++]
  }
  while(il<=m) tmp[i++]=arr[il++]
  while(ir<=r) tmp[i++]=arr[ir++]
  i=0
  for(var j=l; j<=r; j++) arr[j]=tmp[i++]
}
// easy, space-consuming
function mergeSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  const m = arr.length>>1;
  const arr1 = arr.slice(0, m);
  const arr2 = arr.slice(m);
  return merge(mergeSort(arr1), mergeSort(arr2));
}
function merge(arr1, arr2) {
  const temp = [];
  while (arr1.length && arr2.length) {
    if (arr1[0]<arr2[0]) temp.push(arr1.shift())
    else temp.push(arr2.shift())
  }
  return [...temp, ...arr1, ...arr2]
}
```

## Heap Sort 堆排序

- 创建一个大顶堆，大顶堆的堆顶一定是最大的元素
- 交换第一个元素和最后一个元素，让剩余的元素继续调整为大顶堆
- 从后往前以此和第一个元素交换并重新构建，排序完成
