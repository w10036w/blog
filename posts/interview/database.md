# interview - database 数据库基础

## MySQL InnobDB + 事务安全 + 隔离级别

> <https://blog.csdn.net/m0_37962600/article/details/81005191>
>
> 如果想看自己的数据库默认使用的那个存储引擎，可以通过使用命令SHOW VARIABLES LIKE 'storage_engine';

InnoDB是事务型数据库的首选引擎，支持事务安全表（ACID, Atomicity, Consistency, Isolation, Durability）
InnoDB 是 mySQL 默认的存储引擎，默认的隔离级别是 RR，并且在RR的隔离级别下更近一步，通过多版本并发控制（MVCC）解决不可重复读问题，加上间隙锁（也就是并发控制）解决幻读问题。因此InnoDB的 RR 隔离级别其实实现了串行化级别的效果，而保留了比较好的并发性能。

- 原子性的实现基于 MySQL 日志系统的 redo 和 undo 机制。如果出错了，就会回滚到原来的位置，redo里面已经存储了我做过什么事了，然后逆向执行一遍就可以了。
  - 一致性：事务开始前和结束后，数据库的完整性约束没有被破坏。（eg:比如A向B转账，不可能A扣了钱，B却没有收到）
  - 隔离性：同一时间，只允许一个事务请求同一数据，不同的事务之间彼此没有任何干扰；以下问题和隔离性有关：
    - 脏读 dirty read (需要 读已提交 RC 解决)

      > 是指在一个事务处理过程里读取了另一个未提交的事务中的数据（当一个事务正在多次修改某个数据，而在这个事务中这多次的修改都还未提交，这时一个并发的事务来访问该数据，就会造成两个事务得到的数据不一致）；（读取了另一个事务未提交的脏数据）

    - 不可重复读 （读取了其他事务更改的数据 update，需要行级锁解决）

      > 在对于数据库中的某个数据，一个事务范围内多次查询却返回了不同的数据值，这是由于在查询间隔，被另一个事务修改并提交了；（读取了前一个事务提交的数据，查询的都是同一个数据项）

    - 幻读 (读取了其他事务新增或删除的数据，insert / delete，需要通过表级锁解决)

      > 是事务非独立执行时发生的一种现象（eg:事务 T1 对一个表中所有的行的某个数据项做了从“1”修改为“2”的操作，这时事务 T2 又对这个表中插入了一行数据项，而这个数据项的数值还是为“1”并且提交给数据库。而操作事务T1的用户如果再查看刚刚修改的数据，会发现还有一行没有修改，其实这行是从事务T2中添加的，就好像产生幻觉一样）；（读取了前一个事务提交的数据，针对一批数据整体）
  
  - 持久性：事务完成后，事务对数据库的更新将被保存，不能回滚

四种隔离级别, 由高到低，执行效率由低到高

- Serializable（串行化）：可避免脏读、不可重复读、幻读的发生
- Repeatable read (可重复读， RR)：可避免脏读、不可重复读的发生；MySQL 的默认级别
- Read committed（读已提交, RC）：可避免脏读的发生；SQL Server, Oracle 的默认级别
- Read uncommitted（读未提交, RU）：最低级别，任何情况都无法保证；

> 隔离生动比喻见 <https://cloud.tencent.com/developer/article/1450773>

## 悲观锁乐观锁

- 悲观锁 会读取时锁定，依靠数据库层的锁机制实现，性能较低

- 乐观锁，基于数据版本记录机制 (为数据增加版本标识，读数据时一同读取)

  MVCC（多版本并发控制）

英文全称为Multi-Version Concurrency Control，乐观锁为理论基础的MVCC（多版本并发控制），MVCC的实现没有固定的规范。每个数据库都会有不同的实现方式, 在每行加隐藏的创建版本号 (create_version) 和删除版本号 (delete_version)；

- 新增时，更新创建版本为 1， 删除版本 不操作；
- 更新时，采用 delete + add 的方式，先更新当前数据 删除版本(自增，=create_version+1)，然后新增一条数据 (create_version=pre_delete_version)
- 删除时，直接将数据的删除版本号更新为当前事务的版本号 (delete_version=curr_create_version)；

## 常用语句例子

### INSERT

insert into user (id,name,age)values(1,"张三",10);

### UPDATE

update user set age=11 where id=1;

### DELETE

delete from user where id=1;

## 分库分表

> <https://juejin.cn/post/6844903683046522887>

## 图数据库

用途举例
- Fraud Detection
- 360 Customer Views.
- Recommendation Engines.
- Network/Operations Mapping.
- AI Knowledge Graphs.
- Social Networks.
- Supply Chain Mapping