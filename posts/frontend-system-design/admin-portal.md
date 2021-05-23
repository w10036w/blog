# 前端系统设计 - 运营控制台

## 业务分析

事项 - 复杂度 - 详情

1. `目标客户` `中` 内部平台运营人员 toP(latform), 可扩大至外部商业用户, toB
2. `认证鉴权` `高` 影响内部运营不同权限等级, 和外部商户功能开放等级
3. `用户交互` `高` 流程和方式复杂, 如表格, 有一定持久化需求, 动画、富文本等需求较低
4. `跨平台性` `无` 无需支持移动应用, 后续可支持桌面应用
5. `搜索优化` `无` 无需 SEO 或服务端渲染
6. `实时同步` `中` 包括前端与后端之间, 不同浏览器或浏览器不同 tab 之间, 不同平台 app 之间, 但流量不大
7. `状态管理` `中` 有一定持久化需求
8. `数据可视` `中` 有一定要求
9. `运维支持` `中` 考虑外部商户地理分布, 前端应用层做 `CDN` 优化, 中台上云
10. `数据来源` `变` 随应用复杂度变化, 需要预留扩展性
11. `语言支持` `高` 需要支持 >2 种语言

## 选型参考

1. 客户对定制性无要求, 开发速度有要求, 可使用已有成熟中后台 UI 组件库通用模板, 如 [ant design](https://ant.design/), [material-ui](https://material-ui.com/) 等, 考虑用更上层模板, 如 [antd pro](https://pro.ant.design/), 或蚂蚁的 bigfish
2. 前台框架注重灵活度, [next.js](https://nextjs.org/) vs [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html), `next.js` 配置灵活, 自带路由
3. 状态管理待定
4. 常用功能采用阿里开源的 [@umijs/hooks](https://hooks.umijs.org/zh-CN/antd/use-form-table)
5. 国际化采用 `react-intl` 节约时间, 整合 antd i18n
6. 中台 `midway` vs `eggjs`
7. mock 数据 [Mock](https://github.com/nuysoft/Mock), 可拦截异步请求
8. 样式由于无需支持移动 app, [linaria](https://linaria.now.sh/) vs umijs
9. 地理可视化 蚂蚁 [L7](https://github.com/antvis/L7)

### 技术定型

1. 前台 `umijs` 全家桶, 包括 UI 库 `antd`, 状态和路由管理 `dva`, 常用功能 `umi/hooks`, 样式 `sass module`

## 工程分析

- 后台服务齐全完备, 只需中台对接转发
- 无需考虑复用已有前台, 由脚手架开始
- `monorepo (yarn workspace)` 开发中台和前台应用, 为以后桌面应用预留, 统一版本控制

## 开发阶段

1. `功能 feature`,  `交互 interaction`,  `分层 indirection`, `部署 Delivery`

   1. 前台开发应用 SPA, 为内部平台运营人员实现友好 UI, 基础功能, 复杂交互, 支持中英
   2. 中台开发 `BFF` (backend for frontend) RESTful as `API Gateway`, 统一中转或代理各系统各种类型服务接口, 避免原始接口暴露, 提升安全性, 一致性
   3. `Docker` 解决 CI/CD

2. `外部扩展 extension`, `整合 integration`

   1. 中台 `serverless` 化, 优化资源占用, 整合 IM 提醒, 邮件发送等系统服务, 支持 `graphql`
   2. 前台支持更多复杂功能, 其他语言, 外部商户, 桌面提醒, 安全防范
   3. 前台微服务化

3. `维护`, `优化`, `探索`
   1. 实现新需求, 修复问题
   2. 优化已有接口, 流程, 状态, 功能, 开发体验, 用户体验
   3. 在运维 (DevOp), UI 智能化, 数据可视化 (DV), 图形互动化, 实时数据 (server push + WebSocket), 地图信息 (GEO), 桌面应用 (Electron), 手机端布局, 离线应用等方向探索

## 面临挑战

- 后台各系统接口聚合：
  - 网关, 权限, 安全, 缓存, 日志, 消息服务
  - RPC, mock 数据
  - 本地 & 线上和 jar / RPC 接口对接
  - mock 数据
- 推动相关团队合作
- 业务需求, 内容范围确认, 文档化
- 前端技术框架整合, 上手成本, 包括对潜在成员 (新前端同学, 其他可能参与的后端同学) 的培训成本
- 多系统数据同步、一致性
- 中台接口设计, 简化逻辑及开销, 语义化, 安全过滤, 文档化
- 快速发布能力
- 开发团队

## 参考资料

- [大前端架构思考与选择](https://www.jianshu.com/p/bb8ac7db7e2d)
- [蚂蚁财富的 BFF 实践](https://os.alipayobjects.com/rmsportal/WtUmBLJSmqtDHkvJzuzM.pdf)