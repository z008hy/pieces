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

