# 目录架构

```

flower-app/
  |
  ├── build/                      # webpack配置文件
  │   └── ...
  |
  ├── config/                     # 主要项目配置
  │   ├── index.js
  │   └── ...
  |
  ├── src/                        # 客户端端前端主要代码
  |   |
  │   ├── assets/                 # 模块资源（由webpack处理）
  |   |
  │   ├── components/             # 单个组件
  |   |
  |   |—— pages/                  # 单页面组件
  |   |
  │   ├── router/                 # vue前端路由
  │   │
  |   |—— App.vue                 # vue根组件
  |   |
  │   └── main.js                 # 模块资源（由webpack处理）
  |
  ├── static/                     # 纯静态资源
  |
  ├── .babelrc                    # babel 配置
  |
  ├── .postcssrc.js               # postcss 配置
  |
  ├── .editorconfig               # editor 配置
  |
  ├── index.html                  # index.html模板
  |
  |—— package-lock.json           # 安装包版本来源
  |
  └── package.json                # 构建脚本和依赖关系
```

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 主要功能模块

```
注册登录
 |
 |——注册——>新用户注册调用添加用户接口完成后端验证
 |——登录——>调接口验证用户信息
 |
首页
 |
 |——商品分类按钮——>点击调接口进入对应商品列表
 |——热门商品列表——>调接口展示热门商品列表
 |
购物车
 |
 |——展示用户加入购物车的商品
 |——操作：删除/结算
 |
订单列表
 |
 |——分类展示订单列表（全部订单/待付款/待发货/待收货/）
 |——操作：删除/去付款/确认收货/提醒发货/取消订单
 |
个人中心
 |
 |——查看用户个人信息（用户名、账号、积分、积分等级、性别、收货地址）
 |——信息操作：修改密码、设置密保、修改用户名和性别
 |——地址操作：查看地址、删除地址、设置默认地址、添加地址
 |
```
