
# 知识点总结


## 智能组件 & 木偶组件

这是用 React 做系统设计时的两个非常重要的概念。虽然在 React 中，所有的单位都叫做“组件”，但是通过以上例子，我们还是将它们分别放在了`./app/containers`和`./app/components`两个文件夹中。为何要分开呢？

- **智能组件** 在日常开发中，我们也简称**“页面”**。为何说它“智能”，因为它只会做一些很聪明的事儿，脏活累活都不干。它只对数据负责，只需要获取了数据、定义好数据操作的相关函数，然后将这些数据、函数直接传递给具体实现的组件即可。
- **木偶组件** 这里“木偶”一词用的特别形象，它总是被人拿线牵着。它从智能组件（或页面）那里接受到数据、函数，然后就开始做一些展示工作，它的工作就是把拿到的数据展示给用户，函数操作开放给用户。至于数据内容是什么，函数操作是什么，它不关心。

以上两个如果不是理解的很深刻，待把课程学完再回头看一下这两句话，相信会理解的。



## 性能检测

安装 react 性能检测工具 `npm i react-addons-perf --save`，然后在`./app/index.jsx`中

```js
// 性能测试
import Perf from 'react-addons-perf'
if (__DEV__) {
    window.Perf = Perf
}
```

运行程序。在操作之前先运行`Perf.start()`开始检测，然后进行若干操作，运行`Perf.stop`停止检测，然后再运行`Perf.printWasted()`即可打印出浪费性能的组件列表。在项目开发过程中，要经常使用检测工具来看看性能是否正常。

如果性能的影响不是很大，例如每次操作多浪费几毫秒、十几毫秒，个人以为没必要深究，但是如果浪费过多影响了用户体验，就必须去搞定它。



## PureRenderMixin 优化

