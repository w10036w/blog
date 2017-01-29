# 博客建设记录
#### 1月30日
1. GraphQL的运行
- schema
1. 权限系统构建
1. graph认证
1. 前台优化
   - webpack
      - [tree shaking](https://blog.engineyard.com/2016/tree-shaking)
      - [http2 aggr splitting](https://github.com/webpack/webpack/tree/master/examples/http2-aggressive-splitting)
      - [koa2-proxy](https://www.npmjs.com/package/koa2-proxy)

#### 1月29日

1. https 的证书命令

   _最好放在nginx/ssl/下，以appName命名_
```
openssl genrsa -des3 -passout pass:x -out server.pass.key 2048
openssl rsa -passin pass:x -in server.pass.key -out server.key
openssl req -new -key server.key -out server.csr
openssl x509 -req -sha256 -days 365 -in server.csr -signkey server.key -out server.crt
```

- 更新openssl至最新版本
- Nginx 更新，配置 ssl, http2, 代理，多应用完成
   - [mac install](https://gist.github.com/Anakros/1891d0b4ec3ca2e34d97)
   ```shell
   brew install nginx --devel --with-http2
   ```
   - [linux install](https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-with-http-2-support-on-ubuntu-16-04)
   ```shell
   sudo apt-get install nginx
   ```
   - ssl / http2： [why http2](http://engineering.khanacademy.org/posts/js-packaging-http2.htm), [Dropbox http2](https://blogs.dropbox.com/tech/2016/05/enabling-http2-for-dropbox-web-services-experiences-and-observations/)
   - [同域名多app](https://sungwoncho.io/run-multiple-apps-in-one-droplet/)
- pm2 卸载，更新，测试完成，弄清了fork和cluster，json和iml的配置文件完成
   - **后续**：需要继续探究cluster 的多核设置等
- babel:
   - [why I do not use babel-register in prod](http://stackoverflow.com/questions/38264828/why-shouldnt-babel-node-be-used-in-production)
   - [why babel need >npm3](https://www.reddit.com/r/javascript/comments/3u7gob/babels_poor_performance_what_im_doing_wrong/)
- mongodb 
   - user schema构建
下一步
- [https 安全](https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-with-http-2-support-on-ubuntu-16-04)
- 申请证书 let’s encrypt
- 研究静态资源配置，暂时方案：七牛免费
- 启用webpack http2 plugin
- 同服务器不同域名+跨域白名单实践
- mongo schema 添加方法
- mongo 安全
- redis 原理和配置
- ts 写服务端（可尝试）
