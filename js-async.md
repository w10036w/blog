# JS Async & Concurrency

Js is **single thread**, forcing **asynchronous** events to queue waiting and applying **event loop** to process them.

### Single Thread
Browser always **has and only has** one thread to process JS, while at least another two threads processing GUI render and event listening.
GUI rendering thread is executed when repaint and reflow happen and is exclusive with JS thread.

### Asynchronous
The **async events** include:
- **DOM** events (click, mouseover, scroll...)
- **timers** (setTimeout, setInterval, requestAnimationFrame)
- **request** (XHR, fetch)
- **I/O** (readFile, database queries)

#### Exceptions
alert, sync XHR, web workers (another story)

### Event Loop
![event loop](https://developer.mozilla.org/files/4617/default.svg)
#### Heap
 Initially objects are allocated in a heap that denotes a large mostly unstructured region of memory.

#### Stack
Function calls form a stack of frames. One frame is created for one function containing local variables and its ancestors' context arguments. The frame is popped out after the function returns. Once **Stack** is empty **Queue** will be processed

#### Queue
A message (associated with a function) queue to be processed. Only after **Stack** is empty, the message (if any) will be taken out of **Queue** to process. The process will be looped until **Queue** is empty, and will be fired again for a new message to arrive.

### Why setTimeout / setInterval is not precise
#### setTimeout(fn, ts)
After exact **ts**(ms) the message(**fn**) is appended to Queue. It is executed instantly if no previous messages, as expected; otherwise it will be delayed to  execute until all previous ones clear.

#### setInterval(fn, ts)
Similar to setTimeout, every exact **ts**(ms) the message(**fn**) is appended to Queue but may be delayed to execute until all previous ones clear.

### Multi-Runtime Communicating
A web worker or a cross-origin iframe has its own stack, heap and queue. Two distinct runtimes can communicate via _postMessage_, adding a message to the other runtime if the latter listens to **_message_** event

### Credits
https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop
http://www.lihuai.net/javascript/2244.html
http://www.lihuai.net/javascript/2617.html
https://segmentfault.com/a/1190000004322358
http://ejohn.org/blog/how-javascript-timers-work/
https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/

