### 第四天，2月1日
1. 方向重定位，是否仍旧博客？或者，论坛系统，比如智能信息提取分析器，提取文章重要信息
并考虑接入微信支付, 打赏和点赞知识分享型论坛
    - 微信支付url e.g. http://www.hbooker.com/payment/weixin/weixin_api?transdata=%7B%22transid%22%3A%22weixin201702011459381437129%22%2C%22redirecturl%22%3A%22http%3A%5C%2F%5C%2Fwww.hbooker.com%5C%2Frecharge%5C%2Findex%22%2C%22cpurl%22%3A%22http%3A%5C%2F%5C%2Fwww.hbooker.com%5C%2Frecharge%5C%2Findex%22%2C%22waresid%22%3A%221%22%7D
    - blog 本身不需要用户管理和评论系统，可以使用多说或者disqus，可能的方向：在线服务提供，即时交易、支付；打赏和点赞知识分享型->简书+知乎专栏+知乎live
    - 已解决登陆问题，不用session改用jwt，完成redis设置
    - 以后解决refreshtoken的问题
- graph的权限控制和http method 方法限制
- [graph 设计参考](http://taobaofed.org/blog/2015/11/26/graphql-basics-server-implementation/)

技术探索
- [在隐藏关键用户信息时遇到的问题：如何把一个对象的部分属性提取出装载到一个新对象](http://stackoverflow.com/questions/25553910/one-liner-to-take-some-properties-from-object-in-es-6)
- [浏览器端图片压缩上传，包括移动端](https://sebastianblade.com/browser-side-image-compress-and-upload/)
- [ts 在 vscode](https://nodelover.me/#/blog/article/info/5829adfdda2f600056e673c7)
- [单点登陆+多域名](http://www.cnblogs.com/yexiaochai/p/4422460.html)
- [From restful to graphql](https://0x2a.sh/from-rest-to-graphql-b4e95e94c26b#.e6fwhug9r)
- [shadowsocks的 配置](http://www.barretlee.com/blog/2016/08/03/shadowsocks/)
- [webpack原理](http://www.thkdog.com/html5/2015/05/08/webpack.html)

自动部署自动测试，
高模块化高移植性高可替代性高可拓展性

一些面试须知
[面试题](https://www.nowcoder.com/discuss/19305?type=2&order=0&pos=13&page=1)
[面经](https://www.nowcoder.com/discuss/19662?type=2&order=0&pos=52&page=1)