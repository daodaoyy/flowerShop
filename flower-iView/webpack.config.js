const path = require('path'); //nodejs里面的基本包，用来处理路径
const VueLoaderPlugin = require('vue-loader/lib/plugin'); //vue-loader插件
const HtmlWebpackPlugin = require('html-webpack-plugin'); //html插件，容纳js文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //单独提取css文件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); //警告
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //优化压缩CSS资源

module.exports = {
  //配置入口
  entry: {
   index: './client/src/main.js',
  },
  //配置打包出口文件
  output: {
    path: path.join(__dirname, './app/public'),
    publicPath: '/',
    filename: 'bundle.[name].[contenthash].js',
    chunkFilename: '[id].[chunkhash:8].chunk.js'
  },
  //配置模块规则
  module: {
    rules: [
      {//eslint规则
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.resolve('client')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          extractCSS: true,
        },
      },

      {//来识别以vue结尾的文件
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
          },
        ],
      },

      {//ES6语法转义
        test: /\.js$/,
        loader: 'babel-loader'
      },
      
      {//加载和注入css文件
        test: /\.css|\.less$/,
        use: [
          { loader: 'style-loader' }, //接受潜在页面内部的style标签的文件
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              strictMath: true,
              noIeCompat: true
            }
          }
        ]
      },

      {//文件加载器
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'file-loader'
      },

      {//用于将文件转换为base64url
        test: /\.(woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader',
        options: {
          limit: 1024, //小于1k的都打包
          publicPath: '../../',
          name: 'lib/[name].[ext]',
        },
      },
    ]
  },
  //添加插件
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      chunks: ['index'],
      filename: 'index.html',
      template: './client/public/index.html'
    }),

    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[id].[contenthash:8].chunk.css'
    })
  ],
  //优化
  optimization: {
    minimizer: [
      new UglifyJsPlugin(),
      new OptimizeCSSAssetsPlugin(),
    ],
  },

  node: {
    net: 'empty',
  },
  //配置别名
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      joi: 'joi-browser',
      vue$: 'vue/dist/vue.esm.js',
      '@src': path.resolve(__dirname, './client/src')
    }
  }
};
