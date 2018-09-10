#### 组件编写目的

- 可复用，减少多余代码
- 统一，统一ui风格和交互风格

666

#### 注意事项

- props扁平化，做好props验证
- 组件内容部减少依赖
- 避免使用this.$parent，优先使用函数传递
- 减少使用this.$refs，优先使用props监听
- 提供与组件名称相同的class
- 注意组件销毁前的动作

666

#### 组件props的使用

- 直接使用props
- 先将props转化为data再使用

666

![](./img/noTo.png)

![](./img/toData.png)

666

如果要对props进行修改，应当现将props转化为data再使用，否则会无意中修改父组件的内容。在表单组件中推荐现将props转化为data再使用，可以使表单元素的快速刷新。

666

#### props赋值给data

```js
data () {
  retrun {
    val: this.value
  }
}
watch: {
  value (val) {
    this.val = val
  }
}
```

666

#### 抽象为mixins使用

```js
export default ({prop, data}) => {
  return {
    mounted () {
      let propTemp = this[prop]
      typeof propTemp === 'object' && propTemp = JSON.parse(JSON.stringify(this[prop]))
      // 初始化属性
      this[data] = propTemp
    },
    watch: {
      [prop] (val) {
        let propTemp = val
        typeof propTemp === 'object' && propTemp = JSON.parse(JSON.stringify(val))
        this[data] = propTemp
      }
    }
  }
}
```