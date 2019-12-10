# 前端面试基础 (TODO) 待分类

- [底层协议](interview/protocols.md)
- [设施硬件层](interview/infrastructure.md)
- [JS 语言基础](interview/js.md)
- [regex](interview/regex.md)
- [ES6 ES7 新特性](interview/es6.md)
- [浏览器](interview/browser.md)
- [typescript](interview/typescript.md)

## CSS + HTML

### CSS
- 盒模型 box model
- 各种边界奇葩现象，margin 上下的合并
- display: block, inline*, flex, grid, table*, contents, none, initial, inherit, run-in, list-item
- flex 布局
- 伪元素，状态元素
- selector 优先度: !important > inline > id > class > tag
- pre-css (sass, stylus, 或 jss) + post-css
- 清除浮动 `.clearfix`, `clear:both`, (同容器相邻元素) `overflow: hidden` (同容器内)
  ```css
  .clearfix:after {
      visibility: hidden;
      display: block;
      font-size: 0;
      content: " ";
      clear: both;
      height: 0;
    }
  ```
[文本溢出](https://juejin.im/post/5dc15b35f265da4d432a3d10)

[CSS 图形](https://github.com/qq449245884/xiaozhi/issues/42)


### HTML
- 标签语义化，比如 header，footer，nav，aside，article，section 等，利于开发/阅读模式/SEO，新增了很多表单元素，入 email，url 等，除去了 center 等样式标签，还有除去了有性能问题的 frame，frameset 等标签
- video，audio
- 新接口，如 navigator.geoloaction
- docType
  - 混杂模式
  - 标准模式
  - 准标准模式


## Yarn & NPM

> 参考 https://juejin.im/post/5da9c6b0e51d4524d67486e2

一些题目
- [ ] https://github.com/dwqs/blog/issues/17
- [ ] https://juejin.im/post/5dac5d82e51d45249850cd20

- [ ] https://juejin.im/post/5dc20a4ff265da4d4e30040b
