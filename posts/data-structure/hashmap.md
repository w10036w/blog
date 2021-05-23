# interview - data structure: Hashmap

> <https://blog.csdn.net/u014532901/article/details/78936283>

HashMap提供两个重要的基本操作，put(K, V)和get(K)。

当调用put操作时，HashMap计算键值K的哈希值，然后将其对应到HashMap的某一个桶(bucket)上；此时找到以这个桶为头结点的一个单链表，然后顺序遍历该单链表找到某个节点的Entry中的Key是等于给定的参数K；若找到，则将其的old V替换为参数指定的V；否则直接在链表尾部插入一个新的Entry节点。
对于get(K)操作类似于put操作，HashMap通过计算键的哈希值，先找到对应的桶，然后遍历桶存放的单链表通过比照Entry的键来找到对应的值。
