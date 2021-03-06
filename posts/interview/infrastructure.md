# interview - infrastructure 设施硬件

## 数据基础设施指导原则

参考 [airbnb 工程师的文章](https://link.zhihu.com/?target=https%3A//medium.com/airbnb-engineering/data-infrastructure-at-airbnb-8adfb34f169c%23.d1d0l7bee)

- 尽量使用开源或提倡开源内部系统，好处多多
- 首选标准化组件和架构
- 确保可扩展性和可维护性
- 重视客户反馈，解决实际问题
- 留有缓冲余量

## CDN - Content Delivery Network 或 Content Distribute Network，即内容分发网络

> [参考 1](https://zhuanlan.zhihu.com/p/28940451) [参考 2](https://segmentfault.com/a/1190000010631404)

### 基本思路

尽可能避开互联网上有可能影响数据传输速度和稳定性的瓶颈和环节，使内容传输的更快、更稳定。通过在网络**各处放置节点服务器**所构成的在现有的互联网基础之上的一层智能虚拟网络，CDN **调度系统**能够**实时**地根据网络流量和各节点的连接、负载状况以及到用户的距离和响应时间等综合信息将用户的请求**重新导向**离用户最近的服务节点上。

### 目的

解决因分布、带宽、服务器性能带来的访问延迟问题，适用于站点加速、点播、直播等场景。**使用户可就近取得所需内容，解决 Internet 网络拥挤的状况，提高用户访问网站的响应速度和成功率**。

- **控制时延**, 加速访问
- 实现跨运营商、跨地域的全网覆盖: 绕过互联不互通、区域 ISP 地域局限、出口带宽受限
- 保障你的网站安全: 负载均衡和分布式存储, 防恶意攻击如 DDOS, 异地备援
- 节约成本, 专注业务: 广泛部署, 配套服务(云存储, 大数据, 运维支持等)

### 基础架构

![cdn arch](../../assets/img/interview-infrastructure-cdn-arch.jpg)

### CDN 有无对比

无 CDN

1. 用户在自己的浏览器中输入要访问的网站域名。
2. 浏览器向 本地 DNS 服务器 请求对该域名的解析。
3. 本地 DNS 服务器中如果缓存有这个域名的解析结果，则直接响应用户的解析请求。
4. 本地 DNS 服务器中如果没有关于这个域名的解析结果的缓存，则以递归方式向整个 DNS 系统请求解析，获得应答后将结果反馈给浏览器。
5. 浏览器得到域名解析结果，就是该域名相应的服务设备的 IP 地址 。
6. 浏览器向服务器请求内容。
7. 服务器将用户请求内容传送给浏览器。

有 CDN

1. 当用户点击网站页面上的内容 URL，经过本地 DNS 系统解析，DNS 系统会最终将域名的解析权交给 CNAME 指向的 CDN 专用 DNS 服务器。
2. CDN 的 DNS 服务器将 CDN 的全局负载均衡设备 IP 地址返回用户。
3. 用户向 CDN 的全局负载均衡设备发起内容 URL 访问请求。
4. CDN 全局负载均衡设备根据用户 IP 地址，以及用户请求的内容 URL，选择一台用户所属区域的区域负载均衡设备，告诉用户向这台设备发起请求。
5. 基于以下这些条件的综合分析之后，区域负载均衡设备会向全局负载均衡设备返回一台缓存服务器的 IP 地址：
   - 根据用户 IP 地址，判断哪一台服务器距用户最近；
   - 根据用户所请求的 URL 中携带的内容名称，判断哪一台服务器上有用户所需内容；
   - 查询各个服务器当前的负载情况，判断哪一台服务器尚有服务能力。
6. 全局负载均衡设备把服务器的 IP 地址返回给用户。
7. cDN 用户向缓存服务器发起请求，缓存服务器响应用户请求，将用户所需内容传送到用户终端。如果这台缓存服务器上并没有用户想要的内容，而区域均衡设备依然将它分配给了用户，那么这台服务器就要向它的上一级缓存服务器请求内容，直至追溯到网站的源服务器将内容拉到本地。

### CDN cache

CDN 边缘节点缓存策略因服务商不同而不同，但一般都会遵循 http 标准协议，通过 http 响应头中的 `Cache-control: max-age` 的字段来设置 CDN 边缘节点数据缓存时间。

当客户端向 CDN 节点请求数据时，CDN 节点会判断缓存数据是否过期，若缓存数据并没有过期，则直接将缓存数据返回给客户端；否则，CDN 节点就会向源站发出 `回源请求`（back to the source request），从源站拉取最新数据，更新本地缓存，并将最新数据返回给客户端。

CDN 服务商一般会提供基于文件后缀、目录多个维度来指定 CDN 缓存时间，为用户提供更精细化的缓存管理。

CDN 缓存时间会对 `回源率` 产生直接的影响。若 CDN 缓存时间较短，CDN 边缘节点上的数据会经常失效，导致频繁回源，增加了源站的负载，同时也增大的访问延时；若 CDN 缓存时间太长，会带来数据更新时间慢的问题。开发者需要增对特定的业务，来做特定的数据缓存时间管理。

CDN 边缘节点对开发者是透明的，相比于浏览器 `Ctrl+F5` 的强制刷新来使浏览器本地缓存失效，开发者可以通过 CDN 服务商提供的 “刷新缓存” 接口来达到清理 CDN 边缘节点缓存的目的。这样开发者在更新数据后，可以使用 `刷新缓存` 功能来强制 CDN 节点上的数据缓存过期，保证客户端在访问时，拉取到最新的数据。

可参考：

### Q & A

1. CDN 加速是对网站所在服务器加速，还是对其域名加速？

CDN 是只对网站的某一个具体的域名加速。如果同一个网站有多个域名，则访客访问加入 CDN 的域名获得加速效果，访问未加入 CDN 的域名，或者直接访问 IP 地址，则无法获得 CDN 效果。

2. CDN 和镜像站点比较有何优势？

CDN 对网站的访客完全透明，不需要访客手动选择要访问的镜像站点，保证了网站对访客的友好性。

CDN 对每个节点都有可用性检查，不合格的节点会第一时间剔出，从而保证了极高的可用率，而镜像站点无法实现这一点。

CDN 部署简单，对原站基本不做任何改动即可生效。

3. CDN 和双线机房相比有何优势？

常见的双线机房只能解决网通和电信互相访问慢的问题，其它 ISP（譬如教育网，移动网，铁通）互通的问题还是没得到解决。

而 CDN 是访问者就近取数据，而 CDN 的节点遍布各 ISP，从而保证了网站到任意 ISP 的访问速度。另外 CDN 因为其流量分流到各节点的原理，天然获得抵抗网络攻击的能力。

4. CDN 使用后，原来的网站是否需要做修改，做什么修改？

一般而言，网站无需任何修改即可使用 CDN 获得加速效果。只是对需要判断访客 IP 程序，才需要做少量修改。

5. 为什么我的网站更新后，通过 CDN 后看到网页还是旧网页，如何解决？

由于 CDN 采用各节点缓存的机制，网站的静态网页和图片修改后，如果 CDN 缓存没有做相应更新，则看到的还是旧的网页。

为了解决这个问题，CDN 管理面板中提供了 URL 推送服务，来通知 CDN 各节点刷新自己的缓存。　　
在 URL 推送地址栏中，输入具体的网址或者图片地址，则各节点中的缓存内容即被统一删除，并且当即生效。

如果需要推送的网址和图片太多，可以选择目录推送，输入 http://www.kkk.com/news 即可以对网站下 news 目录下所有网页和图片进行了刷新。

6. 能不能让 CDN 不缓存某些即时性要求很高的网页和图片？

只需要使用动态页面，asp，php，jsp 等动态技术做成的页面不被 CDN 缓存，无需每次都要刷新。或者采用一个网站两个域名，一个启用 CDN，另外一个域名不用 CDN，对即时性要求高的页面和图片放在不用 CDN 的域名下。

7. 网站新增了不少网页和图片，这些需要使用 URL 推送吗？

后来增加的网页和图片，不需要使用 URL 推送，因为它们本来就不存在缓存中。
