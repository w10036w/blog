## JS Impressive Rules

- [Async in Javascript](/js-async.md)
- [Optimization killers](/optimization-killers.md)

- [TDZ(Temporal Dead Zone)](http://www.jianshu.com/p/ebc51ce05416): about variable hoisting: let/const/class does variable hoisting!
```js
  //if you cannot understand the following code, then you need to read
   var  a = 1;
   (function() {
      console.log(a) // ReferenceError
      let a = 2
    })();
    var x = 1;
    (function (x=x) {
      console.log(x); // ReferenceError: x is not defined
    })();
```