React 最基本的优化方式是使用[PureRenderMixin](http://reactjs.cn/react/docs/pure-render-mixin.html)，安装工具 `npm i react-addons-pure-render-mixin --save`，然后在组件中引用并使用

```jsx
import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    //...省略其他内容...
}
```

React 有一个生命周期 hook 叫做`shouldComponentUpdate`，组件每次更新之前，都要过一遍这个函数，如果这个函数返回`true`则更新，如果返回`false`则不更新。而默认情况下，这个函数会一直返回`true`，就是说，如果有一些无效的改动触发了这个函数，也会导致无效的更新

那么什么是无效的改动？之前说过，组件中的`props`和`state`一旦变化会导致组件重新更新并渲染，但是如果`props`和`state`没有变化也莫名其妙的触发更新了呢（这种情况确实存在）———— 这不就导致了无效渲染吗？

这里使用`this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);`的意思是重写组件的`shouldComponentUpdate`函数，在每次更新之前判断`props`和`state`，如果有变化则返回`true`，无变化则返回`false`。

因此，我们在开发过程中，在每个 React 组件中都尽量使用`PureRenderMixin`



## Immutable.js 优化

React 的终极优化是使用 [Immutable.js](https://facebook.github.io/immutable-js/) 来处理数据，Immutable 实现了 js 中不可变数据的概念。

但是也不是所有的场景都适合用它，当我们组件的`props`和`state`中的数据结构层次不深（例如普通的数组、对象等）的时候，就没必要用它。但是当数据结构层次很深（例如`obj.x.y.a.b = 10`这种），你就得考虑使用了。

之所以不轻易使用是，Immutable 定义了一种新的操作数据的语法，如下。和我们平时操作 js 数据完全不一样，而且每个地方都得这么用，学习成本高、易遗漏，风险很高。

```js
    var map1 = Immutable.Map({a:1, b:2, c:3});
    var map2 = map1.set('b', 50);
    map1.get('b'); // 2
    map2.get('b'); // 50
```

因此，这里建议优化还是要从设计着手，尽量把数据结构设计的扁平一些，这样既有助于优化系统性能，又减少了开发复杂度和开发成本。



## router

使用到了 router 的项目，其规模不会太小，代码量也不会太少。但是如果项目规模非常非常大的情况下，就会带来各种性能问题，其中给一个就是——视屏时间。

就像我们这次的demo，如何让`/`路由（即首页）加载的更快？抛开代码效率问题，其中一个解决方案就是先不要加载其他页面的代码，**即首页需要哪些代码我就先加载、执行哪些，不需要的就先别加载**。

反观我们现在的做法，页面一出来，不管暂时有用没用的代码，都统统加载下来了。如果项目规模很大、代码行数很多的时候，就不行了。

针对大型项目的**静态资源懒加载**问题，react-router 也给出了解决方案 —— [huge-apps](https://github.com/ReactTraining/react-router/tree/master/examples/huge-apps)，它将 react-router 本身和 webpack 的 `require.ensure` 结合起来，就解决了这一问题。

不过——最后——我们还是不用这种方式——因为我们的项目还没有到那种规模。任何收获都要付出相应的代价，设计越复杂风险就越大，因此我推崇精简设计。至于这个“静态资源懒加载”，大家看一下刚才的源码就能明白了。



## 数据 Mock

在目前互联网行业 web 产品开发中，前后端大部分都是分离开发的，前端开发过程中无法实时得到后端的数据。这种情况下，一般会使用三种方式：

- **模拟静态数据**：即按照既定的数据格式，自己提供一些静态的JSON数据，用相关工具（如[fis3](http://fis.baidu.com/fis3/docs/node-mock.html)）做接口来获取这些数据。该形式使用不比较简单的、只用 get 方法的场景，该项目不适用。
- **模拟动态接口**：即自己用一个 web 框架，按照既定的接口和数据结构的要求，自己模拟后端接口的功能，让前端项目能顺利跑起来。该方式适用于新开发的项目，后端和前端同时开发，适用于该教程的项目。
- **转发线上接口**：项目开发中，所有的接口直接用代理获取线上的数据，post 的数据也都直接提交到线上。该方式适用于成熟项目中，而该项目是新开发的，没有线上接口，不适用。

最后强调一下，该教程是一个前端教程，面向的是前端工程师，后端的开发和处理交给后端工程师来做。后端的业务处理和开发过程，不在本教程的讲解范围之内。

### 模拟接口

我们将模拟接口的代码都写在`./mock`目录下，接口文件是`./mock/server.js`（目前只有这一个文件，真正开发项目时，应该会分不同模块）。

然后在`./package.json`中增加如下代码，然后执行`npm run mock`即可启动模拟的接口服务。

```
  "scripts": {
    "mock": "node --harmony ./mock/server.js",
  },
```

启动之后，随便找一个 get 的接口，访问以下，例如`http://localhost:3000/api/1`

### 使用 webpack-dev-server 的代理

到这里你可能会有一个疑问————koa 接口的端口是`3000`，而我们项目的接口是`8080`，这样不就跨域了吗？————如果默认情况下，肯定是跨域了。此时就需要 webpack-dev-server 做一个代理的转发。配置代码在`./webpack.config.js`中

```js
    devServer: {
        proxy: {
          // 凡是 `/api` 开头的 http 请求，都会被代理到 localhost:3000 上，由 koa 提供 mock 数据。
          // koa 代码在 ./mock 目录中，启动命令为 npm run mock
          '/api': {
            target: 'http://localhost:3000',
            secure: false
          }
        },
        // ...省略若干代码...
    }
```



## 约束性和非约束性组件

**非约束性**

针对`<input>`输入框这种类型，你可以通过这种方式来实现（其中`defaultValue`就是原生DOM中的`value`属性）

```
<input type="text" defaultValue="a" ref="input"/>
```

获取输入框的值的时候，需要这样做——即通过查询DOM，获取DOM属性的方式来做。

```
var input = this.refs.input
console.log(input.value)
```

这样做，跟之前jquery的做法一样，都是围绕着DOM来做的。缺点有两个：

- 依赖DOM操作，不符合组件化的设计，也不易扩展
- 查询DOM消耗更多性能

**约束性**

比较推荐的方式是这一种。即监控`<input>`的变化，将值实时保存到`state`中，直接从`state`中获取值。

```
<input type="text" value={this.state.name} onChange={this.handleChange} />

//...省略部分代码
handleChange: function(e) {
  this.setState({name: e.target.value});
}
```

React或者Vue都是一种基于数据驱动视图的设计方式，定好数据和视图的规则之后，只更改数据，不直接操作DOM。操作DOM的事情，交给React或者Vue这个框架的代码来搞定。



## 点评列表

至此为止，上拉加载更多的页面已经遇到三个：

- 首页的“猜你喜欢”
- 搜索结果页的列表
- 此处的“用户评论”

这里的用户评论跟之前两个的实现方式也是完全一样的，不同的地方在于引用的`ListComponent`组件不一样。因为列表的样式不一样，这个无可厚非。但是实现逻辑是一样的。但是`LoadMore`组件是公用的。

这里我们跳出具体的代码实现，考虑一个层次更高的问题 ———— **如何保证这种类似功能或者页面的实现一致性？** ———— 即，一个地方实现了，其他类似的地方可以直接引用或者照搬，不必再做不一样的实现。我总结的主要有两点：

- 后端返回数据的高度统一性，例如都是`{data: [...], hasMore: true}`这种形式
- 前端组件的高度拆分和抽象，以便做到最大极限的灵活拼接

最后引出的这个问题，非常重要，可能在不同的项目中就会有不同的解决方案。我根据本次教程的代码总结这两点，对于大家来说也只能是抛砖引玉。最重要的是，大家要学会这种思考方式。


