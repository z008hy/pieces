
+ 常见的表单元素，例如input、select、checkbox

+ 一些特殊表单，例如文件上传(uploader)、日期选择器

+ 表单验证组件

666

#### 统一事件回调
- input 用于支持双向绑定
- change 用于监听用户的表单操作
- modify 监听value的变化，不论是用户操作，还是程序修改
```js
  // modify的触发
  watch: {
    val (val) {
      this.$emit('modify', val)
    }
  }
```

666

#### 双向绑定支持

通过value、和@input来让每一个表单组件大量支持双向绑定，vue2.2支持通过model来修改配置双向绑定的属性与方法

```js
Vue.component('my-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  }
})
```
[移步文档]（https://cn.vuejs.org/v2/api/#model）

666

#### 在使用vuex业务开发中使用对象传递的方式来支持双向绑定

```html
<template>
    <div>
        <one-input v-model="userModel.userName"/>
    </div>
</template>
```

```js
// store
const state = {
  userModel: {
    userId: '',
    userName: '',
  }
}
```

666

#### 一个简单的表单验证组件

- 验证器
- 验证提示器
- 被验证的表单