## 目录架构

```
flower-iView/
  |
  ├──app/                     * egg代码目录
  │   │
  │   │──controller/          * 业务逻辑主要代码
  │   │   │
  │   │   └──home.js          * 渲染静态文件
  │   │
  │   │──middleware/          * egg中间件
  │   │
  │   │──public/              * egg默认静态文件目录
  │   │
  │   │──service/             * egg业务逻辑文件目录
  │   │
  │   └──router.js            * egg路由文件
  │
  ├──client/                  * 后台管理前端代码目录
  │   │
  │   │──public/              * html模板
  │   │
  │   └──src/                 * 后台管理前端目录
  │       │
  |       |——assets/          * 图片和css资源
  |       |
  |       |——components/      * 单个组件
  |       |
  |       |——pages/           * 后台管理单页面组件
  |       |
  │       │──request/         * axios方法封装和接口
  │       │
  │       │──store/           * vuex状态管理代码
  │       │
  |       |——App.vue          * vue根组件
  |       |
  |       |——router.js        * 后台管理前端路由
  |       |
  │       └──main.js          * 后台管理 入口文件js
  │
  ├──config/
  │   │──config.default.js    * egg默认配置文件
  │   │
  │   │──config.pre.js        * egg配置文件(可选)
  │   │
  |   |——config.prod.js       * egg生产环境配置文件
  |   |
  │   └──plugin.js            * egg插件配置
  │
  |——.babelrc                 * babel的配置文件
  |
  |——.eslintrc.js             * eslint的配置文件
  |
  │──.gitignore               * git忽略文件配置
  │
  |——package-lock.json        * 安装包版本来源
  |
  │──package.json             * 包信息
  │
  │──README.md                * readme 项目说明文档
  │
  └──webpack.config.js        * webpack配置文件

```

## egg 后端

本地开发

```
npm run dev:server
```

关闭服务

```
npm run stop
```

## vue、iView 前端

本地开发

```
npm run dev:client
```

部署

```
npm run build
```

本地开发预览

```
npm run dev
// 127.0.0.1:7001
```

## 需求

### 后台管理

    管理员登录/退出/密码重置
    会员查询、禁用、启用
    商品增删改查
    订单查询、修改状态
    地址查询
