# home-subscribe

    英日韩首页订阅中心

### Dependence

    jQuery

### Use

    hnpm i @portal/home-subscribe

    let {
      subCenter,
      mySub
    } = require('@portal/home-subscribe')


    $('.tab-subscribe-center').on('click', function () {
        subCenter.init(options)
    })

    $('.tab-subscribe-my').on('click', function () {
        mySub.init(options)
    })

### Options

    user: userId  default 0
    lang: 'en'            default 'en'
    root: 根节点选择器
