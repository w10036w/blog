# interview - system design
> https://soulmachine.gitbooks.io/system-design/content/cn/

## [分布式 ID 生成器](https://soulmachine.gitbooks.io/system-design/content/cn/distributed-id-generator.html)
- MongoDB UUID
- round-robin load balancer + 多台 MySQL 生成不同 ID 段
- Twitter Snowflake

## 短 URL 系统
设计要点
- 长度不超过 7 [a-zA-Z0-9]
- 一长对多短, 以这个 7 位长度的短网址作为唯一 ID，这个 ID 下可以挂各种信息，比如生成该网址的用户名，所在网站，HTTP 头部的 User Agent 等信息，收集了这些信息，才有可能在后面做大数据分析，挖掘数据的价值。短网址服务商的一大盈利来源就是这些数据。
- 302 重定向, 因 301 SEO 直接跳真实地址, 无法统计/拦截
- 使用分布式 ID 生成器 key(short)-value(long) -> 分布式 KV 数据库如 redis, levelDB
- 可以把域名分为 domain + path, 分别建表
- 处理高并发, 不同服务器分发不同号段, 如共 5 台服务器, 第一台发 5n, 第二台 5n+1
- 确保一个长 url 返回的是同一短 url, 用 key(long)-value(short)
- 确保上述的可行性和性能, LRUcache
- 如资源有限, 需要过期一部分短链接, 查上述 LRUcache 即可
- 如需防攻击, IP 限制个数, 监测整个系统限流
