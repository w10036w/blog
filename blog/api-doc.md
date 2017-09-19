# Arkcms-api
> A production-ready node.js CMS skeleton built on koa2, mongodb, redis

## Roadmap
- Design
- [x] Restful
- [ ] Graphql

- LOG
  - [x] log4js
  - [ ] winston

- RoutingCORS dynamic list

- Database
  - [x] Mongodb
  - [ ] MySql

- Cache: Redis

- CDN
  - [x] [qiniu](https://www.qiniu.com/) as image CDN
  - [ ] Akamai as cache CDN

- Continous Integration
  - [x] Makefile automation
  - [ ] Docker
  - [x] Nginx configuration
  - [ ] Hook or Jenkins
  - [ ] Docker

- Maintenance
  - [x] PM2 management
  - [ ] Keymetrics maintenance
  
- Documentation
  - [x] PRIMARY - Swagger json / yaml (serve as static files)
  - [x] [Swagger-jsdoc](http://mherman.org/blog/2016/05/26/swagger-and-nodejs/#.Wb68GNOg9TY) based on [OpenAPI](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md)
    - Status: Rejected
  - [x] Cancel Apiary: not simple and fast
  - [x] [apidocjs](http://apidocjs.com/): [official example](http://apidocjs.com/example/) <b>Rejected</b>
    - Pros: 
      1. well structured UI
      1. well structured doc writing
    - Cons:
      - no sending request support as swagger
      - cannot integrate with unit test

- Test
  - [ ] Unit test with Mocha, Chai
  - [ ] Integration test
  - [ ] E2E
  - [ ] Integrate with documentation

- Thinking of generator for Model - ORM - API (admin, simple client) - DOC - UnitTest

- Comments
  - [ ] Local comment support
  - [ ] Discuz
  - [ ] Facebook comments

- STATICIZE
  - [ ] Typescript


## 