// webpack的配置文件
// 运行webpakck是会加载此文件
const { resolve }  = require('path');
const HtmlWebpckPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

let CSSLOAD = {
  test:/\.css$/,
  use:[
    'style-loader','css-loader'
  ]
};

const ESLINT = {
  test:/\.js$/,
  exclude:/node_modules/,
  loader:'eslint-loader',
  options:{
    // 自动修复
    fix:true
  }
};

const config = {
  resolve: {
    // 在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在。  resolve.extensions 用于配置在尝试过程中用到的后缀列表，默认是：
    extensions: ['.js', '.ts', '.json'],
  },
  // mode: 'production', 这里不指定mode，通过脚本命令传递参数进来
  entry: './src/index.js',
  output: {
    filename:'js/build.js',
    path:resolve(__dirname,'build')
  },
  module: {
    rules: [
      CSSLOAD,
      {
        test:/\.less$/,
        use:['style-loader','css-loader','less-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        dependency: { not: ['url'] },
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8129,
              name:'[hash:10].[ext]', // 属于file-loader的属性
              outputPath: 'image', // 属于file-loader的属性
              // publicPath: 'asse',  // 属于file-loader的属性
              esModule:false,
            },
          },
        ],
        
       type: 'javascript/auto'
      },
      {
        test:/\.html$/,
        loader:'html-loader'
      },
      {
        exclude:/\.(css|js|html|less|json)$/,
        dependency: { not: ['url'] },
        loader:'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'medio',
        },
        type: 'javascript/auto'
      },

    ],
  },
  plugins: [
    new HtmlWebpckPlugin({
      template:'./src/index.html',
      minify:{
        collapseWhitespace:true,
        removeComments:true
      }
  }),
  ],
};

module.exports = (env, argv) => {
    if(argv.mode==='development'){
      config.module.rules.push(ESLINT)
      config.output.path = resolve(__dirname,'devbuild');
      config.devServer = {
        // 项目构建后的路径
        contentBase:resolve(__dirname,'build'),
        compress:true,
        port:3000,
        open:true,
        hot:true
      }
    }
    if(argv.mode==='production'){
      // 提取CSS文件为单独文件
      CSSLOAD = {
        test:/\.css$/,
        use:[MiniCssExtractPlugin.loader,'css-loader']
      }
      // CSS兼容性处理
      CSSLOAD.use.push({
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              [
                'postcss-preset-env',
                {
                  // 其他选项
                },
              ],
            ],
          },
        }});
      config.module.rules[0] = CSSLOAD;
      const miniCssExtractPlugin =  new MiniCssExtractPlugin({
        // 配置提取出来的css文件名
        filename:'css/build.css'
      });
      // 利用postcss 和 postcss-preset-env[配置浏览器兼容预设]解决css的兼容性问题
      config.plugins.push(miniCssExtractPlugin);
      // 压缩CSS
      config.plugins.push(new OptimizeCssAssetsPlugin());
    }

  return config;
};