var fn = function(nums) {
  const len = nums.length
  if (len===1) return nums
  nums.sort((a,b)=>a-b)
  const res = []
  const used = []
  
  function bt(nums, used, len, list) {
    const l = list.length
    if (l===len) return res.push(list.slice())
    for (let i=0; i<len; i++) {
      if (used[i]) continue;
      if (i>0 && nums[i]===nums[i-1] && !used[i-1]) continue;
      used[i] = true
      list.push(nums[i])
      bt(nums, used, len, list)
      list.pop()
      used[i]=false
    }
  }
  bt(nums, used, len, [])
  
  return res
}



const test = [1,1,2,2]

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