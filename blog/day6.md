### 第6天，2月3日
1. [ ] [NoSQL和RMDS比较下的优点，数据库基本操作设计](http://www.voidcn.com/blog/why_2012_gogo/article/p-6266331.html) + [电商例子](http://www.mongoing.com/archives/3811)
- [ ] 后台系统建立测试request
- [ ] 前台服务构建测试request
- [ ] 开始确定服务主题和schema
- [ ] 服务的逻辑复杂耦合解决
- [ ] [graph docs](http://graphql.org/learn/queries/#mutations)
- [ ] graph的crud及权限认证
- [ ] [graph 设计参考](http://taobaofed.org/blog/2015/11/26/graphql-basics-server-implementation/)
- [ ] 写几个个自执行脚本 
    - start: git pull, 开不同的项目分别 npm i & pm2 start (如何并行？)
    - reload: git pull, npm i, pm2 reload all
    - stop: pm2 stop all


### Next
- [x] [对象字面量](http://www.zcfy.cc/article/why-object-literals-in-javascript-are-cool-948.html)
    - Object.create vs __proto__
    - o = { add() {} } // !! o.add.name = 'add'
- [ ] webhookz  + [git/webhook/shell自动化部署](https://smallpath.me/post/Node.js:%E4%BD%BF%E7%94%A8git%E5%92%8Cwebhook%E8%BF%9B%E8%A1%8C%E8%87%AA%E5%8A%A8%E5%8C%96%E6%9E%84%E5%BB%BA)
- [ ] [redis 存储原理](http://blog.sina.com.cn/s/blog_6ff195c40102vfod.html)
- [ ] [graphDB](https://neo4j.com/developer/graph-database/)
- [go 教程](http://www.ctolib.com/docs-the-way-to-go-c-preface.html)

### Tech
- [redis nodejs 指令](http://redis.js.org/#api-rediscreateclient) + [简书，包含linux配置](http://www.jianshu.com/p/dbc1da93eae5) 
- [graphql schema lang](https://wehavefaces.net/graphql-shorthand-notation-cheatsheet-17cd715861b6#.x2cgsigco), 以后实现其他graphql的参考

<hr>
#### axios > isomorphic-fetch


#### webpack > gulp

#### graphql > restful
- 自有schema，introspection机制，不用写api文档
- 强类型，免去类检测 （前端趋势向强类型过渡，typescript等
- 无冗余，新旧接口可以共存，只要设计时考虑扩展性就不必在线上留存多个版本
- 有验证，具体方法待研究
- 和[graphDB](https://neo4j.com/developer/graph-database/)可以整合



