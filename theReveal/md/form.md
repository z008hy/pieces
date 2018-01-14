## 表单组件

+ 常见的表单元素，例如input、select、checkbox

+ 一些特殊表单，例如文件上传(uploader)、日期选择器

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

### 双向绑定

让每一个表单组件大量支持双向绑定

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