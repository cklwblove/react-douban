# 基于React开发的豆瓣电影
> 此项目只是用来作为 `React` 的简单入门示例。是基于官方提供的脚手架 `create-react-app` 创建的。执行了 `npm run eject`,将项目源码研究了下，并进行了一些定制化的开发。

## 预览

<img src="https://github.com/cklwblove/react-douban/blob/master/screenshot/home.jpg" width = "365" height = "619" alt="首页"/>
<img src="https://github.com/cklwblove/react-douban/blob/master/screenshot/board.jpg" width = "365" height = "619" alt="榜单"/>
<img src="https://github.com/cklwblove/react-douban/blob/master/screenshot/item.jpg" width = "365" height = "619" alt="详情"/> 
<img src="https://github.com/cklwblove/react-douban/blob/master/screenshot/list.jpg" width = "365" height = "619" alt="列表"/>

## 有关豆瓣API的限制
这里根据[此教程](https://github.com/zce/douban-api-proxy)， 自己做了一个反向代理服务 。项目中的修改点在于，在文件  `package.json` 里添加如下代码：

```
"proxy": {
    "/v2/*": {
      "target": "https://api.muziso.com",
      "secure": false,
      "changeOrigin": true
    }
  }
```

项目调试的时候即可以看到效果。

## 一些坑
- 有关引用 `Swiper` 库在执行 `build` 的时候，构建失败，具体问题如下：

```
    ./node_modules/swiper/dist/js/swiper.esm.bundle.js:15
```
解决方法是引用了 Swiper 的 UMD 版本，

```
import Swiper from 'swiper/dist/js/swiper.js'
```

## 其他

Airbnb 出了一版有关 React 的编码规范，非常值得一看。这里分享一个中文版本
[Airbnb React编码规范](https://zhuanlan.zhihu.com/p/20616464)
