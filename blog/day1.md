#### 第一天， 1月29日

1. https 的证书命令

   _最好放在nginx/ssl/下，以appName命名_
```
openssl genrsa -des3 -passout pass:x -out server.pass.key 2048
openssl rsa -passin pass:x -in server.pass.key -out server.key
openssl req -new -key server.key -out server.csr
openssl x509 -req -sha256 -days 365 -in server.csr -signkey server.key -out server.crt
```

- 更新openssl至最新版本，为nginx更新前置需求，否则可能对https支持失败
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
   - [为何加盐](http://blog.jobbole.com/61872/)
   
技术探索
- [https 安全](https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-with-http-2-support-on-ubuntu-16-04)
- [申请证书 let’s encrypt](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-14-04) + [国内解决方案](https://cnodejs.org/topic/5711f1816a2d2bda52de962a)
- 研究静态资源配置，暂时方案：七牛免费
- 启用webpack http2 plugin
- 同服务器不同域名+跨域白名单实践
- mongo schema 添加方法
- mongo 安全
- redis 原理和配置
- ts 写服务端（可尝试）
- [react 版ssr参考](http://www.jianshu.com/p/97af0000516a)
