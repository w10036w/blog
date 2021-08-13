# interview - CSS fundamental CSS 基础

## CSS

### BFC (Block Formatting Context) 块级格式化上下文

触发条件

- 根元素或其它包含它的元素
- 浮动元素 (元素的 float 不是 none)
- 绝对定位元素 (元素具有 position 为 absolute 或 fixed)
- 内联块 (元素具有 display: inline-block)
- 表格单元格 (元素具有 display: table-cell，HTML 表格单元格默认属性)
- 表格标题 (元素具有 display: table-caption, HTML 表格标题默认属性)
- 具有 overflow 且值不是 visible 的块元素
- 弹性盒（flex 或 inline-flex）
- display: flow-root
- column-span: all

### 堆叠上下文 stacking context

1. 任何非 none 的 transform 值都会导致一个堆叠上下文（`Stacking Context`）和包含块（Containing Block）的创建。

2. 由于堆叠上下文的创建，该元素会影响其子元素的固定定位。设置了 `position:fixed` 的子元素将不会基于 `viewport` 定位，而是基于这个父元素。

### Box Model 盒模型

`box model 盒模型`: 页面在渲染时，DOM 元素所采用的布局模型，一个元素占用的空间大小由几个部分组成，内容 (content)、内边距 (padding)，边框 (border) 和外边距 (margin)。

`box-sizing`

`border-box` vs `content-box`, 前者的 `width / height` 属性数值内含了 `border + padding`

### selector 优先级

`!important` > inline style

\> `id` (ID selector)

\> `class` = `:hover` (伪类) (class selector)

\> `tag` = `::before`(伪元素) (element selector)

\> `*` (universal selector) = `+ > ~ (空格) ||` (关系选择符) = `:not()` (否定伪类)

\> inherit > initial

### 核心属性

#### display

`block, inline*, flex, grid, none` <br>
`table*, contents, initial, inherit, run-in, list-item`

#### flex 布局

容器 (加粗为默认值)

1. `justify-content`: **flex-start** \| flex-end \| center \| space-between \| space-around; 主轴对齐
2. `align-items`: flex-start \| flex-end \| center \| baseline \| **stretch**; 次轴对齐
3. `flex-direction`: **row**
4. `flex-wrap`: **no-wrap**
5. `flex-flow`: "flex-direction" \| "flex-wrap"
6. `align-content`: 多轴线对齐, 同 `justify-content`, 单轴时无效

子元素

1. `order`: **0**
2. `flex-grow`: **0**; 放大比例, 默认不放大
3. `flex-shrink`: **1**; 缩小比例, 默认空间不足时缩小
4. `flex-basis`: <length as 350px> | **auto**; 在分配多余空间前占据的主轴方向空间
5. `flex`: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ], 后两个可选
6. `align-self`: 可覆盖 `align-items` 属性, 默认继承容器属性

#### [grid 布局](https://juejin.cn/post/6966789229909114911)
#### position

`static` <br>
`relative, fixed, sticky`

fixed 在遇到堆叠上下文时会不以窗口定位
[在移动端也有各种问题](https://github.com/maxzhang/maxzhang.github.com/issues/2)

- 各种边界奇葩现象，margin 上下的合并

- flex 布局: align-items, justify-content, flex, flex-grow,
- 伪元素，状态元素
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

- [文本溢出](https://juejin.im/post/5dc15b35f265da4d432a3d10)
- [CSS 图形](https://github.com/qq449245884/xiaozhi/issues/42)

### 特殊属性

- pointer-events

### 边界情况

- 上下 margin 合并: `display: static` 时相邻块元素的上下边框会合并

### 动画 CSS3

transform 变形

- transform-origin

transition 过渡动画：

- transition-property：属性名称
- transition-duration: 间隔时间
- transition-timing-function: 动画曲线
- transition-delay: 延迟

animation 关键帧动画：

- animation-name：动画名称
- animation-duration: 间隔时间
- animation-timing-function: 动画曲线
- animation-delay: 延迟
- animation-iteration-count：动画次数
- animation-direction: 方向
- animation-fill-mode: 禁止模式

### [有趣属性](https://mp.weixin.qq.com/s/hGlY6u6TSHWZdD_VHRlvDQ)

#### attr()

attr() 用来获取选择到的元素的某一HTML属性值，并用于其样式。它也可以用于伪元素，属性值采用伪元素所依附的元素。

```html
<p data-unit="°C">90</p>
<style>
  [data-unit]:after {
    content: attr(data-unit);
    color: red
  }
</style>
```

效果

<p data-unit="°C">90</p>
<style>
  [data-unit]:after {
    content: attr(data-unit);
    color: red
  }
</style>

#### currentColor

color的属性值。它返回当前的标签所继承的文字颜色。

```html
<style>
  .outside{
    width:200px; height:200px;
    color: blue;
    background-color: yellow;
  }
  .inside{
    width:100px; height:100px;box-sizing: border-box;
    color:red;
    background-color: pink;
    border: 10px solid currentColor;
  }
</style>
<div class="outside">
  <div class="inside"></div>
</div>
```

效果
<style>
  .outside{
    width:200px; height:200px;
    color: blue;
    background-color: yellow;
  }
  .inside{
    width:100px; height:100px;box-sizing: border-box;
    color:red;
    background-color: pink;
    border: 10px solid currentColor;
  }
  div>div{
    background-color: blue
  }
</style>
<div class="outside">
  <div class="inside"></div>
</div>

#### user-select

控制选取能否被选择. (可以禁止用户选中内容)

效果
<p class="disable-select">you cannot select me</p>
<style>
  .disable-select{
    user-select:none;
  }
</style>

#### ::selection

应用于文档中被用户高亮的部分（比如使用鼠标或其他选择设备选中的部分）。

效果
<p class="selection">select me to see</p>
<style>
  .selection::selection{
    color: yellow;
    background: blue;
  }
</style>

### 性能

#### 降低性能

高斯模糊

```css
filter: blur(10px)
```

#### 增加性能

> <https://juejin.im/post/5da52531518825094e373372>

开启GPU 加速, 新建渲染层 (render layer), 避免 reflow & repaint

gpu 过程

1. 获取 DOM 并将其分割成多个层 (renderLayer)
2. 将每个层栅格化，并独立的绘制进位图中
3. 将这些位图作为纹理上传至 GPU
4. 复合多个层来生成最终的屏幕图像 (最后的 layer)

可以通过 chrome 浏览器上的 more tools 的 rendering 查看 renderLayer，黄色栅格代表开启了 GPU 加速的元素，蓝色栅格可以看作是比层第一级的 renderLayer

```css
transform: translateZ(0);
/* OR */
will-change: transform;
/* 使浏览器可以在元素属性真正发生变化之前, 提前做好对应的优化准备工作 */
```

#### [垂直排版](https://juejin.cn/post/6966449320744714277)

#### 字体

```html
<link rel="stylesheet" href="https://" type="text/css"/>
```

```css
@font-face {fonta-family: 'myfont'; src: url('myfont.tff');} 
/** or */
@import url ('https://..........');
```


[引入字体最佳实践](https://web.dev/font-best-practices/)


[Optimize WebFont loading and rendering](https://web.dev/optimize-webfont-loading/#the-font-loading-api)

1. font is **lazy loading**, meaning it will ONLY be loaded after css selector uses the `font-family`
2. thus we need to use `<link rel="preload">` to prefetch the font family
3. use `font-display` inside `@font-face`
