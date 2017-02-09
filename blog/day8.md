### 第8-13天，2月5-10日
- [x] 接口数据替换为restful: GraphQL缺陷，风险，熟练度
- [x] [e03035a: 后台构建模型，待测试](/e03035a7042fe4dbc31211dce4cf3f8a0098ec39)
- [x] 开放github注册
- [x] 权限控制：通过另外一组right.json维护schema中属性的read/edit等属性，
- [ ] 无限测试
- [x] 客户端管理端接口分离


### Next
- [ ] 分析vue source
- [ ] 研究 [egg](https://eggjs.org/) 的设计思路
- [ ] 参考loopback关于权限控制，接口设计 （怎么设计接口api）
- [ ] 自动化测试接口
- [ ] 前台应用[enable service worker](http://zhenhua-lee.github.io/http/service-worker.html) + [Intro](http://www.alloyteam.com/2016/01/9274/)
- [ ] [安全，应对攻击的防范](https://github.com/eggjs/egg/blob/master/docs/source/zh-cn/core/security.md)


### Tech
- [x] mongodb的研究：
    - [用new Model()](http://stackoverflow.com/questions/9305987/nodejs-mongoose-which-approach-is-preferable-to-create-a-document)
    - [Model.create() vs Model.collection.insert](http://stackoverflow.com/questions/16726330/mongoose-mongodb-batch-insert/24848148#24848148)
    - [many-to-many](http://zhyq0826.iteye.com/blog/1850867)
    - [silent failure when adding documents have fields not in Schema](http://stackoverflow.com/questions/16509828/how-does-mongoose-handle-adding-documents-that-have-fields-that-are-not-pa)
- [ ] 研究cnodejs如何使用redis进行缓存，进而解决mongo压力（然而cnodejs并没有用。。。）
- [ ] 参考loopback关于权限控制，接口设计 （怎么设计接口api）
- [ ] [Vue2 & Axios](https://gold.xitu.io/entry/5894015b128fe10058d15d7e)
- [ ] [Beringei](https://github.com/facebookincubator/beringei/blob/master/README.md) : facebook in memory time series storage engine

### Note
select后需要多加一个空格，否则取不到最后一个
e.g.
/api/admin/user?criteria={"username":"admin"}&select="_id avatar role group level githubAddr facebookAddr twitterAddr favorites provider createAt updateAt hidden "