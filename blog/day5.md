### 第5天，2月2日
1. [x] redis 配置和打通
- [x] passport验证模块优化
- [x] oauth验证无session尝试
- [ ] 后台系统建立测试request
- [ ] 前台服务构建测试request
- [x] 修改域名
- [x] 修改twitter app以获取email
- [ ] 开始确定服务主题和schema
- [ ] 服务的逻辑复杂耦合解决
- [ ] graph的crud及权限认证

### Next
- 预备用flowjs测试

### Tech
- webhook
- [why bluebird vs promise](http://www.zcfy.cc/article/three-javascript-performance-fundamentals-that-make-bluebird-fast-1209.html)
- [更多 Promise，](http://www.zcfy.cc/article/what-is-promise-try-and-why-does-it-matter-joepie91-s-ramblings-385.html)
    - 后续promise的类型由调用链第一个promise决定
    - Bluebird Promise.try的用法 1. 异步代码中的异常也被捕获； 2. 不需要前置promise的then (所以将后续promise统一) 3. 能直接后跟同步函数，如.map()
