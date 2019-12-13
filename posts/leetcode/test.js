var fn = function(num) {
  const res = []
  function dfs(n, hrs, mins, p) {
    if (hrs>=12 || mins>59) return
    if (n===0) return res.push(`${hrs}:${mins>9?mins:'0'+mins}`)
    for (let i=p;i<10;i++) {
      if (i<4) dfs(n-1, hrs+(1<<i), mins, i+1)
      // if (i<4) dfs(n-1, hrs+Math.pow(2, i), mins, i+1)
      else dfs(n-1, hrs, mins +(1<<(i-4)), i+1)
    }
  }
  dfs(num, 0, 0, 0)

  return res.sort()
};

const test = 4
// const test = [1,2,3,4,7]

const res = fn(test)
console.log(res)

// deb = function (fn, wait, immediate) {
//   var timeout

//   return function() {
//     var context = this
//     var args = arguments

//     var later = function() {
//       timeout = null
//       if (!immediate) fn.apply(context, args)
//     }
//     var callNow = immediate && !timeout
//     clearTimeout(timeout)
//     timeout = setTimeout(later, wait)
//     if (callNow) fn.apply(context, args)
//   }
// }

// throttle = function (fn, wait, options) {
//   var context, args, result
//   var later = function() {

//   }

//   var throttled = function () {

//   }

//   throttled.cancel = function () {

//   }

//   return throttled
// }

// Function.prototype._bind = function () {
//   var slice = Array.prototype.slice
//   var thatFunc = this, thatArg = arguments[0]
//   var args = slice.call(arguments, 1)
//   if (typeof thatFunc !== 'function') {
//     throw new Error()
//   }

//   return function () {
//     var thisArgs = args.concat(slice.call(arguments))
//     return thatFunc.apply(thatArg, thisArgs)
//   }
// }


//  // 观察者
// class Observer {
//   constructor() { }
//   update(val) {
//     //
//   }
// }
// // 观察者列表
// class ObserverList {
//   constructor() {
//     this.observerList = []
//   }
//   add(observer) {
//     return this.observerList.push(observer);
//   }
//   remove(observer) {
//     this.observerList = this.observerList.filter(ob => ob !== observer);
//   }
//   count() {
//     return this.observerList.length;
//   }
//   get(index) {
//     return this.observerList(index);
//   }
// }
// // 目标
// class Subject {
//   constructor() {
//     this.observers = new ObserverList();
//   }
//   addObserver(observer) {
//     this.observers.add(observer);
//   }
//   removeObserver(observer) {
//     this.observers.remove(observer);
//   }
//   notify(...args) {
//     let obCount = this.observers.count();
//     for (let index = 0; index < obCount; index++) {
//       this.observers.get(i).update(...args);
//     }
//   }
// }