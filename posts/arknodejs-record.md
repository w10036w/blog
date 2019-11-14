# Arknodejs 项目记录

[Day 1, Jan 29](/blog/day1.md)<br>
[Day 2, Jan 30](/blog/day2.md)<br>
[Day 3, Jan 31](/blog/day3.md)<br>
[Day 4, Feb 01](/blog/day4.md)<br>
[Day 5, Feb 02](/blog/day5.md)<br>
[Day 6-7, Feb 03-04](/blog/day6.md)<br>
[Day 8-13, Feb 05-10](/blog/day8.md)<br>
[Day 14-22, Feb 11-19](/blog/day14.md)<br>
[Day 23-, Feb 20-](/blog/day23.md)<br>
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