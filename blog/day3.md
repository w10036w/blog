### 第三天，1月31日
1. graph 权限验证
- graph 查询、创建失败时的异常处理
- jwt token 验证
    - passport-jwt 没法用
- 用户登陆缓存信息(完成)
- [passport 小窗验证后返回](http://stackoverflow.com/questions/28392393/passport-js-after-authentication-in-popup-window-close-it-and-redirect-the-pa)，同时考虑更新页面缓存或者重新刷新页面？

技术探索
- [Node.js 实战](http://wiki.jikexueyuan.com/project/node-lessons/cookie-session.html)
- [线上发布的mongo 安全部署](https://medium.com/@fharding/securing-your-mongodb-server-8c2d787a474d#.silimljxq)
- [JWT](http://www.jianshu.com/p/576dbf44b2ae) 

        优点
        因为json的通用性，所以JWT是可以进行跨语言支持的，像JAVA,JavaScript,NodeJS,PHP等很多语言都可以使用。
        因为有了payload部分，所以JWT可以在自身存储一些其他业务逻辑所必要的非敏感信息。
        便于传输，jwt的构成非常简单，字节占用很小，所以它是非常便于传输的。
        它不需要在服务端保存会话信息, 所以它易于应用的扩展
        
        安全相关
        不应该在jwt的payload部分存放敏感信息，因为该部分是客户端可解密的部分。
        保护好secret私钥，该私钥非常重要。
        如果可以，请使用https协议
