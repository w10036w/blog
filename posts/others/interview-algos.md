# interview algo question collection

## calculate min integer unoccured

```bash
Write a function:

function solution(A);

that, given an array A of N integers, returns the smallest positive integer (greater than 0) that does not occur in A.

For example, given A = [1, 3, 6, 4, 1, 2], the function should return 5.

Given A = [1, 2, 3], the function should return 4.

Given A = [−1, −3], the function should return 1.

Write an efficient algorithm for the following assumptions:

N is an integer within the range [1..100,000];
each element of array A is an integer within the range [−1,000,000..1,000,000].
```

```js
function solution(A) {
    // write your code in JavaScript (Node.js 8.9.4)
    const n = A.length
    for(let i=0;i<n;i++) {
        if(A[i]===i+1) continue;
        if (A[i]<=0 || A[i]>n || A[A[i]-1]===A[i]) A[i] = 0;
        else {
            [ A[A[i]-1], A[i] ] = [ A[i], A[A[i]-1] ];
            i--;
        }
    }
    for(let i=0;i<n;i++) {
        if (A[i]===0) return i+1
    }
    return n+1
}
```


## Get the min sum of K times operated array

```bash
given an numeric array, 1<size<10^5 and k,  1< k < 100,

pick an element, divided by 2, then calculate the ceil, then put back to the array
operate K times
return the minimum sum of the operated array

e.g. [20,10,7], 4 -> 
1. [10, 10, 7]
1. [5, 10, 7]
1. [5, 5, 7]
1. [5, 5, 4]
-> 5+5+4
```

```js
function sumMinKOperation(num, k) {
  // quick select the largest k numbers
  num.sort((a,b) => b-a) // quick sort
  const p = num.slice(0, k)


  for(let i=0;i<k;i++) {
    p[0] = Math.ceil(p[0]/2)
    // p.sort((a,b) => b-a)
    for(let j=1;j<k;j++) {
      if (p[0]<p[j]) {
        [ p[0], p[j] ] = [ p[j], p[0] ]
      } else break;
    }
  }
  let sum = 0
  for(let i=0;i<num.length;i++) {
    if (i<k) sum+=p[i]
    else sum+=num[i]
  }
  return sum
}

// test
// const num = [20,10, 7]

// const k = 4

// console.log( sumMinKOperation(num, k) )
```
