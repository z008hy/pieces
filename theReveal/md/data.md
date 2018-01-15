## 数据展示组件

+ 目录菜单

+ 树tree

+ 表格展示，表格table、分页器pagination

666

### 遇到的问题

表格组件展示内容的多样性，文本、链接、图片、操作以及其他个性化组件都需要支持

666 

### 解决方式

- 抽象常用的展示内容

- 特殊的展示内容利用render方法支持

666

#### 一个table组件的传参
```html
   <one-table :head="head" :data="userList"></one-table>
```
```js
head: [
  {title: '名称', key: 'name'},
  {
    title: '操作',
    render: (h, params) => {
       return h('div', [
         h('one-btn', {
           class: 'btn btn-tiny btn-info',
         }, '编辑')
       ])
    }
  }
],
data: [
  {name: '测试名称', age: '18'},
  {name: '测试名称', age: '18'}
]
```
666

#### 表格单元写法

```js
import vue from 'vue'
export default {
  functional: true,
  props: {
    row: Object,
    render: Function,
    index: Number,
    head: {
      type: Object,
      default: null
    }
  },
  render: (h, ctx) => {
    return ctx.props.render(
      h,
      { 
        index: ctx.props.index,
        row: ctx.props.row,
        column: ctx.props.head 
      }
    )
  }
}
```

666

#### createElement用法

```js
createElement(
  // {String | Object | Function}
  // 一个 HTML 标签字符串，组件选项对象，或者一个返回值
  // 类型为 String/Object 的函数，必要参数
  'div',
  // 属性
  {
    // class: class 
    // style: style
    // attrs: HTML 
    // props:props
    // on: 事件
  },
  // {String | Array}
  // 子节点 (VNodes)或使用字符串来生成“文本节点”
  []
)
```

666

#### vue的render

render函数的使用相比传统的template模板写法相对灵活，但是可读性并不如template模板写法。为此可以使用jsx写法来写更加复杂的自定义渲染。

666 

#### 将上述render改写为jsx写法

```js
render: () => {
  return (
    <one-btn class="btn btn-info btn-tiny">编辑</one-btn>
  )
}
```

666

#### 支持jsx

```js
  npm install\
    babel-plugin-syntax-jsx\
    babel-plugin-transform-vue-jsx\
    babel-helper-vue-jsx-merge-props\
    babel-preset-env\
    --save-dev
```
```js
{
  "presets": ["env"],
  "plugins": ["transform-vue-jsx"]
}
```

