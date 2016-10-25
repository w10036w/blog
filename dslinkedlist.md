### Linked List

A Linked List is a dynamic linear collection of data elements, called nodes, each pointing to the next node by means of a pointer. This structure allows for efficient **insertion** or **removal** __(O(1))__ of elements from any position in the sequence during iteration. Though faster than Sequence List in these two operations, Linked List costs more in **random access** or **efficient indexing** __(O(n), compares to O(logn), O(1))__

>#### Advantages

>- **dynamic** data structure, can grow and be pruned, allocating and deallocating memory in runtime.

>- efficient **insertion** and **deletion** node **anywhere**

>- other dynamic data structures such as **stacks** and **queues** can be implemented using a linked list.

>- **no need** to define an initial size



>#### Disadvantages

>- **memory consuming** due to the store of pointers

>- **time consuming** to access or index due to incontiguous store

>- time / memorey consuming to **reverse** traversing (singly linked list requires extra operation, doubly linked list wastes memory.



>#### Usage

>- Polyomial：Each node stores both coefficient and powder.



1. Singly Linked List: JS Approach ([CN](http://wuzhiwei.net/ds_app_linkedlist/) | [EN](https://www.nczonline.net/blog/2009/04/13/computer-science-in-javascript-linked-list/))



 For some [high level(in C++)](http://wuchong.me/blog/2014/03/25/interview-link-questions/) operations: (deletion in O(1)， reverse, last **K**th node, middle node, if hasCircle, .etc)



1. Doubly / Circularly Linked List
