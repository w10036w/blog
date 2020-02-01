// https://juejin.im/entry/59390887ac502e006b169ae1
// node v12
// normal for: 11.735ms
// reverse for: 19.344ms
// while: 12.477ms
// for-in: 958.370ms
// for each: 141.550ms
// device's device: 13.692ms

var number = 100000;//array大小
var iteranum = 100;//迭代次数
var array = [];
for (let i = 0; i < number; i++) {
  array[i] = i + 1;
}

//test cicle 
var len = array.length;
//正常for循环
console.time('normal for');
for (let k = 0; k < iteranum; k++) {
  for (let i = 0; i < len; i++) {
    array[i] + 1;
  }
}

console.timeEnd('normal for');

//倒序for循环
console.time('reverse for');
for (let k = 0; k < iteranum; k++) {
  for (let i = len - 1; i--;) {
    array[i] + 1;
  }
}
console.timeEnd('reverse for');

//while循环
console.time('while');
for (let k = 0; k < iteranum; k++) {
  let i = 0;
  while (i < len) {
    array[i] + 1;
    i++;
  }
}
console.timeEnd('while');

//for-in循环
console.time('for-in');
for (let k = 0; k < iteranum; k++) {
  for (let i in array) {
    array[i] + 1;
  }
}
console.timeEnd('for-in');

//for each 循环
console.time("for each");
for (let k = 0; k < iteranum; k++) {
  array.forEach(function (e) {
    e + 1;
  });
}
console.timeEnd("for each");

//duff's device 循环
console.time("duff's device");
for (let k = 0; k < iteranum; k++) {
  let j = len % 8;
  let templen = len - 1;
  while (j) {
    j--;
    array[templen--] + 1;
  }

  j = Math.floor(len / 8);

  while (j) {
    j--;
    array[templen--] + 1;
    array[templen--] + 1;
    array[templen--] + 1;
    array[templen--] + 1;
    array[templen--] + 1;
    array[templen--] + 1;
    array[templen--] + 1;
    array[templen--] + 1;
  }
}
console.timeEnd("duff's device");