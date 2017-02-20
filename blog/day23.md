## 第23天，2月20日

- [x] async / await 不成熟的性能问题, 不建议用作生产
基于@i5ting的压测代码测试 node7.4 -harmony-async-await
async await / generator 

经测试，性能差和中间件个数成正比
考虑到实际情况中间件数量不会处于边缘情况,介于5~15之间
最终采用的测试方案
wrk t8 c1000 10/15/20/25 middlewares

测试结果：成功垫底，并有socket error和express相仿
Express
```
Running 3s test @ http://localhost:3333
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     6.10ms    1.91ms  37.10ms   91.94%
    Req/Sec     1.00k   181.97     1.81k    91.43%
  24442 requests in 3.10s, 4.90MB read
Requests/sec:   7874.38
Transfer/sec:      1.58MB
```
Koa 1
```
Running 3s test @ http://localhost:3333
  8 threads and 50 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     5.36ms    1.67ms  34.49ms   93.26%
    Req/Sec     1.14k   242.39     2.91k    95.47%
  27602 requests in 3.10s, 3.97MB read
Requests/sec:   8897.56
Transfer/sec:      1.28MB
```
Koa 2
```
Running 3s test @ http://localhost:3333
  8 threads and 1000 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    16.84ms    5.70ms 172.49ms   87.18%
    Req/Sec     1.67k   378.94     2.07k    91.23%
  38075 requests in 3.07s, 5.48MB read
  Socket errors: connect 0, read 419, write 0, timeout 0
Requests/sec:  12394.52
Transfer/sec:      1.78MB
```
Koa 2 async
```
Running 3s test @ http://localhost:3333
  8 threads and 1000 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    10.73ms    8.60ms 296.96ms   96.05%
    Req/Sec     1.10k   370.25     1.78k    75.70%
  23585 requests in 3.09s, 3.40MB read
  Socket errors: connect 0, read 219, write 0, timeout 0
Requests/sec:   7621.69
Transfer/sec:      1.10MB
```