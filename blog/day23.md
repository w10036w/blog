## 第23-31天，2月20日-28日
- [x] replies
  - [x] reply to topic
  - [x] reply to reply
  - [x] edit reply
- [x] topic edit
- [x] 图片上传,由交由后台代理改为前端直传
- [ ] 用户主页内容
- [ ] 进度条
- [ ] 富媒体展示
  - [ ] 轮播
  - [x] SNS widget
- [ ] sitemap / rss
- [ ] 拆分vendor，使用cdn
- [ ] redis 存用户信息的使用方式？
- [ ] 参考bootstrap 色彩方案模式,准备使用单色系

api小任务
- [x] 全换成asyncTry errHandler
- [ ] 移除 _find 服务间调用

思考
没有解决多个editor同时添加相同category的问题，解决方法是限制editor的数量或者谨慎授权
多人协同时可以考虑websocket，如slack

- UGC -> 

授权命令
`sudo chown -R $(whoami) /usr/local`

### Others
#### 关于富媒体展示的思考
video gallery + playback control
photo gallery (swipe 解决，可以考虑用新）

#### mongoose 踩坑记
1. Promise拿到的实际的entity对象是这个样子，访问_doc才能取到数据
> { __$, _doc, _pre, _post }

1. schema中必须先定义field，然后异步后才能再往上填，开销最小的是Object，不存db里
schema 中不要定义用不上的[Object]，没法改，用Object

1. 直接拿到的_id是Object,需要toString()

#### Promise
Promise的奇怪点
```js
//错误，path没有的时候SSR首渲没有category和tag
return path ? Promise.all([
  store.dispatch('fetch_topic', { path, query:{ origin:true } }),
  store.dispatch('fetch_categories'),
  store.dispatch('fetch_tags')
]) : Promise.all([
  store.dispatch('fetch_categories'),
  store.dispatch('fetch_tags')
])
```
```js
//这段才能达到想要的效果
if (path) {
  return Promise.all([
     store.dispatch('fetch_topic', { path, query:{ origin:true } }),
     store.dispatch('fetch_categories'),
     store.dispatch('fetch_tags')
  ])
} else {
  return Promise.all([
    store.dispatch('fetch_categories'),
    store.dispatch('fetch_tags')
  ])
}
```

### Tech
- [buffer vs string](http://stackoverflow.com/questions/4901570/buffer-vs-string-speed-why-is-string-faster)
- window.performance.memory
- v8 5.5 - 5.7
- 使用ETags减少Web应用带宽和负载
- [nginx 缓存](https://serversforhackers.com/nginx-caching)

- async / await 不成熟的性能问题, 不建议用作生产
基于@i5ting的压测代码测试 node7.6
async await / generator 

经测试，性能差和中间件个数成正比
考虑到实际情况中间件数量不会处于边缘情况,介于5~15之间
最终采用的测试方案
wrk t8 c1000 10/15/20/25 middlewares

测试结果：成功超过express, koa1
Async
```shell
Running 3s test @ http://localhost:3333
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     5.25ms    1.88ms  35.58ms   95.94%
    Req/Sec     1.17k   186.09     1.32k    93.55%
  28941 requests in 3.10s, 4.17MB read
Requests/sec:   9321.19
Transfer/sec:      1.34MB
```
Koa2
```shell
Running 3s test @ http://localhost:3333
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     3.61ms    1.60ms  34.12ms   95.88%
    Req/Sec     1.72k   271.24     1.90k    93.55%
  42541 requests in 3.10s, 6.13MB read
Requests/sec:  13711.05
Transfer/sec:      1.97MB
```
