#### 通知notify

##### notify相关通知组件一般挂在vue的实例上方便调用，大多数情况下notify组件为单例模式。只会出现一次，但是在特殊场景下也会多个出现

```js

this.$msg('我是一条信息通知！')

this.$msg({msg: '我是一条信息通知！', time: 3000})

```

666

#### 通过vue提供的$mount方式来动态加载

```js

import Vue from 'vue'
import msg from './msg'

const createMsg = (config) => {
  const theConfig = {msg: '', time: 2000, closed: function () {}}
  if (typeof config === 'string') {
    config = {msg: config}
  }
  Object.assign(theConfig, config)
  
  const Msg = Vue.extend(msg)
  const instance = new Msg({data: theConfig})
  
  // 挂载实例到dom
  const component = instance.$mount()
  document.body.appendChild(component.$el)
}

```

666

#### 组件的销毁方式

- 定时器销毁
- 手动销毁

```js

  destroy () {
    this.$destroy(true)
    this.$el.parentNode.removeChild(this.$el)
  }

```