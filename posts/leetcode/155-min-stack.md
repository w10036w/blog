## [155. Min Stack]()
> top100

Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.
```js
push(x) -- Push element x onto stack.
pop() -- Removes the element on top of the stack.
top() -- Get the top element.
getMin() -- Retrieve the minimum element in the stack.
```
Example:
```js
MinStack mins = new MinStack();
mins.push(-2);
mins.push(0);
mins.push(-3);
mins.getMin();   --> Returns -3.
mins.pop();
mins.top();      --> Returns 0.
mins.getMin();   --> Returns -2.
```

## solution
performance first + do not use native related method
```js
/**
 * initialize your data structure here.
 */
var MinStack = function() {
  this.mins = []
  this.stack = []
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
  var l=this.stack.length, lmin=this.mins.length
  this.stack[l] = x
  if (lmin<1 || x<= this.mins[lmin-1]) {
    this.mins[lmin] = x
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
  const popped = this.stack[this.stack.length - 1]
  this.stack = this.stack.splice(0, this.stack.length - 1)
  if (popped == this.mins[this.mins.length - 1]) {
    this.mins = this.mins.splice(0, this.mins.length - 1)
  }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
  return this.stack[this.stack.length - 1]
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
  if (this.mins.length < 1) return 0
  return this.mins[this.mins.length - 1]
};
```
