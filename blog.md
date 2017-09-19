# 项目建设记录

[Day 1, Jan 29](/blog/day1.md)

[Day 2, Jan 30](/blog/day2.md)

[Day 3, Jan 31](/blog/day3.md)

[Day 4, Feb 01](/blog/day4.md)

[Day 5, Feb 02](/blog/day5.md)

[Day 6-7, Feb 03-04](/blog/day6.md)

[Day 8-13, Feb 05-10](/blog/day8.md)

[Day 14-22, Feb 11-19](/blog/day14.md)

[Day 23-, Feb 20-](/blog/day23.md)

[bugs](/blog/bugs.md)

## 业务模型（v1.0)

### user 用户
- 用户通过第三方登陆，jwt验证，成为普通用户
- 用户通过回复等方式攒积分，提等级
- 管理员授权用户成为发帖型用户（编辑者），或用户等级达到/申请后晋升
- 管理员可以屏蔽用户（v2.0)

### topic 话题
- 编辑者可发布话题
- 编辑者可增加分类，标签

### message 提醒
  // 0-9 reply sb. reply ur topic,
  // 10-19 favorite
  // 20-29 group
  // ----feeds end----
  // 30-39 follow
  // 40-49 mention
- 用户回复你时，合并同类消息
- 用户关注你时
- 用户回复你时
用户发私信
用户收藏你的topic
用户提到你时（回复中，文章中，2.0后再做

### feed 动态 （自己可见）
关注的用户的topic，follow行为
###

[图片服务测试](/blog/upload-test.md)




































































































