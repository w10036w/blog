var fn = function(s) {

};

const test = ""

const res = fn(test)
console.log(res)



// async function a1 () {
//   console.log('a1 start')
//   await a2()
//   console.log('a1 end')
// }
// async function a2 () {
//   console.log('a2')
// }

// console.log('script start')

// setTimeout(() => {
//   console.log('setTimeout')
// }, 0)

// Promise.resolve().then(() => {
//   console.log('promise1')
// })

// a1()

// let promise2 = new Promise((resolve) => {
//   resolve('promise2.then')
//   console.log('promise2')
// })

// promise2.then((res) => {
//   console.log(res)
//   Promise.resolve().then(() => {
//       console.log('promise3')
//   })
// })
// console.log('script end')