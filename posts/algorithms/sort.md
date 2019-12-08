
```js
function quickSort(arr) {
  let [len, pivot, l, r, i] = [arr.length, arr[0], [], [], 0]
  if(len<=1) return arr;
  while(++i<len) (arr[i]<pivot ? l : r).push(arr[i]))
  return [...quickSort(l), pivot, ...quickSort(r)]
}
function quickSort(arr) {
  let [len, pivot, l, r, i] = [arr.length, arr[0], [], [], 0]
  const swap = (m, n) => ([arr[m], arr[n]] = [arr[n], arr[m]])

}

```
