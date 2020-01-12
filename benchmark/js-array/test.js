let arr = [1,2,3,4]
let p=new Proxy(arr, {
  get(target, prop, receiver) {
    // 浏览器下无问题, 不需要判断
    // Node.js 下 过滤
    // Symbol(nodejs.util.inspect.custom)
    // Symbol(Symbol.toStringTag)
    // Symbol(Symbol.iterator)
    if (typeof prop!=='symbol') {
      const keys = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
      keys.indexOf(prop) > -1 && console.log(prop);
      let index = Number(prop);
      if (index<0) prop = String(target.length + index);
    }
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value) {
    if (typeof prop!=='symbol' && !isNaN(Number(prop)))
      console.log(`set arr[${prop}]=${value}`)
    target[prop] = value
    return true
  }
})
p.push(5) // arr[4]=5
console.log(p, p[-1])