## [146. LRU Cache](https://leetcode.com/problems/lru-cache/)

> 要点：存储一个 Map 来保存 capacity 数量的 双向链表，同时记录 head, tail
>
> 更新时，如果是已存在的key，找出来更新，把它推到head；如果是新的，新建一个 node，推到当前的 head 前并更新 head，如果 size 超了要丢掉 tail，并更新新tail

Design and implement a data structure for Least Recently Used (LRU) cache. It should support the following operations: get and put.

get(key) - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.
put(key, value) - Set or insert the value if the key is not already present. When the cache reached its capacity, it should invalidate the least recently used item before inserting a new item.

The cache is initialized with a positive capacity.

Follow up:
Could you do both operations in O(1) time complexity?

Example:

```js
LRUCache cache = new LRUCache( 2 /* capacity */ );

cache.put(1, 1);
cache.put(2, 2);
cache.get(1);       // returns 1
cache.put(3, 3);    // evicts key 2
cache.get(2);       // returns -1 (not found)
cache.put(4, 4);    // evicts key 1
cache.get(1);       // returns -1 (not found)
cache.get(3);       // returns 3
cache.get(4);       // returns 4
```

My solution

```js
/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.map = new Map();
  this.tail = this.head = null;
};
LRUCache.prototype.moveNodeToStart = function (node) {
  if (node === this.head) return;
  if (node === this.tail) this.tail = node.prev
  if (node.prev) node.prev.next = node.next
  if (node.next) node.next.prev = node.prev
  node.next = this.head;
  node.next.prev = node;
  node.prev = null;
  this.head = node;
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (!this.map.has(key)) return -1;
  const node = this.map.get(key);
  this.moveNodeToStart(node);
  return node.value;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  if (this.map.has(key)) {
    const existingNode = this.map.get(key);
    this.moveNodeToStart(existingNode);
    existingNode.value = value;
    return;
  }
  const newNode = { key, value, next: null, prev: null };
  if (this.map.size >= this.capacity) {
    this.map.delete(this.tail.key);
    this.tail = this.tail.prev;
    if (this.tail) {
      this.tail.next = null;
    }
  }
  if (this.head) {
    this.head.prev = newNode;
    newNode.next = this.head;
    this.head = newNode;
  } else {
    this.head = this.tail = newNode;
  }
  this.map.set(key, newNode);
};
```
